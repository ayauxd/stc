# Case Study: STC Ventures Admin CLI

**Date:** January 26, 2026
**Status:** In Progress
**Location:** `~/ventures/`
**Alias:** `ventures`

---

## Overview

A unified command-line interface for managing all Softworks Trading Company ventures with document generation, client management, and business operations.

---

## Problem

Managing 10+ business ventures requires:
- Creating invoices, quotes, proposals, receipts
- Tracking clients across ventures
- Consistent branding per venture
- Natural language input for speed
- Offline capability when APIs fail

Previously: Manual document creation, scattered client data, no unified system.

---

## Solution

Python CLI with Rich TUI featuring:
- Document generation with venture-specific branding
- Persistent client database (JSON)
- Document tracking with status workflow
- Natural language parsing with fallback options
- Service templates for reusable packages

---

## Architecture

```
~/ventures/
├── packages/
│   ├── cli/
│   │   ├── admin.py      # Main CLI (~2000 lines)
│   │   └── nlp.py        # Natural language parser
│   └── core/
│       ├── registry.py   # VentureRegistry
│       └── documents/    # DocumentService
├── data/
│   ├── clients.json      # Persisted clients
│   ├── documents.json    # Document tracking
│   └── templates.json    # Service templates
├── ventures/             # Per-venture YAML configs
│   ├── softworks/venture.yaml
│   ├── pitch-film-studios/venture.yaml
│   └── ...
└── pyproject.toml
```

---

## Features Implemented

### Main Menu
```
CREATE DOCUMENT:
[1] Invoice    [2] Quote    [3] Proposal    [4] Receipt

MANAGE:
[5] View Documents   - List, filter, update status, payments
[6] Dashboard        - Financial overview
[7] Ventures         - Add, edit, remove companies
[8] Clients          - Add, edit, remove clients
[9] Templates        - Reusable service packages
[s] Search           - Find documents & clients

[q] Quit    [?] Help
```

### Cancel Keys
- `0`, `c`, `x`, or empty input cancels any operation
- Works consistently throughout the app
- Ctrl+C always exits gracefully

### Client Management
- Clients persist to `~/ventures/data/clients.json`
- Organized by venture_id
- Select existing or add new inline during document creation
- Full CRUD via menu option [8]

### Document Tracking
- Status workflow: draft → sent → paid/partial/overdue
- Payment recording with automatic status updates
- Duplicate documents feature
- Open PDF directly from CLI

### NLP Fallback System
When Claude API fails, user sees options:
```
1. Use Codex CLI (exit and run manually)
   $ codex

2. Use Ollama (local AI)
   $ brew services start ollama

3. Use Regex (continue now, basic parsing)
   Pattern matching for $amounts, client names, doc types
```

User chooses `[r]` to continue with regex or `[q]` to exit.

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| AI Priority | Claude first | User prefers API over local |
| Fallback | Interactive prompt | User wants control, not auto-retry |
| Persistence | JSON files | Simple, portable, no DB setup |
| Cancel keys | 0, c, x, empty | Consistent escape routes |
| Ollama auto-start | Disabled | Only needed if Claude fails |

---

## UX Patterns (TUI Heuristics)

Following `/uxd-tui` guidelines:

1. **Visibility** - Spinners, step counters, success confirmations
2. **Real World** - Domain language (Invoice, not "Doc Type 1")
3. **User Control** - Cancel keys everywhere, Ctrl+C works
4. **Consistency** - Same colors, same key meanings
5. **Error Prevention** - Validate before processing, show defaults
6. **Recognition** - Numbered menus, inline shortcuts `[q]uit`
7. **Flexibility** - Single-key shortcuts for power users
8. **Minimalist** - One concept per screen, grouped panels
9. **Error Recovery** - Specific messages with fix suggestions
10. **Help** - `[?]` for help, inline hints in dim text

---

## Regex Parser

For offline/fallback parsing without AI:

**Works:**
```
✓ "invoice for Kevin at $5000"
✓ "quote for Acme Corp $3,500"
✓ "proposal to Greenbank 10k"
```

**Limitations:**
```
✗ "bill kevin five thousand"  (no $, lowercase)
✗ "96 hours at $150/hr"       (can't multiply)
```

**Rules for regex:**
1. Use `$` sign: `$5000` not `5000 dollars`
2. Capitalize names: `Kevin` not `kevin`
3. Use "for/to": `for Kevin` or `to Acme`
4. Use "k" suffix: `5k` = $5000

---

## Files Modified This Session

| File | Changes |
|------|---------|
| `packages/cli/admin.py` | Complete rewrite with all features |
| `packages/cli/nlp.py` | Claude-first, interactive fallback |
| `data/clients.json` | Client persistence |
| `data/documents.json` | Document tracking |
| `data/templates.json` | Service templates |
| `~/.zshrc` | Added `ventures` alias |

---

## Testing

```bash
# Syntax check
python -m py_compile packages/cli/admin.py

# Test imports
python -c "from packages.cli.admin import main_menu"

# Run CLI
ventures
# or
cd ~/ventures && python -m packages.cli.admin
```

---

## Next Steps

- [ ] Test full document generation flow
- [ ] Add PDF generation integration
- [ ] Web dashboard (React)
- [ ] Sync from `launchpad/ecosystem.yaml`
- [ ] Philosophy guardrails (diagnostic-first warnings)

---

## Lessons Learned

1. **Rich markup eats brackets** - Use `escape("[a]")` for literal `[a]`
2. **Remove default prompts** - Users felt "pushed" by suggestions
3. **Interactive fallback > auto-retry** - Users want control when AI fails
4. **Persist early** - Clients should save immediately, not on exit
5. **Cancel keys everywhere** - Consistent escape routes reduce frustration

---

## References

- Plan file: `~/.claude/plans/smooth-hugging-hoare.md`
- TUI guidelines: `/uxd-tui` skill
- CLI guidelines: clig.dev
