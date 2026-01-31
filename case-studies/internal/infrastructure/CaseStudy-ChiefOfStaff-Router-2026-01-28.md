# Case Study: Chief of Staff Router System

**Date:** January 2026
**Project:** Chief of Staff - Information Routing System
**Business Unit:** Internal (Infrastructure)
**Status:** ✅ COMPLETE

---

## Executive Summary

Built a systematic capture-and-route system for Frederick's business ecosystem. Information from calls, meetings, and brainstorms now flows through a single `/capture` command to the correct client/project folder, with a daily journal as the audit trail.

The system is YAML-configured, offline-compatible (works with Ollama/Alfred), and requires zero code changes to add new routing rules.

---

## The Problem

### Requirements
- Capture information immediately after calls/meetings
- Route automatically to correct client or project folder
- Maintain searchable daily journal
- Work offline (Ollama fallback)
- Support voice input (via Alfred) or text
- No manual filing decisions for common patterns

### Challenge
Information was scattered:
- Client notes in various repo locations
- No consistent capture workflow
- Hard to find "what did I discuss with Iroko last week?"
- Duplicate or lost context between sessions

---

## Solution

### Architecture

```
/capture "Just finished call with Iroko about pilot timeline..."
    │
    ├── 1. Parse Entry (type, entities, intent, priority)
    │
    ├── 2. Load routing_rules.yaml
    │
    ├── 3. Match patterns → destination
    │       └── "iroko" → ~/softworks-clients/clients/iroko/notes/
    │
    ├── 4. Create timestamped file with YAML frontmatter
    │
    ├── 5. Append to daily journal (01_journal/YYYY/YYYY-MM-DD.md)
    │
    └── 6. Confirm to user with path
```

### Key Files Created

| File | Purpose |
|------|---------|
| `routing_rules.yaml` | Pattern → destination mappings |
| `taxonomy.yaml` | Entry types (call-debrief, meeting, brainstorm, etc.) |
| `/capture` skill | Main entry point |
| `/journal` skill | View/search entries |
| `00_inbox/` | Low-confidence entries for manual review |
| `01_journal/` | Daily audit trail |

### Routing Rules Structure

```yaml
rules:
  clients:
    - name: iroko
      patterns: ["iroko", "iroko health", "dr. adamu", "isi"]
      path: ~/softworks-clients/clients/iroko/
      subfolder: notes/

    - name: nspc
      patterns: ["nspc", "niger state", "planning commission"]
      path: ~/softworks-clients/clients/nspc/
      subfolder: notes/
```

### Confidence-Based Routing

- **High confidence (≥0.7)**: Auto-route to destination + copy to inbox as backup
- **Low confidence (<0.7)**: Stay in inbox, ask user to confirm

---

## Key Insights

### What Worked
- **YAML over code**: Adding a new client = 3 lines in YAML, no deployment
- **Files as memory**: Everything persists in git-trackable markdown
- **Journal as audit trail**: Easy to answer "what happened this week?"
- **Offline-first**: Works with local Ollama models when internet unavailable

### What We Learned
- **Pattern specificity matters**: "luxury" alone could match multiple clients; use business-specific terms
- **Inbox is safety net**: Low-confidence routing catches ambiguous entries
- **Daily journal is the glue**: Even if file routing changes, journal provides searchable history

### Donovan Protocol Application
- **Problem:** Information scattered, hard to find past conversations
- **Rabbit hole avoided:** Building complex database or CRM
- **Donovan approach:** "How do personal knowledge management systems work?"
- **Maximum leverage:** YAML + markdown + shell commands (no infrastructure)

---

## Files Created

```
launchpad/chief-of-staff/
├── 00_inbox/                  # Unrouted or low-confidence entries
├── 01_journal/
│   └── 2026/
│       └── 2026-01-28.md      # Daily entries
├── 02_index/
│   ├── routing_rules.yaml     # Pattern → destination
│   └── taxonomy.yaml          # Entry types and icons
└── README.md

launchpad/.claude/skills/
├── capture/skill.md           # Main capture skill
├── journal/skill.md           # View/search skill
└── log-usage/skill.md         # Usage tracking
```

---

## Usage

### Capture Entry
```
/capture Just finished call with Iroko about pilot timeline, budget capped at $15k
```

### View Today's Journal
```
/journal
```

### Search Past Entries
```
/journal search iroko --since 2026-01-01
```

---

## Metrics

| Metric | Value |
|--------|-------|
| Time to add new client | ~30 seconds (3 lines YAML) |
| Routing accuracy | ~85% high-confidence |
| Files created | 8 |
| External dependencies | 0 |

---

*Case study by Softworks Trading Company*
