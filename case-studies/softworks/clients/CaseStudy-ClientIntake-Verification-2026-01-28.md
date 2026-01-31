# Case Study: Client Intake with Website Verification

**Date:** January 2026
**Project:** Luxury Leasing Academy Lead Intake
**Business Unit:** Softworks (Clients)
**Status:** ✅ COMPLETE

---

## Executive Summary

Built a comprehensive comparison document for a prospective client (Matty Friedman, Luxury Leasing Academy) but made a critical assumption error: assumed "luxury leasing" meant cars, not real estate.

After user feedback, added **Step 0: Verify Website Context** to the `/capture` skill. This prevents building deliverables based on incorrect assumptions.

**Lesson:** Business names are ambiguous. Always verify context before building.

---

## The Problem

### Requirements
- Capture lead from Instagram DM conversation
- Build comparison document for AI assistant options
- Route to correct client folder
- Accurate business context in all deliverables

### Challenge
- Lead mentioned "luxury leasing" and "Mac Mini setup"
- Built entire comparison document assuming luxury CAR leasing
- User caught the error: "Doesn't your intake skill include checking all information?"
- Had to verify website and rebuild deliverables

---

## The Error

### What Happened

1. Received Instagram DM screenshots from Matty asking about Claude Code / Mac Mini
2. Read "Luxury Leasing Academy" and assumed luxury car leasing
3. Built 400+ line comparison document with car leasing examples
4. User asked: "Did you check his website for context?"
5. Checked website → discovered it's about teaching **real estate agents luxury RENTALS**
6. Had to update all client documentation

### Root Cause

- **Assumption based on business name** without verification
- No step in `/capture` skill to verify external context
- "Luxury leasing" could mean cars, real estate, equipment, etc.

---

## Solution

### Step 0 Added to /capture Skill

```markdown
### 0. Verify Context (For Leads/Clients)

**If the entry mentions a business, client, or prospect with a website:**
1. **CHECK THE WEBSITE FIRST** before classifying or building deliverables
2. Extract: Business name, what they actually do, target audience, products/services, contact info
3. Look for: About page, Contact page, footer, social links
4. **Do not assume** based on business name alone (e.g., "Luxury Leasing" could be cars OR real estate)

**This step prevents building documents based on incorrect assumptions.**
```

### Website Verification Findings

| Field | Initial Assumption | Actual (from website) |
|-------|-------------------|----------------------|
| Business | Luxury car leasing | Teaching real estate agents luxury RENTALS |
| Target audience | Car enthusiasts | New/struggling realtors |
| Products | Unknown | Elite Leasing Club, 9+ courses |
| Founder | Unknown | Matty Friedman |
| Email | Unknown | info@luxuryleasingacademy.com |

### Documents Updated

1. `README.md` — Correct business description
2. `clawdbot-options-comparison.md` — All examples updated for real estate
3. `discovery/` notes — Accurate context
4. `/capture` skill — Step 0 verification added

---

## Key Insights

### What Worked
- **User caught the error** — trust but verify culture
- **Website has all context needed** — About page, products, contact info
- **Quick recovery** — Updated all docs in single session

### What We Learned
- **Business names are ambiguous**: "Luxury Leasing" ≠ what you think
- **Verify before building**: 5 minutes of research saves hours of rework
- **Add to skill, not just memory**: Step 0 now catches this systematically

### Known Mistake Pattern (Added to CLAUDE.md)

```markdown
- **Matty/Luxury Leasing (2026-01-28)**: Assumed "luxury car leasing" without
  checking website. Actual business: teaching real estate agents luxury rentals.
  Cause: Business name assumption. Fix: Added Step 0 verification to /capture skill.
```

---

## Files Created/Updated

```
softworks-clients/clients/luxury-leasing-academy/
├── README.md                           # Verified client profile
├── discovery/
│   └── 2026-01-28__initial-conversation.md
├── notes/
│   ├── voice-response-script.md
│   └── ig-dm-message.md
└── proposals/
    └── clawdbot-options-comparison.md  # 4-option comparison (790 lines)

launchpad/.claude/skills/capture/skill.md  # Step 0 added
launchpad/CLAUDE.md                        # Known mistake documented
```

---

## Verification Checklist (New Standard)

For any new lead/client with a website:

- [ ] Visit website
- [ ] Read About page
- [ ] Identify actual products/services
- [ ] Note target audience
- [ ] Find contact email
- [ ] Check social links
- [ ] **THEN** build deliverables

---

## Metrics

| Metric | Value |
|--------|-------|
| Time lost to assumption | ~45 minutes |
| Time to verify website | ~5 minutes |
| Documents requiring update | 4 |
| Future errors prevented | ∞ (skill updated) |

---

## Donovan Protocol Application

- **Problem:** Built wrong deliverable based on assumption
- **Rabbit hole avoided:** Continuing to build on wrong foundation
- **Donovan approach:** "What does this business actually do?"
- **Maximum leverage:** Verify at source (website) before any work

---

*Case study by Softworks Trading Company*
