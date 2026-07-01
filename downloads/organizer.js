import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WATCH_FOLDER = __dirname;
const TARGET_FOLDER = path.join(WATCH_FOLDER, "The Library");
const POLL_INTERVAL_MS = 3000;
const VIDEO_EXTENSIONS = new Set([
  ".mp4",
  ".mov",
  ".m4v",
  ".mkv",
  ".avi",
  ".wmv",
  ".webm",
  ".mpg",
  ".mpeg",
  ".ts",
  ".m2ts",
  ".3gp",
  ".flv",
]);

fs.mkdirSync(TARGET_FOLDER, { recursive: true });

function isVideoFile(fileName) {
  return VIDEO_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function isInsideTargetFolder(filePath) {
  const relativePath = path.relative(TARGET_FOLDER, filePath);
  return relativePath && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

function buildUniqueDestination(originalDestination) {
  if (!fs.existsSync(originalDestination)) {
    return originalDestination;
  }

  const parsed = path.parse(originalDestination);
  let counter = 1;

  while (true) {
    const candidate = path.join(parsed.dir, `${parsed.name}-${counter}${parsed.ext}`);
    if (!fs.existsSync(candidate)) {
      return candidate;
    }
    counter += 1;
  }
}

async function waitForFileToSettle(filePath, attempts = 10, delayMs = 1000) {
  let previousSize = -1;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const stats = await fs.promises.stat(filePath);

      if (stats.size > 0 && stats.size === previousSize) {
        return true;
      }

      previousSize = stats.size;
    } catch (error) {
      if (error.code === "ENOENT") {
        return false;
      }
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return false;
}

async function moveVideo(filePath) {
  const fileName = path.basename(filePath);

  if (!isVideoFile(fileName) || isInsideTargetFolder(filePath)) {
    return;
  }

  const settled = await waitForFileToSettle(filePath);
  if (!settled) {
    return;
  }

  const destinationPath = buildUniqueDestination(path.join(TARGET_FOLDER, fileName));

  try {
    await fs.promises.rename(filePath, destinationPath);
    console.log(`Moved ${fileName} -> ${destinationPath}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`Failed to move ${fileName}:`, error.message);
    }
  }
}

async function processExistingFiles() {
  const entries = await fs.promises.readdir(WATCH_FOLDER, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && isVideoFile(entry.name))
      .map((entry) => moveVideo(path.join(WATCH_FOLDER, entry.name))),
  );
}

async function scanForVideos() {
  try {
    await processExistingFiles();
  } catch (error) {
    console.error("Failed to scan watch folder:", error.message);
  }
}

function startWatching() {
  console.log(`Watching ${WATCH_FOLDER} for video files every ${POLL_INTERVAL_MS / 1000}s...`);
  console.log(`Target folder: ${TARGET_FOLDER}`);
}

await processExistingFiles();
startWatching();
setInterval(scanForVideos, POLL_INTERVAL_MS);
