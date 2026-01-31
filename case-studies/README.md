# STC Case Studies

Documented problem→solution patterns from **Softworks Trading Company** ventures.

**Location:** `/Users/fredpro/stc/case-studies/`

---

## Directory Structure

```
case-studies/
│
├── softworks/                    # AI Consulting Business Unit
│   ├── clients/                  # Client projects & proposals
│   ├── products/                 # Internal products (Alfred, Tiwa)
│   └── website/                  # sftwrks.com development
│
├── pitch-film-studios/           # Media Production Business Unit
│   └── tools/                    # Production tools (LogoWorks, MediaGen)
│
└── internal/                     # Cross-Business Operations
    ├── infrastructure/           # Launchpad, task systems, architecture
    ├── devtools/                 # Developer productivity (Ralph, workflows)
    └── operations/               # Troubleshooting, diagnostics, incidents
```

---

## Case Study Index

### Softworks (AI Consulting)

#### Clients
| Case Study | Date | Outcome |
|------------|------|---------|
| [Iroko Health Proposal](softworks/clients/Iroko-Health-Proposal.md) | Jan 2026 | AI integration proposal |
| [Kai's Adventure](softworks/clients/Kais-Adventure-Case-Study.html) | Jan 2026 | Interactive photo booth |
| [SlopGPT Analysis](softworks/clients/SlopGPT-Business-Breakdown.pdf) | Jan 2026 | Product strategy |
| [Client Intake Verification](softworks/clients/CaseStudy-ClientIntake-Verification-2026-01-28.md) | Jan 2026 | Website verification before building deliverables |

#### Products
| Case Study | Date | Outcome |
|------------|------|---------|
| [Chief of Staff Voice Assistant](softworks/products/CaseStudy-ChiefOfStaff-VoiceAssistant.md) | Jan 2026 | Three-layer architecture with offline fallbacks |
| [Service Catalog & Pricing](softworks/products/CaseStudy-ServiceCatalog-Pricing-2026-01-28.md) | Jan 2026 | Three-tier value-based pricing with Training Assistant |

#### Website
| Case Study | Date | Outcome |
|------------|------|---------|
| [Website Builder Industry Adaptive](softworks/website/CaseStudy-WebsiteBuilder-IndustryAdaptive.md) | Jan 2026 | Nonprofit template system |
| [Softworks Website Continuation](softworks/website/Softworks-Website-CaseStudy-Continuation-2026-01-20.md) | Jan 2026 | Hero copy, dark mode fixes |

---

### Pitch Film Studios (Media Production)

#### Tools
| Case Study | Date | Outcome |
|------------|------|---------|
| [PFS Media Gen](pitch-film-studios/tools/CaseStudy-PFSMediaGen-AIVideoProduction.md) | Jan 2026 | AI video production pipeline |

---

### Internal Operations

#### Infrastructure
| Case Study | Date | Outcome |
|------------|------|---------|
| [Chief of Staff Router](internal/infrastructure/CaseStudy-ChiefOfStaff-Router-2026-01-28.md) | Jan 2026 | Capture → Route → Journal system with YAML config |
| [Ripple Memory System](internal/infrastructure/CaseStudy-RippleMemory-LocalLLMSearch-2026-01-29.md) | Jan 2026 | Local LLM search vs Supermemory, RLM/Ripple architecture |
| [Ecosystem Audit & Hierarchy Cleanup](internal/infrastructure/CaseStudy-EcosystemAudit-2026-01-24.md) | Jan 2026 | 10 business units, STRUCTURE.md, live documentation protocol |
| [Task System + Skills Ecosystem](internal/infrastructure/CaseStudy-TaskSystem-SkillsEcosystem-2026-01-24.md) | Jan 2026 | Tasks analysis, skills.sh, /audit consolidation |
| [Launchpad Project Factory](internal/infrastructure/CaseStudy-Launchpad-ProjectFactory.md) | Jan 2026 | 20 skills, security guardrails |
| [Launchpad Audit](internal/infrastructure/Launchpad_Audit_Case_Study.md) | Jan 2026 | Project cleanup |
| [Task System Migration (Tracking)](internal/infrastructure/task-system-migration.md) | Jan 2026 | Claude Code Tasks adoption |

#### DevTools
| Case Study | Date | Outcome |
|------------|------|---------|
| [Ralph Loop Best Practices](internal/devtools/CaseStudy-RalphLoop-BestPractices.md) | Jan 2026 | Fresh-session iteration patterns |

#### Operations
| Case Study | Date | Outcome |
|------------|------|---------|
| [macOS RAM Spike Diagnosis](internal/operations/case-study-macos-ram-spike-diagnosis.md) | Jan 2026 | 1.4GB RAM reclaimed via Spotlight exclusions |

---

## Quick Stats

| Business Unit | Case Studies |
|---------------|--------------|
| Softworks | 8 |
| Pitch Film Studios | 1 |
| Internal | 9 |
| **Total** | **18** |

---

## Case Study Template

```markdown
# Case Study: [Project Name]

**Date:** Month Year
**Project:** [Project name or client]
**Business Unit:** Softworks | Pitch Film Studios | Internal
**Status:** ✅ COMPLETE | ⏳ IN PROGRESS

---

## Executive Summary
[1-2 paragraphs: What was built and the outcome]

---

## The Problem
### Requirements
[Bulleted list]

### Challenge
[What made this difficult]

---

## Solution
[Detailed explanation]

---

## Key Insights
### What Worked
[Bulleted list]

### What We Learned
[Patterns for future projects]

---

## Donovan Protocol Application (if applicable)
- **Problem:** [Initial problem]
- **Rabbit hole avoided:** [What you could have gotten stuck on]
- **Donovan approach:** [Search query that found the solution]
- **Maximum leverage:** [The layer where the real fix was]
```

---

## Maintenance

**Adding new case studies:**
1. Identify business unit (softworks, pitch-film-studios, internal)
2. Identify category (clients, products, tools, infrastructure, etc.)
3. Place file in correct folder
4. Update this index
5. If universally applicable, add to `~/.claude/CLAUDE.md` Donovan section

**Future business units:**
- Create `/prepurchasepro/` when case studies exist

---

*Last updated: January 29, 2026*
