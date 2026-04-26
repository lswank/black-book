# Quickstart

The first 5 minutes after install. Skim this once; you're done after that.

Two install paths — pick one:

## Path 1 — Claude Desktop (one click)

1. [Download `black-book.mcpb`](https://black-book-host.vercel.app/black-book.mcpb) (~2.6 KB)
2. Double-click the file
3. Claude Desktop opens with an install prompt — click **Install**
4. Try it:

> "Use the black-book MCP server. Find me a specialist for writing a launch announcement, then load their full prompt."

The MCP tools (`list_specialists`, `find_specialist`, `get_specialist`, `prompt_bank`, `flow`, …) are now available.

Prefer terminal? `curl -fsSL https://black-book-host.vercel.app/install | bash` (macOS/Linux) or `iwr -useb https://black-book-host.vercel.app/install.ps1 | iex` (Windows) does the same thing without opening a config file.

Free tier: 30 requests / IP / hour. For unlimited use, [self-host](https://github.com/lswank/black-book/blob/main/mcp/README.md).

## Path 2 — Claude Code (full plugin)

```
/plugin install https://github.com/lswank/black-book
```

You get subagents, skills, slash commands, `/flow`, `/prompt-bank`, `/list`, `/find`, `/doctor`.

If the plugin landed correctly, you should see a slate of new commands prefixed with `/black-book:` (or just `/<command>` if there are no name collisions in your environment).

## Try one of the framework commands

The fastest way to feel the plugin work is the framework commands. Each takes a free-form description and emits a structured prompt.

```
/tag launch a 7-day onboarding email sequence for free-trial users of our analytics product
```

Black Book will parse your description, fill in `Task`, `Action`, and `Goal`, and ask you for whatever's still missing. Once it has enough, it returns a copy-pastable prompt and recommends a specialist to run it through.

## Try `/prompt-bank`

For end-to-end "I have a task, give me a prompt" — use `/prompt-bank`. It picks the right specialist *and* the right framework, then probes for any missing context.

```
/prompt-bank linkedin post for a CTO whose team just shipped a multi-region failover
```

It will pick `social-post-writer`, apply `R-T-F`, ask you for the target audience and CTA, and emit the finished prompt.

## Try a specialist directly

If you know what you want, invoke a specialist directly via the Agent tool (for subagents) or the Skill tool (for skills). Most editors auto-suggest these by name.

Example — invoke the `sales-email-writer` subagent:

> "Use the sales-email-writer subagent to draft a 3-email re-engagement sequence for our churned mid-market customers. ICP: heads of RevOps at 500–2000 person SaaS companies. Trigger: we've shipped a major v2 release that addresses the top 2 reasons they churned."

Example — invoke the `cmo-advisor` skill:

> "Use the cmo-advisor skill. I'm trying to decide whether to hire a Director of Demand Gen or invest the same budget into a partner program."

## Try a flow

For end-to-end work spanning multiple specialists, use `/flow`. There are pre-built scenarios (`launch`, `hire`, `board-update`, `enterprise-deal`, `postmortem-loop`, `okr-cycle`, `fundraise`, `content-engine`, `prd-loop`, `migration`, `qbr-prep`, `churn-recovery`, `expansion`).

```
/flow launch
```

Black Book will outline the chain, ask you to confirm scope, and then run each specialist in order, passing context forward.

## When you're stuck

- `/list` — browse the catalog. Filter by domain (`/list marketing`) or framework (`/list rise`).
- `/find` — describe the task; get a recommendation.

## Where to go next

- [`README.md`](README.md) — full table of specialists, frameworks, and commands
- [`docs/L-E-D.md`](docs/L-E-D.md) — why the calibration framework deliberately has no specialist
- [`EXAMPLES.md`](EXAMPLES.md) — worked walkthroughs of common chains
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to add a specialist
