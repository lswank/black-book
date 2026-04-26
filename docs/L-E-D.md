# L-E-D — the calibration framework

L-E-D (**Level**, **Expectation**, **Direction**) is the only framework in Black Book that no specialist defaults to. That's deliberate.

The other eight frameworks structure *the work*. L-E-D structures *how the work feels*. It's a calibration layer — best applied on top of another framework when the same content could be written ten different ways and you need to pick one.

## What it is

- **Level** — Set the complexity level. Beginner / intermediate / expert? Junior PM reading this? CTO reading this? Industry insider or outsider?
- **Expectation** — What does the user want back, concretely? List of three? Two paragraphs? A single decisive recommendation? A trade-off matrix?
- **Direction** — Style, format, tone. Plain and direct? Punchy and irreverent? Formal and grounded? Technical and dense? Conversational?

## When to reach for it

Most prompts don't need it. The framework on which the specialist is built (R-I-S-E, C-A-R-E, etc.) usually pins the work down enough.

Use L-E-D when the answer to "what does good look like?" depends entirely on stylistic choices the user has *not* made yet:

- A blog post on the same topic, for the same audience, could be written as a 600-word explainer or a 2,500-word deep-dive. → L-E-D forces the call.
- An exec comms message about a layoff could be sober and apologetic, or steady and direct. → L-E-D forces the call.
- A technical doc could be written for a junior on-call engineer or for a principal architect. → L-E-D forces the call.
- A sales email could be polite and professional, or irreverent and punchy. → L-E-D forces the call.

## How to layer it

Two patterns.

### Pattern 1 — L-E-D in front of another framework

```
**Level:** Mid-career engineer, comfortable with distributed systems, hasn't run a database migration of this scale before.
**Expectation:** A runbook they could execute in 90 minutes with a buddy.
**Direction:** Calm, sequential, no breathless "this is critical" language. Tone is "here's how we do it; you've got this."

Now apply R-I-S-E:
**Role:** ...
**Input:** ...
**Steps:** ...
**Expectation:** ...
```

L-E-D goes first because the calibration shapes everything that follows. A hostile-takeover proposal and a friendly-merger proposal use the same C-A-R-E intake — but L-E-D distinguishes them.

### Pattern 2 — `/led` standalone after a framework command

If you ran `/rise` or `/care` and the output is technically correct but stylistically wrong, run `/led` over it as a refinement pass:

```
/led make this read like a Stripe blog post — confident, plain, slight wit, no breathless launch language
```

This is the most common usage pattern. L-E-D is rarely the *first* call; it's usually the *correction* call after the substance is right but the temperature is off.

## What it isn't for

- Don't use L-E-D when the user hasn't yet decided *what* they want — they need T-A-G or R-T-F to pin down the task itself first. L-E-D layered on a vague task makes the vagueness feel polished.
- Don't use it as a wrapper for "make it sound good." That's not calibration; it's begging. Specify what *good* means.
- Don't use it for length. "Make it 800 words" belongs in the framework intake, not in L-E-D.

## Why it has its own slash command but no specialist

A specialist's framework should pin its intake. If we built a specialist around L-E-D, we'd be saying "this specialist's *primary* job is to calibrate tone." That's a niche role at best, and in practice it's a layer every specialist already does some of.

The slash command — `/led` — gets to be a focused tool: when you have a draft and the substance is right but the *feel* is wrong, run `/led` and get a calibrated rewrite. That's the use case, and it doesn't need a persona.
