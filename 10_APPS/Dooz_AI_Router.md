# @dooz/ai-router

> Multi-provider LLM router with smart routing and fallback support

---

## Overview

The AI Router provides intelligent routing of LLM requests across multiple providers with automatic failover, smart model selection, and usage tracking.

```
┌──────────────────────────────────────────────────────────────┐
│                      DOOZ AI ROUTER                          │
├──────────────────────────────────────────────────────────────┤
│  🔀 Multi-provider support │  🧠 Smart routing               │
│  ⛓️ Fallback chain         │  🔄 Streaming support           │
│  📊 Usage tracking         │  ⚡ Latency optimization        │
└──────────────────────────────────────────────────────────────┘
```

---

## Features

- **🔀 Multi-provider support**: OpenRouter, Ollama, OpenAI, Anthropic, Gemini
- **🧠 Smart routing**: Automatic model selection based on task type
- **⛓️ Fallback chain**: Automatic failover to backup providers
- **🔄 Streaming support**: Real-time response streaming
- **📊 Usage tracking**: Token counts and latency metrics

---

## Installation

```bash
bun add @dooz/ai-router
```

---

## Quick Start

```typescript
import { createRouter } from '@dooz/ai-router';

const router = createRouter({
  providers: [
    { type: 'openrouter', apiKey: process.env.OPENROUTER_API_KEY },
    { type: 'ollama', baseUrl: 'http://localhost:11434' },
  ],
  defaultProvider: 'openrouter',
  fallbackChain: ['ollama'],
  smartRouting: true,
});

// Complete a request
const response = await router.complete({
  messages: [{ role: 'user', content: 'Summarize this document...' }],
  taskType: 'summarization',
});

console.log(response.content);
console.log(`Model: ${response.model}, Latency: ${response.latencyMs}ms`);
```

---

## Environment-based Setup

```typescript
import { createRouterFromEnv } from '@dooz/ai-router';

// Reads from OPENROUTER_API_KEY, OLLAMA_BASE_URL, etc.
const router = createRouterFromEnv();
```

---

## Task Types

Smart routing selects optimal models based on task:

| Task Type | Recommended Model |
|-----------|-------------------|
| `extraction` | gpt-4o-mini |
| `summarization` | claude-3-haiku |
| `comparison` | claude-3.5-sonnet |
| `risk_analysis` | claude-3.5-sonnet |
| `code_generation` | claude-3.5-sonnet |
| `reasoning` | gpt-4o |
| `general` | gpt-4o-mini |

---

## Streaming

```typescript
for await (const chunk of router.stream({
  messages: [{ role: 'user', content: 'Write a story...' }],
})) {
  process.stdout.write(chunk.content);
  if (chunk.done) break;
}
```

---

## Provider Availability

```typescript
const available = await router.checkAvailability();
// { openrouter: true, ollama: false }
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | TypeScript |
| **Runtime** | Bun, Node.js |
| **Providers** | OpenRouter, Ollama, OpenAI, Anthropic, Gemini |

---

## Related Documentation Routing

- [Model Policy](../01_SOP/Model_Routing_Policy.md)
- [Model Catalog](../08_APPENDIX/Model_Catalog.md)
- [2026 AI Model Landscape](../08_APPENDIX/Model_Landscape_2026.md)

---

*Repository: DoozHub/dooz-ai-router*
