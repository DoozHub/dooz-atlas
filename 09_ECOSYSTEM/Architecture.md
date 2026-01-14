# Dooz Architecture

> System architecture for the Dooz ecosystem.

---

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DESKTOP LAYER                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Dooz Hub   │  │   YANTRA    │  │ Dooz Pilot  │  │ Dooz Brain  │    │
│  │  (Launcher) │  │   (Agent)   │  │ (CLI Bridge)│  │  (Memory)   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
│         │                │                │                │            │
│         └────────────────┴────────────────┴────────────────┘            │
│                                   │                                      │
│                            MCP / Intents                                │
└───────────────────────────────────┼─────────────────────────────────────┘
                                    │
┌───────────────────────────────────┼─────────────────────────────────────┐
│                           CLOUD LAYER                                    │
│                                   │                                      │
│  ┌────────────────────────────────┴────────────────────────────────┐    │
│  │                        DOOZ CORE                                 │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │    │
│  │  │   Tenant    │  │    Auth     │  │    Apps     │              │    │
│  │  │  Isolation  │  │   Passport  │  │   Engine    │              │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘              │    │
│  │                                                                  │    │
│  │  ┌─────────────────────────────────────────────────────────┐    │    │
│  │  │                    APP PACKAGES                          │    │    │
│  │  │  calibration-ops │ worklog │ quicky │ ballpark-ai       │    │    │
│  │  └─────────────────────────────────────────────────────────┘    │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐          │
│  │  App Builder    │  │  Web Builder    │  │   App Registry  │          │
│  │  (AI SDLC)      │  │  (dooz.new)     │  │   (Metadata)    │          │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Dooz Core

```
dooz-core/
├── app/                    # Laravel application
│   ├── Console/            # Artisan commands
│   ├── Http/               # Controllers, Middleware
│   ├── Models/             # Eloquent models
│   ├── Providers/          # Service providers
│   └── Services/           # Business logic
├── packages/dooz/          # App packages
│   ├── calibration-ops/
│   ├── worklog/
│   ├── quicky/
│   ├── ui/
│   └── core-contracts/
├── database/               # Migrations, seeders
├── resources/              # Views, assets
└── routes/                 # Route definitions
```

### Desktop Apps (Tauri)

```
dooz-{app}/
├── src/                    # React frontend
│   ├── components/
│   ├── hooks/
│   ├── stores/             # Zustand state
│   └── styles/
├── src-tauri/              # Rust backend
│   ├── src/
│   │   ├── commands.rs     # Tauri IPC
│   │   ├── db/             # SQLite
│   │   └── ...
│   └── Cargo.toml
└── package.json
```

---

## Data Flow

### Request Flow (Web)

```
Browser → Nginx → Laravel Router → Middleware → Controller → Service → Model → DB
                                      ↑
                              Tenant Resolution
```

### MCP Query Flow (Desktop)

```
AI Agent → MCP Request → Brain → SQLite Query → Memory Retrieval → Response
```

### Intent Flow (Cross-App)

```
Source App → DIL Intent → Bridge Service → Target App → Response
```

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Web Backend | Laravel 12, PHP 8.3 |
| Web Frontend | Livewire, Alpine.js |
| Desktop | Tauri 2.x, Rust |
| Desktop UI | React 18, TypeScript |
| Database (Core) | MySQL 8.x |
| Database (Desktop) | SQLite (WAL) |
| Queue | Redis |
| Cache | Redis |
| AI Integration | OpenAI, Anthropic, Google, Ollama |

---

## Security Boundaries

| Boundary | Enforcement |
|----------|-------------|
| Tenant isolation | Database per tenant |
| User authentication | Laravel Passport (OAuth2) |
| API authorization | Scoped tokens |
| Desktop data | Local SQLite, encrypted |
| Cross-app communication | Intent-based, validated |
