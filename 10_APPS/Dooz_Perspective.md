# Dooz Perspective

> AI-Powered Multi-LLM Document Cross-Verification System

---

## Overview

Dooz Perspective is a document verification platform that uses multiple AI models to cross-verify content, detect inconsistencies, and identify risks with high confidence.

```
┌──────────────────────────────────────────────────────────────┐
│                     DOOZ PERSPECTIVE                         │
├──────────────────────────────────────────────────────────────┤
│  🤖 Multi-LLM Verification │  📄 Document Processing         │
│  ⚡ Risk Detection         │  📊 Detailed Reports            │
│  🔐 Dooz Core Integration  │  🎯 Consensus Analysis          │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Multi-LLM Verification** | Uses 4 AI agents (Verifier A, B, Auditor, Synthesizer) |
| **Document Processing** | Supports PDF, DOCX, and text files |
| **Risk Detection** | Identifies critical issues and misalignments |
| **Detailed Reports** | Comprehensive reports with confidence scores |
| **Dooz Core Integration** | Authentication, licensing, and subscription |

---

## Verification Pipeline

```
Source Files → Verifier A (Claude) → Initial Analysis
                    ↓
Target File → Verifier B (GPT-4) → Cross-Verification
                    ↓
              Auditor (Haiku) → Conflict Detection
                    ↓
           Synthesizer (Claude) → Final Report
```

---

## AI Agents

| Agent | Model | Role |
|-------|-------|------|
| Verifier A | Claude | Initial analysis of source documents |
| Verifier B | GPT-4 | Cross-verification against target |
| Auditor | Haiku | Conflict detection and risk identification |
| Synthesizer | Claude | Final report generation |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Bun, Hono, TypeScript |
| **Frontend** | React 19, Vite 7, TypeScript |
| **Database** | SQLite, Drizzle ORM |
| **AI** | OpenRouter (Claude, GPT-4, etc.) |
| **Auth/License** | Dooz Core via @dooz/sdk |

---

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) v1.3+
- OpenRouter API key (for AI models)

### Installation

```bash
# Clone repository
git clone https://github.com/DoozHub/dooz-perspective.git
cd dooz-perspective

# Install dependencies
bun install
cd ui && bun install && cd ..

# Configure environment
cp .env.example .env
```

### Run Development Servers

```bash
# Terminal 1 - Backend API (port 3003)
bun run dev

# Terminal 2 - Frontend UI (port 5175)
cd ui && bun run dev
```

---

## API Endpoints

### Public Routes (No Auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/v1/models` | List available models |
| POST | `/api/public/signup` | Register new user |
| POST | `/api/public/login` | Authenticate user |

### Protected Routes (Auth + License Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/sessions` | Create verification session |
| POST | `/api/v1/sessions/:id/sources` | Upload source files |
| POST | `/api/v1/sessions/:id/target` | Upload target file |
| POST | `/api/v1/sessions/:id/verify` | Start verification |
| GET | `/api/v1/sessions/:id` | Get session status |
| GET | `/api/v1/sessions/:id/report` | Get final report |

---

## Environment Variables

```bash
# OpenRouter
OPENROUTER_API_KEY=your-key-here

# Server
PORT=3003
HOST=0.0.0.0

# Dooz Core Integration
DOOZ_CORE_API=http://localhost:8000
DOOZ_SERVICE_TOKEN=your-token
DOOZ_APP_NAME=dooz-perspective
DOOZ_INTEGRATION_ENABLED=false  # Set true for production
```

---

## Related Documentation

- [Oracle Confidence Scoring](Dooz_Oracle.md)
- [Bun SDK Integration](Dooz_Bun_SDK.md)
- [Dooz Core Integration](../09_ECOSYSTEM/Architecture.md)

---

*Repository: DoozHub/dooz-perspective*
