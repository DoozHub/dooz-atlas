# AI Usage SOP

**Version:** 1.0  
**Effective:** 2026-01-06  
**Authority:** CTO

---

## Purpose

Define mandatory rules for AI-assisted software development at DoozieSoft.

---

## Scope

All engineers, contractors, and AI systems used in:
- Code generation
- Architecture decisions
- Code review
- Documentation

---

## Core Rules

### 1. No Blind Trust

**Rule:** Never accept AI output without human review.

**Rationale:** AI models hallucinate, miss context, and lack domain knowledge.

**Enforcement:** Code review must verify AI-generated sections.

---

### 2. Classify Before You Prompt

**Rule:** Determine task type before selecting a model.

| Task Type | Model Tier | Examples |
|-----------|-----------|----------|
| Mechanical | Fast/Cheap | Formatting, renaming, scaffolding |
| Cognitive | Standard | Feature implementation, API design |
| Architectural | Thinking | System design, refactoring strategy |
| Review | Adversarial | Security review, spec compliance |

**Rationale:** Cost optimization and quality alignment.

---

### 3. Use Approved Prompts for Critical Work

**Rule:** Production-critical prompts must come from the Prompt Library.

**Rationale:** Consistency, auditability, and version control.

---

### 4. Log All Agentic Operations

**Rule:** Any autonomous AI action must be logged with:
- Timestamp
- Model used
- Input hash
- Output summary
- Cost

**Rationale:** Audit trail and cost tracking.

---

### 5. Human Approval for Risky Actions

**Rule:** The following require explicit human approval:
- Database migrations
- Production deployments
- Security-sensitive changes
- Deletion operations
- External API integrations

**Rationale:** Blast radius containment.

---

### 6. Cost Awareness

**Rule:** Monitor token usage per session and per project.

**Soft Limit:** 500K tokens/day per engineer  
**Hard Limit:** 2M tokens/day (requires escalation)

**Rationale:** Prevent cost explosions.

---

## Violations

See [Violations and Escalation](Violations_and_Escalation.md) for enforcement procedures.

---

## Related Documents

- [Model Routing Policy](Model_Routing_Policy.md)
- [Task Classification Framework](../03_FRAMEWORKS/Task_Classification_Framework.md)
- [Cost Governance](Cost_Governance.md)
