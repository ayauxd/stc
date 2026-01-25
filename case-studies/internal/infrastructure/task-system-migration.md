# Task System Migration

**Status:** Planning
**Started:** 2026-01-24
**Last Updated:** 2026-01-24
**Case Study:** See `~/.claude/CLAUDE.md` → Donovan Protocol → Case Studies

---

## Context

Claude Code shipped native **Tasks** feature (announced Jan 22, 2026 by Thariq @trq212). This analysis determines impact on Frederick's existing orchestration ecosystem.

### The Announcement Summary
- Tasks upgrades TodoWrite to full task management
- Dependency tracking (`blockedBy`, `blocks`)
- Cross-session persistence (`~/.claude/tasks/`)
- Multi-agent collaboration (real-time sync)
- Environment variable control (`CLAUDE_CODE_TASK_LIST_ID=project-name`)

### Alex Finn's Take
> "Ralph Wiggum is dead... spend more time on the planning phase. Have Claude build as many detailed tasks as it can."

### Our Counter-Analysis
Tasks optimizes for **throughput**. Frederick's patterns optimize for **correctness**. The professional approach: use Tasks for throughput, keep verification layers for correctness.

---

## Ecosystem Audit Results

### Skills Inventory (20 total)

| Skill | Tasks Overlap | Recommendation |
|-------|---------------|----------------|
| `/ralphloop` | Partial (state only) | Keep fresh sessions, migrate progress.md |
| `/ralphsprint` | **Full** | Deprecate — Tasks replaces TodoWrite |
| `/spec-interview` | None | Keep — discovery before tasks |
| `/simplify` | None | Keep |
| `/tldr` | Can integrate | Update to read from TaskList |
| `/tldr-dashboard` | None | Keep |
| `/spawn-project` | None | Keep |
| `/dashboard` | Can display | Update to show Tasks |
| `/archaeology` | None | Keep |
| `/self-improve` | None | Keep |
| `/sync-claude-insights` | None | Keep |
| `/ingest` | None | Keep |
| `/api-check` | None | Keep |
| `/api-inventory` | None | Keep |
| `/vault` | None | Keep |
| `/route` | None | Keep |
| `/logoworks` | None | Keep |
| `/nonprofit-website-template` | None | Keep |
| `/canvas` | None | Keep |
| `/repo-security-guardrails` | None | Keep |

### State Management Patterns

| Pattern | Location | Tasks Overlap | Action |
|---------|----------|---------------|--------|
| STATUS.md | Every project `.claude/memory/` | **Full** | Generate FROM Tasks |
| Checklists | `launchpad/projects/*.md` | Partial | Keep for specs, migrate execution tracking |
| Browser agent queue | `launchpad/agents/browser-agent-tasks.md` | **Full** | Migrate to Tasks |
| Ralph progress.md | `.ralph/progress.md` | **Full** | Migrate to Tasks |
| Ralph PRD.md | `.ralph/PRD.md` | None | Keep — specs not tasks |
| Ralph VERIFY.md | `.ralph/VERIFY.md` | None | Keep — verification logic |

### Layers Analysis

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1: DISCOVERY (Keep)                              │
│  /spec-interview, PRD.md                                │
│  Tasks doesn't generate requirements                    │
├─────────────────────────────────────────────────────────┤
│  LAYER 2: TASK STATE (Migrate to Tasks)                 │
│  STATUS.md, progress.md, TodoWrite                      │
│  Tasks does this natively now                           │
├─────────────────────────────────────────────────────────┤
│  LAYER 3: VERIFICATION (Keep)                           │
│  VERIFY.md, CHECKPOINT pattern, Donovan Protocol        │
│  Tasks doesn't define "done" or detect failure          │
├─────────────────────────────────────────────────────────┤
│  LAYER 4: ROUTING (Keep)                                │
│  capabilities.json, patterns.json, fallback-chains.json │
│  Tasks doesn't know which API/model to use              │
├─────────────────────────────────────────────────────────┤
│  LAYER 5: DOMAIN KNOWLEDGE (Keep)                       │
│  Project CLAUDE.md files, mistakes logs                 │
│  Tasks doesn't contain project-specific wisdom          │
└─────────────────────────────────────────────────────────┘
```

---

## Migration Plan

### Phase 1: Adopt Tasks for New Work ☐
- [ ] Try Tasks on next project
- [ ] Document friction points
- [ ] Establish naming convention: `CLAUDE_CODE_TASK_LIST_ID={business-unit}-{project}`

### Phase 2: Update Skills ⏳
- [x] Update `/ralphloop` to use Tasks instead of progress.md
- [x] Deprecate `/ralphsprint` (add deprecation notice)
- [ ] Update `/tldr` to read from TaskList

### Phase 3: Deprecate STATUS.md as Source ☐
- [ ] Tasks becomes source of truth
- [ ] `/tldr` generates STATUS.md FROM Tasks (for git history)
- [ ] Update session-start.sh to read TaskList

### Phase 4: Integrate Router (Optional) ☐
- [ ] Add task pattern metadata
- [ ] Auto-routing based on patterns.json

---

## Key Decisions Needed

1. **Naming convention for task lists**
   - Option A: `{business-unit}-{project}` (e.g., `softworks-sftwrks`)
   - Option B: `{project}` only (e.g., `sftwrks`)
   - Option C: Flat namespace with prefixes

2. **STATUS.md fate**
   - Option A: Delete entirely (Tasks is source)
   - Option B: Keep as human-readable export
   - Option C: Keep for git history, generated from Tasks

3. **ralphsprint deprecation**
   - Option A: Delete skill
   - Option B: Redirect to Tasks documentation
   - Option C: Keep as alias that uses Tasks under the hood

4. **CHECKPOINT implementation in Tasks**
   - How to pause for human verification in Tasks workflow?
   - Create CHECKPOINT tasks with manual completion gate?

---

## Session Log

### 2026-01-24 — Initial Analysis
- Received Thariq announcement + Alex Finn commentary
- Explored full ecosystem (20 skills, 30+ projects)
- Identified 5 layers, determined Tasks only replaces Layer 2
- Created case study in CLAUDE.md
- Created this tracking document

**Key insight:** Alex Finn says "Ralph is dead" — but Ralph was solving TWO problems: (1) state persistence and (2) fresh context. Tasks solves #1, not #2. `/ralphloop`'s fresh session philosophy remains valuable.

### 2026-01-24 — Case Study Automation
- Created `/case-study` skill for documenting problem→solution patterns
- Integrated into `/spawn-project` — new projects get CASE_STUDY.md template
- Integrated into `/tldr` — prompts for case study after significant sessions
- Added `/case-study` and `/spec-interview` to launchpad CLAUDE.md command table
- Marked `/ralphsprint` as DEPRECATED in command table
- Added Tasks migration note to launchpad CLAUDE.md

**Files created:**
- `~/launchpad/.claude/skills/case-study/SKILL.md`

**Files updated:**
- `~/.claude/CLAUDE.md` — Added migration case study
- `~/launchpad/CLAUDE.md` — Added commands #16-17, deprecation note, Tasks note
- `~/launchpad/.claude/skills/spawn-project/SKILL.md` — Symlinks case-study, creates CASE_STUDY.md
- `~/launchpad/.claude/skills/tldr/SKILL.md` — Prompts for case study

**Next:** Decide on Phase 1 naming conventions and test Tasks on a real project.

### 2026-01-24 — Workflow Example Added
- Added comprehensive "Stripe billing" example showing full command sequence
- Documented: Discovery → Tasks → Execution → Cleanup → Wrap-up → Documentation
- Added decision tree for choosing execution mode (same-session vs /ralphloop)
- Added Donovan Protocol integration showing failure recovery → case study pipeline
- Updated `/case-study` skill with command sequence quick reference

**Key addition:** The example shows how CHECKPOINT tasks pause for human verification — this is how we preserve verification gates when using native Tasks.

### 2026-01-24 — Ralph + Tasks Integration Implemented
- Created `ralph-tasks.sh` — Tasks-aware version of ralph.sh
- Created `ralph-prompt-tasks.md` — PROMPT.md template for Tasks
- Updated `/ralphloop` skill with Tasks integration documentation
- Added CHECKPOINT file pattern for human verification gates
- Added DONE file pattern for completion detection

**Key changes in ralph-tasks.sh:**
- Uses `TaskList`, `TaskCreate`, `TaskUpdate`, `TaskGet` in allowedTools
- Checks for `.ralph/CHECKPOINT` file (pause for human)
- Checks for `.ralph/DONE` file (all tasks complete)
- Exports `CLAUDE_CODE_TASK_LIST_ID` for Task persistence
- Removed progress.md dependency

**Files created:**
- `~/launchpad/scripts/ralph-tasks.sh`
- `~/launchpad/.claude/templates/ralph-prompt-tasks.md`

**Files updated:**
- `~/launchpad/.claude/skills/ralphloop/SKILL.md` — Added Tasks integration section

**Also documented:** The `!` command feature (inline bash execution)

**Next:** Test native Tasks on a real project.

### 2026-01-24 — Audit Project Consolidated
- Discovered skills.sh ecosystem (20,000+ community skills)
- Analyzed /audit project overlap: 70% redundant with community skills
- **Migrated to launchpad:**
  - `aesthetics.js` → `/launchpad/.claude/skills/aesthetics-audit/`
  - `standards.yaml` → `/launchpad/config/audit-standards.yaml`
  - `generate-assets.cjs` → `/launchpad/scripts/`
  - Audit reports → `/launchpad/audits/`
- **Fixed references:** slopgpt-brand-artisan.md, logoworks skill
- **Archived:** `/audit` → `/archive/audit-archived-2026-01-24`
- Added `/aesthetics-audit` to launchpad commands (#18)

**Key learning:** Use skills.sh for standard audits (SEO, accessibility, security). Keep only unique pieces (AI slop detection).

**Next:** Learn skills.sh workflow.

---

---

## Example Workflow: Post-Tasks Command Sequence

When Claude Code Tasks ships fully, here's how commands chain together for a real project:

### Scenario: "Add Stripe subscription billing to sftwrks client portal"

```
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 1: DISCOVERY                                                 │
│  ─────────────────                                                  │
│  User: "I want to add Stripe subscriptions to the client portal"    │
│                                                                     │
│  Claude: (auto-triggers /spec-interview)                            │
│  • What subscription tiers? Monthly/annual?                         │
│  • Free trial? How long?                                            │
│  • What happens when payment fails?                                 │
│  • Existing auth system to integrate with?                          │
│  • Webhooks needed for what events?                                 │
│                                                                     │
│  Output: Validated requirements, clear scope                        │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 2: TASK DECOMPOSITION (Native Tasks)                         │
│  ──────────────────────────────────────────                         │
│  Claude: "Let me create a task list for this implementation"        │
│                                                                     │
│  CLAUDE_CODE_TASK_LIST_ID=softworks-sftwrks-billing                 │
│                                                                     │
│  TaskCreate:                                                        │
│  ├── #1 Research Stripe API for subscriptions                       │
│  ├── #2 Design database schema for subscriptions                    │
│  ├── #3 CHECKPOINT: Approve schema before implementation            │
│  ├── #4 Create Stripe webhook endpoint (blockedBy: #3)              │
│  ├── #5 Implement subscription create flow (blockedBy: #3)          │
│  ├── #6 Implement subscription cancel flow (blockedBy: #5)          │
│  ├── #7 Add subscription status to user dashboard (blockedBy: #5)   │
│  ├── #8 CHECKPOINT: Manual test all flows                           │
│  ├── #9 Write integration tests (blockedBy: #8)                     │
│  └── #10 CHECKPOINT: Final review before merge                      │
│                                                                     │
│  Human reviews task list, adjusts dependencies                      │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 3A: SAME-SESSION WORK                                        │
│  ───────────────────────────                                        │
│  For shorter tasks, work through TaskList in current session:       │
│                                                                     │
│  Claude works: #1 → #2 → stops at #3 (CHECKPOINT)                   │
│  Human: "Schema looks good, approved"                               │
│  Claude works: #4, #5, #6, #7 → stops at #8 (CHECKPOINT)            │
│  Human: Tests manually, approves                                    │
│  Claude works: #9 → stops at #10 (CHECKPOINT)                       │
│  Human: Final approval                                              │
│                                                                     │
│  💡 Tasks persists state — can pause and resume tomorrow            │
└─────────────────────────────────────────────────────────────────────┘
                              OR
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 3B: AUTONOMOUS WORK (/ralphloop)                             │
│  ──────────────────────────────────────                             │
│  For overnight autonomous execution:                                │
│                                                                     │
│  User: "/ralphloop Complete billing tasks. Done when: #1-#7 done"   │
│                                                                     │
│  Claude generates:                                                  │
│  .ralph/                                                            │
│  ├── PRD.md        ← From spec-interview + TaskList                 │
│  ├── PROMPT.md     ← "Check TaskList, pick next unblocked task"     │
│  ├── VERIFY.md     ← "Run npm test, check TypeScript"               │
│  └── (no progress.md — Tasks handles state now)                     │
│                                                                     │
│  User exits, runs: ralph 20 --verify                                │
│  Each iteration: fresh session → reads TaskList → completes 1 task  │
│  Stops at CHECKPOINT tasks (requires human)                         │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 4: CLEANUP (/simplify)                                       │
│  ────────────────────────────                                       │
│  After implementation complete:                                     │
│                                                                     │
│  User: "/simplify src/billing/"                                     │
│                                                                     │
│  Claude:                                                            │
│  • Removes dead code from iteration                                 │
│  • Flattens nested conditionals                                     │
│  • Improves variable naming                                         │
│  • Preserves all behavior                                           │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 5: WRAP-UP (/tldr)                                           │
│  ────────────────────────                                           │
│  User: "/tldr"                                                      │
│                                                                     │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓             │
│  ┃  SESSION SUMMARY                        2026-01-24 ┃             │
│  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫             │
│  ┃  DONE                                              ┃             │
│  ┃  - Stripe subscription billing implemented         ┃             │
│  ┃  - Webhook endpoint + all CRUD flows               ┃             │
│  ┃  - Integration tests passing                       ┃             │
│  ┃                                                    ┃             │
│  ┃  CHANGED                                           ┃             │
│  ┃  - src/billing/* (new)                             ┃             │
│  ┃  - src/api/webhooks/stripe.ts                      ┃             │
│  ┃  - prisma/schema.prisma                            ┃             │
│  ┃                                                    ┃             │
│  ┃  NEXT                                              ┃             │
│  ┃  - Deploy to staging for QA                        ┃             │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛             │
│                                                                     │
│  💡 Significant problem-solving detected.                           │
│     Document as case study? [y/N]                                   │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 6: DOCUMENTATION (/case-study)                               │
│  ────────────────────────────────────                               │
│  User: "y" or "/case-study"                                         │
│                                                                     │
│  Claude generates:                                                  │
│                                                                     │
│  **sftwrks-stripe-billing (Jan 2026):** ✅ COMPLETE                 │
│  - Problem: Add subscription billing to client portal               │
│  - Rabbit hole avoided: Could have built custom billing logic       │
│  - Donovan approach: "Stripe subscription best practices" →         │
│    Use Stripe Checkout + Customer Portal (hosted)                   │
│  - Maximum leverage: Let Stripe handle UI, we handle webhooks only  │
│  - Outcome: 3 files changed, Stripe handles 90% of complexity       │
│                                                                     │
│  Saved to:                                                          │
│  • sftwrks/.claude/memory/CASE_STUDY.md (project-specific)          │
│  • ~/.claude/CLAUDE.md (if universal lesson)                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Command Sequence Cheat Sheet

| Phase | Command | When to Use |
|-------|---------|-------------|
| Discovery | `/spec-interview` | Auto-triggered on "I want to build..." |
| Planning | Native Tasks | After requirements clear |
| Execution (interactive) | Work through TaskList | Shorter tasks, need feedback |
| Execution (autonomous) | `/ralphloop` | Overnight, long runs |
| Cleanup | `/simplify` | After significant code changes |
| Wrap-up | `/tldr` | End of session |
| Learning | `/case-study` | After significant problem-solving |

### When to Use Which Execution Mode

```
                    ┌─────────────────────────┐
                    │ How long will this take?│
                    └───────────┬─────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
              < 2 hours                 > 2 hours
                    │                       │
                    ▼                       ▼
        ┌───────────────────┐   ┌───────────────────┐
        │ Same-session work │   │ Need fresh context│
        │ with native Tasks │   │   each iteration? │
        └───────────────────┘   └─────────┬─────────┘
                                          │
                                ┌─────────┴─────────┐
                                ▼                   ▼
                              Yes                  No
                                │                   │
                                ▼                   ▼
                        ┌─────────────┐    ┌─────────────┐
                        │ /ralphloop  │    │ Native Tasks│
                        │ (bash loop) │    │ (persistent)│
                        └─────────────┘    └─────────────┘
```

### Failure Recovery: Donovan Protocol Integration

```
┌─────────────────────────────────────────────────────────────────────┐
│  DURING EXECUTION: Something goes wrong                             │
│  ──────────────────────────────────────                             │
│                                                                     │
│  Task #5 fails 3 times → Donovan Protocol triggers                  │
│                                                                     │
│  Claude: "I'm detecting frustration patterns. Should I get          │
│           Donovan on this?"                                         │
│                                                                     │
│  User: "yes"                                                        │
│                                                                     │
│  Claude searches: "Stripe subscription create webhook timing issue" │
│  Finds: Known race condition, solution is idempotency keys          │
│                                                                     │
│  Claude: "Found documented solution. The issue is [X], fix is [Y]"  │
│                                                                     │
│  After resolution:                                                  │
│  💡 "Donovan resolved this. Document as case study?"                │
│                                                                     │
│  /case-study --global → Lesson available in ALL future projects     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## References

- [Thariq's Tasks Announcement](https://twitter.com/trq212) (Jan 22, 2026)
- [Alex Finn's Commentary](https://twitter.com/AlexFinn)
- [Geoffrey Huntley on Ralph Wiggum Loop](https://devinterrupted.substack.com/p/inventing-the-ralph-wiggum-loop-creator)
- [Boris Cherny's Claude Code Workflow](https://paddo.dev/blog/how-boris-uses-claude-code/)
