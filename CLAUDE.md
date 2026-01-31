# STC - Softworks Trading Company

**Parent holding company** for Frederick Aya's business ventures.

## Quick Reference

| Document | Purpose |
|----------|---------|
| `STRUCTURE.md` | Visual org hierarchy (always current) |
| `case-studies/README.md` | All case studies by business unit |
| `~/launchpad/ecosystem.yaml` | Full project registry |

## Update Protocol

**After ANY structural change (folder created, project moved, client added):**
1. Update `STRUCTURE.md` immediately
2. Update `ecosystem.yaml` if business unit affected
3. Commit both files with descriptive message
4. Add entry to STRUCTURE.md Change Log

**After ANY case study change:**
1. Update the case study file
2. Update `case-studies/README.md` (index + stats)
3. Commit BOTH files together — they are an atomic unit

---

## Session Challenges (Mistakes to Learn From)

| Issue | Occurrences | Fix |
|-------|-------------|-----|
| Forgot to update README after changes | 4x in one session | ALL READMEs (stc/, case-studies/) = atomic commit |
| Missed `encore` project (claimed "not found") | 1x | Always `ls -la ~/[project]` before claiming missing |
| Referenced `softworks-n8n` (doesn't exist) | Multiple | Verify actual folder names exist |
| Put case studies in sftwrks instead of stc | 1x | Read instructions carefully |
| Main stc/README.md was outdated | 1x | Update main README when structure changes |

---

## Business Units

| Unit | Domain | Focus | Status |
|------|--------|-------|--------|
| **Softworks** | sftwrks.com | AI consulting, automation | Active |
| **Pitch Film Studios** | pitchfilmstudio.com | Media production | Active |
| **PrePurchasePro** | prepurchasepro.com | Vehicle inspection SaaS | Dormant |
| **IOUAlert** | ioualert.com | Debt tracking, IOU management | Dormant |
| **SlopGPT** | slopgpt.com | AI-powered product platform | Active |
| **Uncle Encore** | uncleencore.com | Location-based dating app | Active |
| **Cracked Prompts** | crackedprompts.com | AI prompts/resources library | Active |
| **CBAH** | charitybegins.org | Nonprofit giving circles | Planned |
| **Owlchive** | owlchive.com | TBD (domain registered) | Planned |

### Softworks Clients

| Client | Path | Status |
|--------|------|--------|
| Iroko Health | `softworks-clients/clients/iroko` | Active |
| Niger State Planning Commission | `softworks-clients/clients/nspc` | Active |
| Assured Integrity | `softworks-clients/clients/assured-integrity` | Active |
| Greenbank Development | `softworks-clients/clients/greenbank-development` | Active |
| VTF (View the Future) | `vtf-brand-assets`, `vtf-marketing` | Active |

## What Lives Here

- Corporate governance documents
- Cross-business brand assets
- Shared contracts and templates
- Holding company legal/financial structure
- Master brand guidelines
- **Case studies** — documented problem→solution patterns

## Case Studies

All case studies organized by business unit: `/case-studies/README.md`

```
case-studies/
├── softworks/              # AI Consulting (8 case studies)
│   ├── clients/            # Iroko Health, SlopGPT, Kai's Adventure, Client Intake Verification
│   ├── products/           # Chief of Staff voice assistant, Service Catalog & Pricing
│   └── website/            # sftwrks.com development
├── pitch-film-studios/     # Media Production (1 case study)
│   └── tools/              # PFS Media Gen
└── internal/               # Cross-Business Ops (9 case studies)
    ├── infrastructure/     # Launchpad, Task system, Chief of Staff Router, Ripple Memory
    ├── devtools/           # Ralph Loop
    └── operations/         # Troubleshooting, diagnostics
```

**Total: 18 case studies**

## Related Repos

| Repo | Purpose |
|------|---------|
| `launchpad` | Project factory, ecosystem monitoring |
| `sftwrks` | Softworks AI consulting website |
| `softworks-clients` | Automation workflows, client work |

## Commands

| Command | Purpose |
|---------|---------|
| `/ralphloop <task>. Done when: <criteria>` | Iterate with checkpoints until done |
| `/simplify` | Clean up code after changes |
| `/tldr` | Session summary for handoffs |

## Tips

- Plan Mode for complex tasks (Shift+Tab twice)
- Verification 2-3x quality - always test changes
