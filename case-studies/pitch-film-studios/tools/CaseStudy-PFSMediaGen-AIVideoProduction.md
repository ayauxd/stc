# Case Study: PFS Media Gen - AI Video Production Pipeline

**Date:** January 2026
**Project:** Pitch Film Studios Media Generation
**Purpose:** Automated video production with multi-provider AI
**Outcome:** Cost-effective video generation at $0.05-0.40/second

---

## Executive Summary

Built an automated video production pipeline that intelligently selects between multiple AI video providers based on requirements (quality, duration, cost). The system handles the complete workflow from shot planning through final export, including AI voiceover generation and audio mixing.

---

## The Problem

### Challenges
1. AI video generation is expensive and inconsistent
2. Different providers excel at different use cases
3. Manual provider selection wastes time and money
4. Audio integration requires multiple tools

### Goal
Create a unified pipeline that:
- Automatically selects the best provider per shot
- Handles voiceover generation
- Mixes audio with video
- Exports production-ready content

---

## Solution: Multi-Provider Smart Mix

### Provider Selection Matrix

| Provider | Best For | Cost/sec | Max Duration | Quality |
|----------|----------|----------|--------------|---------|
| Luma Ray3 | Long clips, motion | $0.066 | 20s | High |
| Veo 2 | Quality statics | $0.10 | 8s | Very High |
| Veo 3.1 | Premium + audio | $0.40 | 8s | Highest |
| Runway Turbo | Fast iteration | $0.05 | 10s | Good |

### Smart Selection Logic

```python
def select_provider(shot):
    if shot.duration > 10:
        return "luma_ray3"  # Only one that handles long clips
    if shot.requires_audio:
        return "veo_3.1"    # Native audio support
    if shot.is_static:
        return "veo_2"      # Best quality for stills
    if shot.is_iteration:
        return "runway"     # Cheapest for testing
    return "luma_ray3"      # Default balance
```

---

## Production Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  1. PLAN SHOTS                                              │
│     bench_trailer_smart_mix.py                              │
│     - Parse script/storyboard                               │
│     - Assign providers per shot                             │
│     - Estimate costs                                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  2. GENERATE VIDEO                                          │
│     Veo 2 / Luma Ray3 / Runway                              │
│     - Submit prompts to selected providers                  │
│     - Poll for completion                                   │
│     - Download and validate                                 │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  3. GENERATE VOICEOVER                                      │
│     ElevenLabs TTS                                          │
│     - Script to speech                                      │
│     - Voice cloning (if needed)                             │
│     - Timing alignment                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  4. MIX AUDIO                                               │
│     audio_integration.py                                    │
│     - Voiceover + ambience                                  │
│     - Music bed                                             │
│     - Level normalization                                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  5. EXPORT                                                  │
│     ffmpeg                                                  │
│     - Concatenate clips                                     │
│     - Add transitions                                       │
│     - Final encode                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Scripts

| Script | Purpose |
|--------|---------|
| `bench_trailer_smart_mix.py` | Multi-provider shot generation |
| `audio_integration.py` | Voiceover + ambience mixing |
| `chanel_ad_generator.py` | Full production reference |

---

## API Key Management

Uses Launchpad vault for secure key storage:

```bash
python ~/launchpad/vault/vault.py status
```

| Key | Required | Provider |
|-----|----------|----------|
| GEMINI_API_KEY | Yes | Veo 2/3.1 |
| ELEVENLABS_API_KEY | Yes | Voiceover |
| LUMA_API_KEY | Optional | Luma Ray3 |
| RUNWAY_API_KEY | Optional | Runway |
| FAL_API_KEY | Optional | Fal.ai models |

---

## Canvas Integration

For resource-intensive tasks, the system integrates with Launchpad's canvas monitoring:

```bash
# Before long ffmpeg encodes
/canvas system

# Check for updates
canvas-check
```

Auto-spawns when running tasks matching: `comfyui|persona|render|generate`

---

## Cost Analysis

### Example: 60-second trailer

| Component | Provider | Duration | Cost |
|-----------|----------|----------|------|
| Opening shot | Veo 2 | 8s | $0.80 |
| Motion sequence | Luma Ray3 | 20s | $1.32 |
| Product shots (3x) | Veo 2 | 24s | $2.40 |
| Closing | Veo 3.1 | 8s | $3.20 |
| **Video Total** | | 60s | **$7.72** |
| Voiceover | ElevenLabs | 60s | ~$0.30 |
| **Grand Total** | | | **~$8.00** |

Compare to: Traditional video production = $5,000-50,000

---

## Key Insights

### What Worked
1. **Provider diversity** - No single provider is best for everything
2. **Smart selection** - Algorithm reduces costs 40-60%
3. **Vault integration** - Secure API key management
4. **Canvas monitoring** - Prevents system overload

### What We Learned
- AI video quality varies significantly by prompt style
- Longer clips (>10s) limit provider options
- Audio sync is harder than video generation
- Iteration is cheap with Runway, polish with Veo

---

## Metrics

| Metric | Value |
|--------|-------|
| Providers integrated | 4 |
| Cost per second | $0.05-0.40 |
| Max clip duration | 20s (Luma) |
| Voiceover integration | ElevenLabs |
| Export format | MP4 (H.264) |

---

## Future Improvements

- [ ] Add Sora integration when available
- [ ] Implement A/B testing for prompts
- [ ] Build shot library for reuse
- [ ] Add automatic thumbnail generation
