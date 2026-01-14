# NONOMOUS AI — Product Roadmap

> **The path to anti-autonomous AI execution.**

**Target: MVP Release — March 31, 2026**

---

## Vision

Build the definitive anti-autonomous AI framework that ensures human control at every step of AI execution.

---

## Timeline Overview

```
Dec 2025                             Mar 2026
────────────────────────────────────────────────────────────────────────────────

Dec 23       Jan 5       Jan 15      Feb 1       Feb 15      Mar 1       Mar 15      Mar 31
 │            │            │           │           │           │           │           │
 ├──Phase 0───┤            │           │           │           │           │           │
 │ Doctrine   │            │           │           │           │           │           │
 │            ├──Phase 1───┤           │           │           │           │           │
 │            │ Contracts  │           │           │           │           │           │
 │            │            ├──Phase 2──┤           │           │           │           │
 │            │            │ Planner   │           │           │           │           │
 │            │            │           ├──Phase 3──┤           │           │           │
 │            │            │           │ Executor  │           │           │           │
 │            │            │           │           ├──Phase 4──┤           │           │
 │            │            │           │           │ UI        │           │           │
 │            │            │           │           │           ├──Phase 5──┤           │
 │            │            │           │           │           │ Audit     │           │
 │            │            │           │           │           │           ├────MVP────┤
 ▼            ▼            ▼           ▼           ▼           ▼           ▼           ▼
```

---

## Phase 0: Doctrine (Dec 23 - Jan 5, 2026) ✅

> **Foundation — Define what NONOMOUS means**

### Goals
- [x] Core doctrine document
- [x] Six non-negotiable principles
- [x] Anti-patterns documentation

### Deliverables
- [x] NONOMOUS_AI_MASTER.md
- [x] PRINCIPLES.md
- [x] GLOSSARY.md
- [x] Public doctrine repository

### Status: COMPLETE

---

## Phase 1: Contract System (Jan 5 - Jan 15, 2026)

> **The execution choke point**

### Goals
- [ ] Contract schema implementation
- [ ] Validation (schema + semantic + safety)
- [ ] Lifecycle state machine
- [ ] Database setup

### Deliverables
| Deliverable | Status |
|-------------|--------|
| Prisma schema | ✅ Complete |
| Contract CRUD API | 🔄 In Progress |
| Contract validation | ⬜ Not Started |
| State machine | ⬜ Not Started |

### Key Milestones
- **Jan 8**: Database running, validation complete
- **Jan 12**: State machine implemented
- **Jan 15**: All contract tests passing

---

## Phase 2: Planner Interface (Jan 15 - Feb 1, 2026)

> **AI-assisted planning with human gates**

### Goals
- [ ] Plan generation pipeline
- [ ] Human approval workflow
- [ ] Plan diffing (revisions)
- [ ] Risk assessment display

### Deliverables
| Deliverable | Status |
|-------------|--------|
| Planner I/O schemas | ✅ Complete |
| Approval workflow API | 🔄 In Progress |
| Plan generation (mock) | ⬜ Not Started |
| Plan diffing | ⬜ Not Started |

### Key Milestones
- **Jan 22**: Approval workflow complete
- **Jan 28**: Mock planner integrated
- **Feb 1**: E2E: Contract → Plan → Approval

---

## Phase 3: Executor Integration (Feb 1 - Feb 15, 2026)

> **Connect to the AI executor**

### Goals
- [ ] Jules SDK wrapper
- [ ] Contract enforcement
- [ ] Sandbox enforcement
- [ ] Artifact collection

### Deliverables
| Deliverable | Status |
|-------------|--------|
| Executor interface | ✅ Complete |
| Jules SDK integration | ⬜ Not Started |
| Scope validation | ⬜ Not Started |
| Artifact storage | ⬜ Not Started |

### Key Milestones
- **Feb 5**: Mock executor working
- **Feb 10**: Jules API integrated
- **Feb 15**: E2E: Plan → Execution → Artifacts

---

## Phase 4: Command Center (Feb 15 - Mar 1, 2026)

> **Human control plane UI**

### Goals
- [ ] Dashboard with overview
- [ ] Plan review pages
- [ ] Execution monitoring
- [ ] Artifact viewing

### Deliverables
| Deliverable | Status |
|-------------|--------|
| Dashboard | ✅ Complete |
| Plan review page | ⬜ Not Started |
| Execution monitor | ⬜ Not Started |
| Contract creation | ⬜ Not Started |

### Key Milestones
- **Feb 20**: Plan review UI complete
- **Feb 25**: Execution monitor working
- **Mar 1**: Contract creation flow working

---

## Phase 5: Audit System (Mar 1 - Mar 15, 2026)

> **Verifiable evidence of all actions**

### Goals
- [ ] Append-only audit log
- [ ] Hash chain verification
- [ ] Artifact archive
- [ ] Export capabilities

### Deliverables
| Deliverable | Status |
|-------------|--------|
| Audit log schema | ✅ Complete |
| Audit API | ⬜ Not Started |
| Hash chain | ⬜ Not Started |
| UI integration | ⬜ Not Started |

---

## MVP Release (Mar 31, 2026) 🎯

> **End-to-end contract execution with human control**

### MVP Definition
A user can:
1. Create a contract through UI
2. Review AI-generated plan
3. Approve or reject the plan
4. Monitor execution in real-time
5. Abort execution at any point
6. View artifacts after completion
7. Review audit trail

### Success Criteria
- [ ] One full contract→execution flow works
- [ ] All human checkpoints enforced
- [ ] Audit trail is complete
- [ ] No critical bugs

---

## Post-MVP Phases (Q2-Q4 2026)

| Phase | Name | Target |
|-------|------|--------|
| 6 | Failure Handling | Apr 2026 |
| 7 | Multi-Executor Support | May 2026 |
| 8 | Open Source Surface | Jun 2026 |
| 9 | Dogfooding | Jul 2026 |
| 10 | Ecosystem Expansion | Sep 2026 |

---

## Current Focus

```
┌─────────────────────────────────────────────────────────────────┐
│  NOW: Phase 1 - Contract System                                 │
│                                                                  │
│  Priority tasks:                                                 │
│  1. Database setup and migrations                                │
│  2. Contract validation implementation                           │
│  3. State machine for contract lifecycle                         │
│  4. Authentication system                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Links

- **Milestones**: https://github.com/NONOMOUS-AI/core/milestones
- **Issues**: https://github.com/NONOMOUS-AI/core/issues
- **Doctrine**: https://github.com/NONOMOUS-AI/doctrine

---

> **Control is a feature. Speed comes second.**
