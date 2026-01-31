# STC API Key Strategy

**Last Updated:** January 24, 2026
**Owner:** Frederick Aya

---

> **Related Documents:**
> - [KEY_INVENTORY.md](./KEY_INVENTORY.md) — Visual reference, provider matrix, project mappings
> - [Incident Reports](../incidents/) — Post-mortems and lessons learned
> - [Vault Operations](~/launchpad/vault/) — Scripts and key storage

---

## Philosophy

> "Development keys are shared. Production keys are sacred."

Most projects are experiments or in development. We don't need separate keys for each until they go live.

---

## Key Tiers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           KEY ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌──────────────────────┐                                                  │
│   │      DEV KEYS        │  ← Shared across ALL local development          │
│   │  (in launchpad)      │    Any project can use these for testing        │
│   │                      │    Budget: $20/month total                       │
│   │  • ANTHROPIC-DEV     │                                                  │
│   │  • OPENAI-DEV        │                                                  │
│   │  • GEMINI-DEV        │                                                  │
│   │  • ELEVENLABS-DEV    │                                                  │
│   └──────────────────────┘                                                  │
│              │                                                              │
│              │ When project goes live...                                    │
│              ▼                                                              │
│   ┌──────────────────────┐                                                  │
│   │     PROD KEYS        │  ← Created ONLY when deploying to production    │
│   │  (per-project)       │    One key per live service                      │
│   │                      │    Individual budget limits                      │
│   │  • ANTHROPIC-PROD-   │                                                  │
│   │    SFTWRKS           │                                                  │
│   │  • ANTHROPIC-PROD-   │                                                  │
│   │    SLOPGPT           │                                                  │
│   └──────────────────────┘                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Shared Development Keys

These keys live in `~/launchpad/vault/.keys/` and are used for ALL local development.

| Key ID | Provider | Budget | Purpose |
|--------|----------|--------|---------|
| `ANTHROPIC-DEV` | Anthropic | $15/mo | Any Claude testing |
| `OPENAI-DEV` | OpenAI | $10/mo | GPT, DALL-E, Whisper testing |
| `GEMINI-DEV` | Google | $5/mo | Gemini, Veo, TTS testing |
| `ELEVENLABS-DEV` | ElevenLabs | $5/mo | Voice synthesis testing |
| `FAL-DEV` | Fal.ai | $5/mo | Image/video generation |

**Total DEV budget: ~$40/month**

### How to Use DEV Keys

```bash
# Generate .env.local for any project
~/launchpad/vault/deploy-keys.sh --env-dev > ~/my-project/.env.local

# Or manually copy from vault
cp ~/launchpad/vault/.keys/ANTHROPIC-DEV ~/my-project/.env.local
```

---

## Production Keys (Created On-Demand)

Only create PROD keys when a project is:
1. Deployed to Vercel/Railway/etc.
2. Accessible to users
3. Generating revenue or leads

| Key ID | Project | Budget | Status |
|--------|---------|--------|--------|
| `ANTHROPIC-PROD-SFTWRKS` | softworkstrading.com | $10/mo | 🟢 Active |
| `ANTHROPIC-PROD-SLOPGPT` | slopgpt.com | $15/mo | 🟢 Active |
| `ANTHROPIC-PROD-ENCORE` | encore app | $5/mo | 🟡 Beta |

### Creating a PROD Key

1. Go to `console.anthropic.com/settings/keys`
2. Create key named: `{PROJECT}-PROD` (e.g., `SFTWRKS-PROD`)
3. Set monthly budget limit in console
4. Add to Vercel: `vercel env add ANTHROPIC_API_KEY production`
5. Register in `~/launchpad/vault/KEY_REGISTRY.yaml`

---

## Key Lifecycle

```
PROJECT CREATED
      │
      ▼
┌─────────────────┐
│  Use DEV keys   │◄──── Default for all new projects
│  from launchpad │
└────────┬────────┘
         │
         │ Project goes to production?
         ▼
┌─────────────────┐
│ Create PROD key │──► Register in KEY_REGISTRY.yaml
│ with budget     │──► Add to Vercel/deployment
└────────┬────────┘
         │
         │ Every 90 days
         ▼
┌─────────────────┐
│   Rotate key    │──► Update in console
│   Update vault  │──► Update deployment
└─────────────────┘
```

---

## Budget Alerts

Set these in each provider's console:

| Provider | Daily Alert | Monthly Limit |
|----------|-------------|---------------|
| Anthropic DEV | $1 | $15 |
| Anthropic PROD (each) | $2 | Per project |
| OpenAI | $0.50 | $10 |
| ElevenLabs | - | $5 |

---

## Incident Reference

**ALFRED Incident (Jan 2026):**
- Single key used everywhere → $85.92/month untracked
- Key stored in Claude Code settings → inherited by all scripts
- **Fix:** Separated DEV/PROD, removed from settings, implemented vault

See: `~/stc/operations/incidents/2026-01-ALFRED-API-BILLING.md`

---

## Quick Reference

```bash
# For local development (any project)
source ~/launchpad/vault/load-dev-keys.sh

# For production deployment
~/launchpad/vault/deploy-keys.sh --create ANTHROPIC-PROD-{PROJECT}
~/launchpad/vault/deploy-keys.sh --deploy {project}

# Check current keys
~/launchpad/vault/deploy-keys.sh --list
```
