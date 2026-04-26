## What's in this PR

<!-- A sentence or two. -->

## Type of change

- [ ] New specialist
- [ ] Update to an existing specialist
- [ ] New command (`/list`, `/find`, `/flow`-style)
- [ ] Build / tooling
- [ ] Docs / site
- [ ] Other

## If adding or modifying a specialist

- [ ] Frontmatter has `name`, `description`, `domain`, `framework`
- [ ] Filename matches the frontmatter `name`
- [ ] Description is precise enough to match a vague user request (≥30 chars)
- [ ] Body follows the house pattern from [`CONTRIBUTING.md`](../CONTRIBUTING.md)
- [ ] Specialist explicitly hands off to other specialists where work crosses its boundary
- [ ] No "synergies," "world-class," "leverage," "rocketship," or other lifeless phrasing

## Verification

- [ ] `node scripts/build-catalog.mjs --strict` passes locally
- [ ] `catalog.json` has been regenerated and committed
- [ ] README and (if applicable) `docs/index.html` updated to mention the new specialist

## Anything else
