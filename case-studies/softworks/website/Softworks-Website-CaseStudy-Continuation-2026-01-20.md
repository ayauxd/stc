# Softworks Website Case Study - Continuation
## Time Value Calculator UX Improvements

**Date:** January 20, 2026
**Project:** sftwrks.com
**Component:** Time Value Calculator (Assistant.tsx)
**Previous Case Study:** Softworks-Website-Integration-CaseStudy.pdf (Jan 17, 2026)

---

## Executive Summary

This continuation documents UX improvements made to the Time Value Calculator widget on sftwrks.com. Changes focused on improving comprehension across user skill levels, making collected data meaningful in calculations, and personalizing results.

**Key Outcomes:**
- Calculator now uses team size input to affect results (previously collected but ignored)
- Challenge-specific cost estimation helpers guide users to accurate inputs
- Success goal selection now tailors results messaging
- All jargon ("constraint") replaced with universal language ("process")

---

## Changes Made

### 1. Language Consistency

| Location | Before | After | Rationale |
|----------|--------|-------|-----------|
| Step 5 (Team size) | "People affected by this constraint" | "People affected by this process" | "Constraint" is consulting jargon. Restaurant owners, dentists, retailers don't think in constraints — they think in processes. |
| Results breakdown | "Estimated constraint cost" | "Your monthly cost estimate" | Same rationale. Plain language increases trust. |
| Popup bubble | "What's your constraint costing?" | "Got a slow process?" | Direct question anyone understands. |
| Intro screen | "Find out what your biggest constraint costs you..." | "Tell us about your slowest process. We'll calculate what it costs your business — and what fixing it saves." | Clear promise, action-oriented, business-focused. |

**Design Principle:** Use language your least technical user would say out loud.

---

### 2. Team Size Now Affects Calculation

**Problem:** Team size was collected (Step 5) but completely ignored in the calculation. Users answered a question that didn't matter.

**Solution:** Recovery percentages now scale with team size.

| Team Size | Multiplier | Conservative Recovery | Potential Recovery |
|-----------|------------|----------------------|-------------------|
| Just me | 1 | 30% | 60% |
| 2-5 people | 3 | 31% | 61% |
| 6-15 people | 8 | 32% | 62% |
| 16-50 people | 25 | 35% | 68% |
| 50+ people | 50 | 40% | 75% |

**Logic:** Larger teams = more people benefit from a fixed process = higher recovery potential.

**Code Change:**
```javascript
// Before
const conservative = Math.round(baseCost * 0.35);
const potential = Math.round(baseCost * 0.7);

// After
const teamFactor = Math.min(teamMultiplier / 50, 1);
const conservativeRate = 0.30 + (teamFactor * 0.10);
const potentialRate = 0.60 + (teamFactor * 0.15);
const conservative = Math.round(baseCost * conservativeRate);
const potential = Math.round(baseCost * potentialRate);
```

**Design Principle:** Every input should affect the output. Don't waste user effort.

---

### 3. Cost Estimation Helper

**Problem:** Asking "How much does X cost per month?" is difficult. Most users have never calculated this. They either guess wildly or abandon.

**Solution:** Added a contextual helper box showing a simple formula and example based on challenge type.

| Challenge Type | Formula | Example |
|----------------|---------|---------|
| Admin overload | Hours on admin/week × hourly rate × 4 weeks | 10 hrs/week × $50/hr = $2,000/month |
| Customer response time | Leads lost/month × average deal value | 5 cold leads × $1,000 deal = $5,000/month |
| Team handoffs | Time on handoffs × people involved × hourly rate | 2 hrs/week × 4 people × $40/hr = $1,280/month |
| Data & reporting | Hours on reports × hourly rate × 4 weeks | 8 hrs/week × $60/hr = $1,920/month |
| Content creation | Hours creating content × hourly rate × 4 weeks | 15 hrs/week × $50/hr = $3,000/month |
| Custom (Other) | Hours spent × hourly cost × 4 weeks | 10 hrs/week × $50/hr = $2,000/month |

**Design Principle:** Reduce cognitive load at high-friction moments. The cost input is where users decide to commit or abandon.

---

### 4. Goal-Tailored Results

**Problem:** Success goal was collected (Step 6) but not used. Results felt generic regardless of what the user said they wanted.

**Solution:** Added a personalized insight card based on selected goal.

| Goal Selected | Icon | Insight Message |
|---------------|------|-----------------|
| Reclaim time each week | ⏱️ | "At an average rate, that's potentially X hours/month you could redirect to high-value work." |
| Handle more without hiring | 📈 | "This capacity gain could help you scale output without adding headcount." |
| Reduce errors & rework | ✓ | "Fewer mistakes means less time fixing problems and more time moving forward." |
| Faster customer response | ⚡ | "Faster responses mean warmer leads and better close rates." |

**Design Principle:** Echo user input in results. Personalization increases perceived value and trust.

---

## User Journey Analysis

### Persona A: Tech Novice (Restaurant Owner, 52)

| Step | Experience | Design Support |
|------|------------|----------------|
| Popup | "Got a slow process?" resonates | Plain language |
| Challenge | Pre-defined options, no typing required | Reduces friction |
| Cost Input | **Helper is essential** — enables calculation | Formula + example |
| Results | "40 hours/month" resonates emotionally | Goal-tailored insight |

**Ideal Entry:** Popup bubble (appears after 4 seconds)

### Persona B: Average User (Marketing Manager, 34)

| Step | Experience | Design Support |
|------|------------|----------------|
| Flow | Quick, can skip name | Respects time |
| Challenge | "Data & reporting" matches exactly | Good option coverage |
| Cost Input | Helper confirms intuition | Validates thinking |
| Results | Professional validation of their case | Goal insight |

**Ideal Entry:** Direct click on calculator button

### Persona C: Pro User (Operations Director, 41)

| Step | Experience | Design Support |
|------|------------|----------------|
| Challenge | Uses "Something else" for specific issue | Custom input available |
| Team Size | Expects scaling logic, sees it | Transparent math |
| Results | Verifies all inputs reflected | Full breakdown |
| Disclaimer | Appreciates honesty | "Fair range estimate" |

**Ideal Entry:** Direct link or scroll to calculator

---

## Input → Output Flow

```
Name (optional)     → Personalizes results: "Sarah, here's what..."
Region              → Filters currency options
Currency            → Formats all money values
Challenge           → Selects cost helper formula
                    → Appears in results breakdown
Team Size           → AFFECTS CALCULATION (30-40% → 60-75%)
                    → Appears in results breakdown
Success Goal        → TAILORS RESULTS MESSAGE
                    → Appears in results breakdown
Monthly Cost        → BASE FOR ALL CALCULATIONS
```

---

## Technical Details

**File Modified:** `components/Assistant.tsx`

**Lines Changed:** 98 insertions, 15 deletions

**New Functions Added:**
- `getCostHelperText(challenge: string)` — Returns formula and example based on challenge type
- `getGoalInsight(goal: string, potential: number)` — Returns icon and message based on success goal

**Build Status:** Pass
**TypeScript Check:** Pass
**Deployment:** Vercel production (commit e632375)

---

## Design Principles Applied

1. **Plain Language:** Use words your least technical user would say
2. **Meaningful Inputs:** Every question should affect the output
3. **Reduce Cognitive Load:** Help users at high-friction moments
4. **Personalization:** Echo user input in results
5. **Transparency:** Show users how their inputs were used
6. **Honesty:** "Fair range estimate, not a quote"

---

## Files Reference

| File | Purpose |
|------|---------|
| `components/Assistant.tsx` | Main calculator component |
| `constants.ts` | Challenge, team size, success goal options |
| `types.ts` | TypeScript interfaces |

---

## Deployment

**Commit:** e632375
**Message:** "feat: Time Value Calculator UX improvements - team size affects calculation, cost helper, goal-tailored results, consistent language"
**Live URL:** https://sftwrks.com

---

## 5. Slack Integration (Added Same Day)

**Problem:** Form submissions only went to email. No real-time notification for the team.

**Solution:** Added Slack Incoming Webhook that fires after successful Formspree submission.

### Notification Format

```
💰 New Time Value Calculator Submission
───────────────────────────────────────
Name:           Sarah Chen
Email:          sarah@example.com

Challenge:      Admin overload
Team Size:      6-15 people

Monthly Cost:   $3,000
Success Goal:   Reclaim time each week
───────────────────────────────────────
Potential Recovery: $960 - $1,860/mo

Region: NA | Currency: USD
```

### Implementation

```typescript
// After successful Formspree submission
if (SLACK_WEBHOOK_URL) {
  fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      text: `💰 New Time Value Calculator...`,
      blocks: [/* Slack Block Kit format */]
    })
  }).catch(err => console.error('Slack notification failed:', err));
}
```

**Key Design Decision:** Non-blocking. If Slack fails, user still sees success. No degraded UX.

**Channel:** #leads
**Commit:** 82fafc8

---

## System Architecture (Final)

```
User completes calculator
        ↓
    Submits email
        ↓
┌───────────────────┐
│    Formspree      │ ──→ Email to agents@sftwrks.com
│  (Primary store)  │
└───────────────────┘
        ↓ (on success)
┌───────────────────┐
│  Slack Webhook    │ ──→ #leads channel notification
│   (Non-blocking)  │
└───────────────────┘
        ↓
   User sees "Sent!"
```

---

## Next Steps (Potential)

- [x] ~~Slack integration~~ (completed Jan 20)
- [ ] Add industry selection for more specific challenge options
- [ ] Explain calculation method in results (build trust)
- [ ] A/B test popup timing (currently 4 seconds)
- [ ] Track completion rates by step

---

*Document prepared: January 20, 2026*
*Updated: January 20, 2026 (Slack integration)*
*Author: Claude Code (Softworks Development)*
