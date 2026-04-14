# PLAN-08: Missing ROADMAP Creation

> **Priority:** MEDIUM  
> **Est. Time:** 3 hours  
> **Prerequisites:** PLAN-01 (Root README)  
> **Next Plan:** Complete

---

## Objective

Create ROADMAP.md files for the 5 modules currently missing them. Ensure consistent roadmap format across all projects.

**Success Criteria:**
- All 13 modules have ROADMAP.md
- Consistent format and structure
- Q1-Q4 2025 planning complete
- Dependencies between projects identified

---

## Current State

### ROADMAP Coverage

| Module | Has ROADMAP | Last Updated | Status |
|--------|-------------|--------------|--------|
| dooz-core | ❌ | — | Missing |
| dooz-hub | ✅ | Recent | Current |
| dooz-brain | ✅ | Recent | Current |
| dooz-pm-suite | ❌ | — | Missing |
| dooz-pilot | ✅ | Recent | Current |
| dooz-bridge | ❌ | — | Missing |
| dooz-ai-router | ❌ | — | Missing |
| dooz-ai-platform | ❌ | — | Missing |
| dooz-copilot | ✅ | Recent | Current |
| dooz-hindsight | ✅ | Recent | Current |
| dooz-perspective | ✅ | Recent | Current |
| dooz-atlas | ❌ | — | Missing |
| neo-analog | ⚠️ | Old | Needs update |

### Missing ROADMAPs (5 modules)

1. **dooz-core** — PHP multi-tenant platform
2. **dooz-pm-suite** — Project management
3. **dooz-bridge** — Event bus
4. **dooz-ai-router** — LLM routing
5. **dooz-ai-platform** — AI agents

---

## Target State

### Standard ROADMAP Format

```markdown
# [Module Name] Roadmap

> **Current Version:** X.Y.Z  
> **Last Updated:** 2026-02-24

---

## Current Status

[Brief description of current state]

### Completed Features
- ✅ Feature 1
- ✅ Feature 2

---

## Q1 2025 (Jan-Mar)

### Theme: [Theme Name]

#### Milestones
- [ ] Milestone 1
- [ ] Milestone 2

#### Features
- [ ] Feature A
- [ ] Feature B

---

## Q2 2025 (Apr-Jun)

### Theme: [Theme Name]

[...]

---

## Long Term Vision

- Vision item 1
- Vision item 2

---

## Dependencies

- Depends on: [other module plans]
- Blocks: [other module plans]
```

---

## Execution Checklist

### Step 1: Create dooz-core ROADMAP

**Location:** `/dooz-core/ROADMAP.md`

Based on current state (Laravel multi-tenant platform with packages):

- [ ] **Current Version:** 12.x
- [ ] **Completed:**
  - Multi-tenancy with database-per-tenant
  - App marketplace
  - OAuth2 authentication
  - Worklog package
  - Quicky package

- [ ] **Q1 2025:**
  - [ ] Calibration Ops package activation
  - [ ] Sync engine improvements
  - [ ] API rate limiting
  - [ ] Performance optimizations

- [ ] **Q2 2025:**
  - [ ] New app package: [Name]
  - [ ] Advanced reporting
  - [ ] Webhook improvements

- [ ] **Long Term:**
  - Multi-region support
  - GraphQL API
  - Mobile SDK

### Step 2: Create dooz-pm-suite ROADMAP

**Location:** `/dooz-pm-suite/ROADMAP.md`

Based on PM Suite capabilities:

- [ ] **Current Version:** 1.0
- [ ] **Completed:**
  - Intent management
  - Decision ledger
  - Knowledge graph
  - Proposal review UI

- [ ] **Q1 2025:**
  - [ ] Task management
  - [ ] Risk tracking
  - [ ] Team assignments
  - [ ] Calendar integration

- [ ] **Q2 2025:**
  - [ ] Sprint planning
  - [ ] Burndown charts
  - [ ] Time tracking integration

- [ ] **Long Term:**
  - AI-powered planning
  - Predictive analytics
  - Multi-project portfolios

### Step 3: Create dooz-bridge ROADMAP

**Location:** `/dooz-bridge/ROADMAP.md`

Event bus infrastructure:

- [ ] **Current Version:** 1.0
- [ ] **Completed:**
  - Event publishing
  - Webhook delivery
  - Subscription management
  - SQLite persistence

- [ ] **Q1 2025:**
  - [ ] Dead letter queue
  - [ ] Retry logic improvements
  - [ ] Event replay
  - [ ] Metrics dashboard

- [ ] **Q2 2025:**
  - [ ] WebSocket support
  - [ ] Event streaming
  - [ ] Schema validation

- [ ] **Long Term:**
  - Distributed deployment
  - Event sourcing
  - Multi-region sync

### Step 4: Create dooz-ai-router ROADMAP

**Location:** `/dooz-ai-router/ROADMAP.md`

LLM routing infrastructure:

- [ ] **Current Version:** 1.0
- [ ] **Completed:**
  - Multi-provider support
  - Fallback logic
  - Basic rate limiting

- [ ] **Q1 2025:**
  - [ ] Advanced routing strategies
  - [ ] Cost optimization
  - [ ] Token tracking
  - [ ] Provider health checks

- [ ] **Q2 2025:**
  - [ ] Model caching
  - [ ] Request batching
  - [ ] A/B testing

- [ ] **Long Term:**
  - Custom model hosting
  - Fine-tuning pipeline
  - Model evaluation

### Step 5: Create dooz-ai-platform ROADMAP

**Location:** `/dooz-ai-platform/ROADMAP.md`

AI agent platform:

- [ ] **Current Version:** 0.1
- [ ] **Completed:**
  - Basic agent framework
  - LLM client abstraction
  - Git integration

- [ ] **Q1 2025:**
  - [ ] Agent registry
  - [ ] Workflow orchestration
  - [ ] Tool marketplace
  - [ ] Evaluation pipeline

- [ ] **Q2 2025:**
  - [ ] Multi-agent coordination
  - [ ] Human-in-the-loop
  - [ ] Agent monitoring

- [ ] **Long Term:**
  - Autonomous agents
  - Self-improving systems
  - Agent marketplace

### Step 6: Update dooz-atlas ROADMAP

**Location:** `/dooz-atlas/ROADMAP.md`

Documentation platform:

- [ ] **Current Version:** 2026.1
- [ ] **Completed:**
  - React-based viewer
  - 11 documentation sections
  - 600+ documents
  - Search functionality

- [ ] **Q1 2025:**
  - [ ] Documentation AI assistant
  - [ ] Interactive diagrams
  - [ ] Versioning system
  - [ ] Export to PDF

- [ ] **Q2 2025:**
  - [ ] Real-time collaboration
  - [ ] Comment system
  - [ ] Change notifications

---

## Verification Steps

1. **Check All Created:**
   ```bash
   find /Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem -name "ROADMAP.md" -type f | wc -l
   # Should be 9+ (existing + new)
   ```

2. **Verify Format:**
   - Each roadmap has version
   - Each has quarterly sections
   - Each has completed features

3. **Cross-Reference:**
   - Check dependencies align between roadmaps
   - No conflicting timelines

---

## Dependencies

- **PLAN-01** — Root README should link to roadmaps
- **Existing roadmaps** — Reference for format consistency

---

**Definition of Done:**
- [ ] 5 new ROADMAP.md files created
- [ ] Consistent format across all roadmaps
- [ ] Q1-Q2 2025 planning complete
- [ ] Dependencies documented
- [ ] Git commit: "docs: Add missing ROADMAP files for 5 modules"

**Estimated Completion:** 3 hours  
**Priority:** MEDIUM — Important for project planning
