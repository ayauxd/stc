# Case Study: Launchpad - The Claude Code Project Factory

**Date:** January 2026 (ongoing)
**Project:** Launchpad
**Purpose:** Centralized project spawning, skills management, and autonomous coding infrastructure
**Outcome:** 20+ projects managed with consistent tooling and best practices

---

## Executive Summary

Built a "project factory" that standardizes how new Claude Code projects are created, managed, and operated. Includes reusable skills, autonomous coding loops (Ralph), security guardrails, and cross-project coordination. Serves as the operational backbone for all development work.

---

## The Problem

### Before Launchpad
- Each project had ad-hoc Claude configuration
- No consistent skills or commands across projects
- Security practices varied wildly
- Autonomous coding was manual and error-prone
- No way to share learnings between projects

### Goal
Create a central system that:
- Spawns new projects with best practices baked in
- Provides reusable skills across all projects
- Implements security guardrails automatically
- Enables autonomous coding with proper oversight

---

## Core Capabilities

### 1. Project Spawning (`/spawn-project`)

Creates new projects with:
- Pre-configured CLAUDE.md
- Security guardrails
- Launchpad skill integration
- Git initialization

**Supported Types**:
- web-app, api, cli, automation
- voice-app, data-science
- second-brain, nonprofit-website

### 2. Skill System

Reusable skills available across all projects:

| Skill | Purpose |
|-------|---------|
| `/ralphloop` | Autonomous iteration with fresh contexts |
| `/ralphsprint` | Quick in-session iteration |
| `/spec-interview` | Pre-implementation discovery |
| `/simplify` | Code cleanup after changes |
| `/tldr` | Session summary for handoffs |
| `/vault` | API key management |
| `/dashboard` | System overview |
| `/archaeology` | Scan and classify old projects |

### 3. Ralph Loop System

Three modes for different security contexts:

| Command | Mode | Security |
|---------|------|----------|
| `ralph 10` | Safe | `--allowedTools` |
| `ralph 10 --verify` | Safe + Verify | 2-3x quality boost |
| `ralphyolo 20` | YOLO | Sandbox required |
| `ralphdocker 20` | Docker | Safest autonomous |

### 4. Security Guardrails

**Automatic protections**:
- Prompt injection defense
- Repository verification
- Dependency checks (typosquatting detection)
- Granular permissions (never blanket bypass)

**Permission Configuration** (`.claude/settings.json`):
```json
{
  "permissions": {
    "allow": [
      "Read(*)", "Write(*)", "Edit(*)",
      "Bash(git *)", "Bash(npm *)", "Bash(python *)"
    ],
    "deny": [
      "Bash(rm -rf /)", "Bash(sudo *)",
      "Bash(curl * | bash)", "Read(.env)"
    ]
  }
}
```

---

## Architecture

```
launchpad/
├── CLAUDE.md                    # Master instructions
├── scripts/
│   ├── ralph.sh                 # Safe autonomous loop
│   ├── ralph-yolo.sh           # YOLO mode (sandbox)
│   ├── ralph-docker.sh         # Docker sandbox
│   ├── dashboard.py            # System overview
│   ├── history-search.py       # Conversation search
│   ├── extract-projects.py     # Project discovery
│   ├── threat-scanner.py       # Security scanning
│   └── session-start.sh        # Hook for session init
├── .claude/
│   ├── settings.json           # Permissions config
│   └── skills/
│       ├── ralphloop/          # Autonomous iteration
│       ├── ralphsprint/        # Quick iteration
│       ├── spec-interview/     # Pre-implementation
│       ├── spawn-project/      # Project creation
│       └── ...
└── vault/
    └── vault.py                # API key management
```

---

## Key Innovations

### Spec Interview (Before Implementation)

When user suggests a new feature, Claude interviews them FIRST:

1. **Vision & Goals** (5-10 questions)
2. **Scope Clarification** (5-10 questions)
3. **Technical Discovery** (5-10 questions)
4. **Validate Understanding** (summary + confirmation)

> "Spend 30+ minutes conversing rather than jumping to implementation"
> — Geoffrey Huntley

### Verification Mode

Boris Cherny's #1 recommendation: verification = 2-3x quality.

```bash
ralph 10 --verify
```

Each iteration:
1. Complete one task
2. Run tests/build
3. Only mark complete if verification passes

### Fresh Context Per Iteration

Based on Geoffrey Huntley's original Ralph technique:
- Each loop spawns NEW Claude session
- Previous context is completely gone
- Memory persists ONLY through files
- Prevents "context rot"

---

## Integration Points

### Conversation History

Indexes and searches 850+ archived conversations:
- ChatGPT exports
- Claude conversations
- Anthropic API logs

### Cross-Project Coordination

Projects inherit from Launchpad:
- Shared skills
- Consistent commands
- Security baseline
- Best practices

### Canvas Integration

Real-time system monitoring for resource-intensive tasks:
```bash
/canvas system
```

---

## Best Practices Encoded

### From Boris Cherny (Claude Code Creator)
- Verification = 2-3x quality
- Plan Mode before execution
- Never blanket permission bypass
- CLAUDE.md for persistent learnings

### From Geoffrey Huntley (Ralph Loop Creator)
- Fresh context = no degradation
- Files are memory
- One goal per loop
- Specs first

---

## Metrics

| Metric | Value |
|--------|-------|
| Projects managed | 20+ |
| Skills available | 10+ |
| Ralph modes | 3 |
| Security rules | Comprehensive |
| Conversation archives | 850+ |

---

## Projects Spawned (Past 2 Weeks)

| Project | Type | Status |
|---------|------|--------|
| vtf-marketing | Website Builder | Active |
| chief-of-staff | Voice Assistant | Active |
| pfs-media-gen | AI Video | Active |
| softworks-toolkit | Utilities | Active |
| alfred-nano | Fine-tuning | In Progress |
| flowstate-maestro | Productivity App | Scaffolded |
| oceanparade | TBD | Scaffolded |
| softworks-n8n | Automation | Active |

---

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Master instructions, expert tips |
| `scripts/ralph.sh` | Safe autonomous loop |
| `.claude/settings.json` | Permission configuration |
| `.claude/skills/spec-interview/SKILL.md` | Pre-implementation discovery |
| `.claude/skills/ralphloop/SKILL.md` | Autonomous iteration docs |
