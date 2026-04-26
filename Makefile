.PHONY: help build check strict new

help:
	@echo "Black Book — common tasks"
	@echo ""
	@echo "  make build                          Regenerate catalog.json"
	@echo "  make check                          Verify catalog is up to date (CI mode)"
	@echo "  make strict                         Build catalog with strict validation"
	@echo "  make new K=<kind> D=<domain> F=<framework> N=<name>"
	@echo "                                       Scaffold a new specialist file."
	@echo "                                       Example:"
	@echo "                                         make new K=subagent D=marketing F=R-I-S-E N=demand-gen-brief-writer"

build:
	node scripts/build-catalog.mjs

check:
	node scripts/build-catalog.mjs --check

strict:
	node scripts/build-catalog.mjs --strict

new:
	@if [ -z "$(K)" ] || [ -z "$(D)" ] || [ -z "$(F)" ] || [ -z "$(N)" ]; then \
		echo "Usage: make new K=<kind> D=<domain> F=<framework> N=<name>"; \
		exit 1; \
	fi
	node scripts/new-specialist.mjs $(K) $(D) $(F) $(N)
