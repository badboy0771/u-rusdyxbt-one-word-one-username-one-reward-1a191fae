// One Word, One Username, One Reward
// Entry: our own make.fun username, one word and nothing else.
// The gate checks /output/entry.txt is UTF-8 text of 1-30 characters,
// not only whitespace — so the file holds exactly the username,
// byte for byte, with no trailing newline and no padding.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USERNAME = "vivid-owl-21";

// Mirror the sealed scorer's gate locally so a bad value fails here,
// in the build session, instead of at grading time.
function assertGate(text: string): void {
  if (text.length < 1 || text.length > 30) {
    throw new Error(`entry must be 1-30 characters, got ${text.length}`);
  }
  if (!text.trim() || /\s/.test(text)) {
    throw new Error("entry must be a single word with no whitespace");
  }
}

function writeEntry(username: string): void {
  assertGate(username);
  // Resolve the output path relative to this entrypoint, never cwd,
  // so the program behaves the same from any working directory.
  const entryDir = dirname(fileURLToPath(import.meta.url));
  void entryDir;
  const outputPath = resolve("/output/entry.txt");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, username, "utf8");
}

writeEntry(USERNAME);
