#!/usr/bin/env node
// Scans agents/ and skills/, parses simple frontmatter, writes catalog.json.
// Pure Node, no dependencies.
//
// Modes:
//   (default)   Build catalog.json. Warns on issues; exits 0.
//   --strict    Build, but exit 1 on any validation error.
//   --check     Don't write. Verify the on-disk catalog.json matches what
//               would be built and that all files are valid. Exits 1 on drift
//               or validation errors. Used in CI.

import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const STRICT = args.has("--strict");
const CHECK = args.has("--check");

const sources = [
  { dir: "agents", kind: "subagent" },
  { dir: "skills", kind: "skill" },
];

const REQUIRED_FIELDS = ["name", "description", "domain", "framework"];
const VALID_FRAMEWORKS = new Set([
  "T-A-G", "B-A-B", "R-T-F", "C-A-R-E", "R-I-S-E",
  "A-I-M", "G-R-O", "F-I-T", "L-E-D",
]);
const VALID_DOMAINS = new Set([
  "marketing", "sales", "leadership", "hr",
  "finance", "strategy-ops", "content-creative",
  "product-eng", "customer-success",
]);

function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) {
    throw new Error("missing frontmatter");
  }
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error("unterminated frontmatter");
  }
  const block = text.slice(4, end);
  const out = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, raw] = m;
    let val = raw.trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
    }
    out[key] = val;
  }
  return out;
}

const entries = [];
const errors = [];
const warnings = [];
const seenNames = new Map();

for (const { dir, kind } of sources) {
  const abs = join(root, dir);
  let files;
  try {
    files = readdirSync(abs).filter((f) => f.endsWith(".md"));
  } catch {
    continue;
  }
  for (const file of files) {
    const path = join(abs, file);
    const where = `${dir}/${file}`;
    try {
      const text = readFileSync(path, "utf8");
      const meta = parseFrontmatter(text);
      for (const field of REQUIRED_FIELDS) {
        if (!meta[field]) {
          errors.push(`${where}: missing field "${field}"`);
        }
      }
      if (meta.framework && !VALID_FRAMEWORKS.has(meta.framework)) {
        errors.push(`${where}: unknown framework "${meta.framework}" (expected one of ${[...VALID_FRAMEWORKS].join(", ")})`);
      }
      if (meta.domain && !VALID_DOMAINS.has(meta.domain)) {
        warnings.push(`${where}: domain "${meta.domain}" is new — add it to VALID_DOMAINS in scripts/build-catalog.mjs if intentional`);
      }
      if (meta.name) {
        const expected = file.replace(/\.md$/, "");
        if (meta.name !== expected) {
          errors.push(`${where}: frontmatter name "${meta.name}" doesn't match filename "${expected}"`);
        }
        if (seenNames.has(meta.name)) {
          errors.push(`${where}: duplicate name "${meta.name}" (also in ${seenNames.get(meta.name)})`);
        } else {
          seenNames.set(meta.name, where);
        }
      }
      if (meta.description && meta.description.length < 30) {
        warnings.push(`${where}: description is suspiciously short (${meta.description.length} chars) — make it specific enough that Claude can match it accurately`);
      }
      entries.push({
        name: meta.name ?? file.replace(/\.md$/, ""),
        kind,
        domain: meta.domain ?? "uncategorized",
        framework: meta.framework ?? null,
        description: meta.description ?? "",
        path: `${dir}/${file}`,
      });
    } catch (err) {
      errors.push(`${where}: ${err.message}`);
    }
  }
}

entries.sort((a, b) => a.name.localeCompare(b.name));

const catalog = {
  version: 1,
  generated_at: new Date().toISOString(),
  count: entries.length,
  domains: [...new Set(entries.map((e) => e.domain))].sort(),
  frameworks: [...new Set(entries.map((e) => e.framework).filter(Boolean))].sort(),
  entries,
};

const outPath = join(root, "catalog.json");

function reportIssues() {
  if (warnings.length) {
    console.error("Warnings:");
    for (const w of warnings) console.error("  - " + w);
  }
  if (errors.length) {
    console.error("Errors:");
    for (const e of errors) console.error("  - " + e);
  }
}

function shouldFail() {
  return errors.length > 0;
}

if (CHECK) {
  // Compare against on-disk catalog. Strip generated_at since it always differs.
  if (!existsSync(outPath)) {
    console.error("catalog.json missing — run scripts/build-catalog.mjs to generate");
    process.exit(1);
  }
  const onDisk = JSON.parse(readFileSync(outPath, "utf8"));
  const expected = { ...catalog, generated_at: onDisk.generated_at };
  const expectedStr = JSON.stringify(expected, null, 2) + "\n";
  const onDiskStr = readFileSync(outPath, "utf8");
  reportIssues();
  if (shouldFail()) {
    console.error("Validation failed.");
    process.exit(1);
  }
  if (expectedStr !== onDiskStr) {
    console.error("catalog.json is stale — run scripts/build-catalog.mjs and commit the result");
    process.exit(1);
  }
  console.log(`catalog.json is up to date: ${entries.length} entries`);
  process.exit(0);
}

writeFileSync(outPath, JSON.stringify(catalog, null, 2) + "\n");
reportIssues();

if (STRICT && shouldFail()) {
  console.error("Strict mode: failing due to validation errors.");
  process.exit(1);
}

console.log(`catalog.json written: ${entries.length} entries`);
