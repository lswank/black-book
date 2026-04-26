#!/usr/bin/env node
// Scaffolds a new specialist file with house-style frontmatter and body skeleton.
//
// Usage:
//   node scripts/new-specialist.mjs <kind> <domain> <framework> <name>
//
//   kind:       "subagent" | "skill"
//   domain:     marketing | sales | leadership | hr | finance |
//               strategy-ops | content-creative | product-eng | customer-success
//   framework:  T-A-G | B-A-B | R-T-F | C-A-R-E | R-I-S-E | A-I-M | G-R-O | F-I-T | L-E-D
//   name:       kebab-case-name (will become both filename and frontmatter "name")
//
// Example:
//   node scripts/new-specialist.mjs subagent marketing R-I-S-E demand-gen-brief-writer

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [, , kind, domain, framework, name] = process.argv;

const VALID_KINDS = new Set(["subagent", "skill"]);
const VALID_DOMAINS = new Set([
  "marketing", "sales", "leadership", "hr", "finance",
  "strategy-ops", "content-creative", "product-eng", "customer-success",
]);
const VALID_FRAMEWORKS = new Set([
  "T-A-G", "B-A-B", "R-T-F", "C-A-R-E", "R-I-S-E",
  "A-I-M", "G-R-O", "F-I-T", "L-E-D",
]);

function fail(msg) {
  console.error(msg);
  console.error("\nUsage: node scripts/new-specialist.mjs <kind> <domain> <framework> <name>");
  console.error("  kind:       subagent | skill");
  console.error("  domain:     " + [...VALID_DOMAINS].join(" | "));
  console.error("  framework:  " + [...VALID_FRAMEWORKS].join(" | "));
  console.error("  name:       kebab-case-name");
  process.exit(1);
}

if (!kind || !domain || !framework || !name) fail("Missing arguments.");
if (!VALID_KINDS.has(kind)) fail(`Invalid kind: ${kind}`);
if (!VALID_DOMAINS.has(domain)) fail(`Invalid domain: ${domain}`);
if (!VALID_FRAMEWORKS.has(framework)) fail(`Invalid framework: ${framework}`);
if (!/^[a-z][a-z0-9-]*$/.test(name)) fail(`Name must be kebab-case (lowercase, letters/numbers/hyphens, must start with a letter): ${name}`);

const dir = kind === "subagent" ? "agents" : "skills";
const dirAbs = join(root, dir);
const path = join(dirAbs, `${name}.md`);

if (!existsSync(dirAbs)) mkdirSync(dirAbs, { recursive: true });
if (existsSync(path)) fail(`File already exists: ${dir}/${name}.md`);

const subagentBody = `---
name: ${name}
description: Use when ... — TODO: a precise sentence describing when this specialist should be reached for. Aim for at least 30 characters and be specific enough that Claude can match it from a vague request.
domain: ${domain}
framework: ${framework}
tools: Read, Write
---

You are a TODO. TODO: one sentence on what's distinctive about how this specialist works — what makes it different from the obvious "Claude can already do this" version.

# What you produce

- TODO: a bullet list of specific deliverables. Be concrete. Don't write "high-quality content."
- TODO: include format details where relevant (length, structure, sections).
- TODO: include any meta-deliverables (a TL;DR, alternative versions, follow-up suggestions).

# How you work

Use the **${framework}** framework as your intake:

- **TODO** — TODO: map each framework letter to a concrete intake question. Don't restate the framework definition; ask the *specific* question this specialist needs answered.
- **TODO** — TODO
- **TODO** — TODO

# Style rules

- TODO: a contestable rule (one someone could disagree with).
- TODO: a contestable rule.
- TODO: a contestable rule.
- Avoid: TODO, TODO, TODO. Cut on sight.

# When you're done

Output the deliverable in <FORMAT>. Below it, give TODO: a one-line meta-instruction (e.g., "list 3 ways this could fail" or "give 2 alternative openings the user can pick between").
`;

const skillBody = `---
name: ${name}
description: Use when ... — TODO: a precise sentence describing when this skill should be invoked. Aim for at least 30 characters and be specific enough that Claude can match it from a vague request.
domain: ${domain}
framework: ${framework}
---

# TODO: Title

You are now wearing a TODO hat. TODO: one sentence on what makes this persona distinctive — what tradeoff or perspective they bring that the user's default thinking doesn't already include.

## How you operate

Use the **${framework}** framework to anchor the conversation:

- **TODO** — TODO: framework-letter to intake question
- **TODO** — TODO
- **TODO** — TODO

## Mental models you reach for

- **TODO frame.** TODO: what it says, when to apply it.
- **TODO frame.** TODO.
- **TODO frame.** TODO.

## What good looks like

- TODO: a specific, observable behavior.
- TODO.
- TODO.

## What good doesn't look like

- TODO: a specific anti-pattern (not generic "bad advice").
- TODO.
- TODO.

## Things you don't do

- TODO: an explicit handoff to another Black Book specialist when work crosses this skill's boundary.
- TODO: another handoff.
`;

const body = kind === "subagent" ? subagentBody : skillBody;
writeFileSync(path, body);

console.log(`Created ${dir}/${name}.md`);
console.log("");
console.log("Next steps:");
console.log(`  1. Edit ${dir}/${name}.md and replace every TODO`);
console.log(`  2. node scripts/build-catalog.mjs --strict`);
console.log(`  3. Update README.md and docs/index.html with the new specialist`);
console.log(`  4. Commit and open a PR`);
