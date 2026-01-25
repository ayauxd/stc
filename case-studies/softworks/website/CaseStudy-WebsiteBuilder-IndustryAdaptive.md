# Case Study: Industry-Adaptive Website Builder Skill

**Date:** January 2026 (2-week period)
**Project:** VtF Marketing → Website Builder Hub
**Origin:** View the Future Land Trust nonprofit website
**Outcome:** Reusable skill that auto-adapts to 10 different industries

---

## Executive Summary

Transformed a single-purpose nonprofit website template into a comprehensive, industry-adaptive website building skill. The system analyzes client information and automatically applies appropriate design patterns, color psychology, content strategies, and technical implementations based on detected industry type.

---

## The Problem

### Initial State
- Had a nonprofit website template (View the Future Land Trust)
- Each new client website required manual adaptation
- No systematic way to apply industry-specific best practices
- Media asset sourcing was ad-hoc

### Goal
Create a reusable skill that could build websites for ANY industry while maintaining quality and consistency.

---

## Solution Architecture

### Industry Auto-Detection System

The skill analyzes client information and detects one of 10 supported industries:

| Industry | Color Psychology | Animation | Key CTAs |
|----------|-----------------|-----------|----------|
| Nonprofit | Trust blues, earth tones | Subtle | Donate, Volunteer |
| SaaS | Tech blues, purples | Dynamic | Free Trial, Demo |
| E-commerce | Urgency reds, trust blues | Product-focused | Buy Now, Add to Cart |
| Healthcare | Calming greens, whites | Minimal | Book Appointment |
| Restaurant | Warm oranges, reds | Food imagery | Order Now, Reserve |
| Real Estate | Luxury golds, professional blues | Property tours | Schedule Viewing |
| Education | Academic blues, growth greens | Engaging | Enroll, Learn More |
| Professional Services | Corporate blues, grays | Conservative | Contact, Get Quote |
| Creative/Portfolio | Bold, expressive | Showcase-heavy | View Work, Hire Me |
| Media/Entertainment | Vibrant, dynamic | High-energy | Subscribe, Watch |

### Skill File Structure

```
.claude/skills/website-builder/
├── SKILL.md              # Main workflow and instructions
├── INDUSTRY-TEMPLATES.md # 10 industry configurations
├── MEDIA-APIS.md         # Unsplash, Replicate, Luma integration
├── LOGO-SPECS.md         # Logo formats, animations, favicons
├── DESIGN-SYSTEM.md      # Colors, typography, spacing
├── COMPONENTS.md         # Reusable React components
├── CHECKLIST.md          # Full project checklist
└── HANDOVER-TEMPLATE.md  # Client documentation
```

### Media API Integration

When Claude can't generate assets natively:

| Provider | Use Case | Cost |
|----------|----------|------|
| Unsplash | Stock photos | Free |
| Pexels | Stock photos | Free |
| Replicate/Flux | AI-generated images | ~$0.003/image |
| Luma AI | AI-generated video | ~$0.50-2/video |
| Lucide/Heroicons | Icons | Free (npm) |

---

## Technical Implementation

### Stack
- **Framework**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **CMS**: Sanity.io (headless)
- **Deploy**: Vercel
- **Email**: Resend or Mailchimp

### Quality Gates
- No TypeScript errors before commit
- Lighthouse score >90 before launch
- Mobile-first responsive design
- WCAG 2.1 AA accessibility

### Usage Modes

```
/website-builder <client-name> [mode]
```

| Mode | Use Case |
|------|----------|
| `new` | Create website from scratch |
| `upgrade` | Redesign existing site |
| `audit` | Check against best practices |
| `presentation` | Client pitch deck only |
| `media` | Source/generate visual assets |

---

## Key Insights

### What Worked
1. **Industry templates** - Pre-configured patterns saved hours per project
2. **Media API fallbacks** - Multiple options when one provider fails
3. **Checklist-driven** - Nothing forgotten in handoff

### What We Learned
- Different industries have vastly different user expectations
- Color psychology significantly impacts conversion
- Animation intensity must match industry norms (healthcare: minimal, entertainment: high)

---

## Metrics

| Metric | Before | After |
|--------|--------|-------|
| Industries supported | 1 (nonprofit) | 10 |
| Time to first draft | 4-6 hours | 1-2 hours |
| Manual configuration | High | Auto-detected |
| Asset sourcing | Ad-hoc | Systematic APIs |
| Client handoff docs | None | Template-based |

---

## Files Delivered

| Deliverable | Location |
|-------------|----------|
| Main skill | `/Users/fredpro/vtf-marketing/.claude/skills/website-builder/` |
| Industry configs | `INDUSTRY-TEMPLATES.md` |
| Media integration | `MEDIA-APIS.md` |
| Component library | `COMPONENTS.md` |
| Design system | `DESIGN-SYSTEM.md` |
