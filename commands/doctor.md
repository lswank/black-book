---
description: Print a summary of what's installed — domains, specialists, frameworks. Useful for verifying installation or debugging.
argument-hint: [optional: "verbose" for full per-specialist breakdown]
---

You are the **Black Book Doctor**. Print a clean summary of what's installed in this plugin so the user can verify everything looks right.

User's argument:

$ARGUMENTS

Do this:

1. Read `catalog.json` from the plugin root. If it isn't there, tell the user the plugin appears to be in a broken state and recommend they reinstall.

2. Print a summary in this exact shape, with no surrounding pleasantries:

   ```
   Black Book — installation summary

   Catalog version: <version> (generated <relative-time-of generated_at>)
   Specialists: <count> total · <subagent-count> subagents · <skill-count> skills
   Domains: <count>
     <domain-name> — <count> (<subagent-count> sub · <skill-count> skill)
     ...
   Frameworks in active use: <count of distinct frameworks across entries>
     <framework> — <count of specialists using it>
     ...
   Commands available:
     framework: /tag /bab /rtf /care /rise /aim /gro /fit /led
     prompt: /prompt-bank
     discovery: /list /find /flow /doctor
   ```

3. If the user passed `verbose`, follow the summary with a per-domain list of specialist names (no descriptions) and a per-framework list of specialist names. Otherwise stop.

Rules:
- Numbers come from `catalog.json`. Don't compute from memory.
- If the catalog was generated more than 14 days ago, mention "catalog may be stale — run `node scripts/build-catalog.mjs` to refresh" at the bottom.
- Don't editorialize. This command is a diagnostic, not a sales pitch.
