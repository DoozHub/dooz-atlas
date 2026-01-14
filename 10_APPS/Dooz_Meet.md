# Dooz Meet

> Meeting Intelligence Platform — Capture, transcribe, and extract intelligence from meetings

---

## Overview

Dooz Meet is an AI-powered meeting intelligence platform that captures audio, transcribes speech, and extracts actionable insights using LLMs.

```
┌──────────────────────────────────────────────────────────────┐
│                       DOOZ MEET                              │
├──────────────────────────────────────────────────────────────┤
│  🎙️ Recording          │  📝 Transcription (Whisper)        │
│  🧠 LLM Analysis        │  🔗 Brain Integration              │
│  ✅ Task Sync           │  📊 Decision Extraction            │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Audio Recording** | Capture meeting audio with speaker detection |
| **Transcription** | Real-time transcription using OpenAI Whisper API |
| **AI Extraction** | Extract decisions, action items, and topics via LLM |
| **Brain Integration** | Store meeting OMOs in dooz-brain |
| **Task Sync** | Push action items to quicky/worklog |

---

## Pipeline Architecture

```
Recording → Whisper Transcription → LLM Analysis → Brain OMOs → Task Sync
```

---

## OMO Types

| Type | Description |
|------|-------------|
| `meeting` | Meeting metadata, participants, and timestamps |
| `decision` | Decisions made during the meeting |
| `action_item` | Tasks assigned to attendees |
| `summary` | AI-generated meeting summary |

---

## Integration Points

| Integration | Purpose |
|-------------|---------|
| **dooz-brain** | Store meeting OMOs with rich context |
| **quicky** | Sync action items as tasks |
| **worklog** | Track meeting time for productivity |
| **dooz-oracle** | Confidence scoring for extracted items |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | DoozieSoft Design System |
| **State** | Zustand |
| **API** | Whisper API, Anthropic/Claude |
| **Storage** | Dooz Sync, dooz-brain |

---

## Quick Start

```bash
pnpm install
pnpm dev
```

---

## API Integrations

### Transcription (Whisper)

```typescript
import { transcribeAudio } from './api/transcription';

const transcript = await transcribeAudio(audioFile);
// Returns structured transcript with speaker labels
```

### Extraction (LLM)

```typescript
import { extractInsights } from './api/extraction';

const insights = await extractInsights(transcript, {
  extractDecisions: true,
  extractActionItems: true,
  extractTopics: true,
});
// Returns structured meeting insights
```

### Brain Integration

```typescript
import { storeInBrain } from './api/brain';

await storeInBrain({
  type: 'meeting',
  participants: ['user1', 'user2'],
  decisions: [...],
  actionItems: [...],
});
```

---

## Related Documentation

- [Brain Integration](../09_ECOSYSTEM/Brain_Integration.md)
- [Cartridge Guide](../09_ECOSYSTEM/Cartridge_Guide.md)
- [Sync Integration](../09_ECOSYSTEM/Dooz_Sync_Integration.md)

---

*Repository: DoozHub/dooz-meet*
