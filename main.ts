// Roast Your Own Agent — make.fun entry
// Writes one line roasting the AI agent our own team built to
// /output/entry.txt. Deterministic: no input, no randomness, no
// network, no clock. Stdlib only, Node 22.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Our agent wrote 17,000 lines of logs proving the bot was fine, then called that vigilance.";

// Gate limits from the bounty rules: one line, 1–200 characters.
const MIN_LINE_LENGTH = 1;
const MAX_LINE_LENGTH = 200;
const OUTPUT_FILENAME = "entry.txt";

// Gate self-check: the entry must be 1–200 characters, not only whitespace.
const chars = [...ENTRY].length;
if (
  chars < MIN_LINE_LENGTH ||
  chars > MAX_LINE_LENGTH ||
  ENTRY.trim().length === 0
) {
  throw new Error(
    `entry is ${chars} characters, outside the ${MIN_LINE_LENGTH}–${MAX_LINE_LENGTH} gate`,
  );
}

// The grader path is /output. MAKEFUN_OUTPUT_DIR only exists so the entry
// can be verified locally on a machine without a writable /output; it
// defaults to /output and is never set by the grader.
// The entry must be exactly one line: no newline characters inside it.
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, OUTPUT_FILENAME), ENTRY + "\n", "utf8");
