# Changelog

All notable changes to this project will be documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) at the catalog level — minor versions add specialists or commands without breaking existing ones; patches are content edits and fixes.

## [Unreleased]

## [0.2.1] — 2026-04-26

### Added

- `specialist-builder` subagent (strategy-ops, C-A-R-E) — a meta-specialist that walks the user from idea to PR-ready markdown for new Black Book specialists. Brings the catalog to 86.
- `scripts/new-specialist.mjs` — scaffolds a new specialist file with valid frontmatter and house-style body skeleton. Validates kind / domain / framework / name before writing.
- `Makefile` with `build`, `check`, `strict`, and `new` targets.
- `CHANGELOG.md` and `CODE_OF_CONDUCT.md`.
- `/doctor` command — prints a summary of what's installed.
- `docs/favicon.svg` for the landing page.

### Changed

- `plugin.json` version → `0.2.1`. Description and keywords broadened to reflect 9-domain coverage.
- README: added scaffolding-script and `make` target docs; added `specialist-builder` to the Strategy / Ops table; updated counts to 86; added a command-namespacing callout.
- Landing page: counts and stats refreshed; `specialist-builder` added to the Strategy / Ops section.

## [0.2.0] — 2026-04-26

### Added

- **Two new domains.** Product / Engineering (9 specialists) and Customer Success (7 specialists). Brings the catalog to 9 domains, 85 specialists.
  - Product / Engineering: `prd-writer`, `release-notes-writer`, `user-story-writer`, `api-doc-writer`, `migration-plan-writer`, `product-leader-advisor`, `engineering-leader-advisor`, `prioritization-coach`, `product-strategist`.
  - Customer Success: `qbr-deck-writer`, `customer-health-summary-writer`, `churn-save-script-writer`, `expansion-pitch-writer`, `customer-apology-writer`, `cs-leader-advisor`, `csm-coach`.
- **Six new domains in v0.1 → v0.2 expansion.** Sales (12), Leadership (10), HR / People (10), Finance (8), Strategy / Ops (8), Content / Creative (6) — see commit history for the full specialist list per domain.
- **Discovery and orchestration commands**: `/list` (browse the catalog), `/find` (specialist recommendation), `/flow` (multi-specialist workflows with 13 pre-built scenarios).
- **Validation tooling.** `scripts/build-catalog.mjs` gained `--strict` and `--check` modes. CI runs `--check` on every push and PR.
- **Docs.** `QUICKSTART.md`, `EXAMPLES.md`, `CONTRIBUTING.md`, `docs/L-E-D.md` (and styled `docs/L-E-D.html`), GitHub issue templates, PR template.
- **Landing page** at https://lswank.github.io/black-book/ — dark-themed, per-domain navigation, copy-to-clipboard install command.

## [0.1.0] — 2026-04-25

### Added

- Initial catalog: 15 marketing specialists (10 subagents + 5 skills).
- 9 framework slash commands: `/tag`, `/bab`, `/rtf`, `/care`, `/rise`, `/aim`, `/gro`, `/fit`, `/led`.
- `/prompt-bank` for on-demand tailored prompts.
- `scripts/build-catalog.mjs` — generates `catalog.json` from frontmatter.
- Plugin manifest, README, MIT license.
