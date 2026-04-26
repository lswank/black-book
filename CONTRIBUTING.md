# Contributing

Thanks for considering an addition. Black Book is a small plugin with a tight house style — fitting in is easier than starting fresh.

## What belongs here

- **Specialists** that produce *one* concrete kind of artifact (subagent) or coach *one* concrete kind of conversation (skill).
- **Frameworks** beyond the current nine — but only if they're broadly applicable across domains. Domain-specific framework variants don't need their own slash command.
- **Discovery / orchestration commands** like `/list`, `/find`, `/flow`.

## What doesn't belong here

- Static prompt libraries. We replaced those with `/prompt-bank` on purpose.
- Specialists that overlap heavily with existing ones. If a new specialist's description could plausibly route work to an existing one, you've found duplication — refine the existing one instead.
- Specialists tuned to a single company, brand, or product. Black Book is a general-purpose plugin.
- Long-form essays or thought-leadership disguised as system prompts.

## Adding a specialist

1. Pick a kind:
   - **Subagent** if it produces an artifact (a sales email, a JD, a postmortem). Goes in `agents/`.
   - **Skill** if it loads a thinking-partner persona (a CMO advisor, a discovery coach). Goes in `skills/`.

2. Pick a framework. Read the [`README.md`](README.md) framework table; pick the one that best matches the *intake shape* of your specialist (what inputs it needs to do good work). Don't invent new frameworks unless you've already convinced yourself the existing nine don't fit.

3. Match the file name to the frontmatter `name`. Use `kebab-case`. The file `agents/foo-bar.md` must have `name: foo-bar`.

4. Use this frontmatter shape:

```yaml
---
name: my-specialist
description: Use when ... — a precise enough sentence that Claude can match it from a vague user request. Aim for ≥30 chars.
domain: marketing       # one of: marketing, sales, leadership, hr, finance, strategy-ops, content-creative
framework: R-I-S-E      # one of the 9 frameworks
tools: Read, Write      # optional, subagents only
---
```

5. Write the body. Pattern for subagents:

```
You are a <role>. <One sentence on what's distinctive about how you work.>

# What you produce
<list of deliverables>

# How you work
Use the <FRAMEWORK> framework as your intake:
<each framework letter mapped to a concrete intake question>

# Style rules
<3–8 specific, contestable rules. "Avoid <list>; cut on sight." is in the house style.>

# When you're done
<output format + a one-line meta-note like "give 2 alternative openings" or "list 3 ways this fails">
```

Pattern for skills:

```
# <Title>

You are now wearing a <persona> hat. <One sentence on what makes this persona distinctive.>

## How you operate

Use the <FRAMEWORK> framework to anchor the conversation: <one line per framework letter>.

## Mental models you reach for
<3–5 specific frames>

## What good looks like / What good doesn't look like
<contestable, opinionated lines>

## Things you don't do
<explicit handoffs to other Black Book specialists>
```

6. Regenerate the catalog:

```bash
node scripts/build-catalog.mjs
```

7. Validate:

```bash
node scripts/build-catalog.mjs --strict
```

8. Update `README.md` and `docs/index.html` to include the new specialist in the right domain table.

## House style

- **Specific over generic.** "Reduce p95 latency by 40% in year one" beats "responsible for performance."
- **Contestable rules.** A style rule someone could disagree with is a real rule. "We are concise and clear" is not.
- **Cut-on-sight lists.** Most specialists have a list of clichés to avoid. Add to it; don't be polite.
- **Hand-offs over hoarding.** Specialists should explicitly recommend other Black Book specialists when work crosses their boundary.
- **No "synergies," "leverage," "world-class," "best-in-class," "rocketship."** Cut on sight.

## Tests

There aren't unit tests, but `scripts/build-catalog.mjs --check` runs in CI. Make sure your branch passes it.

## License

By contributing, you agree your contributions are licensed under the MIT License.
