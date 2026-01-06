# Architecture vs Execution Framework

## Purpose

Distinguish between design decisions (architecture) and implementation work (execution).

---

## The Core Distinction

### Architecture
**What:** Decisions that are hard to change later.

**Characteristics:**
- Affects multiple components
- High reversal cost
- Requires domain knowledge
- Sets constraints for future work

### Execution
**What:** Implementation within established boundaries.

**Characteristics:**
- Follows existing patterns
- Easily modified
- Clear success criteria
- Bounded scope

---

## Decision Flow

```
New Task
    │
    ├─→ Does it change system boundaries? 
    │       Yes → ARCHITECTURE
    │       No  ↓
    ├─→ Does it establish new patterns?
    │       Yes → ARCHITECTURE
    │       No  ↓
    ├─→ Will future work depend on this decision?
    │       Yes → ARCHITECTURE
    │       No  ↓
    └─→ EXECUTION
```

---

## AI Usage by Phase

### Architecture Phase
- **Role:** AI as advisor and analyst
- **Autonomy:** Level 0-1 (suggestion only)
- **Models:** Thinking models (Tier 3)
- **Output:** Options with trade-offs, not decisions

### Execution Phase
- **Role:** AI as implementer
- **Autonomy:** Level 2 (supervised)
- **Models:** Standard models (Tier 2)
- **Output:** Working code following patterns

---

## Examples

### Architecture Decisions
| Decision | Why Architecture |
|----------|-----------------|
| Microservices vs monolith | Affects all future development |
| Database choice | Migration cost is extreme |
| Auth pattern | Security implications |
| API versioning strategy | Client contract |

### Execution Tasks
| Task | Why Execution |
|------|--------------|
| Add new API endpoint | Follows existing patterns |
| Implement feature | Within established architecture |
| Fix bug | No structural change |
| Write tests | Following test patterns |

---

## Handoff Protocol

When transitioning from architecture to execution:

1. **Document decisions** — Record what was decided and why
2. **Define patterns** — Establish templates for implementation
3. **Set constraints** — What is NOT allowed
4. **Create first example** — Reference implementation
5. **Enable AI** — Now execution can be AI-assisted

---

## Anti-Patterns

### Architectural Drift
AI makes incremental decisions that collectively change architecture.

**Prevention:** Regular design reviews. Pattern enforcement.

### Over-Architecture
Every task treated as architectural decision.

**Prevention:** Use the decision flow. Trust execution.

---

## Related Documents

- [Task Classification Framework](Task_Classification_Framework.md)
- [Agentic Control Framework](Agentic_Control_Framework.md)
- [When to Use Thinking Models](../02_GUIDES/When_to_Use_Thinking_Models.md)
