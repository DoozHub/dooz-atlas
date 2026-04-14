# PLAN-04: Architecture Documentation (C4 Model)

> **Priority:** MEDIUM  > **Est. Time:** 4 hours  
> **Prerequisites:** PLAN-01 (Root README)  
> **Next Plan:** PLAN-06 (API Documentation)

---

## Objective

Create comprehensive architecture documentation using the C4 model (Context, Container, Component, Code). Currently the ecosystem lacks visual system architecture and decision records.

**Success Criteria:**
- C4 diagrams for all 4 levels
- Architecture Decision Records (ADRs)
- System context diagram for new developers
- Integration points documented

---

## Current State

### Existing Architecture Docs

| Document | Location | Status |
|----------|----------|--------|
| Ecosystem Overview | `/dooz-atlas/09_ECOSYSTEM/Overview.md` | Text only |
| System Architecture | `/dooz-atlas/09_ECOSYSTEM/Architecture.md` | Partial |
| Implementation Plan | `/dooz-atlas/09_ECOSYSTEM/IMPLEMENTATION_PLAN.md` | Has Mermaid diagrams |
| Core Architecture | `/dooz-core/docs/ARCHITECTURE.md` | PHP-focused |

### Missing Documentation

1. **No C4 Context Diagram** — High-level system view
2. **No Container Diagram** — Runtime containers
3. **No Component Diagrams** — Per-module component views
4. **No ADRs** — Why decisions were made
5. **No Data Flow Diagrams** — How data moves through system

---

## Target State

### C4 Model Implementation

**Level 1: System Context Diagram**
- Shows DOOZ ecosystem boundary
- External systems (users, APIs, databases)
- High-level interactions

**Level 2: Container Diagram**
- Web applications (dooz-core, dooz-pm-suite UI)
- Desktop apps (dooz-hub, dooz-brain, dooz-pilot)
- Databases (PostgreSQL, SQLite, Redis)
- Message bus (dooz-bridge)

**Level 3: Component Diagrams**
- One per major module
- Shows internal components
- Interface definitions

**Level 4: Code Diagrams** (Optional)
- Class diagrams for critical paths
- Sequence diagrams for key flows

### ADR Structure

Create ADRs in `/dooz-atlas/09_ECOSYSTEM/ADRs/`:

- ADR-001: Why multi-tenancy with database-per-tenant
- ADR-002: Why Tauri for desktop apps
- ADR-003: Why Bun over Node.js
- ADR-004: Why event-driven architecture (dooz-bridge)
- ADR-005: Why Rust for system services
- ADR-006: Why LLM routing abstraction (dooz-ai-router)

---

## Execution Checklist

### Step 1: Create C4 Context Diagram

**Location:** `/dooz-atlas/09_ECOSYSTEM/ARCHITECTURE_C4_CONTEXT.md`

- [ ] **System Context Overview**
  - DOOZ ecosystem as central system
  - External actors: Developers, PMs, AI Agents
  - External systems: LLM APIs, GitHub, Stripe

- [ ] **Mermaid Context Diagram**
  ```mermaid
  C4Context
      title System Context diagram for DOOZ Ecosystem
      
      Person(developer, "Developer", "Uses DOOZ tools for development")
      Person(pm, "Project Manager", "Manages projects and decisions")
      
      System(dooz, "DOOZ Ecosystem", "Integrated AI-powered development tools")
      
      System_Ext(github, "GitHub", "Code repository")
      System_Ext(llm, "LLM APIs", "OpenAI, Anthropic, etc.")
      System_Ext(stripe, "Stripe", "Payment processing")
      
      Rel(developer, dooz, "Uses")
      Rel(pm, dooz, "Manages projects")
      Rel(dooz, github, "Integrates with")
      Rel(dooz, llm, "Routes requests to")
      Rel(dooz, stripe, "Processes payments")
  ```

### Step 2: Create C4 Container Diagram

**Location:** `/dooz-atlas/09_ECOSYSTEM/ARCHITECTURE_C4_CONTAINER.md`

- [ ] **Container Overview**
  - Web applications
  - Desktop applications
  - Databases
  - Infrastructure services

- [ ] **Mermaid Container Diagram**
  ```mermaid
  C4Container
      title Container diagram for DOOZ Ecosystem
      
      Person(developer, "Developer")
      
      Container_Boundary(web, "Web Applications") {
          Container(core, "dooz-core", "PHP/Laravel", "Multi-tenant platform")
          Container(pm_ui, "PM Suite UI", "React", "Project management UI")
      }
      
      Container_Boundary(desktop, "Desktop Applications") {
          Container(hub, "dooz-hub", "Tauri/React", "Desktop hub")
          Container(brain, "dooz-brain", "Tauri/React", "Knowledge system")
          Container(pilot, "dooz-pilot", "Tauri/React", "CLI orchestrator")
      }
      
      Container_Boundary(infra, "Infrastructure") {
          Container(bridge, "dooz-bridge", "Bun/Hono", "Event bus")
          Container(router, "dooz-ai-router", "Bun", "LLM router")
      }
      
      ContainerDb(postgres, "PostgreSQL", "PostgreSQL", "Core data")
      ContainerDb(sqlite, "SQLite", "SQLite", "Local data")
      ContainerDb(redis, "Redis", "Redis", "Cache")
      
      Rel(developer, hub, "Uses")
      Rel(hub, bridge, "Publishes events")
      Rel(bridge, brain, "Delivers webhooks")
  ```

### Step 3: Create Component Diagrams

**Location:** `/dooz-atlas/09_ECOSYSTEM/ARCHITECTURE_C4_COMPONENTS.md`

Create component diagrams for:

- [ ] **dooz-core Components**
  - Auth Service
  - Tenant Service
  - Package Service
  - License Service

- [ ] **dooz-brain Components**
  - MCP Server
  - Ingestion Pipeline
  - RAG Engine
  - Memory Store

- [ ] **dooz-bridge Components**
  - Event Publisher
  - Webhook Dispatcher
  - Subscription Manager
  - Delivery Tracker

- [ ] **dooz-pm-suite Components**
  - Intent Service
  - Decision Service
  - Task Service
  - Graph Service

### Step 4: Create ADR Documents

**Location:** `/dooz-atlas/09_ECOSYSTEM/ADRs/`

Create these ADR files:

- [ ] **ADR-001_Multi_Tenancy_Strategy.md**
  - Context: Needed tenant isolation
  - Decision: Database-per-tenant
  - Consequences: Better isolation, harder cross-tenant queries

- [ ] **ADR-002_Desktop_Technology.md**
  - Context: Needed desktop apps
  - Decision: Tauri (Rust + Web frontend)
  - Consequences: Smaller bundles, Rust complexity

- [ ] **ADR-003_Runtime_Selection.md**
  - Context: JavaScript runtime choice
  - Decision: Bun for new projects
  - Consequences: Fast execution, newer ecosystem

- [ ] **ADR-004_Event_Architecture.md**
  - Context: Module communication
  - Decision: Event-driven via dooz-bridge
  - Consequences: Loose coupling, eventual consistency

- [ ] **ADR-005_LLM_Abstraction.md**
  - Context: Multiple LLM providers
  - Decision: Router pattern (dooz-ai-router)
  - Consequences: Easy provider switching, routing complexity

- [ ] **ADR-006_Knowledge_Management.md**
  - Context: Organizational memory
  - Decision: RAG-based system (dooz-brain)
  - Consequences: Semantic search, vector DB dependency

### Step 5: Data Flow Documentation

**Location:** `/dooz-atlas/09_ECOSYSTEM/Data_Flows.md`

Document these flows:

- [ ] **User Authentication Flow**
  - OAuth2 flow through dooz-core
  - Token distribution to modules

- [ ] **Event Publishing Flow**
  - Module publishes to dooz-bridge
  - Bridge delivers to subscribers

- [ ] **AI Request Flow**
  - App requests via dooz-ai-router
  - Router selects provider
  - Response returned

- [ ] **Knowledge Ingestion Flow**
  - Document added to dooz-brain
  - Chunking and embedding
  - Storage in vector DB

---

## Diagram Standards

### Using Mermaid C4

All diagrams use Mermaid C4 syntax:

```markdown
```mermaid
C4Context
    title Title
    Person(alias, "Label", "Description")
    System(alias, "Label", "Description")
    System_Ext(alias, "Label", "Description")
    Rel(from, to, "Label")
```
```

### ADR Template

```markdown
# ADR-XXX: Title

## Status
Proposed / Accepted / Deprecated

## Context
What is the issue we're solving?

## Decision
What did we decide?

## Consequences
Positive and negative outcomes

## Alternatives Considered
What else did we evaluate?

## References
Links to relevant docs
```

---

## Verification Steps

1. **Diagram Rendering:**
   ```bash
   # Open each markdown file in VS Code with Mermaid extension
   # Verify diagrams render correctly
   ```

2. **Link Validation:**
   - All ADRs linked from architecture index
   - All diagrams referenced in main docs

3. **Completeness Check:**
   - C4 Level 1 (Context) ✓
   - C4 Level 2 (Container) ✓
   - C4 Level 3 (Component) ✓
   - 6 ADRs created ✓
   - Data flows documented ✓

---

## Dependencies

- **PLAN-01** — Root README should reference architecture docs
- **Atlas viewer** — Must support Mermaid rendering

---

## Next Steps

After completing PLAN-04:

1. **PLAN-06** — Generate API documentation from code
2. Update all module READMEs to reference architecture
3. Review architecture with team

---

**Definition of Done:**
- [ ] C4 Context diagram created
- [ ] C4 Container diagram created
- [ ] C4 Component diagrams for 4+ modules
- [ ] 6 ADRs written and accepted
- [ ] Data flow documentation complete
- [ ] All diagrams render correctly in Atlas
- [ ] Git commit: "docs: Add C4 architecture documentation"

**Estimated Completion:** 4 hours  
**Priority:** MEDIUM — Critical for system understanding
