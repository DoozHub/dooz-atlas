# DOOZ Ecosystem - C4 Component Diagrams

> **Level 3: Component** — Shows the internal components of key containers and their interactions.

---

## 1. dooz-core Components

The multi-tenant SaaS platform built on Laravel 12.

```mermaid
C4Component
    title Component diagram - dooz-core
    
    Container(core, "dooz-core", "PHP/Laravel", "Multi-tenant SaaS platform")
    
    Component_Boundary(core_components, "Core Components") {
        Component(auth, "Auth Service", "Laravel Passport", "OAuth2 authentication")
        Component(tenant, "Tenant Service", "stancl/tenancy", "Tenant management and isolation")
        Component(license, "License Service", "Custom", "Seat-based licensing")
        Component(package_mgr, "Package Manager", "Custom", "App marketplace and packages")
        Component(permission, "Permission Service", "spatie/laravel-permission", "RBAC")
        Component(billing, "Billing Service", "Laravel Cashier", "Subscription management")
        Component(api, "API Gateway", "Laravel", "REST API routing")
    }
    
    ContainerDb(db, "PostgreSQL", "Database", "Tenant data")
    Container(bridge, "dooz-bridge", "Bun/Hono", "Event bus")
    
    Rel(api, auth, "Authenticates via")
    Rel(api, tenant, "Resolves tenant via")
    Rel(api, permission, "Checks permissions via")
    
    Rel(auth, db, "Stores sessions in")
    Rel(tenant, db, "Manages schemas in")
    Rel(license, db, "Tracks licenses in")
    
    Rel(package_mgr, license, "Validates via")
    Rel(billing, license, "Syncs with")
    
    Rel(core, bridge, "Publishes events to")
```

### Core Component Descriptions

| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| **Auth Service** | Laravel Passport | OAuth2 token issuance, user authentication |
| **Tenant Service** | stancl/tenancy | Database-per-tenant isolation, tenant context |
| **License Service** | Custom PHP | Seat allocation, license validation |
| **Package Manager** | Custom PHP | App installation, package lifecycle |
| **Permission Service** | spatie/laravel-permission | Role-based access control |
| **Billing Service** | Laravel Cashier | Stripe/Razorpay integration |
| **API Gateway** | Laravel Routes | Request routing, middleware, validation |

---

## 2. dooz-brain Components

Knowledge management and RAG system.

```mermaid
C4Component
    title Component diagram - dooz-brain
    
    Container(brain, "dooz-brain", "Tauri/Rust", "Knowledge management")
    
    Component_Boundary(brain_components, "Brain Components") {
        Component(ingest, "Ingestion Pipeline", "Rust", "Document processing")
        Component(chunker, "Chunking Service", "Rust", "Text segmentation")
        Component(embedder, "Embedding Service", "Rust", "Vector generation")
        Component(rag, "RAG Engine", "Rust", "Retrieval-augmented generation")
        Component(mcp, "MCP Server", "TypeScript", "Model Context Protocol")
        Component(wiki, "Wiki Generator", "Rust", "Documentation synthesis")
        Component(memory, "Memory Store", "Rust", "Conversation memory")
        Component(api, "Brain API", "Rust/Axum", "REST endpoints")
    }
    
    ContainerDb(chroma, "ChromaDB", "Vector DB", "Embeddings")
    ContainerDb(sqlite, "SQLite", "Database", "Metadata and memory")
    Container(router, "dooz-ai-router", "Bun", "LLM routing")
    
    Rel(ingest, chunker, "Chunks via")
    Rel(chunker, embedder, "Embeds via")
    Rel(embedder, chroma, "Stores in")
    
    Rel(rag, chroma, "Queries")
    Rel(rag, router, "Generates via")
    
    Rel(mcp, rag, "Retrieves context via")
    Rel(mcp, api, "Exposes via")
    
    Rel(wiki, ingest, "Uses")
    Rel(memory, sqlite, "Stores in")
```

### Brain Component Descriptions

| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| **Ingestion Pipeline** | Rust | Document parsing, format detection |
| **Chunking Service** | Rust | Text segmentation strategies |
| **Embedding Service** | Rust | Vector generation via embeddings API |
| **RAG Engine** | Rust | Context retrieval, prompt augmentation |
| **MCP Server** | TypeScript | Tool exposure for AI agents |
| **Wiki Generator** | Rust | Automated documentation synthesis |
| **Memory Store** | Rust | Conversation persistence |
| **Brain API** | Rust/Axum | REST interface for ecosystem |

---

## 3. dooz-bridge Components

Event bus and webhook delivery system.

```mermaid
C4Component
    title Component diagram - dooz-bridge
    
    Container(bridge, "dooz-bridge", "Bun/Hono", "Event bus")
    
    Component_Boundary(bridge_components, "Bridge Components") {
        Component(publisher, "Event Publisher", "Bun", "Event ingestion")
        Component(matcher, "Pattern Matcher", "Bun", "Topic pattern matching")
        Component(dispatcher, "Webhook Dispatcher", "Bun", "HTTP delivery")
        Component(retry, "Retry Manager", "Bun", "Failure recovery")
        Component(dlq, "Dead Letter Queue", "Bun", "Failed event storage")
        Component(sub_mgr, "Subscription Manager", "Bun", "Subscriber registry")
        Component(api, "Bridge API", "Hono", "REST endpoints")
    }
    
    ContainerDb(sqlite, "SQLite", "Database", "Events and deliveries")
    
    Rel(api, publisher, "Receives events via")
    Rel(publisher, matcher, "Matches topics via")
    Rel(matcher, sub_mgr, "Looks up via")
    Rel(sub_mgr, dispatcher, "Triggers")
    
    Rel(dispatcher, sqlite, "Logs to")
    Rel(dispatcher, retry, "Hands off to")
    Rel(retry, dlq, "Moves failures to")
    
    Rel(sqlite, retry, "Provides retry queue")
```

### Bridge Component Descriptions

| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| **Event Publisher** | Bun | Event validation, ingestion |
| **Pattern Matcher** | Bun | Topic glob matching (e.g., "user.*") |
| **Webhook Dispatcher** | Bun | HTTP POST delivery |
| **Retry Manager** | Bun | Exponential backoff, scheduling |
| **Dead Letter Queue** | Bun | Permanent failure storage |
| **Subscription Manager** | Bun | CRUD for subscriptions |
| **Bridge API** | Hono | HTTP interface |

---

## 4. dooz-pm-suite Components

Project management with intents and decisions.

```mermaid
C4Component
    title Component diagram - dooz-pm-suite
    
    Container(pm, "dooz-pm-suite", "Bun/Hono", "Project management")
    
    Component_Boundary(pm_components, "PM Suite Components") {
        Component(intent_svc, "Intent Service", "Bun", "Intent lifecycle")
        Component(decision_svc, "Decision Service", "Bun", "Decision ledger")
        Component(state_machine, "State Machine", "Bun", "Intent transitions")
        Component(graph, "Graph Service", "Bun", "Knowledge graph")
        Component(task_svc, "Task Service", "Bun", "Task management")
        Component(proposal, "Proposal Review", "Bun", "AI proposal queue")
        Component(api, "PM API", "Hono", "REST endpoints")
        Component(ui, "PM UI", "React", "Web interface")
    }
    
    ContainerDb(db, "PostgreSQL", "Database", "PM data")
    Container(bridge, "dooz-bridge", "Bun", "Event bus")
    Container(brain, "dooz-brain", "Tauri", "Knowledge")
    
    Rel(api, intent_svc, "Manages via")
    Rel(api, decision_svc, "Logs via")
    Rel(api, graph, "Queries via")
    
    Rel(intent_svc, state_machine, "Transitions via")
    Rel(intent_svc, db, "Stores in")
    Rel(decision_svc, db, "Appends to")
    
    Rel(graph, db, "Builds from")
    Rel(graph, brain, "Enriches via")
    
    Rel(proposal, intent_svc, "Creates via")
    
    Rel(pm, bridge, "Publishes events to")
    
    Rel(ui, api, "Calls")
```

### PM Suite Component Descriptions

| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| **Intent Service** | Bun | CRUD, validation, lifecycle |
| **Decision Service** | Bun | Append-only ledger, options tracking |
| **State Machine** | Bun | Valid state transitions |
| **Graph Service** | Bun | Relationship mapping, visualization data |
| **Task Service** | Bun | Task breakdown, assignments |
| **Proposal Review** | Bun | AI proposal queue management |
| **PM API** | Hono | HTTP interface |
| **PM UI** | React | User interface |

---

## Component Interactions

### Cross-Module Flows

#### 1. Intent Creation Flow
```
PM UI → PM API → Intent Service → State Machine
                    ↓
              Bridge API → Webhook → Hub
```

#### 2. Knowledge Query Flow
```
Hub → Brain API → RAG Engine → ChromaDB
                    ↓
              AI Router → OpenAI
```

#### 3. Decision Tracking Flow
```
PM UI → Decision Service → Database
                    ↓
              Bridge → Brain (ingestion)
```

---

## Next Level

See individual module documentation for Level 4 (Code) diagrams showing class structures and implementations.

---

**Maintainer:** Architecture Team  
**Last Updated:** 2026-02-24  
**Version:** 1.0
