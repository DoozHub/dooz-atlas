# NONOMOUS AI — Architecture Document

> Current system architecture as of 2026-01-14  
> **Status**: Design phase (not yet implemented)

---

## Executive Summary

NONOMOUS AI is an anti-autonomous AI control framework consisting of 11 phases. Currently in Phase 0-2 (Doctrine frozen, Contracts specified, Planner specified). This document describes the intended architecture, not implemented code.

**Key Architecture Decision**: Build layers that strengthen control, not velocity. Each phase enforces human authority at a different point in the AI execution lifecycle.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         NONOMOUS CONTROL LAYERS                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Layer 1: Doctrine (Phase 0)                                            │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Immutable principles governing all other layers                 │    │
│  │  - Human intent is the only valid input                          │    │
│  │  - Silence is failure                                            │    │
│  │  - Control over convenience                                      │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                   │                                       │
│  Layer 2: Contracts (Phase 1)                                            │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Binding specifications that define execution boundaries         │    │
│  │  - Intent specification                                          │    │
│  │  - Scope (allowed/forbidden actions)                             │    │
│  │  - Constraints (time, domain, resource)                          │    │
│  │  - Checkpoints (human approval points)                           │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                   │                                       │
│  Layer 3: Planning + Approval (Phases 2-4)                               │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Planner: AI-assisted breakdown of Intent into executable steps │    │
│  │  Command Center: Human approval interface                        │    │
│  │  - Deterministic plan generation                                 │    │
│  │  - Human review before execution                                 │    │
│  │  - No background execution                                       │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                   │                                       │
│  Layer 4: Execution (Phases 3, 7)                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Executors: Sandboxed workers with hard boundaries               │    │
│  │  - Jules SDK (primary executor)                                  │    │
│  │  - Multi-Executor interface (abstraction layer)                  │    │
│  │  - Scope violations = hard failure                               │    │
│  │  - Stateless between runs                                        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                   │                                       │
│  Layer 5: Observability (Phases 5-6)                                      │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Audit: Mandatory artifact and evidence capture                  │    │
│  │  Failure Handling: Taxonomy + human remediation                  │    │
│  │  - All outputs observable                                        │    │
│  │  - No silent failures                                            │    │
│  │  - Human decision on failures                                    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Doctrine (Phase 0)

**Location**: `doctrine/`  
**Status**: ✅ Frozen  
**Purpose**: Immutable philosophy source-of-truth

**Key Files**:
- `NONOMOUS_AI_MASTER.md` — Core principles
- No implementation code (this is documentation only)

**Architecture**:
- Publicly readable
- Versioned (semantic versioning)
- Changes require human signoff
- Blocks all other development until frozen

---

### 2. Contract System (Phase 1)

**Location**: `contracts/`  
**Status**: 📋 Spec complete, implementation pending  
**Purpose**: Machine-enforceable, human-readable execution boundaries

**Schema Structure**:

```yaml
Contract:
  intent:
    description: string
    success_criteria: string[]
  scope:
    allowed_actions: [read, write, test, deploy, delete]
    forbidden_actions: [delete, modify_infra]
    domains_allowed: [src/, tests/, docs/]
    domains_forbidden: [config/, secrets/]
  constraints:
    time_limit: "30 minutes"
    max_cost: "$1.00"
    max_retries: 0
  checkpoints:
    - phase: pre_execution
      required: true
    - phase: post_execution
      required: true
  lifecycle:
    - draft
    - approved
    - executing
    - completed
    - failed
    - aborted
```

**Key Files**:
- `CONTRACT_SPEC.md` — Schema definition
- `examples/` — Example contracts

---

### 3. Planner (Phase 2)

**Location**: `planner/`  
**Status**: 📋 Spec complete, implementation pending  
**Purpose**: AI-assisted breakdown of Intent into deterministic, reviewable Plan

**Key Characteristics**:
- Never executes code
- Never mutates state
- Output is deterministic (same input = same output)
- Produces tasks with dependencies, risks, expected artifacts

**Plan Structure**:

```yaml
Plan:
  intent_reference: Contract.id
  tasks:
    - id: task-1
      description: string
      executor_type: "jules" | "test" | "build"
      dependencies: []
      expected_artifacts: []
      risks: []
  dependencies: []
  total_estimated_time: "15 minutes"
  total_estimated_cost: "$0.50"
```

---

### 4. Command Center (Phase 4)

**Location**: `command-center/`  
**Status**: 📋 Spec complete, UI wireframes exist  
**Purpose**: Human control plane for all NONOMOUS operations

**Responsibilities**:
- Contract creation and editing
- Plan review and approval
- Execution triggering
- Artifact review
- Execution monitoring

**Architecture**:
- Web-based UI (React recommended)
- No background execution possible
- All actions require explicit human trigger

**Key Files**:
- `USER_FLOWS.md` — Workflow specifications
- `WIREFRAMES.md` — UI designs

---

### 5. Jules SDK (Phase 3)

**Location**: `jules-sdk/`  
**Status**: 📋 Spec complete, implementation pending  
**Purpose**: Node.js executor SDK for Google Jules integration

**Key Responsibilities**:
- Contract enforcement at runtime
- Scope boundary checking
- Artifact capture
- Hard failure on scope violations

**Interface**:

```typescript
interface JulesExecutor {
  execute(contract: Contract, plan: Plan): ExecutionResult;
  validateContract(contract: Contract): ValidationResult;
  captureArtifact(execution: Execution): Artifact;
}

interface ExecutionResult {
  status: "success" | "failed" | "aborted";
  artifacts: Artifact[];
  logs: LogEntry[];
  scopeViolations: ScopeViolation[];
}
```

---

### 6. Audit System (Phase 5)

**Location**: `audit/`  
**Status**: 📋 Spec complete, implementation pending  
**Purpose**: Mandatory evidence and logging system

**Mandatory Artifacts**:
- Code diffs
- Execution logs
- Test outputs
- Execution summary
- Scope violation reports (if any)

**Principles**:
- No silent changes
- No unverifiable outputs
- No hidden state
- Logs are immutable

---

### 7. Failure Handling (Phase 6)

**Location**: `failure-handling/`  
**Status**: 📋 Spec complete, implementation pending  
**Purpose**: Failure taxonomy and human remediation workflow

**Failure Taxonomy**:

| Category | Description | Response |
|----------|-------------|----------|
| Scope Violation | Executor exceeded Contract | Hard failure, no retry |
| Technical Error | Infrastructure failure | Human decision required |
| Test Failure | Tests did not pass | Human decision required |
| Timeout | Exceeded time limit | Hard failure |
| Human Abort | Human stopped execution | Clean termination |

**Key Principle**: No auto-retry. Silence is failure. Human decides remediation.

---

### 8. Multi-Executor (Phase 7)

**Location**: `multi-executor/`  
**Status**: 📋 Spec complete, implementation pending  
**Purpose**: Executor abstraction layer for non-Jules executors

**Interface**:

```typescript
interface ExecutorInterface {
  execute(contract: Contract, plan: Plan): Promise<ExecutionResult>;
  validateScope(action: Action, contract: Contract): boolean;
  getCapabilities(): ExecutorCapabilities[];
}

interface ExecutorCapabilities {
  supportedActions: ActionType[];
  maxDuration: number;
  costPerMinute: number;
}
```

---

### 9. Mobile Companion (Phase 7)

**Location**: `mobile-companion/`  
**Status**: 📋 Spec complete, PRD exists  
**Purpose**: iOS/Android review client for approval workflows

**Capabilities** (Read-Only + Actions):
- View pending contracts
- View generated plans
- Approve/reject plans
- View execution status
- Review artifacts
- **NO execution triggering** (must use Command Center)

---

### 10. Open Source (Phase 8)

**Location**: `open-source/`  
**Status**: 📋 Spec complete, implementation pending  
**Purpose**: Guidelines for open-sourcing NONOMOUS components

**Key Guidelines**:
- Security boundaries must be enforceable
- Internal integrations cannot be exposed
- Audit capabilities must be preserved
- Human checkpoints cannot be bypassed

---

### 11. Dogfooding (Phase 9)

**Location**: `dogfooding/`  
**Status**: 📋 Spec complete, implementation pending  
**Purpose**: Internal validation using NONOMOUS to build NONOMOUS

**Metrics**:
- Intent→Execution cycle time
- Artifact capture rate
- Scope violation frequency
- Human approval patterns

---

### 12. Ecosystem (Phase 10)

**Location**: `ecosystem/`  
**Status**: 📋 Spec complete, implementation pending  
**Purpose**: Companion tools and educational content

**Components**:
- CLI tool
- VS Code extension
- Tutorial workflows
- Example contracts

---

## Data Flow

```
Human Intent
    │
    ▼
┌─────────────────┐
│   Contract      │◄─── Author Contract
│   Creation      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Planner      │◄─── Generate Plan
│   (AI-Assist)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Command      │◄─── Human Review & Approval
│    Center      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Executor     │◄─── Execute with Contract
│   (Jules SDK)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Audit       │◄─── Capture Artifacts
│   (Artifacts)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Command      │◄─── Human Review
│    Center      │
└────────┬────────┘
         │
         ▼
    Human Decision
    (approve, reject, remediate)
```

---

## Missing Components (Gap Analysis)

### Critical Gaps

| Gap | Status | Impact |
|-----|--------|--------|
| API Specification | ❌ Missing | No communication between components |
| Data Models | ❌ Missing | No persistence layer |
| Authentication | ❌ Missing | No multi-user support |
| Event System | ❌ Missing | No real-time updates |

### See Also

- `GAP_ANALYSIS.md` for complete gap list
- `EXECUTION_ORDER.md` for implementation priority

---

## Technology Decisions (Current)

| Component | Technology | Notes |
|-----------|------------|-------|
| Command Center UI | React | Web-based, not mobile |
| Executor SDK | Node.js/TypeScript | Jules integration |
| Mobile | React Native or Native | Read-only + actions |
| API | OpenAPI 3.0 | Not yet specified |
| Database | Not specified | Prisma schema pending |
| Events | Not specified | Webhook spec pending |

---

## Constraints & Invariants

### Architectural Constraints

1. No component can bypass Contract enforcement
2. No execution without human approval
3. All outputs must be observable
4. Silence is failure
5. Convenience never overrides control

### Invariants (Must Hold Always)

```yaml
invariants:
  - intent_precedes_planning: true
  - planning_precedes_execution: true
  - execution_requires_contract: true
  - artifacts_are_mandatory: true
  - humans_are_final_authority: true
  - silence_is_failure: true
  - convenience_never_overrides_control: true
```

---

## Security Considerations

1. **Scope boundaries** are enforced at runtime, not just at compile time
2. **No credential exposure** through executors
3. **Audit logs** are immutable
4. **Human approval** is required for any privileged action
5. **Mobile companion** is read-only for security

---
*End of ARCHITECTURE.md*
