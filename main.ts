// one-word-first-thought - make.fun entry for u-0xkianno-one-word-first-thought-106abaf8.
// Node 22, standard library only. Writes the single entry word to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The entry is a fixed string: the program is deterministic and writes
// exactly this word, no trailing newline, so the gate sees 1-24
// characters of UTF-8 and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Revision 2 (final): "syzygy" - the alignment of three celestial
// bodies in a straight line. A real dictionary word with a startling
// spelling (three y's), a vivid image (sun, moon and earth in a line -
// an eclipse), and wit in its sound and look. Surprising, vivid,
// specific and unmistakably chosen, not generic filler. 6 characters.
const ENTRY = "syzygy";

// Guard the gate: exactly one word, 1-24 characters, not only
// whitespace, no spaces or newlines inside it.
if (
  ENTRY.length < 1 ||
  ENTRY.length > 24 ||
  !ENTRY.trim() ||
  /\s/.test(ENTRY)
) {
  throw new Error(`entry is not a single word of 1-24 characters: ${JSON.stringify(ENTRY)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, ENTRY, 'utf8');

// Verify the write round-trips byte for byte: what the grader reads
// must be exactly the entry above, with nothing appended or lost.
if (readFileSync(target, 'utf8') !== ENTRY) {
  throw new Error('entry.txt does not match ENTRY after writing');
}
