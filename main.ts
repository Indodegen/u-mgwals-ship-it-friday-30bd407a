// Ship It Friday — make.fun entry.
// Writes the champion one-line commit message to entry.txt inside the
// output directory ($MAKEFUN_OUTPUT_DIR when set, otherwise /output).
// The entry line is embedded here so the program never reads a file
// from outside the repository and never depends on the working directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "feat: ship it Friday, I tested it in my head";

function validate(entry: string): string | null {
  if (entry.length === 0) {
    return "entry is empty";
  }
  if (entry.length > 159) {
    return `entry is ${entry.length} characters, over the 159-character limit`;
  }
  if (entry.trim().length === 0) {
    return "entry is only whitespace";
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    return "entry must be a single line";
  }
  if (!/[a-zA-Z]/.test(entry)) {
    return "entry must contain at least one letter";
  }
  return null;
}

const problem = validate(ENTRY);
if (problem !== null) {
  console.error(`invalid entry: ${problem}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
