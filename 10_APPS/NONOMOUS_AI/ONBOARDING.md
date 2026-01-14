# NONOMOUS AI — Onboarding Guide

> **Control is a feature. Friction is intentional.**  
> Welcome to the anti-autonomous AI framework.

---

## What You'll Learn

This guide explains how to think about NONOMOUS AI as a developer. By the end, you will understand:

1. The core philosophy (anti-autonomy)
2. The architecture (10 phases, layered)
3. Your role (execution, not authorship)
4. How to contribute safely

---

## The ONE Thing to Remember

> **AI may execute. Humans must intend.**

Every line of code, every design decision, every feature must respect this principle. If you find yourself building something that allows AI to act without human intent, STOP.

---

## Core Philosophy (Read First)

Before touching any code, read:

```
cat doctrine/NONOMOUS_AI_MASTER.md
```

This is the Phase 0 Doctrine — the immutable foundation. Everything else derives from it.

**Key Principles:**
- Intent precedes planning
- Planning precedes execution
- Execution requires explicit contracts
- Silence is failure
- Convenience never overrides control

---

## Project Structure Mental Model

Think of NONOMOUS AI as a **control tower**, not an autonomous agent:

```
┌─────────────────────────────────────────────────────────────────┐
│                     NONOMOUS CONTROL TOWER                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Human Intent  ──►  Contract  ──►  Plan  ──►  Approval         │
│        │              │             │            │               │
│        ▼              ▼             ▼            ▼               │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                   HUMAN IS FINAL AUTHORITY               │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│        Approval  ──►  Executor  ──►  Artifact  ──►  Review      │
│             │           │              │             │           │
│             ▼           ▼              ▼             ▼           │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              EVERY STEP IS OBSERVABLE                    │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase Map (What Each Does)

| Phase | Component | Purpose | Status |
|-------|-----------|---------|--------|
| 0 | Doctrine | Immutable principles | ✅ Frozen |
| 1 | Contracts | Execution boundaries | 📋 Spec |
| 2 | Planner | AI-assisted planning | 📋 Spec |
| 3 | Jules SDK | Node.js executor | 📋 Spec |
| 4 | Command Center | Human control UI | 📋 Spec |
| 5 | Audit | Artifact system | 📋 Spec |
| 6 | Failure Handling | Failure taxonomy | 📋 Spec |
| 7 | Multi-Executor | Executor abstraction | 📋 Spec |
| 8 | Open Source | OSS guidelines | 📋 Spec |
| 9 | Dogfooding | Internal validation | 📋 Spec |
| 10 | Ecosystem | Expansion tools | 📋 Spec |

---

## Key Terms (Glossary)

Before contributing, memorize these terms:

| Term | Definition |
|------|------------|
| **Intent** | Human-stated goal, explicit, finite, reviewable |
| **Contract** | Binding spec defining execution boundaries |
| **Plan** | AI-generated breakdown of Intent into executable steps |
| **Executor** | Sandboxed worker performing single scoped task |
| **Artifact** | Evidence produced by execution (code diffs, logs, test outputs) |
| **Checkpoint** | Mandatory pause requiring human decision |
| **Scope Violation** | Executor attempting action outside Contract → immediate hard failure |
| **Silent Failure** | Failure without artifacts → critical error |

See `GLOSSARY.md` for complete definitions.

---

## Development Workflow

### 1. Understand Before Coding

For any task:

1. Read the relevant Phase documentation
2. Check `EXECUTION_ORDER.md` for dependencies
3. Review `GAP_ANALYSIS.md` for current status
4. Understand what you're NOT building (forbidden patterns)

### 2. Forbidden Patterns (NEVER Build These)

| Pattern | Description | Why |
|---------|-------------|-----|
| Self-directed goals | AI deciding what to build | Violates Intent |
| Auto-retry | Silent recovery from failure | Violates checkpoints |
| Scope expansion | Executor extending beyond Contract | Violates boundaries |
| Background execution | AI triggering itself | Violates human authority |
| Autonomy | "Set and forget" operation | Violates NONOMOUS |

### 3. Your Role as a Developer

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR ROLE                                │
├─────────────────────────────────────────────────────────────┤
│  ✅ DO: Build execution engines with hard boundaries         │
│  ✅ DO: Create human-readable contracts                      │
│  ✅ DO: Design observable logging and artifacts              │
│  ✅ DO: Enforce checkpoints and approval gates               │
│  ✅ DO: Make violations hard failures                        │
│                                                             │
│  ❌ DON'T: Build inference engines                           │
│  ❌ DON'T: Create "smart" automation                         │
│  ❌ DON'T: Optimize away human checkpoints                   │
│  ❌ DON'T: Allow silent operations                           │
│  ❌ DON'T: Make convenience override control                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Setting Up Your Environment

### Prerequisites

- Node.js 18+ (for Jules SDK development)
- TypeScript knowledge
- Understanding of YAML contracts

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/DoozHub/nonomous-ai.git
cd nonomous-ai

# Install dependencies (for SDK work)
npm install

# Read the Doctrine (mandatory)
cat doctrine/NONOMOUS_AI_MASTER.md

# Review execution order
cat EXECUTION_ORDER.md

# Check current gaps
cat GAP_ANALYSIS.md
```

---

## Understanding Dependencies

Before working on any component, check what it depends on:

```
Phase Dependencies (from EXECUTION_ORDER.md):

P0 Doctrine ──┬──► P1 Contracts ──┬──► P2 Planner
              │                   │
              │                   ├──► P3 Jules SDK
              │                   │
              │                   ├──► P4 Command Center
              │                   │
              │                   └──► P5 Audit

P3 Jules SDK ──► P6 Failure Handling ──► P9 Dogfooding
P4 Command Center ──► P7 Mobile Companion
P3 Jules SDK ──► P8 Multi-Executor
```

**Rule**: Never work on a later phase without understanding earlier phases.

---

## Code Review Checklist

When reviewing PRs, check for:

- [ ] **Intent clarity**: Is human intent explicit?
- [ ] **Contract enforcement**: Does it require a Contract?
- [ ] **Checkpoint presence**: Are there human approval points?
- [ ] **Artifact capture**: Are outputs observable?
- [ ] **Scope boundaries**: Can the executor exceed its Contract?
- [ ] **Forbidden patterns**: Does it enable autonomy?

---

## Common Mistakes to Avoid

### Mistake 1: "This automation would be so convenient"

**Wrong**: Building auto-approval after X successful runs  
**Right**: Humans approve every time. No exceptions.

### Mistake 2: "The AI knows best"

**Wrong**: Allowing AI to skip steps because it's "more efficient"  
**Right**: Every step is human-reviewable.

### Mistake 3: "We'll handle failures gracefully"

**Wrong**: Auto-retry with exponential backoff  
**Right**: Failure requires human decision. Silence is failure.

### Mistake 4: "This is just infrastructure"

**Wrong**: "This component doesn't need contracts"  
**Right**: Every component that executes code needs Contract enforcement.

---

## Testing Philosophy

NONOMOUS systems require different testing:

| Test Type | Purpose | Example |
|-----------|---------|---------|
| **Contract Validation** | Does the contract schema work? | Invalid contracts are rejected |
| **Scope Violation** | Does the executor fail when exceeding scope? | Forbidden actions trigger hard failure |
| **Artifact Capture** | Are all outputs logged? | Code diffs, test outputs, logs captured |
| **Checkpoint Enforcement** | Can execution proceed without approval? | Unapproved plans cannot execute |
| **Determinism** | Same input = same output? | Planner produces consistent plans |

---

## Finding Your Way Around

| Want To... | Look In |
|------------|---------|
| Understand philosophy | `doctrine/NONOMOUS_AI_MASTER.md` |
| See execution priority | `EXECUTION_ORDER.md` |
| Check what's missing | `GAP_ANALYSIS.md` |
| Find term definitions | `GLOSSARY.md` |
| Build contract system | `contracts/` |
| Build planner | `planner/` |
| Build executor SDK | `jules-sdk/` |
| Build UI | `command-center/` |
| Build audit | `audit/` |
| Understand failures | `failure-handling/` |

---

## Getting Help

1. **Read the Doctrine first** — Most questions are answered there
2. **Check the Glossary** — Precise definitions prevent confusion
3. **Review GAP_ANALYSIS.md** — Know what exists and what doesn't
4. **Ask in human channels** — NOT in AI agents

---

## The NONOMOUS Commitment

By contributing to NONOMOUS AI, you commit to:

1. **Human authority** — Humans decide, AI executes
2. **Explicit boundaries** — No implicit permissions
3. **Observable operations** — No hidden state
4. **Fail-safe defaults** — Block rather than allow
5. **Control over convenience** — Always

---

> **Remember**: You are building a system that deliberately makes AI *less* convenient in order to make it *safer*. This is the point. Don't fight it.

---
*End of ONBOARDING.md*
