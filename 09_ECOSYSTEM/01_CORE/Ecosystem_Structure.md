# Ecosystem Structure Guide

> **Date**: 2026-04-07  
> **Purpose**: Explain what each project is and how they relate

---

## Overview

The Dooz ecosystem is a suite of interconnected applications. Some are **standalone services** (running on their own ports), some are **desktop apps** (Tauri/Flutter), and some are **packages inside dooz-core**.

---

## Project Categories

### 1. Core Platform (1 Project)

| Project | Type | Description |
|---------|------|-------------|
| `dooz-core` | Laravel 12 | Main multi-tenant SaaS platform. All packages below run as Composer dependencies inside it. |

**Port**: 8000 (when PHP/PostgreSQL installed)

---

### 2. Packages Inside dooz-core (13 Projects)

These are Laravel packages that get installed via Composer as dependencies. They share dooz-core's database, authentication, and infrastructure.

| Package | Description | Composer Name |
|---------|-------------|----------------|
| `quicky` | Task & time tracking mini-suite | `dooz/quicky` |
| `worklog` | Detailed work logging | `dooz/worklog` |
| `calibration` | Equipment calibration tracking | `dooz/calibration` |
| `calibration-ops` | Calibration operations dashboard | `dooz/calibration-ops` |
| `sync` | Cross-tenant synchronization | `dooz/sync` |
| `sdk` | Developer SDK | `dooz/sdk` |
| `ui` | Shared UI components | `dooz/ui` |
| `renew` | Subscription renewals | `dooz/renew` |
| `mini-suite` | Lightweight productivity bundle | `dooz/mini-suite` |
| `dooz-iot` | IoT data ingress | `dooz/iot` |
| `dooz-accountant` | AU-compliant bookkeeping | `dooz/accountant` |
| `dooz-compliance` | Regulatory compliance | `dooz/compliance` |
| `dooz-contracts` | Contract lifecycle management | `dooz/contracts` |

**To develop**: Edit code in `packages/dooz/*`, changes are hot-reloaded via symlink.

---

### 3. Standalone Web Services (3 Projects)

These run **independently** - each has its own server, database, and port:

| Service | Tech | Port | Database | Description |
|---------|------|------|----------|-------------|
| `dooz-pm-suite` | Bun + Hono | 3000 | SQLite | AI-era project management |
| `dooz-perspective` | Bun + Hono | 3003 | SQLite | Multi-LLM document verification |
| `dooz-website-builder` | Next.js 15 | 3000* | None | AI-powered website generation |

*Note: Port conflict - needs adjustment

**To develop**: Run `bun run src/index.ts` in each directory.

---

### 4. Desktop Apps (6 Projects)

These are **local-only** Tauri apps - they don't get forwarded via tunnel:

| App | Tech | Purpose |
|-----|------|---------|
| `dooz-hub` | Tauri + React | Personal launcher dashboard |
| `dooz-brain` | Tauri + React | Local-first organizational memory |
| `dooz-bridge` | Tauri + React | CLI wrapper with grammar system |
| `dooz-yantra` | Tauri + React | AI agent with computer use |
| `dooz-cowork` | Tauri + React | Desktop AI operator |
| `quicky_desktop` | Tauri + React | Desktop productivity |

**To develop**: Run `npm run tauri dev` in each directory.

---

### 5. Mobile Apps (1 Project)

| App | Tech | Description |
|-----|------|-------------|
| `quicky_mobile` | Flutter | iOS/Android productivity app |

---

### 6. Infrastructure & SDKs (Multiple)

| Project | Type | Description |
|---------|------|-------------|
| `dooz-atlas` | React + Vite | Knowledge base documentation viewer |
| `dooz-ecosystem` | Docs | This repository - coordination & docs |
| `dooz-bun-sdk` | TypeScript | SDK for Bun/Node clients |
| `dooz-ai-router` | TypeScript | Multi-provider LLM routing |
| `dooz-intent-lang` | PHP | DIL transpiler for business logic |
| `dooz-veto` | Rust | Constraint engine for CI/CD |
| `dooz-auth` | Rust | Unified desktop auth module |
| `dooz-orchestrator` | Rust | AI agent orchestration CLI |
| `dooz-cartridges` | Various | Plugin registry for Bridge |
| `core-contracts` | PHP | Shared interfaces |
| `dooz-ui` | Blade | UI components package |
| `boilerplate` | Laravel | App template |
| `app-template` | Laravel | Package template |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      dooz-core (Laravel)                        │
│                         Port 8000                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Internal Packages (quicky, worklog, calibration, etc)  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   Standalone           Desktop Apps           Mobile
        │                     │                     │
   ┌────▼─────┐         ┌─────▼─────┐       ┌─────▼─────┐
   │pm-suite  │         │dooz-hub   │       │quicky     │
   │perspect- │         │dooz-brain │       │_mobile    │
   │ive       │         │dooz-yantra│       │(Flutter)  │
   │website-  │         │dooz-bridge│       └───────────┘
   │builder   │         │quicky     │
   └──────────┘         │_desktop   │
                        └───────────┘
```

---

## How to Build Further

### Adding a New Package to dooz-core

1. Create Laravel package in `packages/dooz/your-package`
2. Add `composer.json` with proper naming: `"dooz/your-package": "@dev"`
3. Add to `dooz-core/composer.json` `"dooz/your-package": "@dev"`
4. Run `composer install` in dooz-core
5. Package auto-discovered via Laravel's auto-discovery

### Adding a New Standalone Service

1. Create new directory (e.g., `dooz-new-service`)
2. Choose stack: Bun + Hono (recommended for APIs), Next.js (for web apps)
3. Add to `DEV_DEPLOYMENT.md` with port assignment
4. Create symlink in `node_modules/@dooz/` if using shared SDKs
5. Add startup command to deployment scripts

### Adding a New Desktop App

1. Create Tauri project: `npm create tauri-app@latest`
2. Follow conventions in existing apps (`dooz-brain`, `dooz-hub`, etc.)
3. Add `@dooz/auth` for unified authentication
4. Keep local-only (no tunnel forwarding needed)

### Adding to Atlas Documentation

1. Add docs to `dooz-atlas/10_APPS/` as `Dooz_YourApp.md`
2. Update section README if needed
3. Update INDEX.md with new app link

---

## Key Conventions

- **Naming**: Use `dooz-` prefix for ecosystem projects
- **Ports**: 
  - 8000-8999 for Laravel/PHP services
  - 3000-3999 for Bun/Node/Next.js services
  - Desktop apps don't need ports
- **SDKs**: Place shared code in `dooz-bun-sdk` or `core-contracts`
- **Auth**: Use `@dooz/auth` for desktop apps
- **Database**: PostgreSQL for production, SQLite for dev
- **Cache**: Redis for all Laravel apps

---

*Last updated: 2026-04-07*
