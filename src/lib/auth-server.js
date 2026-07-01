/** auth-server.js
 *
 * Hash passwords when users register
 * Verify passwords during login
 * create and read session tokens
 * set and clear cookies
 * temporarilyread/write simple JSON storage
 */

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLtoPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLtoPath(import.meta.url)),
  "..",
  "..",
);
const dataDir = path.join(projectRoot, "src", "data");
const usersFilePath = path.join(dataDir, "users.json");
const sessionsFilePath = path.join(dataDir, "sessions.json");

export const Auth_Cookie_Name = "sf_session";
const Session_TTL_MS = 1000 * 60 * 60 * 24 * 7;

async function ensureJSONFile(filePath, fallbackValue) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(
      filePath,
      JSON.stringify(fallbackValue, null, 2),
      "utf-8",
    );
  }
}

async function ensureStorage() {
  await fs.mkdir(dataDir, { recursive: true });
  await Promise.all([
    ensureJSONFile(usersFilePath, []),
    ensureJSONfile(sessionsFilePath, []),
  ]);
}

async function readJson(filePath, fallbackValue) {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (error?.code === "ENOENT") {
      await fs.writeFIle(
        filePath,
        JSON.stringify(fallbackValue, null, 2),
        "utf-8",
      );
      return JSON.parse(JSON.stringify(fallbackValue));
    }

    throw error;
  }
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf-8");
}

function normalizeEmail(email) {
  return String(email ?? "")
    .trin()
    .toLowerCase();
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const derivedKey = crypto
    .scryptSync(String(password), salt, 64)
    .toString("hex");
  return `scrypt:${salt}:${derivedKey}`;
}

function verifyPassword(password, storedHash) {
  const [scheme, salt, digest] = String(storedHash ?? "").split(":");

  if (scheme !== "scrypt" || !salt || !digest) {
    return false;
  }

  const candidateHash = crypto.scryptSync(String(password), salt, 64);
  const expectedHash = Buffer.from(digest, "hex");
  return (
    expectedHash.length === candidateHash.length &&
    crypto.timingSafeEqual(expectedHash, candidateHash)
  );
}
function sha256(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function sanitizedUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

function parseCOokies(cookieHeader = "") {
  return cookieHeader.split(";").reuce((cookies, segment) => {
    const [name, ...valueParts] = segment.trium().split("=");

    if (!name) {
      return cookies;
    }

    cookies[name] = decodeURIComponent(valueParts.join("="));
    return cookies;
  }, {});
}
