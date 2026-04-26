# FAQ

## What is Black Book?

A Claude Code plugin that ships 86 role-built business specialists across 9 domains, the 9 prompt-engineering frameworks they're built on, and a few orchestration commands to chain them together.

It's not a prompt library. It's not a course. It's a working set of agents and skills you install once and use every day.

## How is this different from the Darius Lukas "Black Book"?

This is a [white-room reimplementation](https://en.wikipedia.org/wiki/Clean-room_design) of the *concept* — built independently from the public feature list, sharing none of its code or copy. Several differences in shape:

- **Native to Claude Code.** Subagents, skills, and slash commands. No copy-paste-into-the-chat workflow.
- **No static prompt library.** Replaced with `/prompt-bank`, which generates a tailored prompt on demand.
- **9 frameworks as first-class commands.** `/tag`, `/bab`, `/rtf`, `/care`, `/rise`, `/aim`, `/gro`, `/fit`, `/led` — each emits a structured prompt and recommends a specialist.
- **Specialists declare their framework.** Every specialist's frontmatter names the framework it's built on; the plugin can recommend specialists *and* the framework that fits.
- **Orchestration.** `/flow` chains multiple specialists for end-to-end work (launch, hire, board update, enterprise deal, etc.).
- **Free, MIT-licensed, open source.** No paid tier.

If you bought Darius's product and like it, this is not a replacement claim — it's an adjacent take aimed at Claude-Code-native workflows.

## Can I use this commercially?

Yes. MIT license. No attribution required, but appreciated.

## How do I install it?

```
/plugin install https://github.com/lswank/black-book
```

Or clone into `~/.claude/plugins/black-book/`. See [`QUICKSTART.md`](QUICKSTART.md) for the first 5 minutes after install.

## How do I know if it installed correctly?

Run `/doctor`. It prints a summary of what's installed (counts, domains, frameworks, commands).

## Why this list of frameworks (T-A-G, B-A-B, R-T-F, etc.)?

These are the nine that show up across most "Claude cheat sheets" and prompt-engineering guides. They're not academic; they're working frameworks people use. We treat them as the surface area to standardize on rather than inventing our own.

## Why don't any specialists default to L-E-D?

L-E-D (Level, Expectation, Direction) is a *calibration* framework — it shapes how content feels, not what it is. The other eight pin the work down enough that L-E-D is best applied as a *layer* on top of an existing draft, not as a primary intake. See [`docs/L-E-D.md`](docs/L-E-D.md) for the full reasoning.

## When should I use a subagent vs. a skill?

- **Subagents** when you want an artifact back. They run in their own context and return a deliverable (an email, a doc, a deck).
- **Skills** when you want a thinking partner inside the current chat. They load a persona that helps you reason — no artifact unless you ask for one.

The `description` field on each specialist tells you which one fits.

## How do I add a specialist?

Three options, easiest to hardest:

1. Use the `specialist-builder` subagent: it walks you through the design conversation and outputs a PR-ready markdown file.
2. Use the scaffolding script: `make new K=subagent D=marketing F=R-I-S-E N=my-specialist` (or via `node scripts/new-specialist.mjs ...`). Replace the TODOs.
3. Hand-write a markdown file in `agents/` or `skills/`. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the house pattern.

After adding, run `make build && make strict` to regenerate `catalog.json` and validate.

## Can I add a whole new domain?

Yes, but raise the bar. New domains require:

1. At least 3–5 specialists (otherwise it's a hobby, not a domain).
2. The domain added to `VALID_DOMAINS` in `scripts/build-catalog.mjs`.
3. Domain sections added to `README.md` and `docs/index.html`.
4. A clear answer to "why isn't this a sub-section of an existing domain?"

Open an issue with the proposed domain and the first 3 specialists before writing the code.

## Will this work on Claude Desktop?

Yes — via the MCP server in [`mcp/`](mcp/README.md). Claude Desktop natively supports MCP servers, and the Black Book MCP server exposes the same catalog as tools (`list_specialists`, `get_specialist`, `find_specialist`, `prompt_bank`, `flow`, etc.).

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "black-book": {
      "command": "node",
      "args": ["/path/to/black-book/mcp/server.mjs"]
    }
  }
}
```

Restart Claude Desktop and the tools become available. See [`mcp/README.md`](mcp/README.md) for the full setup.

The Claude Code plugin (subagents + skills + slash commands) doesn't transplant directly because Desktop has no plugin surface — but the MCP server gets you the same specialists and frameworks via persona-takeover or prompt-emit.

## Will my catalog drift if I edit specialists?

Yes — that's expected. After editing, run `make build` to regenerate `catalog.json`, or `make check` to verify whether anything's drifted. CI runs `make check` on every PR and will fail if the on-disk catalog doesn't match the source files.

## Why no scoring or rating system on specialists?

Two reasons:

1. Quality of an LLM-driven specialist is highly task-dependent — a 5-star rating without context is misleading.
2. Adding scores incentivizes vanity contributions. The bar for "this specialist exists" should be "this fills a real gap" — not "I want a 5-star badge."

If a specialist is bad, fix it, replace it, or open an issue. The catalog isn't precious; it's a working tool.

## How is the plugin maintained?

Personal time, mostly nights and weekends. Issues and PRs reviewed in batches. Egregious bugs fixed quickly; feature requests considered and accepted or declined plainly.

## Is there a roadmap?

Some directions on the table — none committed:

- Per-specialist detail pages on the landing page (auto-generated from catalog + markdown).
- More flows in `/flow` based on real-world usage patterns.
- Integration tests that actually invoke each specialist against fixtures and check output shape.
- An optional Claude Desktop adapter that exports specialists in a desktop-installable form.

If any of these matter to you, open an issue and say so.

## Who built this?

[@lswank](https://github.com/lswank), with [Claude Opus 4.7 (1M context)](https://www.anthropic.com/claude) as a paired engineer for the bulk of the writing.
