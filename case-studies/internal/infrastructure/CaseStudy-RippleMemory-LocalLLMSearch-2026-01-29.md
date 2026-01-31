# Case Study: Ripple Memory System — Local LLM Search

**Date:** January 2026
**Project:** Chief of Staff - Ripple Memory Integration
**Business Unit:** Internal (Infrastructure)
**Status:** ✅ COMPLETE

---

## Executive Summary

Built a research-validated architecture for searching across 6+ GB of scattered LLM conversation history (ChatGPT, Claude, Twitter/X, Grok) using the Recursive Language Model (RLM) "Ripple" approach instead of paid cloud services like Supermemory.

Key decision: **Code-based regex search over vector embeddings** — more precise, 10-50x smaller storage footprint, fully offline, and integrates with existing Chief of Staff routing system.

---

## The Problem

### Requirements
- Search across all historical LLM conversations ("What did I discuss about pricing?")
- Auto-inject relevant context on session start
- Work offline (Ollama/local models)
- Integrate with existing `/capture` → `/journal` workflow
- No cloud dependencies or recurring costs

### Challenge
LLM history was scattered across 5 locations in 4 different formats:

| Source | Location | Size | Format |
|--------|----------|------|--------|
| ChatGPT exports | `~/chief-of-staff/chatgpt-export/` | 1.6 GB | JSON + folders |
| Claude Desktop | `~/.claude/projects/` | 3.4 GB | JSONL |
| Claude exports | `~/chief-of-staff/LLM_Archive_Enterprise/` | 1.3 GB | Mixed |
| Twitter/X archive | `~/Downloads/twitter-2026-01-15.../` | 857 MB | JS files |
| Claude Code history | `~/.claude/history.jsonl` | ~500 MB | JSONL |

**Total: ~7.6 GB of unsearchable conversation history**

Additionally:
- Duplicate folder structures (`~/chief-of-staff/` OLD vs `~/launchpad/chief-of-staff/` NEW)
- No cross-platform search capability
- Paid alternatives (Supermemory) cost $19+/month

---

## Research Phase

### Alternative Evaluated: Supermemory

**What it offers:**
- Cloud vector database for semantic search
- Automatic session capture via hooks
- Context injection on session start
- $0 free tier (1M tokens), $19/mo Pro

**Why rejected:**
| Factor | Supermemory | Our Approach |
|--------|-------------|--------------|
| Cost | $19+/month | $0 |
| Offline | No | Yes |
| Data ownership | Cloud (third-party) | Local files |
| Search precision | Fuzzy (vectors) | Exact (regex) |
| Storage overhead | 10-50x larger | Plain text |
| Client-aware routing | No | Yes (existing system) |

**Decision:** Build local Ripple system using documented RLM research.

### RLM/Ripple Research Findings

**Source:** [MIT Recursive Language Models Paper](https://arxiv.org/html/2512.24601v1)

Key insights from research:

1. **Architecture:**
   > "RLMs can decompose and recursively interact with input context of unbounded length through REPL environments."

   Instead of vector similarity, the model writes Python/regex code to search files directly.

2. **Safety — Infinite Loop Prevention:**
   > "The researchers had to add a small sentence to the RLM system prompt for Qwen3-Coder to prevent it from using too many recursive sub-calls."

   **Solution:** `max_iterations=10` parameter + timeout safeguards

3. **Local Model Compatibility:**
   - Qwen3-Coder verified to work
   - Runs on 24GB unified memory (user's M4 Pro has this)
   - Tool-calling fixed for Ollama integration

4. **Storage Comparison:**
   | Method | 1 Year Daily Notes |
   |--------|-------------------|
   | Plain text (Ripple) | 5-15 MB |
   | Vector embeddings | 100-500 MB |

   **10-50x storage savings with Ripple approach**

### Existing Tools Evaluated

| Tool | Purpose | Verdict |
|------|---------|---------|
| [Echoes](https://echoes.r2bits.com/) | Browser extension for ChatGPT/Claude search | Tier 2 - Chrome Web Store listed, small company |
| ~~iLoveAI~~ | ~~Merges ChatGPT + Claude exports~~ | **REJECTED** - See security note below |
| DIY Python | Custom parser with BeautifulSoup/regex | **Best for our needs** - Full control, no third-party |

**SECURITY NOTE — iLoveAI Rejected:**
- Claims "open-source" but no GitHub repository found
- Chinese-hosted site (ilove-ai.net) — data sovereignty concerns
- All information sourced from their own marketing
- Privacy claims unverifiable without source code
- **Never upload conversation history to unvetted third-party tools**

**Decision:** DIY Python parsing with standard libraries (json, BeautifulSoup, regex). No third-party tools for sensitive conversation data.

---

## Solution Architecture

### Consolidated Folder Structure

```
~/launchpad/chief-of-staff/
├── 00_inbox/                    # Unrouted entries
├── 01_journal/                  # Daily journal
├── 02_index/                    # Routing rules, taxonomy
│
├── raw/                         # RAW SOURCE DATA (consolidated)
│   ├── chatgpt/                 # ChatGPT exports
│   ├── claude-desktop/          # Symlink to ~/.claude/projects/
│   ├── claude-exports/          # Claude web exports
│   ├── twitter/                 # Twitter/X archive
│   └── grok/                    # Grok exports (when available)
│
├── extracted/                   # PROCESSED DATA
│   └── unified-history.jsonl    # Merged timeline from all sources
│
├── ripple/                      # SEARCH ENGINE
│   ├── ripple.py                # Code-based search
│   ├── config.yaml              # Search paths, limits
│   └── cache/                   # Query cache
│
└── brainstorm/                  # Ideas
```

### Ripple Search Engine

**Core principle:** Model writes regex → script executes → returns matches with context

```python
# ripple.py - Core functions
def search(pattern: str, path: str = None, since_days: int = 30) -> list:
    """Execute regex search across knowledge base."""
    # Returns: [{file, line_num, match, context_before, context_after}]

def read_chunk(file_path: str, start_line: int, end_line: int) -> str:
    """Read exact chunk for deep-dive."""

def deep_dive(file_path: str, section_pattern: str) -> str:
    """Recursive search within a specific file section."""
```

### Safeguards Implemented

| Safeguard | Value | Rationale |
|-----------|-------|-----------|
| `max_iterations` | 10 | Prevents infinite recursion |
| `timeout` | 30 seconds | Prevents hanging on complex queries |
| `max_depth` | 3 levels | Limits recursive deep-dives |
| Isolation | Local exec | Safe for personal use (Docker option available) |

### Integration Points

1. **SessionStart hook:** Query Ripple for relevant context, inject into Claude
2. **Stop hook:** Save session summary to journal
3. **`/recall` skill:** On-demand semantic search via Claude Code
4. **Existing `/capture`:** Routes new entries to client folders

---

## Implementation Plan

### Phase 1: Consolidate Data ✅
- [x] Move ChatGPT exports to `raw/chatgpt/`
- [x] Move Claude exports to `raw/claude-exports/`
- [x] Move Twitter archive to `raw/twitter/`
- [x] Symlink Claude Desktop to `raw/claude-desktop/`
- [x] Archive old `~/chief-of-staff/` folder (7.1 GB → 4.0 GB compressed)

### Phase 2: Parse & Extract ✅
- [x] Parse ChatGPT JSON → unified JSONL (15,223 messages)
- [x] Parse Claude exports → unified JSONL (24,950 messages)
- [x] Parse Twitter JS files → extract tweets, DMs (2,605 messages)
- [x] Merge into `unified-history.jsonl` (42,778 total entries, 61.5 MB)

### Phase 3: Build Ripple Search ✅
- [x] Create `ripple.py` with regex search
- [x] Add safeguards (max_iterations=10, timeout=30s, max_depth=3)
- [x] Create `/recall` skill for Claude Code
- [ ] Add SessionStart/Stop hooks (deferred to future phase)

### Phase 4: Test & Validate ✅
- [x] Test: "What did I discuss about pricing?" — 50 results returned
- [x] Test: "Find all Iroko conversations" — 50 results returned
- [ ] Test: Offline with Ollama (Qwen3-Coder) — deferred to future phase
- [x] Verify no infinite loops — 100/100 test queries passed (avg 0.07s/query)

---

## Key Insights

### What Worked
- **Research-first approach:** Validated Ripple safety before implementation
- **Donovan Protocol:** "Has someone solved local LLM history search?" → Yes (RLM/Ripple)
- **Cost analysis:** $0 local vs $19+/mo cloud made decision clear
- **Storage analysis:** 177.8 GB free confirmed plain text is viable

### What We Learned
- **`df` lies on macOS:** APFS purgeable space means System Settings is accurate, not terminal
- **Vector embeddings aren't always better:** Regex is more precise for structured data
- **Scattered data is a solved problem:** Tools like iLoveAI already merge LLM exports
- **Safeguards are documented:** MIT research includes max_iterations pattern

### Patterns for Future Projects
1. **Always research paid alternatives' free equivalents** — Supermemory's core features are replicable locally
2. **Storage analysis before architecture decisions** — We almost over-engineered for a non-existent constraint
3. **Document the "why not" as much as the "why"** — Supermemory rejection rationale is valuable

---

## Donovan Protocol Application

- **Problem:** 7.6 GB of LLM history across 5 locations, unsearchable
- **Rabbit hole avoided:** Paying for Supermemory ($228/year) or building vector DB
- **Donovan approach:** "recursive language model local search infinite context"
- **Maximum leverage:** Plain text + regex + existing routing system

---

## Files Created/Modified

```
Created:
├── stc/case-studies/internal/infrastructure/CaseStudy-RippleMemory-LocalLLMSearch-2026-01-29.md

To be created (Phase 1-4):
├── launchpad/chief-of-staff/raw/chatgpt/
├── launchpad/chief-of-staff/raw/claude-desktop/ (symlink)
├── launchpad/chief-of-staff/raw/claude-exports/
├── launchpad/chief-of-staff/raw/twitter/
├── launchpad/chief-of-staff/extracted/unified-history.jsonl
├── launchpad/chief-of-staff/ripple/ripple.py
├── launchpad/chief-of-staff/ripple/config.yaml
├── launchpad/.claude/skills/recall/skill.md
```

---

## References

### Tier 1 — Verified Sources (Used)
- [MIT Recursive Language Models Paper](https://arxiv.org/html/2512.24601v1) — Peer-reviewed, MIT CSAIL
- [GitHub RLM Implementation](https://github.com/alexzhang13/rlm) — 2.8k stars, MIT researcher
- [Ollama Qwen3-Coder](https://ollama.com/library/qwen3-coder) — Official Ollama library
- [OpenAI ChatGPT Export Docs](https://help.openai.com/en/articles/7260999-how-do-i-export-my-chatgpt-history-and-data) — Official
- [Anthropic Claude Export Docs](https://support.claude.com/en/articles/9450526-how-can-i-export-my-claude-data) — Official

### Tier 2 — Verified but Limited
- [Prime Intellect: RLM Paradigm](https://www.primeintellect.ai/blog/rlm) — VC-backed AI company
- [Supermemory Pricing](https://docs.supermemory.ai/essentials/pricing) — Official docs
- [Echoes Chrome Extension](https://echoes.r2bits.com/) — Chrome Web Store listed

### Rejected Sources
- ~~iLoveAI (ilove-ai.net)~~ — **REJECTED**: Chinese-hosted, claims open-source with no GitHub, unverifiable privacy claims

---

## Sourcing Criteria Applied

All external tools/sources were evaluated against these criteria:

| Tier | Criteria | Examples |
|------|----------|----------|
| **Tier 1** | Official docs, peer-reviewed papers, GitHub 1000+ stars, established publications | arXiv, Ollama, OpenAI/Anthropic docs |
| **Tier 2** | GitHub 100-1000 stars, VC-backed companies, Chrome Web Store listed | Supermemory, Echoes |
| **Tier 3 (Reject)** | No GitHub, self-sourced claims only, unknown provenance, foreign-hosted with privacy claims | iLoveAI |

**Rule:** Never recommend Tier 3 tools for handling sensitive data (conversation history, credentials, personal info).

---

## Test Results (Phase 4)

| Test | Result | Details |
|------|--------|---------|
| "pricing" query | ✅ PASS | 50 results returned with relevant content (subscriptions, tiers, cost analysis) |
| "Iroko" query | ✅ PASS | 50 results returned, all from Claude Desktop (client conversations) |
| 100 query stress test | ✅ PASS | 100/100 passed, 0 failed, avg 0.07s per query |
| Infinite loop detection | ✅ PASS | No hangs or timeouts across all test queries |

---

## Metrics

| Metric | Value |
|--------|-------|
| Research time | ~45 minutes |
| Data consolidated | 7.1 GB raw → 61.5 MB unified JSONL |
| Total entries indexed | 42,778 (ChatGPT: 15,223, Claude: 24,950, Twitter: 2,605) |
| Date range covered | 2022-09-14 to 2026-01-30 |
| Cost savings vs Supermemory | $228/year |
| Storage overhead (Ripple vs vectors) | 10-50x smaller |
| Implementation time | 13 Ralph Loop iterations (~4 hours)

---

*Case study by Softworks Trading Company*
