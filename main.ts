import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One-star review of something essential: sleep.
// Deadpan, one line, 126 characters — a real complaint filed in
// earnest against a thing that cannot be fixed.
const REVIEW =
  "One star. Sleep takes eight hours a day, offers no refund, and every morning I wake up somehow more tired than when I went in.";

const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, REVIEW, "utf8");

// Gate + round-trip verification: the sealed scorer requires UTF-8 text
// of 1 to 160 characters, not only whitespace, exactly one line.
const back = readFileSync(out, "utf8");
const bytes = Buffer.byteLength(back, "utf8");
if (back !== REVIEW) throw new Error("round-trip mismatch: file differs from REVIEW");
if (back.length < 1 || back.length > 160) throw new Error(`length ${back.length} outside 1-160 gate`);
if (!back.trim()) throw new Error("entry is only whitespace");
if (back.includes("\n")) throw new Error("entry must be a single line");
console.log(`wrote ${back.length} chars (${bytes} bytes) to ${out} — verified`);
