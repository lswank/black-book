# Changelog

All notable changes to this project will be documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) at the catalog level — minor versions add specialists or commands without breaking existing ones; patches are content edits and fixes.

## [Unreleased]

## [0.4.1] — 2026-04-26

### Added

- **One-click `.mcpb` bundle** at `https://black-book-host.vercel.app/black-book.mcpb` (~2.6 KB). Download, double-click, click Install in Claude Desktop, done. Built against the official MCPB (formerly DXT) manifest spec v0.3.
- **One-line terminal installer**:
  - macOS / Linux: `curl -fsSL https://black-book-host.vercel.app/install | bash`
  - Windows: `iwr -useb https://black-book-host.vercel.app/install.ps1 | iex`
  Both scripts safely patch `claude_desktop_config.json`, preserving every other entry (with a `.bak` backup) and idempotent on re-run.
- **Redesigned install card** on the landing page leading with the `.mcpb` download as the primary CTA. JSON-paste / self-host / Claude Code paths now hide behind a "Other ways to install" disclosure.

### Changed

- README, QUICKSTART, and FAQ install sections reordered: one-click bundle first, terminal one-liner second, manual JSON third.
- `plugin.json` version → `0.4.1`.

## [0.4.0] — 2026-04-26

### Added

- **Hosted MCP endpoint** at `https://black-book-host.vercel.app/mcp`. Free tier (30 requests / IP / hour). Drop one snippet in `claude_desktop_config.json` and the catalog is live in Claude Desktop with no clone, no `npm install`, no API keys.
- **HTTP MCP handler** (`mcp/http-handler.mjs`) using `StreamableHTTPServerTransport`. Generic Node-style `(req, res)` handler — works in Vercel Functions, plain Node `http`, or any framework that accepts the IncomingMessage / ServerResponse pair.
- **Factory** (`mcp/factory.mjs`) — extracted server setup so the same code powers both stdio and HTTP transports. `mcp/server.mjs` and `mcp/http-handler.mjs` are now thin wrappers over the factory.
- **Landing-page redesign**. New hero with gradient accent, modern typography, animated reveal-on-scroll, install card with three tabs (hosted / self-host / Claude Code), copy-to-clipboard for each snippet, domain quick-jump cards, refreshed framework cards, sticky search row, polished workflow chains. Single self-contained HTML file, no dependencies.

### Changed

- **Rebrand: "white-room" → "clean-room"** across README, FAQ, plugin.json, and project memory.
- README, FAQ, QUICKSTART, and `mcp/README.md` lead with the hosted install path; self-host and Claude Code are documented as alternatives.
- `plugin.json` version → `0.4.0`. Description broadened to mention both Claude Code and Claude Desktop install surfaces.

### Operations

- A separate **private deploy package** lives at `~/black-book-host` (not committed to this repo). Wraps the public HTTP handler with per-IP rate limiting, deploys to Vercel as a single function. The public repo stays a clean OSS plugin/library; the operator decides how to host.

## [0.3.0] — 2026-04-26

### Added

- **MCP server for Claude Desktop and other MCP clients.** Lives in `mcp/`. Exposes the catalog as MCP tools — `list_specialists`, `get_specialist`, `find_specialist`, `list_frameworks`, `apply_framework`, `prompt_bank`, `list_flows`, `flow` — plus a `black-book://catalog` resource. Closes the previous gap where Claude Desktop users had no install path.
- `mcp/README.md` with `claude_desktop_config.json` snippet and persona-takeover-vs-prompt-emit usage patterns.
- `mcp/package.json` declaring `@modelcontextprotocol/sdk` and `zod` dependencies and a `black-book-mcp` bin entry for future npm publish.

### Changed

- `plugin.json` version → `0.3.0` (minor bump because this adds a new install surface).

## [0.2.5] — 2026-04-26

### Added

- `SECURITY.md` — scope of the project's security surface and reporting channels.
- `docs/sitemap.xml` and `docs/robots.txt` — basic SEO hygiene for the landing page.
- Keyboard shortcut: pressing `/` anywhere on the landing page focuses the search box.

### Changed

- `plugin.json` version → `0.2.5`.
- Search-box placeholder updated to advertise the `/` hotkey.

## [0.2.4] — 2026-04-26

### Added

- Specialist names on the landing page are now links to their source markdown on GitHub. Click any specialist row's name to read the full body (system prompt for subagents, persona script for skills). Pure client-side JS, no build dependency.

### Changed

- `plugin.json` version → `0.2.4`.

## [0.2.3] — 2026-04-26

### Added

- Live search on the landing page. Filters specialists by name, description, or framework as the user types. Hides empty domain blocks; pressing Escape clears the filter. With 86 specialists across 9 domains, the page is long enough that this is now load-bearing.

### Changed

- `plugin.json` version → `0.2.3`.

## [0.2.2] — 2026-04-26

### Added

- `FAQ.md` — common questions about the plugin, distinction from the original Black Book product, install, contributing, roadmap.
- `.editorconfig` for consistent contributor editor behavior.
- A **Workflows** section on the landing page that visually lists all 13 pre-built `/flow` scenarios with their specialist chains. Designed to make orchestration discoverable from the marketing page.

### Changed

- `plugin.json` version → `0.2.2`.
- Landing-page nav: replaced L-E-D and Examples links with Workflows (anchor) and FAQ to keep the bar uncluttered. (Both still live in the body and in the repo.)

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
