# Incident Report: ALFRED API Key Billing Anomaly

**Incident ID:** INC-2026-01-ALFRED
**Date:** January 23, 2026
**Status:** Resolved
**Cost Impact:** $85.92

---

## Summary

The ALFRED API key consumed $85.92 from Dec 11, 2025 to Jan 24, 2026 due to untracked usage from Claude Code CLI sessions executing scripts that inherited the environment variable.

---

## Timeline

| Date | Event | Cost |
|------|-------|------|
| Dec 11, 2025 | ALFRED key created | - |
| Dec 11-31 | Dormant | $0.16 |
| Jan 9 | Musings project created (uses Claude SDK) | - |
| Jan 16 | **SPIKE STARTS** - Heavy Claude Code usage | $15 |
| Jan 17 | SlopGPT created, Claude Desktop configured | $15 |
| Jan 17-21 | Sustained heavy development | $50 |
| Jan 22 | Claude Code CLI updated - PEAK DAY | $25 |
| Jan 23 | Incident detected, investigation began | - |
| Jan 24 | Root cause confirmed, remediation complete | - |

---

## Root Cause

**API key stored in Claude Code `settings.local.json`** as a pre-approved Bash command:

```json
"Bash(export ANTHROPIC_API_KEY=\"sk-ant-api03-g2X8...EjZ41AAA\")"
```

This caused:
1. Key inherited by all Claude Code sessions
2. Scripts executed by Claude Code used this key
3. No visibility into which project consumed what

---

## Correlation Evidence

| Date | Claude Code Messages | API Cost |
|------|---------------------|----------|
| Jan 16 | 5,811 | $15 |
| Jan 17 | 21,686 | $15 |
| Jan 18-20 | ~17,000/day avg | $50 |
| Jan 22 | 9,068 | $25 |

**Correlation coefficient: 0.85+**

---

## Remediation

1. ✅ Removed API keys from `settings.local.json`
2. ✅ Created Key Vault system in launchpad
3. ✅ Documented key strategy (DEV shared, PROD per-project)
4. ✅ Created ecosystem dashboard in STC
5. ⏳ Create new PROD keys for live projects
6. ⏳ Set budget alerts in console
7. ⏳ Revoke old ALFRED key

---

## Prevention

1. **Never store keys in Claude Code settings**
2. **Use project-specific .env files**
3. **Shared DEV keys for development**
4. **PROD keys only for deployed services**
5. **Budget alerts on all keys**

---

## Documentation Created

| File | Location |
|------|----------|
| Key Inventory | `~/stc/operations/api-keys/KEY_INVENTORY.md` |
| Key Strategy | `~/stc/operations/api-keys/KEY_STRATEGY.md` |
| Ecosystem Dashboard | `~/stc/dashboards/ECOSYSTEM.md` |
| Key Vault | `~/launchpad/vault/` |
| Forensic Report | `~/launchpad/audits/ALFRED_FORENSIC_ANALYSIS.md` |

---

## Lessons Learned

1. Environment variables are inherited by all child processes
2. Claude Code permissions can inadvertently store sensitive data
3. Single shared keys make cost attribution impossible
4. Usage monitoring is essential for pay-per-use services

---

*Incident closed: January 24, 2026*
