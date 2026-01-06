# Task Classification Framework

## Purpose

Provide a systematic way to classify development tasks for appropriate AI usage.

---

## The Four Quadrants

```
                    Low Complexity
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        │   MECHANICAL   │    ROUTINE     │
        │    (Tier 1)    │    (Tier 2)    │
        │                │                │
Low     ├────────────────┼────────────────┤  High
Risk    │                │                │  Risk
        │   COGNITIVE    │  ARCHITECTURAL │
        │    (Tier 2)    │    (Tier 3)    │
        │                │                │
        └────────────────┼────────────────┘
                         │
                    High Complexity
```

---

## Quadrant Definitions

### Mechanical (Low Risk, Low Complexity)
**What:** Repetitive, pattern-based tasks with clear rules.

**Examples:**
- Code formatting
- Variable renaming
- Import organization
- Scaffolding boilerplate

**AI Usage:** Full automation OK. Use cheapest models.

---

### Routine (Low Risk, High Complexity)
**What:** Well-understood patterns that require more effort.

**Examples:**
- Standard CRUD operations
- Common UI components
- Test case generation
- API endpoint implementation

**AI Usage:** AI-assisted with light review. Use standard models.

---

### Cognitive (High Risk, Low Complexity)
**What:** Simple code with significant consequences.

**Examples:**
- Permission checks
- Input validation
- Configuration changes
- Error handling

**AI Usage:** AI can assist, but require human approval. Use standard models.

---

### Architectural (High Risk, High Complexity)
**What:** Complex decisions affecting multiple systems.

**Examples:**
- Database schema design
- Service boundaries
- Authentication flows
- Migration strategies

**AI Usage:** AI as advisor only. Use thinking models. Human decides.

---

## Classification Checklist

For each task, answer:

1. **Reversibility:** Can mistakes be easily undone?
   - Yes → Lower risk
   - No → Higher risk

2. **Blast radius:** How many systems affected?
   - One file → Lower complexity
   - Multiple services → Higher complexity

3. **Precedent:** Has this been done before?
   - Many times → More routine
   - Novel → More architectural

4. **Consequence:** What happens if wrong?
   - Minor inconvenience → Lower risk
   - Data loss/security issue → Higher risk

---

## Quick Reference

| Task | Quadrant | Tier | Review |
|------|----------|------|--------|
| Rename variable | Mechanical | 1 | None |
| Add API endpoint | Routine | 2 | Light |
| Add auth check | Cognitive | 2 | Required |
| Design DB schema | Architectural | 3 | Heavy |
| Security audit | Architectural | 4 | Expert |

---

## Related Documents

- [Model Routing Policy](../01_SOP/Model_Routing_Policy.md)
- [Cost Governance](../01_SOP/Cost_Governance.md)
- [Architecture vs Execution](Architecture_vs_Execution.md)
