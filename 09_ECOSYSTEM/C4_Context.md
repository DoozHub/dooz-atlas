# DOOZ Ecosystem - C4 Context Diagram

> **Level 1: System Context** — Shows the DOOZ ecosystem as a whole and its relationships with external systems and users.

---

## Overview

The DOOZ Ecosystem is an integrated platform of AI-powered tools for product development, project management, and organizational intelligence. It sits at the center of a network of external services, APIs, and user interactions.

---

## C4 Context Diagram

```mermaid
C4Context
    title System Context diagram for DOOZ Ecosystem
    
    %% Actors
    Person(developer, "Developer", "Uses DOOZ tools for development work")
    Person(pm, "Project Manager", "Manages projects and tracks decisions")
    Person(admin, "Platform Admin", "Manages tenants and system configuration")
    
    %% DOOZ System Boundary
    System_Boundary(dooz, "DOOZ Ecosystem") {
        System(core, "dooz-core", "Multi-tenant SaaS platform with app marketplace")
        System(brain, "dooz-brain", "Knowledge management and RAG system")
        System(hub, "dooz-hub", "Desktop launcher and AI control plane")
        System(pm_suite, "dooz-pm-suite", "Project management with intents")
        System(bridge, "dooz-bridge", "Event bus and webhook delivery")
    }
    
    %% External Systems
    System_Ext(github, "GitHub", "Code repository and version control")
    System_Ext(stripe, "Stripe", "Payment processing")
    System_Ext(openai, "OpenAI API", "LLM services")
    System_ext(anthropic, "Anthropic API", "Claude LLM services")
    System_Ext(google, "Google API", "Calendar and authentication")
    System_Ext(ollama, "Ollama", "Local LLM hosting")
    
    %% Relationships
    Rel(developer, hub, "Launches apps from")
    Rel(developer, core, "Uses for tenant management")
    Rel(developer, brain, "Queries for knowledge")
    
    Rel(pm, pm_suite, "Manages projects in")
    Rel(pm, brain, "Reviews decisions in")
    
    Rel(admin, core, "Administers platform via")
    
    Rel(dooz, github, "Integrates with")
    Rel(dooz, stripe, "Processes payments via")
    Rel(dooz, openai, "Routes LLM requests to")
    Rel(dooz, anthropic, "Routes LLM requests to")
    Rel(dooz, google, "Syncs calendar with")
    Rel(dooz, ollama, "Uses for local LLMs")
    
    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

---

## Context Description

### Actors

| Actor | Description | Primary Interactions |
|-------|-------------|---------------------|
| **Developer** | Software developers building products | Uses hub, queries brain, manages tenants |
| **Project Manager** | PMs tracking projects and decisions | Uses PM Suite, reviews knowledge |
| **Platform Admin** | System administrators | Manages platform, monitors health |

### DOOZ Systems

| System | Responsibility | Key Capabilities |
|--------|---------------|------------------|
| **dooz-core** | Multi-tenant platform | Authentication, app marketplace, billing |
| **dooz-brain** | Knowledge system | RAG, memory management, wiki generation |
| **dooz-hub** | Desktop interface | App launcher, AI control plane |
| **dooz-pm-suite** | Project management | Intent tracking, decision ledger |
| **dooz-bridge** | Event infrastructure | Pub/sub, webhooks, event routing |

### External Systems

| System | Integration Purpose | Data Exchange |
|--------|-------------------|---------------|
| **GitHub** | Code management | Repositories, PRs, issues |
| **Stripe** | Payments | Subscriptions, billing |
| **OpenAI/Anthropic** | LLM services | Text generation, embeddings |
| **Google** | Calendar/auth | Events, OAuth |
| **Ollama** | Local AI | Self-hosted models |

---

## Key Interactions

### 1. Developer Workflow
```
Developer → Hub → Core (auth) → PM Suite (create intent)
                     ↓
              Brain (context)
                     ↓
              AI Router → OpenAI/Anthropic
```

### 2. Knowledge Flow
```
PM Suite (decision) → Bridge (event) → Brain (ingest)
                                              ↓
Developer (query) ← Brain (RAG) ← Vector DB
```

### 3. Payment Flow
```
Admin → Core → Stripe (create subscription)
            ↓
      Tenant (access granted)
```

---

## Scope Boundaries

### In Scope (DOOZ)
- All DOOZ-branded applications
- Internal event bus (dooz-bridge)
- AI routing layer (dooz-ai-router)
- Knowledge management (dooz-brain)

### Out of Scope (External)
- LLM provider infrastructure
- Payment processing logic
- Third-party authentication
- End-user devices

---

## Next Level

See [C4 Container Diagram](./C4_Container.md) for the internal structure of DOOZ systems.

---

**Maintainer:** Architecture Team  
**Last Updated:** 2026-02-24  
**Version:** 1.0
