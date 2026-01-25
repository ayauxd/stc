# Case Study: Chief of Staff - Multi-Implementation Voice Assistant

**Date:** January 2026 (ongoing development)
**Project:** Chief of Staff Workspace
**Components:** Alfred (GUI), Mr. Alfredo (State Machine), Alfred Nano (Fine-tuning)
**Outcome:** Production voice assistant with offline fallbacks and custom persona training

---

## Executive Summary

Built a comprehensive voice assistant ecosystem with three distinct implementations: a Matrix-themed GUI assistant, a state machine-based assistant with offline capabilities, and a fine-tuning pipeline for custom persona development. The system coordinates between multiple AI providers (Claude, OpenAI, Gemini, local models) with graceful degradation.

---

## The Problem

### Requirements
1. Always-available voice assistant (works offline)
2. Custom persona that reflects user's communication style
3. Visual interface that's engaging but not distracting
4. Integration with conversation history (850+ archived chats)

### Challenge
No single AI provider or architecture met all requirements. Needed a layered approach.

---

## Solution: Three-Layer Architecture

### Layer 1: Alfred (GUI) - `alfred/`

**Purpose**: Primary interface with visual feedback

**Stack**:
- PyQt6 with Matrix-style theming (binary rain, HUD elements)
- Whisper STT → Claude API → ElevenLabs TTS
- Conversation history search with indexed JSON

**Key Features**:
- Wake word detection
- Daily AI news aggregation from YouTube feeds
- Skills generation and image generation tools
- Indexes 857+ conversations for context retrieval

### Layer 2: Mr. Alfredo (State Machine) - `mr_alfredo/`

**Purpose**: Reliable core with offline fallbacks

**State Flow**:
```
IDLE → WAKE_LISTENING → WAKE_DETECTED → COMMAND_LISTENING
     → TRANSCRIBING → THINKING → SPEAKING → (loop)
```

**Offline Capabilities**:
- Vosk STT (local speech recognition)
- pyttsx3 TTS (local text-to-speech)
- Echo LLM fallback (basic responses)
- Ollama integration for local LLMs

**Key Patterns**:
- All GUI updates through `_safe_gui_call()` using Tkinter's `after()`
- Error states auto-recover to WAKE_LISTENING or IDLE
- Thread-safe state management with `threading.RLock`

### Layer 3: Alfred Nano (Fine-tuning) - `alfred-training/`

**Purpose**: Custom persona baked into model weights

**Two-Layer Approach**:
1. **Runtime Profile** (`alfred_profile.txt`) - Personal context injected every session
2. **SFT Persona** - Voice/style baked into model via fine-tuning

**Training Pipeline**:
```bash
# Extract prompts from ChatGPT export
python3 extract_short_prompts.py --limit 2000

# Run nanochat baseline
bash speedrun.sh

# Run Alfred SFT
python -m scripts.chat_sft --source=mid --run=alfred-sft --num_epochs=1
```

---

## Multi-Agent Coordination

The workspace coordinates between multiple AI systems:

| Agent | Role | Location |
|-------|------|----------|
| Codex | Fast intake, OCR, categorization | `~/Downloads/Workbench/` |
| Claude | Analysis, documentation, quality | Chief of Staff |
| Gemini | Projects, Google Drive sync | `~/HomeOffice/` |

**Handoff Format**: `CLAUDE-RESPONSE-TO-CODEX.json`

---

## API Integration

| Service | Purpose | Required |
|---------|---------|----------|
| Anthropic | Claude AI (primary LLM) | Yes |
| ElevenLabs | High-quality TTS | Optional |
| OpenAI | GPT models, Whisper STT | Optional |
| Gemini | Image generation | Optional |
| Picovoice | Wake word detection | Optional |

---

## Key Insights

### What Worked
1. **State machine architecture** - Predictable behavior, easy debugging
2. **Offline fallbacks** - Never completely fails
3. **Runtime profile** - Easy to update without retraining
4. **Thread-safe GUI updates** - No race conditions

### What We Learned
- Voice assistants need multiple failure modes
- Users prefer consistency over capability
- Fine-tuning is worth it for persona, not for knowledge
- Separation of concerns (GUI vs logic) is critical

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                     Chief of Staff                           │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Alfred    │  │ Mr. Alfredo │  │   Alfred Training   │  │
│  │   (GUI)     │  │ (State Mch) │  │   (Fine-tuning)     │  │
│  ├─────────────┤  ├─────────────┤  ├─────────────────────┤  │
│  │ PyQt6       │  │ Tkinter     │  │ nanochat            │  │
│  │ Matrix UI   │  │ Thread-safe │  │ LoRA/SFT            │  │
│  │ ElevenLabs  │  │ Offline OK  │  │ Runtime Profile     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   Codex Skills                          │ │
│  │  PDF | Spreadsheet | Document | Code-Review             │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                  LLM Archive                            │ │
│  │  857+ conversations | Audio transcripts | Business docs │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Metrics

| Metric | Value |
|--------|-------|
| Voice assistant implementations | 3 |
| Archived conversations indexed | 857+ |
| Offline capability | Full (degraded) |
| API providers integrated | 5 |
| Fine-tuning pipeline | Operational |

---

## macOS Notes

- **Microphone**: System Settings → Privacy → Microphone → Terminal
- **PortAudio**: `brew install portaudio`
- **Vosk models**: Download to `~/.alfred/models/`
