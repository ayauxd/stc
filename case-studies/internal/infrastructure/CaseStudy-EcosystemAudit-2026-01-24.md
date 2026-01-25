# Case Study: Ecosystem Audit & Project Hierarchy Cleanup

**Date:** January 24, 2026
**Project:** STC Ecosystem Organization
**Business Unit:** Internal / Infrastructure
**Status:** ✅ COMPLETE

---

## Executive Summary

Comprehensive audit and reorganization of Frederick Aya's 73+ project directories into a structured 10-business-unit hierarchy under Softworks Trading Company. Created the `/ecosystem-audit` skill, updated `ecosystem.yaml` as single source of truth, and established persistent context for future Claude Code sessions.

---

## The Problem

### Initial State
- **73 directories** in home folder
- Only **21 projects** documented in `ecosystem.yaml`
- **52 projects missing** from any documentation
- No clear business unit hierarchy
- Client work scattered across standalone repos
- Several business ventures not recognized as separate units

### Requirements
1. Identify ALL projects in the filesystem
2. Classify each by business unit
3. Update `ecosystem.yaml` as single source of truth
4. Consolidate redundant projects
5. Document client relationships under Softworks
6. Create repeatable audit skill for future maintenance

### Challenge
- Pattern-matching bias caused me to miss clearly labeled projects (e.g., `encore`)
- `softworks-n8n` referenced in docs but actual folder was `softworks-clients`
- Some projects were clients (VTF, Assured Integrity) incorrectly assumed to be standalone
- New business units (CBAH, Owlchive) had no project folders yet

---

## Solution

### Phase 1: Discovery & Skill Creation

Created `/ecosystem-audit` skill (`launchpad/.claude/skills/ecosystem-audit/SKILL.md`) with:
- Full directory scan (not just git repos)
- Business unit pattern matching
- `ecosystem.yaml` update capability
- Consolidation analysis
- Archive recommendations
- **Verification protocol** (learned from missing encore)

### Phase 2: Business Unit Classification

Identified **10 business units** under STC:

| # | Unit | Domain | Status |
|---|------|--------|--------|
| 1 | Softworks | sftwrks.com | Active |
| 2 | Pitch Film Studios | pitchfilmstudio.com | Active |
| 3 | PrePurchasePro | prepurchasepro.com | Dormant |
| 4 | IOUAlert | ioualert.com | Dormant |
| 5 | SlopGPT | slopgpt.com | Active |
| 6 | Uncle Encore | uncleencore.com | Active |
| 7 | Cracked Prompts | crackedprompts.com | Active |
| 8 | CBAH | charitybegins.org | Planned |
| 9 | Owlchive | owlchive.com | Planned |
| 10 | Infrastructure | (internal) | Active |

### Phase 3: Client Work Documentation

Documented Softworks clients properly:

| Client | Location | Notes |
|--------|----------|-------|
| Iroko Health | `softworks-clients/clients/iroko` | AI integration |
| Niger State Planning Commission | `softworks-clients/clients/nspc` | ChatGPT discovery |
| Assured Integrity | `softworks-clients/clients/assured-integrity` | Engineering firm |
| Greenbank Development | `softworks-clients/clients/greenbank-development` | - |
| VTF (View the Future) | `vtf-brand-assets` | Land trust branding |

### Phase 4: New Project Creation

- Created `~/cbah/` with full CLAUDE.md based on user-provided 30-page blueprint
- Documented fiscal sponsorship model (Model C), tech stack (WhatsApp + Notion), 90-day pilot plan

### Phase 5: Persistent Context

Created `~/.claude/FREDERICK_CONTEXT.md` with:
- Core philosophy (systems over vibes, constraint-first, etc.)
- Problem-solving process
- Language patterns
- Red flags to avoid
- Project portfolio summary

---

## Key Files Updated

| File | Changes |
|------|---------|
| `~/launchpad/ecosystem.yaml` | Added 6 new business units, 5 clients, fixed repo names |
| `~/.claude/CLAUDE.md` | Updated business units, added mistake log |
| `~/stc/CLAUDE.md` | Added clients table, all business units |
| `~/launchpad/CLAUDE.md` | Fixed softworks-n8n → softworks-clients |
| `~/stc/ECOSYSTEM_AUDIT_2026-01-24.md` | Full audit report |
| `~/.claude/FREDERICK_CONTEXT.md` | NEW - Persistent working context |
| `~/cbah/CLAUDE.md` | NEW - CBAH project documentation |
| `~/launchpad/.claude/skills/ecosystem-audit/SKILL.md` | NEW - Audit skill |

---

## Key Insights

### What Worked
- **User corrections as learning** - When user pointed out encore was missed, added verification protocol
- **Constraint-first approach** - Started with "what must exist" (business units), then classified projects
- **Stepwise execution** - One business unit at a time, verify, proceed
- **Persistent documentation** - Every change reflected in ecosystem.yaml

### What We Learned

1. **Verify before claiming "not found"**
   - Always run `ls -la ~/[project]` before marking unknown
   - Added to skill as mandatory verification protocol

2. **Search for actual folder names**
   - `softworks-n8n` was referenced but `softworks-clients` was reality
   - Always verify path exists before documenting

3. **Clients are NOT separate business units**
   - VTF, Assured Integrity, NSPC are Softworks CLIENTS
   - Standalone repos ≠ separate ventures

4. **Context files are invaluable**
   - User-provided working context (philosophy, patterns) dramatically improves alignment
   - Save to persistent location for all sessions

---

## Donovan Protocol Application

- **Problem:** 73+ projects, no clear hierarchy, missing documentation
- **Rabbit hole avoided:** Could have manually inspected each project one-by-one
- **Donovan approach:** Create a skill/system for repeatable audits
- **Maximum leverage:** Update `ecosystem.yaml` as single source of truth, let `/dashboard` render the hierarchy

---

## Metrics

| Metric | Before | After |
|--------|--------|-------|
| Projects in ecosystem.yaml | 21 | 35+ |
| Business units documented | 3 | 10 |
| Clients documented | 0 | 5 |
| Audit skill | None | `/ecosystem-audit` |
| Persistent context | None | `FREDERICK_CONTEXT.md` |

---

## Follow-Up Actions

1. [ ] Consolidate `assured-integrity-v1/v2` into `softworks-clients/clients/`
2. [ ] Consolidate `vtf-marketing` with `vtf-brand-assets`
3. [ ] Archive remaining idle projects (30+ candidates)
4. [ ] Review HomeOffice folder
5. [ ] Create Owlchive project when ready to build

---

*Generated: January 24, 2026*
*Session Duration: ~2 hours*
*Tokens: ~50k context*
