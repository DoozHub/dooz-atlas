# Dooz Brain

> AI-powered Personal Knowledge Base

---

## Overview

Dooz Brain is a local-first personal knowledge management application that uses AI to help you organize, connect, and query your knowledge. All data stays on your device with optional encrypted cloud sync.

```
┌──────────────────────────────────────────────────────────────┐
│                       DOOZ BRAIN                             │
├──────────────────────────────────────────────────────────────┤
│  🧠 AI-Powered        │  📝 Markdown Notes                   │
│  🔗 Graph Connections │  🔍 Semantic Search                  │
│  💾 Local-First       │  🔒 E2E Encrypted Sync               │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **AI Assistant** | Query your knowledge in natural language |
| **Knowledge Graph** | Visual connections between notes |
| **Semantic Search** | Find related content automatically |
| **Markdown Editor** | Rich editing with live preview |
| **Local-First** | All data stored locally, works offline |
| **E2E Sync** | Encrypted sync via Dooz Sync |
| **Cartridges** | Extensible AI capabilities |

---

## Pricing Model

### App Tiers

| Tier | Notes | AI Queries | Storage | Price |
|------|-------|-----------|---------|-------|
| **Free** | 500 | 50/mo | Local only | $0 |
| **Personal** | Unlimited | 500/mo | 5 GB cloud | $7.99/mo |
| **Pro** | Unlimited | 2,000/mo | 25 GB cloud | $14.99/mo |
| **Team** | Unlimited | 10,000/mo | 100 GB/user | $24.99/user/mo |

### AI Model Access

| Model Tier | Models Included | Price |
|------------|-----------------|-------|
| **Standard** | GPT-4o-mini, Claude Haiku | Included |
| **Advanced** | GPT-4o, Claude Sonnet | +$5/mo |
| **Premium** | GPT-4, Claude Opus, Gemini Pro | +$15/mo |

### Add-ons

| Add-on | Price |
|--------|-------|
| Extra AI queries (1,000) | $4.99 |
| Extra storage (10 GB) | $1.99/mo |
| Custom embeddings | $9.99/mo |
| API access | $19.99/mo |

---

## Licensing

### Desktop App

**Freemium Model**:
- Free tier with core features
- Paid subscription for advanced features
- One-time purchase option: $149 (lifetime)

### License Terms

| License Type | Terms |
|--------------|-------|
| Personal | Single user, up to 3 devices |
| Family | Up to 5 family members |
| Team | Per-seat licensing |
| Enterprise | Volume licensing available |

### Open Source Components

- Tauri framework (MIT)
- SQLite (Public Domain)
- Markdown parser (MIT)

---

## Roadmap

### Phase 1: Core Editor ✅
- [x] Markdown editor with live preview
- [x] Local SQLite database
- [x] File attachment support
- [x] Basic search functionality

### Phase 2: Knowledge Graph
- [ ] Bidirectional linking
- [ ] Graph visualization
- [ ] Tag-based organization
- [ ] Backlinks panel
- [ ] Daily notes

### Phase 3: AI Integration
- [ ] Natural language queries
- [ ] Auto-tagging
- [ ] Smart suggestions
- [ ] Summary generation
- [ ] Writing assistance

### Phase 4: Sync & Mobile
- [ ] Dooz Sync integration
- [ ] Multi-device sync
- [ ] Mobile companion app
- [ ] Web clipper extension

### Phase 5: Collaboration
- [ ] Shared workspaces
- [ ] Real-time co-editing
- [ ] Comments & annotations
- [ ] Version history
- [ ] Publishing

### Phase 6: Advanced AI
- [ ] Custom knowledge embeddings
- [ ] RAG-powered search
- [ ] Voice notes transcription
- [ ] Image understanding
- [ ] Research assistant

---

## Platforms

| Platform | Technology | Status |
|----------|------------|--------|
| Windows | Tauri | Beta |
| macOS | Tauri | Beta |
| Linux | Tauri | Beta |
| iOS | Flutter | Planned |
| Android | Flutter | Planned |
| Web | React | Planned |

---

## Related Documentation

- [Brain Integration](../07_IMPLEMENTATION/BRAIN_INTEGRATION.md)
- [Cartridge Guide](../07_IMPLEMENTATION/CARTRIDGE_GUIDE.md)
- [Intent Language](../07_IMPLEMENTATION/INTENT_LANG.md)
