import studyWeeks from "./bibleStudyWeeks.json";
import archiveFiles from "./bibleStudyArchives.generated.json";

// Update the week list and currentWeek in bibleStudyWeeks.json.
// ZIP files and their sizes are prepared automatically before dev and builds.
export const currentBibleStudyWeek = studyWeeks.weeks.find(
  (week) => week.week === studyWeeks.currentWeek,
);

export const bibleStudyResources = currentBibleStudyWeek.resources;

export const bibleStudyArchive = studyWeeks.weeks
  .filter((week) => week.week < studyWeeks.currentWeek)
  .sort((a, b) => b.week - a.week)
  .map((week) => ({
    week: week.week,
    title: week.title,
    download: archiveFiles[week.week] ?? null,
  }));
