# NONOMOUS AI

> **Control is a feature. Friction is intentional. Speed without ownership is failure.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Doctrine Version](https://img.shields.io/badge/Doctrine-v1.0.0-blue.svg)](./doctrine/NONOMOUS_AI_MASTER.md)

---

## What is NONOMOUS AI?

**NONOMOUS AI** is an **anti-autonomous AI framework** that rejects the idea that software systems should operate independently of human intent, judgment, and accountability.

```
Autonomy → NONOMOUS
(The "NO" in autonomous)
```

NONOMOUS systems:
- Execute **only within declared intent**
- Require **explicit boundaries**
- Preserve **human responsibility at every critical decision**

> **AI may execute. Humans must intend.**

---

## The NONOMOUS Loop

All NONOMOUS systems follow this canonical loop:

```
Intent → Plan → Review → Execute → Report → Human Decision
   ↑                                              |
   └──────────────────────────────────────────────┘
```

| Phase | Actor | Constraint |
|-------|-------|------------|
| Intent | Human | Must be explicit, finite, reviewable |
| Plan | AI | Must be deterministic, inspectable |
| Review | Human | Mandatory checkpoint |
| Execute | AI | Strictly scoped |
| Report | AI | Verifiable artifacts only |
| Decision | Human | Final authority |

---

## Project Structure

```
nonomous-ai/
├── doctrine/           # Phase 0: Immutable principles
├── contracts/          # Phase 1: Execution contracts
├── planner/            # Phase 2: AI-assisted planning
├── jules-sdk/          # Phase 3: Node.js executor SDK
├── command-center/     # Phase 4: Human control plane
├── audit/              # Phase 5: Artifact & audit system
├── failure-handling/   # Phase 6: Failure taxonomy
├── multi-executor/     # Phase 7: Executor abstraction
├── open-source/        # Phase 8: OSS guidelines
├── dogfooding/         # Phase 9: Internal validation
├── ecosystem/          # Phase 10: Expansion tools
├── mobile-companion/   # Mobile review client
└── graphs/             # Agent-readable task graphs
```

---

## Quick Start

### 1. Understand the Doctrine

```bash
# Read the canonical doctrine
cat doctrine/NONOMOUS_AI_MASTER.md
```

### 2. Create a Contract

```yaml
# contracts/examples/my-first-contract.yaml
intent:
  description: "Add a new API endpoint"
  success_criteria:
    - "Endpoint returns 200 OK"
    - "All tests pass"

scope:
  allowed_actions: [read, write, test]
  forbidden_actions: [deploy, delete]

constraints:
  time_limit: "30 minutes"
  domains_allowed: ["src/", "tests/"]
```

### 3. Plan with Human Approval

```bash
# Generate a plan (AI-assisted)
nonomous plan --contract my-first-contract.yaml

# Review the plan (MANDATORY)
nonomous review --plan plan-123.yaml

# Approve or reject
nonomous approve --plan plan-123.yaml
```

### 4. Execute with Constraints

```bash
# Execute only after approval
nonomous execute --plan plan-123.yaml

# Artifacts are automatically captured
ls artifacts/plan-123/
```

---

## Core Components

| Component | Description | Status |
|-----------|-------------|--------|
| [Doctrine](./doctrine/) | Immutable philosophy & principles | 📋 Spec |
| [Contracts](./contracts/) | Execution boundary definitions | 📋 Spec |
| [Planner](./planner/) | AI-assisted planning layer | 📋 Spec |
| [Jules SDK](./jules-sdk/) | Node.js executor for Google Jules | 📋 Spec |
| [Command Center](./command-center/) | Human control UI | 📋 Spec |
| [Audit](./audit/) | Artifact & evidence system | 📋 Spec |
| [Mobile Companion](./mobile-companion/) | iOS/Android review client | 📋 Spec |

---

## What NONOMOUS AI is NOT

❌ Fully autonomous agents  
❌ Self-directed goal creation  
❌ Self-modifying execution logic  
❌ Long-running agents without checkpoints  
❌ AI deciding *what* should be built  

NONOMOUS AI does **not**:
- Replace engineers
- Replace judgment
- Replace ownership
- Replace accountability

---

## Execution Priority

See [EXECUTION_ORDER.md](./EXECUTION_ORDER.md) for the prioritized build sequence.

| Priority | Phase | Component |
|----------|-------|-----------|
| P0 | 0 | Doctrine (freeze first) |
| P1 | 1 | Contract System |
| P2 | 2 | Planner Interface |
| P3 | 3 | Jules SDK |
| P4 | 5 | Audit System |
| P5 | 4 | Command Center |
| P6 | 6 | Failure Handling |
| P7 | - | Mobile Companion |

---

## For AI Agents

If you are an AI agent reading this:

- ❌ Do not infer intent
- ❌ Do not bypass review
- ❌ Do not optimize away checkpoints
- ❌ Do not act unless permitted
- ❌ Do not assume authority

**Your role is execution, not authorship.**

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License

MIT License - See [LICENSE](./LICENSE)

---

## Links

- [Glossary](./GLOSSARY.md) - Term definitions
- [Execution Order](./EXECUTION_ORDER.md) - Build priority
- [Task Graphs](./graphs/) - Agent-readable plans

---

**NONOMOUS AI** — *Human Intent. AI Execution. Explicit Control.*
