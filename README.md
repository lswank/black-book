# Black Book

[![CI](https://github.com/lswank/black-book/actions/workflows/ci.yml/badge.svg)](https://github.com/lswank/black-book/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Specialists](https://img.shields.io/badge/specialists-86-ffd166)](#specialists)
[![Domains](https://img.shields.io/badge/domains-9-118ab2)](#specialists)

A Claude Code plugin: 86 role-built business specialists, the 9 prompt-engineering frameworks they're built on, and a generator that produces tailored prompts on demand.

A white-room reimplementation of [the "Black Book" concept](https://black-book.dariuslukas.com/) — built independently from the public feature list, sharing none of its code or copy.

**Landing page:** https://lswank.github.io/black-book/  
**Quickstart:** [`QUICKSTART.md`](QUICKSTART.md) — first 5 minutes  
**Examples:** [`EXAMPLES.md`](EXAMPLES.md) — worked walkthroughs of common chains  
**FAQ:** [`FAQ.md`](FAQ.md) — common questions  
**L-E-D guide:** [`docs/L-E-D.md`](docs/L-E-D.md) — why the calibration framework has no specialist  
**Contributing:** [`CONTRIBUTING.md`](CONTRIBUTING.md)

---

## Install

### Claude Code

```
/plugin install https://github.com/lswank/black-book
```

Or clone into your Claude Code plugin directory:

```bash
git clone https://github.com/lswank/black-book ~/.claude/plugins/black-book
```

### Claude Desktop (and other MCP clients)

There's an MCP server in [`mcp/`](mcp/) that exposes the same catalog as MCP tools — works in Claude Desktop, Cursor, Codex, and anything else that speaks MCP over stdio.

```bash
git clone https://github.com/lswank/black-book ~/code/black-book
cd ~/code/black-book/mcp && npm install
```

Then add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "black-book": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/code/black-book/mcp/server.mjs"]
    }
  }
}
```

Restart Claude Desktop. See [`mcp/README.md`](mcp/README.md) for full details and the available tools.

## What's in the box

### 9 prompt-engineering frameworks

Each framework is a slash command. Pipe in a free-form description; get back a well-structured prompt.

| Command  | Framework                            | Best for                                |
| -------- | ------------------------------------ | --------------------------------------- |
| `/tag`   | Task, Action, Goal                   | Quick ad-hoc requests                   |
| `/bab`   | Before, After, Bridge                | Cold outreach, problem/solution copy    |
| `/rtf`   | Role, Task, Format                   | Short structured outputs                |
| `/care`  | Context, Action, Result, Example     | Grounded, context-heavy work            |
| `/rise`  | Role, Input, Steps, Expectation      | Multi-step long outputs                 |
| `/aim`   | Action, Intent, Metric               | Strategy, goal-setting                  |
| `/gro`   | Goal, Reason, Output                 | Lightweight planning, briefs            |
| `/fit`   | Format, Input, Task                  | Transforms, restructuring               |
| `/led`   | Level, Expectation, Direction        | Calibrating tone and complexity         |

Each framework asks for missing inputs and emits a copy-pastable, fenced prompt.

### `/prompt-bank` — prompts on demand

Static prompt libraries are a 2023 artifact. Instead, `/prompt-bank <task>` does this:

1. Classifies the task against the specialist catalog.
2. Picks the framework the right specialist is built on.
3. Probes for missing context.
4. Emits a tailored, ready-to-send prompt.
5. Offers to hand it off to the right specialist.

Same surface area as a 1,000-prompt bank; infinite coverage; zero stale entries.

### Discovery and orchestration

Plugin commands for finding, chaining, and verifying specialists:

| Command       | Use for                                                        |
| ------------- | -------------------------------------------------------------- |
| `/list`       | Browse the catalog. Optional filter by domain or framework.    |
| `/find`       | Describe a task; get one or two specialist recommendations.    |
| `/flow`       | Run a multi-specialist workflow (launch, hire, fundraise, etc.) |
| `/doctor`     | Print a summary of what's installed; `verbose` for full breakdown. |

Pre-built flows include `launch`, `hire`, `board-update`, `enterprise-deal`, `postmortem-loop`, `okr-cycle`, `fundraise`, `content-engine`, `prd-loop`, `migration`, `qbr-prep`, `churn-recovery`, and `expansion`. See [`commands/flow.md`](commands/flow.md) for the chains.

> **Command namespacing.** All commands above are plugin-scoped. Depending on your Claude Code setup and conflicts with other plugins, you may need to invoke them as `/black-book:tag`, `/black-book:flow`, etc. The non-prefixed form works when there's no conflict.

### Specialists

Two shapes:

- **Subagents** (`agents/`) — invoked via the Agent tool. Each runs in its own context, takes inputs, returns a deliverable.
- **Skills** (`skills/`) — invoked via the Skill tool. Each loads a thinking-partner persona into your current conversation.

Each specialist declares its preferred framework in frontmatter.

#### Marketing (15)

**Subagents — produce artifacts**

| Specialist                  | Framework | Produces                                      |
| --------------------------- | --------- | --------------------------------------------- |
| `sales-email-writer`        | R-I-S-E   | Sales emails, sequences, follow-ups           |
| `cold-outreach-copywriter`  | B-A-B     | First-touch cold email and LinkedIn           |
| `landing-page-copywriter`   | C-A-R-E   | Landing pages and individual sections         |
| `ad-copywriter`             | R-T-F     | Paid ads (Meta, Google, LinkedIn, X, TikTok)  |
| `blog-post-writer`          | R-I-S-E   | Long-form blog posts                          |
| `newsletter-writer`         | G-R-O     | Newsletter editions                           |
| `social-post-writer`        | R-T-F     | Organic social (LinkedIn, X, IG, Threads)     |
| `video-script-writer`       | R-I-S-E   | Video scripts, including AI-video prompts     |
| `press-release-writer`      | F-I-T     | Press releases + journalist pitch emails      |
| `seo-meta-writer`           | F-I-T     | Title tags, meta descriptions, OG, schema     |

**Skills — consultative thinking partners**

| Specialist               | Framework | Helps you think through                  |
| ------------------------ | --------- | ---------------------------------------- |
| `cmo-advisor`            | A-I-M     | Strategic marketing decisions            |
| `growth-strategist`      | A-I-M     | Growth loops, funnels, north-star metrics|
| `positioning-coach`      | T-A-G     | Positioning, messaging, ICP, category    |
| `content-strategist`     | G-R-O     | Calendars, pillars, distribution plans   |
| `competitive-analyst`    | C-A-R-E   | Teardowns, audits, market mapping        |

#### Sales (12)

**Subagents**

| Specialist                            | Framework | Produces                                              |
| ------------------------------------- | --------- | ----------------------------------------------------- |
| `discovery-call-script-writer`        | R-I-S-E   | Discovery-call scripts with question banks            |
| `demo-deck-writer`                    | C-A-R-E   | Demo decks with slide copy and talk track             |
| `proposal-writer`                     | F-I-T     | Sales proposals with scope, pricing, terms            |
| `battlecard-writer`                   | C-A-R-E   | Competitor battlecards for live deals                 |
| `case-study-writer`                   | C-A-R-E   | Customer case studies for sales surfaces              |
| `sdr-cadence-builder`                 | R-I-S-E   | Multi-touch outbound cadences                         |
| `mutual-action-plan-writer`           | G-R-O     | MAPs for complex enterprise deals                     |
| `objection-handling-playbook-writer`  | B-A-B     | Objection-handling playbooks                          |

**Skills**

| Specialist                | Framework | Helps you think through                          |
| ------------------------- | --------- | ------------------------------------------------ |
| `sales-leader-advisor`    | A-I-M     | Sales-leadership decisions, comp, hiring         |
| `discovery-coach`         | T-A-G     | Discovery quality, qualification, follow-through |
| `pipeline-strategist`     | A-I-M     | Pipeline coverage, conversion, forecast          |
| `enterprise-sales-coach`  | R-I-S-E   | Multi-stakeholder enterprise deals               |

#### Leadership (10)

**Subagents**

| Specialist                         | Framework | Produces                                        |
| ---------------------------------- | --------- | ----------------------------------------------- |
| `vision-memo-writer`               | C-A-R-E   | Vision and strategy memos                       |
| `all-hands-talking-points-writer`  | R-I-S-E   | All-hands talking points and prepared remarks   |
| `board-update-writer`              | F-I-T     | Board / investor updates (prose section)        |
| `exec-comms-writer`                | R-T-F     | Short-form leadership comms (Slack, email)      |
| `company-values-writer`            | C-A-R-E   | Company values / operating principles           |

**Skills**

| Specialist             | Framework | Helps you think through                |
| ---------------------- | --------- | --------------------------------------- |
| `ceo-advisor`          | A-I-M     | CEO-level strategic decisions           |
| `coo-advisor`          | A-I-M     | Operating-cadence and execution         |
| `exec-coach`           | T-A-G     | One-on-one exec coaching                |
| `org-design-strategist`| A-I-M     | Org structure, reporting lines, layers  |
| `crisis-comms-coach`   | B-A-B     | Crisis and sensitive comms              |

#### HR / People (10)

**Subagents**

| Specialist                | Framework | Produces                                          |
| ------------------------- | --------- | ------------------------------------------------- |
| `job-description-writer`  | C-A-R-E   | Job descriptions / role specs                     |
| `interview-kit-builder`   | R-I-S-E   | Interview kits with rubrics                       |
| `perf-review-writer`      | R-I-S-E   | Performance reviews and growth plans              |
| `onboarding-plan-writer`  | R-I-S-E   | 30/60/90 onboarding plans                         |
| `offer-letter-writer`     | F-I-T     | Offer letters + candidate-facing summaries        |
| `people-policy-writer`    | C-A-R-E   | Handbooks, policies, leveling rubrics             |

**Skills**

| Specialist                  | Framework | Helps you think through                  |
| --------------------------- | --------- | ----------------------------------------- |
| `people-leader-advisor`     | A-I-M     | CHRO / VP People decisions                |
| `compensation-strategist`   | A-I-M     | Comp philosophy, banding, equity refresh  |
| `talent-strategist`         | A-I-M     | Hiring plans, sourcing, recruiter ops     |
| `employee-experience-coach` | T-A-G     | EX, culture, rituals, engagement          |

#### Finance (8)

**Subagents**

| Specialist                       | Framework | Produces                                      |
| -------------------------------- | --------- | --------------------------------------------- |
| `board-financial-update-writer`  | F-I-T     | Board financial section: KPIs, P&L, runway    |
| `investor-update-writer`         | G-R-O     | Monthly / quarterly investor updates          |
| `budget-narrative-writer`        | C-A-R-E   | Budget narratives, plan / reforecast prose    |
| `financial-policy-writer`        | F-I-T     | Expense, T&E, procurement, signing authority  |
| `variance-explainer-writer`      | F-I-T     | Plan-vs-actual variance writeups              |

**Skills**

| Specialist                  | Framework | Helps you think through                  |
| --------------------------- | --------- | ----------------------------------------- |
| `cfo-advisor`               | A-I-M     | CFO-level strategy: fundraise, runway, M&A|
| `fp-and-a-strategist`       | A-I-M     | Modeling, planning, forecast methodology  |
| `fundraise-narrative-coach` | B-A-B     | Pitch narrative, why-now, wedge, moat     |

#### Strategy / Ops (9)

**Subagents**

| Specialist                  | Framework | Produces                                              |
| --------------------------- | --------- | ----------------------------------------------------- |
| `okr-writer`                | R-I-S-E   | OKRs (company / function / team / individual)         |
| `postmortem-writer`         | C-A-R-E   | Incident, launch, deal-loss, project postmortems      |
| `decision-memo-writer`      | G-R-O     | Decision memos / RFCs / six-pagers                    |
| `operating-cadence-writer`  | R-I-S-E   | Operating-cadence documents                           |
| `process-doc-writer`        | F-I-T     | Runbooks, playbooks, SOPs                             |
| `specialist-builder`        | C-A-R-E   | New Black Book specialists in the house style         |

**Skills**

| Specialist                | Framework | Helps you think through                  |
| ------------------------- | --------- | ----------------------------------------- |
| `chief-of-staff-advisor`  | A-I-M     | Decision throughput, exec calendar, OKRs  |
| `operations-strategist`   | A-I-M     | Operating model, bottlenecks, throughput  |
| `strategy-coach`          | T-A-G     | Where-to-play / how-to-win, market entry  |

#### Content / Creative (6)

**Subagents**

| Specialist                 | Framework | Produces                                        |
| -------------------------- | --------- | ----------------------------------------------- |
| `book-outline-writer`      | R-I-S-E   | Book outlines for non-fiction and memoir        |
| `course-curriculum-writer` | R-I-S-E   | Outcome-driven course curricula                 |
| `speaker-bio-writer`       | F-I-T     | Speaker / panel / podcast bios in 4 lengths     |
| `podcast-show-notes-writer`| F-I-T     | Show notes, time stamps, social pull-quotes     |

**Skills**

| Specialist                  | Framework | Helps you think through                  |
| --------------------------- | --------- | ----------------------------------------- |
| `brand-voice-coach`         | T-A-G     | Voice and tone, voice audits, training    |
| `creative-director-advisor` | A-I-M     | Campaigns, rebrands, design-system bets   |

#### Product / Engineering (9)

**Subagents**

| Specialist               | Framework | Produces                                              |
| ------------------------ | --------- | ----------------------------------------------------- |
| `prd-writer`             | R-I-S-E   | Product requirements docs / feature specs             |
| `release-notes-writer`   | F-I-T     | Public + in-app release notes and changelog entries   |
| `user-story-writer`      | R-T-F     | User stories with testable acceptance criteria        |
| `api-doc-writer`         | F-I-T     | API / SDK reference, quickstarts, error tables        |
| `migration-plan-writer`  | R-I-S-E   | Database, infra, framework, vendor migration plans    |

**Skills**

| Specialist                    | Framework | Helps you think through                  |
| ----------------------------- | --------- | ----------------------------------------- |
| `product-leader-advisor`      | A-I-M     | VP Product / CPO decisions                |
| `engineering-leader-advisor`  | A-I-M     | VP Eng / CTO decisions                    |
| `prioritization-coach`        | T-A-G     | RICE / WSJF / impact-effort prioritization|
| `product-strategist`          | A-I-M     | Multi-quarter product strategy            |

#### Customer Success (7)

**Subagents**

| Specialist                       | Framework | Produces                                            |
| -------------------------------- | --------- | --------------------------------------------------- |
| `qbr-deck-writer`                | C-A-R-E   | QBR decks customers actually engage with            |
| `customer-health-summary-writer` | F-I-T     | Health summaries for renewal / risk reviews         |
| `churn-save-script-writer`       | B-A-B     | Save-call scripts with discovery and concession plans|
| `expansion-pitch-writer`         | R-I-S-E   | Upsell / cross-sell pitches and supporting collateral|
| `customer-apology-writer`        | B-A-B     | Customer-facing apology and recovery comms          |

**Skills**

| Specialist            | Framework | Helps you think through                  |
| --------------------- | --------- | ----------------------------------------- |
| `cs-leader-advisor`   | A-I-M     | CCO / VP CS strategic decisions           |
| `csm-coach`           | T-A-G     | One-on-one CSM call prep and audits       |

`L-E-D` is intentionally not the default for any specialist — it's the calibration framework, best layered on top of one of the others when the same content could be written ten ways and you need to pick one. See the [`L-E-D` guide](docs/L-E-D.md) for the full reasoning.

## By the numbers

- 9 domains
- 86 specialists (54 subagents · 32 skills)
- 9 framework slash commands + `/prompt-bank` + `/list` + `/find` + `/flow` + `/doctor`
- 8 frameworks actively in use as specialist defaults

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full contributor guide. Quick version:

```yaml
---
name: my-specialist
description: Use when ...
domain: marketing
framework: R-I-S-E
---
```

Specialists are hand-authored markdown files in `agents/` (subagents) or `skills/` (consultative skills). To scaffold a new one:

```bash
make new K=subagent D=marketing F=R-I-S-E N=demand-gen-brief-writer
# or:
node scripts/new-specialist.mjs subagent marketing R-I-S-E demand-gen-brief-writer
```

This drops a starter file with the right frontmatter and house-style body skeleton. Replace every TODO, then:

```bash
make build           # regenerate catalog.json
make strict          # validate; non-zero on errors
make check           # CI mode: verify on-disk catalog is up to date
```

You can also use the `specialist-builder` subagent to walk through the design conversation before scaffolding the file.

CI runs `--check` on every PR (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

## License

MIT. See [`LICENSE`](LICENSE).
