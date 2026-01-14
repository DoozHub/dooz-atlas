# AgentCraft

> AI Agent Building Platform with OpenRouter Integration

---

## Overview

AgentCraft is a production-ready AI agent building platform that enables creation, deployment, and management of AI agents with OpenRouter model integration, tier-based routing, and monetization capabilities.

```
┌──────────────────────────────────────────────────────────────┐
│                       AGENTCRAFT                             │
├──────────────────────────────────────────────────────────────┤
│  🤖 Agent Builder      │  🔀 OpenRouter Model Routing       │
│  💰 Monetization       │  📊 Usage Tracking                 │
│  🧪 TDD Implementation │  🐳 Docker/K8s Deployment          │
│  📈 Tier-Based Access  │  🔄 Multi-Fallback Routing         │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Agent Builder** | Create and configure AI agents with custom prompts |
| **OpenRouter Integration** | Unified access to multiple LLM providers |
| **Model Routing** | Tier-based routing (Free → Plus → Pro → Enterprise) |
| **Multi-Fallback** | Automatic model fallback on failure |
| **Monetization** | Credit-based usage tracking and billing |
| **Docker/K8s** | Production deployment ready |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Node.js, TypeScript, Express |
| **Database** | SQLite (dev), PostgreSQL (prod) |
| **AI** | OpenRouter API |
| **Frontend** | Next.js (frontend-next/) |
| **Deployment** | Docker, Kubernetes |
| **Monitoring** | Prometheus, Grafana |

---

## Architecture

```
AgentCraft/
├── src/              # TypeScript backend
├── frontend-next/    # Next.js frontend
├── scripts/          # Database scripts
├── monitoring/       # Prometheus metrics
├── kubernetes/       # K8s manifests
├── docker-compose.*  # Docker configs
└── tests/            # TDD tests
```

---

## Documentation

| Document | Description |
|----------|-------------|
| `IMPLEMENTATION_SUMMARY.md` | Complete phase-by-phase implementation |
| `openrouter_implementation_guide.md` | OpenRouter integration details |
| `CI_CD_PIPELINE_GUIDE.md` | CI/CD configuration |
| `DOCKER_DEPLOYMENT_GUIDE.md` | Docker deployment |
| `DEPLOYMENT_GUIDE.md` | Production deployment |
| `API_DOCUMENTATION.md` | API reference |
| `agent_manifest_v0.1_spec.md` | Agent manifest specification |

---

## Quick Start

```bash
# Setup
./setup-agentcraft.sh

# Development
npm run dev

# Tests
npm test

# Build
npm run build
```

---

*Repository: agent_craft*
