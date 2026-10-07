import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(root, "media", "bible-study");
const destination = path.join(root, "public", "videos");
const sha256 = (content) => createHash("sha256").update(content).digest("hex");

fs.mkdirSync(destination, { recursive: true });

for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const directory = path.join(source, entry.name);
  const manifestPath = path.join(directory, "manifest.json");
  if (!fs.existsSync(manifestPath)) continue;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (
    !/^[A-Za-z0-9_-]+\.mp4$/.test(manifest.fileName) ||
    !Number.isSafeInteger(manifest.sizeBytes) ||
    manifest.sizeBytes <= 0 ||
    !/^[a-f0-9]{64}$/.test(manifest.sha256) ||
    !Array.isArray(manifest.parts) ||
    manifest.parts.length === 0
  ) {
    throw new Error("Invalid recording manifest: " + manifestPath);
  }

  const output = path.join(destination, manifest.fileName);
  const temporary = output + ".tmp";
  const handle = fs.openSync(temporary, "w");
  const combined = createHash("sha256");
  let size = 0;

  try {
    for (const [index, part] of manifest.parts.entries()) {
      const expectedName = "part-" + String(index).padStart(3, "0") + ".bin";
      if (part.fileName !== expectedName) {
        throw new Error("Invalid recording part order: " + manifest.fileName);
      }
      const content = fs.readFileSync(path.join(directory, part.fileName));
      if (content.length !== part.sizeBytes || sha256(content) !== part.sha256) {
        throw new Error("Recording part failed verification: " + part.fileName);
      }
      let offset = 0;
      while (offset < content.length) {
        offset += fs.writeSync(handle, content, offset, content.length - offset);
      }
      size += content.length;
      combined.update(content);
    }
    if (size !== manifest.sizeBytes || combined.digest("hex") !== manifest.sha256) {
      throw new Error("The complete recording failed verification: " + manifest.fileName);
    }
    fs.closeSync(handle);
    fs.renameSync(temporary, output);
    console.log("Prepared " + manifest.fileName + " (" + size + " bytes)");
  } catch (error) {
    try { fs.closeSync(handle); } catch { /* The handle may already be closed. */ }
    fs.rmSync(temporary, { force: true });
    throw error;
  }
}
