# Security Policy

## Scope

Black Book ships markdown files (specialists), shell-free Node scripts (build / scaffolding), and a static HTML landing page. There is no server, no database, no user-input processing path. The plugin runs inside Claude Code, which has its own security model.

That said, the surface where security questions could arise:

- **Build script** (`scripts/build-catalog.mjs`) reads frontmatter from local files. A malicious frontmatter could in theory inject content into `catalog.json`. The script doesn't execute or eval anything from the files — it just regex-parses key/value pairs.
- **Specialist content** is loaded into Claude conversations. A specialist with hostile prompt-injection content could try to redirect Claude's behavior. If you install Black Book from a fork or untrusted source, audit the markdown files first.
- **Landing page JS** (`docs/index.html`) is vanilla, no third-party scripts at runtime, no fetches outside Google Fonts (CSS only). Click-through links go to GitHub.

## Reporting

If you find a real security issue, please open a GitHub issue marked `security` or DM the maintainer ([@lswank](https://github.com/lswank)) directly. Reports are reviewed within a week.

For critical issues (anything you'd consider sensitive to disclose publicly), use a private channel before opening a public issue.

## What we won't fix

- "Specialist X gives advice that's bad for my business." That's a quality issue, not a security one — open a regular issue or PR.
- "Claude said something I disagree with when running specialist Y." That's a Claude behavior question, not a Black Book security issue. The specialist file controls the persona, not the model.
