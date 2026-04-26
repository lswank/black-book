# Examples

Worked walkthroughs of common Black Book usage. None of these are scripts to copy verbatim — they're patterns showing how the pieces compose.

## 1. Drafting one thing well

**Goal:** Draft a launch announcement for a new feature in a single shot.

**Input you bring:** the feature, its audience, the differentiator, and the CTA.

```
/rtf launch announcement for our new SOC 2 compliance dashboard,
written for security-team buyers at mid-market SaaS companies,
formatted as a 200-word LinkedIn post with bullet structure.
```

What happens:
1. `/rtf` parses the description into Role, Task, Format. It might ask you for the brand voice it should adopt.
2. It emits a copy-pastable prompt.
3. It recommends `social-post-writer` as the specialist.

You can either:
- Send the prompt to plain Claude.
- Or hand it to the recommended specialist directly: "Use the social-post-writer subagent with this prompt: <pasted>."

## 2. Strategy-first sequence

**Goal:** Decide whether to invest in podcast advertising, then execute if the answer is yes.

**Input you bring:** current channel mix, budget, ICP, what you've already tried.

Step 1 — strategic thinking:

> "Use the growth-strategist skill. We've been heavy on LinkedIn ads with a 14% conversion rate to demo-booked but fading volume. I have $40K extra/quarter and am considering podcast sponsorships on 3 niche shows. Walk me through whether this is the right lever."

The skill will diagnose, ask 2–3 questions, identify whether the problem is a top-of-funnel issue or a conversion-rate issue, and either bless the podcast bet or redirect you.

Step 2 — if the bet is greenlit, execute:

> "Use the ad-copywriter subagent to write 60-second podcast read scripts for the 3 shows we discussed, in the brand voice we've been using on LinkedIn."

The strategy decision came from a *skill*. The artifact came from a *subagent*. That's the hybrid pattern.

## 3. End-to-end launch via `/flow`

**Goal:** A new product launch: positioning, page, SEO, social, ads, press.

```
/flow launch
```

Black Book confirms the scope, then runs:

1. `positioning-coach` — defines the positioning. Asks for ICP, alternatives, unique attributes.
2. `landing-page-copywriter` — writes the launch page using the positioning.
3. `seo-meta-writer` — generates title tag, meta description, OG, schema for the page.
4. `social-post-writer` — produces launch posts for LinkedIn / X / IG.
5. `ad-copywriter` — produces paid-ad variants for the launch campaign.
6. `press-release-writer` — produces the press release + journalist pitch email.

You can checkpoint or redirect after any step.

## 4. A board update package via `/flow board-update`

```
/flow board-update
```

1. `cfo-advisor` — frames the period, surfaces the 1–2 themes the board needs to walk away with.
2. `board-financial-update-writer` — writes the financial section: KPIs, P&L, runway, scenarios.
3. `board-update-writer` — writes the prose update, weaving in the financials.
4. (Optional) `vision-memo-writer` — if a strategic narrative needs to land in the same meeting.

You arrive at the board meeting with a coherent package, not a five-doc Frankenstein.

## 5. Discovery call → demo → MAP → proposal (`/flow enterprise-deal`)

```
/flow enterprise-deal
```

1. `enterprise-sales-coach` — pressure-tests whether the deal is real, who the stakeholders are, what's the next gate.
2. `discovery-call-script-writer` — writes the upcoming call script tailored to the deal context.
3. `demo-deck-writer` — builds the demo deck for the technical-validation call.
4. `mutual-action-plan-writer` — produces the joint deal-progression doc.
5. `proposal-writer` — produces the formal proposal at close.

Each artifact gets richer because the previous step's output is passed forward.

## 6. Postmortem with downstream comms (`/flow postmortem-loop`)

```
/flow postmortem-loop
```

1. `crisis-comms-coach` — frames the situation, names the audiences, decides what gets said publicly vs. internally.
2. `postmortem-writer` — drafts the blameless postmortem with action items.
3. `exec-comms-writer` — writes the customer-facing comms.
4. `decision-memo-writer` — captures the decision about the larger fix that came out of the postmortem.

What started as an outage ends as a decision-memo'd improvement.

## 7. Quarterly planning (`/flow okr-cycle`)

```
/flow okr-cycle
```

1. `strategy-coach` — pressure-tests the strategic frame for the quarter.
2. `chief-of-staff-advisor` — designs the planning process: who's in the room, when, what artifacts.
3. `okr-writer` — drafts the company OKRs.
4. `all-hands-talking-points-writer` — drafts the all-hands script that lands the OKRs.

By the time you're at the all-hands, the OKRs have been pressure-tested twice.

## 8. Customer QBR prep (`/flow qbr-prep`)

```
/flow qbr-prep
```

1. `cs-leader-advisor` — frames the QBR's job (defend renewal? set up expansion? escalate? celebrate?).
2. `customer-health-summary-writer` — produces the health summary that shapes the deck.
3. `qbr-deck-writer` — builds the deck.
4. `csm-coach` — debriefs the CSM on how to run the room.

The CSM walks in prepared for the conversation, not just armed with slides.

## Patterns these examples illustrate

- **Skills first, subagents later.** Strategy and framing belong to skills. Once the strategy is clear, the artifact-producing subagents follow.
- **Output of step N becomes input to step N+1.** The chains aren't independent invocations; they're sequential.
- **You're allowed to redirect.** A `/flow` can be paused after any step and rerouted.
- **Specialists hand off to specialists.** Read any specialist's "Things you don't do" section — it tells you which other specialists to invoke when work spills outside their scope.
