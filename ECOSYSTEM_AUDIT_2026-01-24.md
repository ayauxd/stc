# Ecosystem Audit - January 24, 2026

**Total Directories Scanned:** 73
**In ecosystem.yaml:** 21
**Missing from ecosystem.yaml:** 52
**Git Repos:** 42
**Non-Git Directories:** 31

---

## Current Business Units (in ecosystem.yaml)

| Unit | Projects Listed | Status |
|------|-----------------|--------|
| Softworks | 7 | Incomplete |
| Pitch Film Studios | 6 | Incomplete |
| PrePurchasePro | 3 | OK |
| Infrastructure | 2 | Incomplete |

---

## Proposed Business Structure

```
SOFTWORKS TRADING COMPANY (STC)
│
├── SOFTWORKS (AI Consulting) ─────────── sftwrks.com
│   ├── sftwrks                 [KEEP] Main website
│   ├── alfred                  [KEEP] Voice assistant
│   ├── alfred-nano             [KEEP] Chat interface
│   ├── softworks-clients       [KEEP] Client automation platform (n8n)
│   │   └── clients/
│   │       ├── iroko           # Iroko Health
│   │       ├── nspc            # Niger State Planning Commission
│   │       ├── assured-integrity
│   │       └── greenbank-development
│   ├── vtf-brand-assets        [KEEP] VTF client (View the Future)
│   └── chief-of-staff          [KEEP] Knowledge management
│
├── PITCH FILM STUDIOS (Media) ────────── pitchfilmstudio.com
│   ├── pfs-media-gen           [KEEP] Video generation
│   ├── pfs-toolkit             [KEEP] ComfyUI tools
│   ├── pfs-logoworks           [KEEP] Logo generation
│   ├── pfs-core                [REVIEW] Shared library
│   ├── PersonaLive             [KEEP] AI persona
│   └── SongGeneration          [KEEP] Music generation
│
├── PREPURCHASEPRO (Vehicle Inspection) ─ prepurchasepro.com
│   └── PrePurchaseProWeb       [KEEP] Main platform
│
├── IOUALERT (Finance) ────────────────── ioualert.com
│   └── ioualert                [KEEP] Debt tracking app (standalone)
│
├── SLOPGPT (AI Product) ──────────────── slopgpt.com
│   └── slopgpt-landing         [KEEP] Landing page
│
├── UNCLE ENCORE (Dating App) ─────────── uncleencore.com
│   └── encore                  [KEEP] Location-based dating app (React + Firebase)
│
├── CRACKED PROMPTS (AI Resources) ────── crackedprompts.com?
│   ├── cracked                 [CONSOLIDATE]
│   └── crck                    [MERGE INTO cracked]
│
├── CBAH (Nonprofit) ──────────────────── charitybegins.org
│   └── cbah                    [CREATED] Giving circles with fiscal sponsorship
│
├── OWLCHIVE ──────────────────────────── owlchive.com
│   └── owlchive                [PLANNED] Domain registered, concept TBD
│
└── INFRASTRUCTURE (Internal)
    ├── launchpad               [KEEP] Project factory
    ├── stc                     [KEEP] Parent company repo
    └── archive                 [KEEP] Archived projects
```

---

## Projects NOT in ecosystem.yaml

### HIGH PRIORITY - Add to ecosystem.yaml

| Project | Type | Suggested Unit | Action |
|---------|------|----------------|--------|
| slopgpt-landing | GIT | slopgpt (new) | ADD |
| encore | GIT | encore (new) | ADD |
| cracked | DIR | cracked-prompts (new) | ADD |
| stc | GIT | infrastructure | ADD |
| kai-bday | GIT | softworks/clients | ADD |
| fredaya-blog | GIT | personal | ADD |
| unified-studio | GIT | pitch-film-studios | REVIEW |
| vtf-brand-assets | GIT | ? | ASK (what is VTF?) |
| vtf-marketing | GIT | ? | ASK |
| youtube-100-seconds | GIT | pitch-film-studios | ADD |
| musings | GIT | personal | ADD |
| photo-era | GIT | pitch-film-studios | ADD |
| claude-hex-ui | GIT | infrastructure | ADD |

### CONSOLIDATION CANDIDATES

| Group | Projects | Action |
|-------|----------|--------|
| **sftwrks variants** | sftwrks, sftwrks-web, sftwrks-sales, sftwrks-assets-backup | Keep sftwrks, ARCHIVE others |
| **cracked variants** | cracked, crck | MERGE into cracked |
| **safestep** | safestep-app-clone, safestep-login-mvp | ARCHIVE both (not STC) |
| **softworks branding** | softworks-brand-assets, softworksslides | ARCHIVE both (superseded) |
| **nanochat** | nanochat_local, nanochat_model | ARCHIVE (superseded by alfred) |
| **assured integrity** | assured-integrity-v1, v2 | ARCHIVE both |
| **unified studio** | unified-studio, unified-studio-temp | Keep unified-studio, ARCHIVE temp |

### ARCHIVE CANDIDATES (Idle/Test/Unknown)

| Project | Reason | Action |
|---------|--------|--------|
| 3dplus | Unknown purpose | ARCHIVE |
| ai-landing-page | Generic/old | ARCHIVE |
| automation | Review first | REVIEW |
| coffee-shop | Unknown | ARCHIVE |
| fifty_fifty_game | Game experiment | ARCHIVE |
| flowstate-maestro | Idle | ARCHIVE |
| GPTs-link | Old GPT links | ARCHIVE |
| HomeOffice | Unknown | REVIEW |
| kevin | Unknown | ARCHIVE |
| mlx-env | Python env | DELETE (can recreate) |
| mp3converter | Utility | ARCHIVE |
| neural-framework | Experiment | ARCHIVE |
| Newport Piggy Bank | Unknown | ARCHIVE |
| newsletter template | Template | ARCHIVE |
| nltk_data | Data files | DELETE (can redownload) |
| node-banana | Old backend | ARCHIVE |
| oceanparade | Unknown | ARCHIVE |
| OpenAISDK | SDK copy | DELETE |
| prepro | Unknown | ARCHIVE |
| prepurchase file | Old files | ARCHIVE |
| slides | Old slides | ARCHIVE |
| Transcript_Archive | Old transcripts | REVIEW |
| transcript-viewer | Utility | ARCHIVE |
| Trivia | Game | ARCHIVE |
| vehicle-inspection | Old | ARCHIVE |
| venv | Python env | DELETE |
| video-analysis | Utility | ARCHIVE |
| videoplayback_11 | Media file | DELETE |
| voiceapp | Old voice app | ARCHIVE |
| yt-comment-analyzer | Utility | ARCHIVE |
| test, test-* | Test projects | ARCHIVE |

---

## Questions for Frederick

1. ~~**What is CBAH?**~~ ✅ RESOLVED - Created ~/cbah with full blueprint
2. ~~**What is VTF?**~~ ✅ RESOLVED - Softworks client (View the Future land trust)
3. ~~**Is SlopGPT a Softworks product or separate business?**~~ ✅ RESOLVED - Separate business unit
4. ~~**Is Uncle Encore (encore) active?**~~ ✅ RESOLVED - Active dating app at ~/encore
5. ~~**Should Cracked Prompts be its own business unit?**~~ ✅ RESOLVED - Added as separate unit
6. **What's in HomeOffice? Keep or archive?**

## Softworks Clients (Resolved)

| Client | Location | Standalone Repos |
|--------|----------|------------------|
| Iroko Health | `softworks-clients/clients/iroko` | - |
| NSPC | `softworks-clients/clients/nspc` | - |
| Assured Integrity | `softworks-clients/clients/assured-integrity` | assured-integrity-v1, v2 (consolidate) |
| Greenbank Development | `softworks-clients/clients/greenbank-development` | - |
| VTF | `vtf-brand-assets` | vtf-brand-assets, vtf-marketing |

---

## Recommended Actions

### Immediate (Today)

1. **Add to ecosystem.yaml:**
   - slopgpt-landing
   - encore
   - cracked
   - stc
   - kai-bday
   - fredaya-blog

2. **Archive these now:**
   ```bash
   cd ~ && mkdir -p archive
   for p in "Newport Piggy Bank" "newsletter template" softworksslides sftwrks-assets-backup sftwrks-web assured-integrity-v1 assured-integrity-v2 crck; do
     mv "$p" "archive/${p}-$(date +%Y-%m-%d)" 2>/dev/null
   done
   ```

3. **Delete (can recreate):**
   ```bash
   rm -rf ~/mlx-env ~/venv ~/nltk_data ~/OpenAISDK ~/videoplayback_11
   ```

### This Week

1. Review and categorize remaining 30+ projects
2. Update ecosystem.yaml with all active projects
3. Consolidate cracked + crck
4. Create case studies for major projects

### This Month

1. Establish naming conventions
2. Set up new business units in ecosystem.yaml
3. Create dashboards for each business unit

---

## After Cleanup: Target Structure

```
~/
├── alfred/              # Softworks
├── alfred-nano/         # Softworks
├── archive/             # Archived projects
├── chief-of-staff/      # Infrastructure
├── cracked/             # Cracked Prompts
├── encore/              # Uncle Encore
├── fredaya-blog/        # Personal
├── ioualert/            # PrePurchasePro
├── kai-bday/            # Client work
├── launchpad/           # Infrastructure
├── musings/             # Personal
├── PersonaLive/         # PFS
├── pfs-logoworks/       # PFS
├── pfs-media-gen/       # PFS
├── pfs-toolkit/         # PFS
├── PrePurchaseProWeb/   # PrePurchasePro
├── sftwrks/             # Softworks
├── slopgpt-landing/     # SlopGPT
├── softworks-clients/   # Softworks
├── softworks-n8n/       # Softworks
├── SongGeneration/      # PFS
├── stc/                 # Infrastructure (parent company)
└── [~15 others after review]
```

**Target: ~25 active projects** (down from 73)

---

*Generated by /ecosystem-audit*
