import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import yazl from "yazl";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dataDirectory = path.join(root, "src", "data");
const studyWeeks = JSON.parse(
  fs.readFileSync(path.join(dataDirectory, "bibleStudyWeeks.json"), "utf8"),
);
const outputDirectory = path.join(root, "public", "archives");
const metadataPath = path.join(dataDirectory, "bibleStudyArchives.generated.json");

if (
  !Number.isSafeInteger(studyWeeks.currentWeek) ||
  studyWeeks.currentWeek < 1 ||
  !Array.isArray(studyWeeks.weeks) ||
  !studyWeeks.weeks.some((week) => week.week === studyWeeks.currentWeek)
) {
  throw new Error("The Bible study list must name an existing current week.");
}

const weekNumbers = new Set();
const archiveWeeks = [];

function lessonFile(folder, fileName, sizeBytes, extension) {
  if (
    typeof fileName !== "string" ||
    !new RegExp("^[A-Za-z0-9_-]+\\." + extension + "$").test(fileName) ||
    !Number.isSafeInteger(sizeBytes) ||
    sizeBytes <= 0
  ) {
    throw new Error("Invalid Bible study " + extension + " file: " + fileName);
  }
  const filePath = path.join(root, "public", folder, fileName);
  const stat = fs.statSync(filePath);
  if (!stat.isFile() || stat.size !== sizeBytes) {
    throw new Error("Bible study file is missing or has the wrong size: " + fileName);
  }
  return { filePath, fileName };
}

for (const week of studyWeeks.weeks) {
  if (
    !Number.isSafeInteger(week.week) ||
    week.week < 1 ||
    weekNumbers.has(week.week) ||
    typeof week.title !== "string" ||
    !week.title.trim() ||
    !Array.isArray(week.resources) ||
    week.resources.length === 0
  ) {
    throw new Error("Every Bible study week needs a unique number, title, and resources.");
  }
  weekNumbers.add(week.week);
  if (week.week > studyWeeks.currentWeek) continue;

  const files = [];
  const names = new Set();
  for (const resource of week.resources) {
    if (resource.available === false) continue;
    files.push(lessonFile("notes", resource.fileName, resource.sizeBytes, "pdf"));
    if (resource.video) {
      files.push(
        lessonFile("videos", resource.video.fileName, resource.video.sizeBytes, "mp4"),
      );
    }
  }
  for (const file of files) {
    if (names.has(file.fileName)) {
      throw new Error("Duplicate filename in Week " + week.week + ": " + file.fileName);
    }
    names.add(file.fileName);
  }
  if (week.week < studyWeeks.currentWeek) {
    if (!files.length || week.resources.some((resource) => resource.available === false)) {
      throw new Error("Complete all Week " + week.week + " materials before archiving it.");
    }
    archiveWeeks.push({ week: week.week, files });
  }
}

fs.mkdirSync(outputDirectory, { recursive: true });
const archiveFiles = {};

for (const week of archiveWeeks.sort((a, b) => a.week - b.week)) {
  const fileName = "Bible_Study_Week_" + week.week + ".zip";
  const output = path.join(outputDirectory, fileName);
  const temporary = output + ".tmp";
  const archive = new yazl.ZipFile();
  archive.on("error", (error) => archive.outputStream.destroy(error));
  const completed = pipeline(archive.outputStream, fs.createWriteStream(temporary));

  try {
    for (const file of week.files) {
      archive.addFile(file.filePath, "Week_" + week.week + "/" + file.fileName, {
        // Videos and PDFs are already compressed; stream them without buffering.
        compress: false,
        mtime: new Date("1980-01-01T00:00:00Z"),
        mode: 0o100644,
        forceDosTimestamp: true,
      });
    }
    archive.end();
    await completed;
    fs.renameSync(temporary, output);
    archiveFiles[week.week] = { fileName, sizeBytes: fs.statSync(output).size };
    console.log("Prepared " + fileName + " (" + archiveFiles[week.week].sizeBytes + " bytes)");
  } catch (error) {
    archive.outputStream.destroy();
    await completed.catch(() => {});
    fs.rmSync(temporary, { force: true });
    throw error;
  }
}

// Remove only generated bundles that no longer belong to a previous week.
const activeFiles = new Set(Object.values(archiveFiles).map((archive) => archive.fileName));
for (const fileName of fs.readdirSync(outputDirectory)) {
  if (
    /^Bible_Study_Week_[0-9]+\.zip(?:\.tmp)?$/.test(fileName) &&
    !activeFiles.has(fileName)
  ) {
    fs.rmSync(path.join(outputDirectory, fileName));
  }
}

fs.writeFileSync(metadataPath + ".tmp", JSON.stringify(archiveFiles, null, 2) + "\n");
fs.renameSync(metadataPath + ".tmp", metadataPath);
console.log("Prepared " + archiveWeeks.length + " previous-week archive(s).");
