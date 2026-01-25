# Case Study: Aligning Ralph Loop with Industry Best Practices

**Date:** January 15, 2026
**Project:** Launchpad (Claude Code Project Factory)
**Duration:** ~2 hours
**Outcome:** Production-ready autonomous coding workflow aligned with Geoffrey Huntley and Boris Cherny's methodologies

---

## Executive Summary

Upgraded the Launchpad project's Ralph Loop implementation from a basic bash script to a comprehensive autonomous coding system based on best practices from the technique's creator (Geoffrey Huntley) and Claude Code's creator (Boris Cherny). Added spec-interview workflow, verification support, and multiple execution modes for different security contexts.

---

## The Problem

### Initial State
- Basic `ralph.sh` script existed but lacked verification
- No interview/spec phase before implementation
- Unclear permission handling (safe vs YOLO modes)
- Not aligned with how authorities actually use the technique

### Key Questions
1. How do Geoffrey Huntley and Boris Cherny actually use Ralph loops?
2. Why do experts criticize Anthropic's official Ralph plugin?
3. How should specs be created before autonomous execution?

---

## Research Findings

### Geoffrey Huntley (Ralph Wiggum Loop Creator)

**Core Philosophy:**
> "It's not if it gets popped, it's when. What's the blast radius?"

**Key Principles:**
- Fresh context per iteration (no degradation)
- Files are memory (git, PRD.md, progress.md)
- One goal per loop iteration
- **Specs first** - 30+ minute conversation before any code

**Permission Approach:**
- Uses `--dangerously-skip-permissions` but ONLY in sandboxed environments
- Runs on GCP VMs with only deploy keys
- Docker containers as isolation boundary

### Boris Cherny (Claude Code Creator)

**Core Philosophy:**
> "Verification 2-3x the quality of the final result"

**Key Principles:**
- Plan Mode before execution (Shift+Tab twice)
- Never use blanket permission bypass on main machine
- Use `/permissions` or `--allowedTools` for granular control
- CLAUDE.md for persistent learnings

### Criticism of Anthropic's Official Plugin

| Issue | Problem |
|-------|---------|
| Single context | Degrades over time vs fresh context per iteration |
| Wrong focus | "Run forever" vs "carve off small bits into independent contexts" |
| Missing spec phase | Jumps straight to loop, skipping 30-min conversation |
| Technical issues | Cryptic failures, weird hooks, breaks if you delete its files |

---

## Solution Implemented

### 1. Spec Interview Skill (NEW)

Created `.claude/skills/spec-interview/SKILL.md` that triggers automatically when user suggests new features:

```
Phase 1: Vision & Goals (5-10 questions)
Phase 2: Scope Clarification (5-10 questions)
Phase 3: Technical Discovery (5-10 questions)
Phase 4: Validate Understanding (summary + confirmation)
```

**Integration with CLAUDE.md:**
```markdown
### Spec Interview (BEFORE implementation)
When user suggests a new feature or idea, **DO NOT jump to implementation**.
Instead, interview them first...
```

### 2. Three Ralph Modes

| Command | Mode | Use Case |
|---------|------|----------|
| `ralph 10` | Safe | Main machine, uses `--allowedTools` |
| `ralph 10 --verify` | Safe + Verify | Code changes (2-3x quality) |
| `ralphyolo 20` | YOLO | Sandbox/VM only |
| `ralphdocker 20` | Docker YOLO | Safest autonomous option |

### 3. Verification Support (Boris's #1 Recommendation)

Added `--verify` flag to ralph.sh:
- Creates optional `.ralph/VERIFY.md`
- Runs tests/build after each iteration
- Separate Claude session for verification (fresh context)

### 4. Safety Checks in YOLO Mode

`ralph-yolo.sh` includes:
```bash
# Require sandbox indicator
if [ "${RALPH_SANDBOXED:-0}" != "1" ] && [ ! -f /.dockerenv ]; then
  echo "⚠️  YOLO MODE BLOCKED - Not in sandbox"
  exit 1
fi
```

---

## Files Created/Modified

| File | Action | Purpose |
|------|--------|---------|
| `scripts/ralph.sh` | Updated | Safe mode with --verify support |
| `scripts/ralph-yolo.sh` | Created | YOLO mode (sandbox required) |
| `scripts/ralph-docker.sh` | Created | Docker sandbox wrapper |
| `scripts/ralph-aliases.sh` | Created | One-word command aliases |
| `.claude/skills/spec-interview/SKILL.md` | Created | Interview workflow skill |
| `.claude/skills/ralphloop/SKILL.md` | Updated | Best practices documentation |
| `CLAUDE.md` | Updated | Automatic behaviors, expert tips |
| `~/.zshrc` | Updated | Added ralphyolo, ralphdocker aliases |

---

## The Correct Workflow (Now Implemented)

```
┌─────────────────────────────────────────────┐
│  User: "I want to add dark mode"            │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  SPEC INTERVIEW (automatic)                 │
│  Claude asks 10-20 questions                │
│  "What's the goal? Who's it for?"           │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  PLAN MODE (Boris's recommendation)         │
│  Design implementation approach             │
│  Get user approval                          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  EXECUTION                                  │
│  exit → ralph 10 --verify                   │
└─────────────────────────────────────────────┘
```

---

## Key Insights

### Why Fresh Context Matters
Each Ralph iteration spawns a new Claude session. The previous context is completely gone. Information survives ONLY through files:
- `.ralph/PRD.md` - checkboxed requirements
- `.ralph/progress.md` - what's done
- `.ralph/errors.log` - what to avoid
- Git commits - full history

This prevents "context rot" where accumulated errors and summarization loss degrade quality.

### Why Specs First
> "If the specs are bad, the results will be meh" — HumanLayer

The 30-minute conversation creates:
- Clear success criteria
- Explicit out-of-scope items
- Technical constraints understood
- Edge cases identified

Without this, the loop runs but produces mediocre results.

### Why Verification Multiplies Quality
Boris Cherny's data: verification = 2-3x quality improvement. Each iteration:
1. Complete one task
2. Run tests/build
3. Only mark complete if verification passes

---

## Metrics

| Metric | Before | After |
|--------|--------|-------|
| Ralph modes | 1 | 3 (safe, yolo, docker) |
| Verification | None | Built-in --verify flag |
| Spec workflow | Manual | Automatic interview |
| Permission handling | Unclear | Clear safe/sandbox separation |
| Documentation | Basic | Comprehensive with sources |

---

## Sources

- [Geoffrey Huntley's How-to-Ralph-Wiggum](https://github.com/ghuntley/how-to-ralph-wiggum)
- [The Real Ralph Wiggum Loop: What Everyone Gets Wrong](https://thetrav.substack.com/p/the-real-ralph-wiggum-loop-what-everyone)
- [Boris Cherny's Claude Code Workflow](https://paddo.dev/blog/how-boris-uses-claude-code/)
- [A Brief History of Ralph (HumanLayer)](https://www.humanlayer.dev/blog/brief-history-of-ralph)
- [Claude Code Best Practices (Anthropic)](https://www.anthropic.com/engineering/claude-code-best-practices)

---

## Next Steps

1. Test the spec-interview workflow on next feature request
2. Run `ralph 10 --verify` on a real task to validate verification
3. Set up Docker environment for `ralphdocker` testing
4. Add learnings to CLAUDE.md as they emerge
