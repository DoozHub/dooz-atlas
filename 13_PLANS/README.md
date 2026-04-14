# Dooz Atlas — Implementation Plans

> **Agentic Execution Blueprint** — April 2026 Release  
> Centralized planning hub for all documentation and infrastructure completion tasks.

---

## Quick Navigation

| Plan | Focus Area | Priority | Est. Effort | Status |
|------|-----------|----------|-------------|--------|
| [PLAN-01](PLAN-01_Root_Documentation.md) | Root README & Ecosystem Entry Point | HIGH | 2h | Not Started |
| [PLAN-02](PLAN-02_CICD_Standardization.md) | CI/CD Pipeline Completion | HIGH | 4h | Not Started |
| [PLAN-03](PLAN-03_Testing_Infrastructure.md) | Test Coverage Expansion | MEDIUM | 6h | Not Started |
| [PLAN-04](PLAN-04_Architecture_Documentation.md) | C4 Architecture Diagrams | MEDIUM | 4h | Not Started |
| [PLAN-05](PLAN-05_Code_Quality.md) | Linting & Standards | MEDIUM | 3h | Not Started |
| [PLAN-06](PLAN-06_API_Documentation.md) | Auto-generated API Docs | LOW | 4h | Not Started |
| [PLAN-07](PLAN-07_Environment_Config.md) | .env & Config Audit | LOW | 2h | Not Started |
| [PLAN-08](PLAN-08_ROADMAP_Creation.md) | Missing ROADMAP Files | MEDIUM | 3h | Not Started |

---

## Execution Philosophy

### Agentic Principles
1. **One Plan Per Session** — Complete entire plan in single agent session
2. **Checklist-Driven** — Every task has explicit completion criteria
3. **Self-Documenting** — Update Atlas as work progresses
4. **No Context Loss** — All decisions logged in real-time

### Definition of Done
Each plan requires:
- [ ] All checklist items complete
- [ ] Files committed to git
- [ ] Atlas documentation updated
- [ ] Next session plan identified

---

## Current State Summary

### Documentation Coverage

| Component | README | ROADMAP | CI/CD | Tests | Docker |
|-----------|--------|---------|-------|-------|--------|
| **dooz-core** | ✅ | ❌ | ✅ | ✅ | ✅ |
| **dooz-hub** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **dooz-brain** | ✅ | ✅ | ✅ | ❌ | ✅ |
| **dooz-pm-suite** | ✅ | ❌ | ❌ | ⚠️ | ✅ |
| **dooz-pilot** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **dooz-bridge** | ✅ | ❌ | ❌ | ⚠️ | ❌ |
| **dooz-ai-router** | ✅ | ❌ | ❌ | ⚠️ | ❌ |
| **dooz-ai-platform** | ✅ | ❌ | ❌ | ⚠️ | ❌ |
| **dooz-copilot** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **dooz-hindsight** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **dooz-perspective** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **dooz-atlas** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **neo-analog** | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| **ROOT** | ❌ | — | — | — | — |

**Legend:** ✅ Complete | ⚠️ Partial | ❌ Missing

### Critical Gaps

1. **No Root README** — New developers have no entry point
2. **Missing ROADMAPs** — 5 projects lack future planning
3. **CI/CD Gaps** — 6 projects lack automation
4. **Test Coverage** — Only dooz-core has comprehensive tests
5. **Architecture Docs** — No C4 diagrams or system context

---

## Execution Priority Matrix

### Phase 1: Foundation (Week 1)
- **PLAN-01**: Root README — Critical for new developers
- **PLAN-02**: CI/CD Standardization — Automation baseline

### Phase 2: Quality (Week 2)
- **PLAN-03**: Testing Infrastructure — Quality gates
- **PLAN-05**: Code Quality — Consistent standards

### Phase 3: Documentation (Week 3)
- **PLAN-04**: Architecture — System understanding
- **PLAN-08**: ROADMAP Creation — Future planning

### Phase 4: Polish (Week 4)
- **PLAN-06**: API Documentation — Developer experience
- **PLAN-07**: Environment Config — Deployment readiness

---

## Plan Templates

Each plan follows this structure:

```markdown
# PLAN-XX: Plan Title

## Objective
What we're building and why

## Current State
What's missing or incomplete

## Target State
What "done" looks like

## Execution Checklist
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Verification Steps
How to confirm completion

## Dependencies
What must be done first

## Next Steps
What plan to execute after this
```

---

## Session Assignment

### Available Plans (Pick One)

**Quick Wins (2-4 hours):**
1. PLAN-01: Root README
2. PLAN-07: Environment Config
3. PLAN-08: ROADMAP Creation

**Medium Effort (4-6 hours):**
4. PLAN-02: CI/CD Standardization
5. PLAN-05: Code Quality
6. PLAN-04: Architecture Diagrams

**Deep Work (6+ hours):**
7. PLAN-03: Testing Infrastructure
8. PLAN-06: API Documentation

### Assignment Guidelines

1. **Start with PLAN-01** — Root README enables all other work
2. **Parallelize CI/CD** — Each project can be done independently
3. **Block on Architecture** — Wait for PLAN-04 before deep refactoring
4. **Testing Last** — Establish patterns first, then replicate

---

## Progress Tracking

| Date | Plan | Assigned | Status | Notes |
|------|------|----------|--------|-------|
| 2026-02-24 | — | — | Planning Complete | Initial plans created |

---

## Related Atlas Documentation

- [Ecosystem Overview](../09_ECOSYSTEM/Overview.md)
- [Implementation Plan](../09_ECOSYSTEM/IMPLEMENTATION_PLAN.md)
- [Developer Guide](../09_ECOSYSTEM/Developer_Guide.md)
- [Deployment Guide](../../DEPLOYMENT.md)

---

**Rule:** If a plan is not listed here, it is not approved for execution.

**Last Updated:** 2026-02-24  
**Version:** 1.0
