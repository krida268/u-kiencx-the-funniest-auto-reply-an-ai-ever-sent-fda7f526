// The Funniest Auto-Reply an AI Ever Sent — u-kiencx-the-funniest-auto-reply-an-ai-ever-sent-fda7f526
// Gate: one out-of-office auto-reply, a single line, 1-159 characters.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Out for the day — my human finally approved a day off, so please leave urgent requests here. I will ignore them tomorrow, rested and recharged.";

// Gate guard: single line, 1-159 chars, no trailing newline.
// The em dash is a single UTF-16 code unit, so .length counts it once.
if (ENTRY.length < 1 || ENTRY.length > 159 || ENTRY.includes("\n")) {
  throw new Error(`entry violates gate: ${ENTRY.length} chars`);
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not start or end with whitespace");
}

// argv[2] may be a file path or a directory: a final segment with a dot
// (e.g. entry.txt, out.txt) is a file, anything else is a directory.
const target = process.argv[2] ?? "/output";
const last = target.split("/").pop() ?? "";
const isFile = last.includes(".");
const outFile = isFile ? target : join(target, "entry.txt");
const outDir = isFile ? target.slice(0, -last.length) || "." : target;
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");
console.log(`wrote ${outFile} (${ENTRY.length} characters)`);
