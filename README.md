# Black Book

A Claude Code plugin: a library of marketing AI specialists, the prompt-engineering frameworks they're built on, and a generator that produces tailored prompts on demand.

A white-room reimplementation of [the "Black Book" concept](https://black-book.dariuslukas.com/) — built independently from the public feature list, sharing none of its code or copy.

**Landing page:** https://lswank.github.io/black-book/

---

## Install

```
/plugin install https://github.com/lswank/black-book
```

Or clone into your Claude Code plugin directory:

```bash
git clone https://github.com/lswank/black-book ~/.claude/plugins/black-book
```

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

### 15 marketing specialists (v1)

#### Subagents — produce artifacts

Invoked via the Agent tool. Each runs in its own context, takes inputs, returns a deliverable.

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

#### Skills — consultative thinking partners

Invoked via the Skill tool. Each loads a persona into your current conversation.

| Specialist               | Framework | Helps you think through                  |
| ------------------------ | --------- | ---------------------------------------- |
| `cmo-advisor`            | A-I-M     | Strategic marketing decisions            |
| `growth-strategist`      | A-I-M     | Growth loops, funnels, north-star metrics|
| `positioning-coach`      | T-A-G     | Positioning, messaging, ICP, category    |
| `content-strategist`     | G-R-O     | Calendars, pillars, distribution plans   |
| `competitive-analyst`    | C-A-R-E   | Teardowns, audits, market mapping        |

`L-E-D` is intentionally not the default for any specialist — it's the calibration framework, best layered on top of one of the others when the same content could be written ten ways and you need to pick one.

## Roadmap

v1 ships the marketing domain. Planned domains:

- **Sales** — discovery scripts, demo decks, objection-handling, win/loss notes
- **Leadership** — vision memos, all-hands talking points, exec comms
- **HR / People** — job descriptions, interview kits, perf-review templates
- **Finance** — board memos, runway models, investor updates
- **Strategy / Ops** — OKRs, postmortems, decision memos
- **Content / Creative** — book outlines, course curricula, speaker bios

Each domain ships when v1 has held up under actual use. We're not chasing a count.

## Contributing

Specialists are hand-authored markdown files with frontmatter:

```yaml
---
name: my-specialist
description: Use when ...
domain: marketing
framework: R-I-S-E
---
```

After editing or adding files in `agents/` or `skills/`:

```bash
node scripts/build-catalog.mjs
```

That regenerates `catalog.json`, which `/prompt-bank` reads to make recommendations.

## License

MIT. See `LICENSE`.
