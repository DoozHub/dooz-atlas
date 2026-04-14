# Component Catalog

This catalog lists all components of the Dooz ecosystem, organized by tier and naming convention.

**Naming Convention:**
- `app-*` - Marketplace Laravel packages (tenant-installable)
- `desktop-*` - Tauri desktop applications
- `mobile-*` - Flutter mobile applications
- `cloud-*` - Cloud-hosted microservices
- `lib-*` - Reusable libraries/SDKs
- `infra-*` - Infrastructure and dev tools
- `dooz-*` - Core platform (legacy naming for core components)

---

## Platform Foundation (`dooz-*`)

### [dooz-core](https://github.com/DoozHub/dooz-core)
The main multi-tenant SaaS platform (Laravel 12) implementing database-per-tenant isolation via `stancl/tenancy`. Provides authentication (Laravel Passport OAuth2), role-based access control, seat-based app licensing, and an app marketplace where tenants subscribe to modular packages. Internal packages loaded from `packages/dooz/`. Includes platform admin, billing integration (Stripe, Razorpay), and Docker deployment.

### [dooz-atlas](https://github.com/DoozHub/dooz-atlas)
Complete ecosystem documentation with 100+ markdown files. Includes a React + Vite documentation viewer with navigation and search.

---

## Desktop Applications (`desktop-*`)

### [desktop-brain](https://github.com/DoozHub/desktop-brain)
Tauri + React desktop application providing local-first organizational memory backed by SQLite. Features document ingestion, scoped memories with decay tracking, wiki browsing, decision recording, and MCP server for AI agent queries.

### [desktop-hub](https://github.com/DoozHub/desktop-hub)
Tauri 2.0 + React personal launcher dashboard with tile-based interface for web links and local applications. Features drag-and-drop, credential storage (Hub Vault), and subscription cost tracking.

### [desktop-bridge](https://github.com/DoozHub/desktop-bridge)
Tauri 2.0 + React desktop application wrapping CLI tools (Aider, Ollama, Claude CLI) in a GUI. Spawns pseudo-terminals via Rust with grammar-based pattern matching for CLI state detection.

### [desktop-cowork](https://github.com/DoozHub/desktop-cowork)
Tauri + React autonomous AI coworker with computer use, swarm agents, and semantic memory. Integrates with Ollama for local LLM inference.

### [desktop-copilot](https://github.com/DoozHub/desktop-copilot)
React + Vite chat interface connecting to Dooz Brain MCP server. Provides conversational UI with DIT authentication, markdown rendering, and MCP tool call visualization.

### [desktop-hindsight](https://github.com/DoozHub/desktop-hindsight)
React + Vite decision tracking application. Calculates prediction accuracy, provides calibration dashboards, decision timelines with confidence levels, and pattern detection.

### [desktop-yantra](https://github.com/DoozHub/desktop-yantra)
Tauri 2.0 + React desktop-native AI agent with personas and computer use capabilities.

### [desktop-quicky](https://github.com/DoozHub/desktop-quicky)
Tauri 2.0 + React desktop client for Quicky intent/task relay system.

---

## Mobile Applications (`mobile-*`)

### [mobile-quicky](https://github.com/DoozHub/mobile-quicky)
Flutter/Dart mobile client for Quicky intent/task relay system.

---

## Cloud Services (`cloud-*`)

### [cloud-pm-suite](https://github.com/DoozHub/cloud-pm-suite)
Bun + Hono API server for project management centered on intents (purpose-driven artifacts). Features state transitions, append-only decision ledger, assumptions, risks, tasks, and knowledge graph.

### [cloud-perspective](https://github.com/DoozHub/cloud-perspective)
Bun + Hono API for multi-LLM document verification. Four-agent pipeline (Verifier A, Verifier B, Auditor, Synthesizer) using OpenRouter (Claude, GPT-4) to cross-check content and produce confidence-scored reports.

### [cloud-ai-platform](https://github.com/DoozHub/cloud-ai-platform)
Agentic SDLC platform with AI agents for each development phase (Requirements, Planning, Specification, Coding, Review, Testing, Deployment, Ops). Python-based with FastAPI.

### [cloud-app-builder](https://github.com/DoozHub/cloud-app-builder)
AI-powered SDLC platform - PRD to GitHub PR via autonomous agents. Laravel 11, React 18, PostgreSQL, Redis, Gemini AI.

### [cloud-website-builder](https://github.com/DoozHub/cloud-website-builder)
Natural language to website generator (dooz.new). Next.js 16, React 19, Vercel AI SDK, Prisma.

---

## Marketplace Apps (`app-*`)

### [app-todo](https://github.com/DoozHub/app-todo)
Simple task management for tenants - Laravel marketplace app with tenant-scoped data.

### [app-worklog](https://github.com/DoozHub/app-worklog)
Time tracking, client/project management, invoicing - Laravel marketplace app.

### [app-notes](https://github.com/DoozHub/app-notes)
Note-taking for tenants with rich text editing - Laravel marketplace app.

### [app-quicky](https://github.com/DoozHub/app-quicky)
Lightweight task relay system - Laravel marketplace app.

### [app-mini-suite](https://github.com/DoozHub/app-mini-suite)
Productivity bundle - Todo, Notes, Habits, Journal, Timer, Focus, Planner.

### [app-renew](https://github.com/DoozHub/app-renew)
Unified renewal engine - service renewals, billing, credential vault.

### [app-calibration](https://github.com/DoozHub/app-calibration)
Manufacturing calibration device lifecycle management.

### [app-calibration-ops](https://github.com/DoozHub/app-calibration-ops)
Calibration operations automation system.

### [app-iot](https://github.com/DoozHub/app-iot)
IoT data platform - device event ingestion, schema versioning, alerting.

### [app-activity-tracker](https://github.com/DoozHub/app-activity-tracker)
Multi-tenant activity tracking with projects and audit logging.

### [app-accountant](https://github.com/DoozHub/app-accountant)
AU-compliant bookkeeping for SMBs - AI-native accounting.

### [app-compliance](https://github.com/DoozHub/app-compliance)
Regulatory tracking, audit trails, compliance management.

### [app-contracts](https://github.com/DoozHub/app-contracts)
AI-powered contract management with Perspective verification.

### [app-ui](https://github.com/DoozHub/app-ui)
Shared Blade UI component library for Dooz marketplace apps.

---

## Libraries (`lib-*`)

### [lib-ai-router](https://github.com/DoozHub/lib-ai-router)
TypeScript library providing unified LLM routing across providers (OpenRouter, Ollama, OpenAI-compatible). Task-based model selection, automatic fallback chains, streaming support.

### [lib-bun-sdk](https://github.com/DoozHub/lib-bun-sdk)
TypeScript/Bun SDK for integrating with Dooz Core.

---

## Infrastructure (`infra-*`)

### [infra-registry](https://github.com/DoozHub/infra-registry)
Central registry for Dooz marketplace apps. JSON-based catalog of all ecosystem components.

### [infra-app-template](https://github.com/DoozHub/infra-app-template)
Starting-point template for creating new Dooz marketplace apps.

### [infra-template](https://github.com/DoozHub/infra-template)
App template package (auto-synced from monorepo).

### [infra-test-app](https://github.com/DoozHub/infra-test-app)
Sample/test app built from boilerplate for QA validation.

---

## Governance (`dooz-*`)

### [dooz-veto](https://github.com/DoozHub/dooz-veto)
Constraint engine - refuses harmful changes. Pure Rust with 68 tests. Apache 2.0 license.

### [dooz-code](https://github.com/DoozHub/dooz-code)
Autonomous code executor - takes Work Packages and implements end-to-end. Rust, OpenAI-compatible LLM API.

### [dooz-intent-lang](https://github.com/DoozHub/dooz-intent-lang)
DIL transpiler - converts human-readable intent declarations to PHP/Laravel code.

### [dooz-orchestrator](https://github.com/DoozHub/dooz-orchestrator)
Agent orchestration pipeline: BA → Work Package → Veto → Code → QA.

### [dooz-auth](https://github.com/DoozHub/dooz-auth)
Shared authentication module for all Dooz Tauri desktop applications.

### [dooz-cartridges](https://github.com/DoozHub/dooz-cartridges)
Plugin registry for Dooz Bridge - installable CLI cartridges.

---

> [!IMPORTANT]
> This catalog follows the naming convention: `app-*`, `desktop-*`, `mobile-*`, `cloud-*`, `lib-*`, `infra-*`, `dooz-*`
> For implementation details, refer to the individual repository links.
> Last updated: 2026-04-14 (v4.0.0 registry sync)

---

> [!IMPORTANT]
> This catalog is strictly descriptive. For implementation details, refer to the individual repository links.
