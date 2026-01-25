# STC Organization Structure

**Last Updated:** 2026-01-24
**Source of Truth:** `~/launchpad/ecosystem.yaml`

---

## Business Units (10)

```
SOFTWORKS TRADING COMPANY
│
├── ACTIVE VENTURES
│   │
│   ├── Softworks ─────────────────── sftwrks.com
│   │   ├── sftwrks/                  # Company website
│   │   ├── alfred/                   # Voice assistant
│   │   ├── alfred-nano/              # Chat interface
│   │   ├── softworks-clients/        # Client automation platform
│   │   │   └── clients/
│   │   │       ├── iroko/            # Iroko Health
│   │   │       ├── nspc/             # Niger State Planning Commission
│   │   │       ├── assured-integrity/
│   │   │       └── greenbank-development/
│   │   ├── vtf-brand-assets/         # VTF client (View the Future)
│   │   └── tiwa/                     # Tiwa.ai (planned)
│   │
│   ├── Pitch Film Studios ────────── pitchfilmstudio.com
│   │   ├── pfs-media-gen/            # Video generation pipeline
│   │   ├── pfs-toolkit/              # Production utilities
│   │   ├── pfs-logoworks/            # Logo generation
│   │   ├── pfs-core/                 # Shared providers
│   │   └── PersonaLive/              # AI personas
│   │
│   ├── SlopGPT ───────────────────── slopgpt.com
│   │   ├── slopgpt-landing/          # Main platform
│   │   └── clients/
│   │       └── kai-bday/             # Kai's Adventure
│   │
│   ├── Uncle Encore ──────────────── uncleencore.com
│   │   └── encore/                   # Dating app (React + Firebase)
│   │
│   └── Cracked Prompts ───────────── crackedprompts.com
│       └── cracked/                  # AI prompts library
│
├── DORMANT VENTURES
│   │
│   ├── PrePurchasePro ────────────── prepurchasepro.com
│   │   └── PrePurchaseProWeb/        # Vehicle inspection SaaS
│   │
│   └── IOUAlert ──────────────────── ioualert.com
│       └── ioualert/                 # Debt tracking app
│
├── PLANNED VENTURES
│   │
│   ├── CBAH ──────────────────────── charitybegins.org
│   │   └── cbah/                     # Giving circles (Model C fiscal sponsor)
│   │
│   └── Owlchive ──────────────────── owlchive.com
│       └── (not created)             # Trend intelligence product
│
└── INFRASTRUCTURE
    ├── launchpad/                    # Project factory, skills, ecosystem.yaml
    ├── stc/                          # Parent company docs, case studies
    └── chief-of-staff/               # Knowledge management
```

---

## Clients (Under Softworks)

| Client | Path | Description |
|--------|------|-------------|
| Iroko Health | `softworks-clients/clients/iroko/` | AI integration |
| NSPC | `softworks-clients/clients/nspc/` | ChatGPT discovery |
| Assured Integrity | `softworks-clients/clients/assured-integrity/` | Engineering firm |
| Greenbank Development | `softworks-clients/clients/greenbank-development/` | Development |
| VTF | `vtf-brand-assets/` | View the Future land trust |

---

## Change Log

| Date | Change | Commit |
|------|--------|--------|
| 2026-01-24 | Added CBAH, Owlchive, SlopGPT, Encore, Cracked Prompts, IOUAlert as business units | `92a0dec` |
| 2026-01-24 | Documented 5 Softworks clients | `92a0dec` |
| 2026-01-24 | Created ~/cbah/ project | `fddfe8c` |
| 2026-01-24 | Moved kai-bday to slopgpt-landing/clients/ | — |

---

## Update Protocol

**When making structural changes:**

1. Make the change (create folder, move project, add client)
2. Update this file immediately
3. Update `ecosystem.yaml` if business unit affected
4. Commit both files together
5. Add entry to Change Log

**Trigger events:**
- New project folder created
- Project moved between business units
- New client added
- Business unit status changed (active → dormant)
- New business unit added
