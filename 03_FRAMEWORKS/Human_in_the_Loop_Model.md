# Human in the Loop Model

## Purpose

Define where and how humans must remain in control of AI-assisted workflows.

---

## The HITL Spectrum

```
Full Human          Hybrid              Full AI
    │                 │                    │
    ├── Security ─────┤                    │
    ├── Architecture ─┤                    │
    │          ├──── Features ─────┤       │
    │                 ├───── Routine ──────┤
    │                         ├── Mechanical ──┤
```

---

## Mandatory Human Checkpoints

### Always Require Human

| Action | Reason |
|--------|--------|
| Production deploy | Blast radius |
| Database migration | Data integrity |
| Security changes | Attack surface |
| Customer data access | Privacy |
| External API keys | Cost/security |
| Deletion operations | Irreversibility |

---

## Approval Models

### Pre-Approval
Human approves before AI acts.

**Use for:** Risky, complex, or irreversible actions.

```
Human reviews plan → Approves → AI executes
```

### Post-Approval
AI acts, human reviews before commit.

**Use for:** Routine, reversible actions.

```
AI executes → Human reviews → Commits/reverts
```

### Async Review
AI acts immediately, human reviews later.

**Use for:** Low-risk, mechanical tasks.

```
AI executes → Commits → Human reviews (audit)
```

---

## Implementation Patterns

### Pause Points
Configure AI tools to pause at:
- File creation in sensitive directories
- Commands with side effects
- Changes to config files
- Operations on production data

### Confirmation Prompts
Require explicit confirmation:
```
AI: "I'm about to delete 47 files. Confirm? [y/N]"
```

### Audit Logging
All operations logged for review:
- What changed
- Who approved (or auto-approved)
- Why (context from prompt)

---

## Escalation Triggers

AI should escalate to human when:
- Confidence is low
- Task is ambiguous
- Previous attempts failed
- Unexpected state encountered
- Resource limits approached

---

## Anti-Patterns

### Rubber Stamping
Human approves without review.

**Prevention:** Random audits. Accountability.

### Alert Fatigue
Too many checkpoints devalue review.

**Prevention:** Right-size controls. Trust routine.

### False Confidence
Assuming AI got it right because it's AI.

**Prevention:** Skeptical review culture.

---

## Related Documents

- [Agentic Control Framework](Agentic_Control_Framework.md)
- [Violations and Escalation](../01_SOP/Violations_and_Escalation.md)
- [Guardrails and Permissions](../06_UI_AGENTIC_AI/Guardrails_and_Permissions.md)
