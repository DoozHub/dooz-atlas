# Component Catalog

This catalog lists the 11 canonical components of the Dooz ecosystem. Each component has a strictly defined responsibility and boundary derived from its codebase and intent documentation.

---

## Platform Foundation

### [dooz-core](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-core)
dooz-core is a Laravel 12 multi-tenant SaaS platform implementing database-per-tenant isolation via `stancl/tenancy`. It provides user authentication (Laravel Passport OAuth2), role-based access control (`spatie/laravel-permission`), seat-based app licensing, and an app marketplace where tenants subscribe to modular packages. Internal packages (`quicky`, `worklog`, `calibration-ops`, `sync`, `sdk`, `ui`) are loaded from `packages/dooz/`. The system includes a platform admin interface for tenant management, billing integration (Stripe, Razorpay), and Docker deployment support.

### [neo-analog](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/neo-analog)
neo-analog is a CSS-first design system providing design tokens (colors, typography, spacing), component styles (buttons, cards, inputs, modals, tables), utilities, and theme switching (light/dark). It is framework-agnostic and distributed as CSS files that can be imported into any HTML, React, Vue, Next.js, or Laravel project.

---

## Cognitive & Memory

### [dooz-brain](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-brain)
dooz-brain is a Tauri + React desktop application that provides a local-first organizational memory system backed by SQLite. It allows users to ingest documents, manage scoped memories with decay tracking, browse a wiki of synthesized knowledge, record decisions, and expose memory via an MCP (Model Context Protocol) server for AI agent queries.

### [dooz-ai-router](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-ai-router)
dooz-ai-router is a TypeScript library that provides a unified interface for routing LLM requests across multiple providers (OpenRouter, Ollama, and OpenAI-compatible APIs). It implements task-based model selection, automatic provider fallback chains, and streaming support.

---

## Intelligence Orchestration

### [dooz-perspective](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-perspective)
dooz-perspective is a Bun + Hono API server that performs multi-LLM document verification. Users upload source and target files (PDF, DOCX, text), and the system runs a four-agent pipeline (Verifier A, Verifier B, Auditor, Synthesizer) using OpenRouter-accessed models (Claude, GPT-4) to cross-check content, detect discrepancies, and produce a confidence-scored report.

### [dooz-copilot](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-copilot)
dooz-copilot is a React + Vite chat interface that connects to the Dooz Brain MCP server to query and store organizational memory. It provides a conversational UI with DIT (Decentralized Identity Token) authentication, markdown message rendering, and MCP tool call visualization.

---

## Operational & Builder Tools

### [dooz-pm-suite](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-pm-suite)
dooz-pm-suite is a Bun + Hono API server that provides a project management backend centered on intents (purpose-driven artifacts) rather than tasks. It exposes REST endpoints for managing intents with state transitions, an append-only decision ledger, assumptions, risks, tasks, and a knowledge graph.

### [dooz-hub](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-hub)
dooz-hub is a Tauri 2.0 + React desktop application that serves as a personal launcher dashboard. It provides a tile-based interface for organizing web links and local applications, with features including drag-and-drop reordering, credential storage (Hub Vault), and subscription cost tracking.

### [dooz-pilot](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-pilot)
dooz-pilot is a Tauri 2.0 + React desktop application that wraps interactive CLI tools (Aider, Ollama, Claude CLI, etc.) in a graphical interface. It spawns pseudo-terminals via Rust and uses a grammar-based pattern matching system to detect CLI states.

### [dooz-hindsight](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-hindsight)
dooz-hindsight is a React + Vite web application for tracking decisions, predicted outcomes, and actual results over time. It provides a calibration dashboard that calculates a user's prediction accuracy and pattern detection across decision domains.

### [dooz-atlas](file:///Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-atlas)
dooz-atlas is a documentation repository containing DoozieSoft's internal knowledge base, organized as markdown files. It includes a React + Vite documentation viewer that renders the markdown content with navigation.

---

> [!IMPORTANT]
> This catalog is strictly descriptive. For implementation details, refer to the individual repository links.
