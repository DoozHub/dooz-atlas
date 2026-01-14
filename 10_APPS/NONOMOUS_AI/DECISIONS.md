# NONOMOUS AI — Architectural Decisions

> Architectural decisions with rationale  
> **Generated:** 2026-01-14  
> **Status:** Living document — add decisions as they are made

---

## Decision Format

Each decision follows this format:

```markdown
## [ID]: Title

**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Deprecated | Superseded  
**Decider:** Name/Role

### Context
Brief description of the problem or situation.

### Decision
The decision made.

### Rationale
Why this decision was made.

### Consequences
- **Positive:** ...
- **Negative:** ...
- **Neutral:** ...

### Alternatives Considered
1. Alternative 1 — Rejected because...
2. Alternative 2 — Rejected because...

### Related Decisions
- [ID]: Related decision
```

---

## Decision Log

### D001: Anti-Autonomy as Core Philosophy

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
We need a foundational principle for how AI systems should operate. Current industry trend is toward fully autonomous agents.

#### Decision
NONOMOUS AI will explicitly reject autonomy. Every AI operation requires human intent, approval, and oversight.

#### Rationale
1. **Accountability**: Humans must own outcomes
2. **Safety**: Autonomy leads to unpredictable behavior
3. **Trust**: Organizations need auditability
4. **Control**: Speed should never override safety

#### Consequences
- **Positive:** Clear philosophical foundation; aligns with Dooz values
- **Positive:** Differentiates from competitors
- **Negative:** Adds friction to workflows
- **Negative:** More complex user experience

#### Alternatives Considered
1. **Gradual Autonomy** — Rejected: slippery slope
2. **Hybrid Autonomy** — Rejected: still too autonomous
3. **Opt-in Autonomy** — Rejected: creates two systems

#### Related Decisions
- D002: Human checkpoints required
- D003: Silence is failure

---

### D002: Human Checkpoints Required

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
How do we enforce human oversight without creating bottlenecks?

#### Decision
All execution requires mandatory human checkpoints:
1. Plan Review (before execution)
2. Pre-Execution Review (final approval)
3. Post-Execution Review (artifact verification)

#### Rationale
1. **Enforcement**: Checkpoints cannot be bypassed
2. **Flexibility**: Can be manual or automated (with human-in-loop)
3. **Audit**: Every checkpoint is logged

#### Consequences
- **Positive:** Guaranteed human involvement
- **Positive:** Creates natural pause points
- **Negative:** Slows down rapid iteration
- **Negative:** Requires human availability

#### Alternatives Considered
1. **Checkpoints only on critical paths** — Rejected: too subjective
2. **AI-assisted approval** — Rejected: AI shouldn't approve itself
3. **One-time daily approval** — Rejected: insufficient oversight

#### Related Decisions
- D001: Anti-Autonomy as Core Philosophy

---

### D003: Silence is Failure

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
How do we handle AI failures? Current systems often fail silently.

#### Decision
Any AI operation that completes without observable artifacts is treated as a failure. Silent success is not acceptable.

#### Rationale
1. **Observability**: Must be able to verify what happened
2. **Debugging**: Silence makes debugging impossible
3. **Audit**: No artifacts = no audit trail

#### Consequences
- **Positive:** Complete audit trail
- **Positive:** Easier debugging
- **Positive:** Forces artifact capture
- **Negative:** More storage required
- **Negative:** More complex execution

#### Alternatives Considered
1. **Silent success for simple tasks** — Rejected: inconsistent
2. **Optional artifacts** — Rejected: defeats purpose
3. **AI self-reporting** — Rejected: untrustworthy

---

### D004: Contract-First Execution

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
How do we define what an AI is allowed to do?

#### Decision
Every execution requires a machine-enforceable Contract that specifies:
- Intent (what to accomplish)
- Scope (what actions are allowed/forbidden)
- Constraints (time, cost, resources)
- Checkpoints (human approval points)

#### Rationale
1. **Enforcement**: Contracts can be validated programmatically
2. **Clarity**: Both humans and AI understand boundaries
3. **Audit**: Contracts serve as execution records

#### Consequences
- **Positive:** Clear boundaries
- **Positive:** Machine-enforceable
- **Positive:** Human-readable
- **Negative:** Authoring overhead
- **Negative:** Schema complexity

#### Alternatives Considered
1. **Natural language intent** — Rejected: too ambiguous
2. **Role-based access** — Rejected: insufficiently specific
3. **Dynamic scope expansion** — Rejected: violates control

---

### D005: Sandboxed Executors

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
How do we prevent AI from exceeding its boundaries during execution?

#### Decision
All executors run in isolated sandboxes with:
- Hard scope boundaries (no escape)
- No persistent state between runs
- Mandatory artifact capture
- Immediate hard failure on violations

#### Rationale
1. **Containment**: Executor cannot affect external systems
2. **Reproducibility**: Stateless = reproducible
3. **Audit**: All actions captured

#### Consequences
- **Positive:** Cannot exceed boundaries
- **Positive:** Reproducible results
- **Positive:** Complete observability
- **Negative:** Performance overhead
- **Negative:** Complex sandbox setup

#### Alternatives Considered
1. **Permission-based execution** — Rejected: permissions can be bypassed
2. **Container-based isolation** — Considered but complex
3. **Static analysis** — Rejected: insufficient

---

### D006: No Auto-Retry

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
What happens when execution fails?

#### Decision
Failures require human decision before retry. No automatic retries, no exponential backoff, no self-healing.

#### Rationale
1. **Accountability**: Human must decide if retry is appropriate
2. **Transparency**: Failure modes must be understood
3. **Safety**: Auto-retry can cause cascading failures

#### Consequences
- **Positive:** Human oversight on all failures
- **Positive:** Forces root cause analysis
- **Negative:** Slower recovery
- **Negative:** More human involvement required

#### Alternatives Considered
1. **Exponential backoff** — Rejected: hides problems
2. **Circuit breaker** — Rejected: too complex for MVP
3. **AI self-healing** — Rejected: violates anti-autonomy

---

### D007: Deterministic Planning

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
How do we ensure plans are reviewable?

#### Decision
Planner output must be deterministic: same input = same output. No randomness, no hidden state.

#### Rationale
1. **Reviewability**: Human can verify plan matches intent
2. **Reproducibility**: Can reproduce plan for testing
3. **Audit**: Consistent output for audit

#### Consequences
- **Positive:** Trustworthy plans
- **Positive:** Reproducible
- **Positive:** Verifiable
- **Negative:** May limit AI creativity
- **Negative:** Requires careful prompting

#### Alternatives Considered
1. **Creative planning** — Rejected: unpredictable
2. **Stochastic outputs** — Rejected: cannot verify

---

### D008: Jules as Primary Executor

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
Which AI system should execute plans?

#### Decision
Google Jules will be the primary executor. Other executors (Claude, GPT) via abstraction layer.

#### Rationale
1. **Integration**: Jules is designed for tool use
2. **Control**: Jules respects scope better than alternatives
3. **Ecosystem**: Aligns with Dooz ecosystem

#### Consequences
- **Positive:** Strong Jules integration
- **Negative:** Vendor dependency
- **Negative:** Multi-executor adds complexity

#### Alternatives Considered
1. **Claude as primary** — Rejected: less tool control
2. **GPT as primary** — Rejected: same reason
3. **Multiple primaries** — Rejected: too complex for MVP

#### Related Decisions
- D005: Sandboxed Executors
- D010: Multi-Executor Interface

---

### D009: Web-Based Command Center

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
What should the human control plane look like?

#### Decision
Command Center will be a web-based UI (React), not a desktop app or CLI-first approach.

#### Rationale
1. **Accessibility**: Access from any device
2. **Familiarity**: Web patterns are well-understood
3. **Deployment**: Easier deployment than desktop

#### Consequences
- **Positive:** Cross-platform
- **Positive:** Easy updates
- **Positive:** No installation required
- **Negative:** Requires browser
- **Negative:** Limited offline support

#### Alternatives Considered
1. **Desktop app (Tauri)** — Rejected: adds platform complexity
2. **CLI-first** — Rejected: poor UX for approvals
3. **Mobile-only** — Rejected: too limited

---

### D010: Multi-Executor Interface

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
Should NONOMOUS support multiple AI executors?

#### Decision
Yes, via an abstraction layer. Jules is primary, others via executor interface.

#### Rationale
1. **Flexibility**: Organizations have different preferences
2. **Vendor independence**: Not locked to one provider
3. **Competition**: Can use best model for task

#### Consequences
- **Positive:** Multi-cloud AI support
- **Positive:** Vendor independence
- **Negative:** Abstraction complexity
- **Negative:** Testing burden

#### Alternatives Considered
1. **Jules-only** — Rejected: too restrictive
2. **Dynamic executor selection** — Rejected: too complex

#### Related Decisions
- D008: Jules as Primary Executor

---

### D011: Immutable Audit Logs

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
How do we ensure audit integrity?

#### Decision
All audit logs are append-only with hash chain verification. No modifications or deletions allowed.

#### Rationale
1. **Integrity**: Hash chain proves no tampering
2. **Compliance**: Meets audit requirements
3. **Trust**: Verifiable history

#### Consequences
- **Positive:** Tamper-proof audit trail
- **Positive:** Meets compliance
- **Negative:** Storage costs increase
- **Negative:** Cannot correct mistakes

#### Alternatives Considered
1. **Append-only database** — Rejected: insufficient guarantees
2. **Blockchain-based** — Rejected: too complex
3. **Signed logs** — Rejected: partial solution only

---

### D012: Mobile as Read-Only + Actions

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
What should mobile companion app capabilities be?

#### Decision
Mobile app is read-only for monitoring, with approve/reject actions. No contract creation, no plan generation, no execution triggering.

#### Rationale
1. **Security**: Mobile devices are less secure
2. **UX**: Complex operations belong on desktop
3. **Safety**: Execution requires deliberate desktop action

#### Consequences
- **Positive:** Secure mobile access
- **Positive:** Good UX for approvals
- **Negative:** Limited mobile functionality
- **Negative:** Must use desktop for creation

#### Alternatives Considered
1. **Full feature parity** — Rejected: security risk
2. **Mobile-only** — Rejected: insufficient for complex tasks
3. **Read-only only** — Rejected: no actions means no value

---

### D013: Node.js/TypeScript for SDK

**Date:** 2024-12-22  
**Status:** ✅ Accepted  
**Decider:** DoozieSoft Architecture Team

#### Context
What technology should the executor SDK use?

#### Decision
Jules SDK will be Node.js with TypeScript.

#### Rationale
1. **Jules integration**: Native Node.js SDK
2. **TypeScript**: Type safety for contracts
3. **Ecosystem**: Large package ecosystem

#### Consequences
- **Positive:** Native Jules support
- **Positive:** Type safety
- **Negative:** Node.js runtime required
- **Negative:** Not polyglot

#### Alternatives Considered
1. **Python SDK** — Rejected: less Jules integration
2. **Rust SDK** — Rejected: overkill, Jules doesn't use Rust
3. **Multi-language SDKs** — Rejected: too complex for MVP

---

## Pending Decisions

| ID | Question | Status |
|----|----------|--------|
| D014 | What database for persistence? | Open |
| D015 | REST or GraphQL API? | Open |
| D016 | Event system (Webhooks/WebSockets)? | Open |
| D017 | Authentication provider? | Open |

---

## Superseded Decisions

| ID | Title | Superseded By | Date |
|----|-------|---------------|------|
| None yet | | | |

---
*End of DECISIONS.md*
