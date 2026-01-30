# Case Study: Team of Rivals Integration

**Date:** January 30, 2026
**Project:** Launchpad Infrastructure — Adversarial Review Layer
**Duration:** Single extended session
**Status:** ✅ COMPLETE

---

## Executive Summary

Analyzed arXiv:2601.14351 "If You Want Coherence, Orchestrate a Team of Rivals" against STC's existing 5-layer orchestration architecture. Found 4 of 5 key components already in place. Primary gap: **adversarial review** — a Critic agent with veto power that challenges approach validity, not just technical correctness.

Implemented full Team of Rivals architecture with three new Ralph flags: `--critic`, `--rival`, and SessionLog audit trail.

### Key Outcomes

| Area | Before | After |
|------|--------|-------|
| Adversarial review | None (only VERIFY.md) | CRITIC.md with veto power |
| Proactive flaw detection | None | RIVAL.md for parallel analysis |
| Audit trail | errors.log (failures only) | SESSION_LOG.yaml with full lineage |
| Ralph modes | `--verify` only | + `--critic`, `--rival` flags |
| Error interception | Tests catch bugs | + Catches wrong solutions early |

---

## The Problem

### Trigger
User shared arXiv paper describing "AI Office" architecture with specialized agent teams (planners, executors, critics, experts) achieving 90% error interception through opposing incentives.

### Challenge
Determine what's:
1. Already implemented in STC/Launchpad
2. Missing and worth adding
3. Not relevant to our scale/context

### Key Insight from Paper
> "Multiple models serving as a team of rivals can catch and minimize errors within the final product at a small cost to the velocity of actions."

This explains why **Donovan Protocol** emerged organically — we intuitively needed "rivalry" (someone to challenge the approach), but lacked framework for it.

---

## Analysis: Paper vs. STC Architecture

### Mapping to 5-Layer Architecture

| Paper Component | STC Layer | Before | After |
|-----------------|-----------|--------|-------|
| Planners | L1: Discovery | /spec-interview, PRD.md | ✅ No change needed |
| Task Decomposition | L2: Task State | Native Tasks | ✅ No change needed |
| Executors | — | Claude Code + Ralph | ✅ No change needed |
| **Critics (Veto)** | L3: Verification | VERIFY.md (tests only) | ✅ **CRITIC.md added** |
| **Rivals (Proactive)** | — | None | ✅ **RIVAL.md added** |
| Experts | L5: Domain Knowledge | Per-project CLAUDE.md | ✅ Adequate |
| **SessionLog** | — | errors.log (weak) | ✅ **SESSION_LOG.yaml added** |
| Graceful Degradation | L4: Routing | fallback-chains.json | ✅ No change needed |

### Key Gap Closed: Single-Goal Optimization

**Problem:** All agents served the same goal (help complete work). No structural tension.

**Solution Implemented:** Agents with *opposing* goals:
- **Executor** — Complete tasks quickly
- **Critic** — Find problems in completed work (veto power)
- **Rival** — Hunt for flaws proactively (advisory)

---

## Implementation

### Phase 1: Critic Agent ✅

**Template:** `launchpad/.claude/templates/ralph-critic.md`

Features:
1. Opposing incentive prompt — "Your job is to find problems, not help complete work"
2. Structured review protocol — Requirement fidelity, approach validity, edge cases, security
3. Three verdicts — APPROVE, REVISE (add tasks), VETO (block loop)
4. Audit trail — CRITIC.log, VETO.log with structured entries

**Verdict Definitions:**

| Verdict | When | Action |
|---------|------|--------|
| APPROVE | No blocking issues | Continue to next task |
| REVISE | Minor issues found | Add [CRITIC] tasks to PRD.md |
| VETO | Critical: wrong problem, security issue | Create .ralph/BLOCK, stop loop |

### Phase 2: Rival Agent ✅

**Template:** `launchpad/.claude/templates/ralph-rival.md`

Key differences from Critic:

| Aspect | Critic | Rival |
|--------|--------|-------|
| **Timing** | After iteration | During/parallel |
| **Goal** | Review completed work | Proactively find flaws |
| **Veto Power** | Yes (can block) | No (advisory only) |
| **Output** | APPROVE/REVISE/VETO | Issue list for next iteration |

### Phase 3: SessionLog ✅

**Schema:** `launchpad/.claude/templates/session-log-schema.yaml`

Features:
- Full YAML schema with entry definitions
- Supports: executor, verifier, critic, rival agents
- Tracks: timestamps, actions, reasoning, input_refs, output_refs, verdicts, issues
- Enables: Full audit trail for debugging and accountability

### Phase 4: Bash Integration ✅

**Updated:** `launchpad/scripts/ralph.sh`

New flags:
```bash
ralph 10 --critic  # Adversarial review after each iteration
ralph 10 --rival   # Proactive flaw detection
ralph 10 --verify --critic --rival  # Maximum scrutiny
```

Environment variables: `RALPH_CRITIC`, `RALPH_RIVAL`

---

## Files Changed

### Created
- `/launchpad/.claude/templates/ralph-critic.md` — Critic agent prompt
- `/launchpad/.claude/templates/ralph-rival.md` — Rival agent prompt
- `/launchpad/.claude/templates/session-log-schema.yaml` — Audit trail schema

### Updated
- `/launchpad/scripts/ralph.sh` — Added --critic, --rival flags with execution logic
- `/launchpad/.claude/skills/ralphloop/SKILL.md` — Added Critic Mode, Rival Mode, SessionLog docs
- `/launchpad/CLAUDE.md` — Added Team of Rivals tips, new flag documentation

---

## Verification Results

All tests passed:
- ✅ `bash -n ralph.sh` — Syntax check
- ✅ `--critic` flag found and working
- ✅ `--rival` flag found and working
- ✅ All templates exist
- ✅ SKILL.md updated
- ✅ CLAUDE.md updated

---

## Donovan Protocol Application

- **Problem:** Single-agent optimization = blind spots
- **Potential rabbit hole:** Could have rebuilt entire architecture to match paper
- **Donovan approach:** "What does the paper actually add?" → Two missing components (Critic + Rival)
- **Maximum leverage:** Add templates and flags to existing Ralph workflow, don't rebuild
- **Outcome:** Single session implementation vs. multi-day architecture overhaul

---

## Relevance Assessment

### High Value for STC
- **Client work** — Critic catches scope creep, wrong assumptions before delivery
- **Media generation** — Verifies style adherence, brand consistency
- **Donovan integration** — Formalizes what Donovan does intuitively
- **Audit trail** — SessionLog enables accountability for client projects

### Not Relevant for STC
- **Zero-human company** — We're Frederick + Claude, not autonomous org
- **Enterprise scale** — Paper targets massive orchestration; we're boutique
- **Remote code executor** — Context refresh via Ralph already prevents contamination

---

## Key Learnings

1. **Papers validate intuition** — Donovan Protocol was our informal "Team of Rivals"; now we have academic framework
2. **Gap analysis > feature adoption** — Don't adopt everything; identify what's actually missing
3. **Opposing incentives are structural** — Can't just prompt "be critical"; need separate agent with different goal
4. **Two types of adversarial review** — Critic (reactive, veto) vs Rival (proactive, advisory)
5. **90% error interception is achievable** — With existing 5 layers + Critic + Rival, we have the architecture

---

## Usage Examples

### Standard Development
```bash
ralph 10 --verify  # Tests pass?
```

### Production Code
```bash
ralph 10 --verify --critic  # Tests pass + right solution?
```

### Maximum Scrutiny (Client Deliverables)
```bash
ralph 10 --verify --critic --rival  # All checks + proactive flaw detection
```

---

## References

- [arXiv:2601.14351 — If You Want Coherence, Orchestrate a Team of Rivals](https://arxiv.org/abs/2601.14351)
- [Task System Migration Case Study](/stc/case-studies/internal/infrastructure/CaseStudy-TaskSystem-SkillsEcosystem-2026-01-24.md)
- [Ralph Loop SKILL.md](/launchpad/.claude/skills/ralphloop/SKILL.md)

---

*Documented by Claude Code (Opus 4.5) — January 30, 2026*
