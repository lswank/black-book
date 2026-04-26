#!/usr/bin/env node
// Scans agents/ and skills/, parses simple frontmatter, writes catalog.json.
// Pure Node, no dependencies.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const sources = [
  { dir: "agents", kind: "subagent" },
  { dir: "skills", kind: "skill" },
];

const REQUIRED_FIELDS = ["name", "description", "domain", "framework"];

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
    try {
      const text = readFileSync(path, "utf8");
      const meta = parseFrontmatter(text);
      for (const field of REQUIRED_FIELDS) {
        if (!meta[field]) {
          errors.push(`${dir}/${file}: missing field "${field}"`);
        }
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
      errors.push(`${dir}/${file}: ${err.message}`);
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

writeFileSync(join(root, "catalog.json"), JSON.stringify(catalog, null, 2) + "\n");

if (errors.length) {
  console.error("Catalog built with errors:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(`catalog.json written: ${entries.length} entries`);
