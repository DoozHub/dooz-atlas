# When to Use Thinking Models

## Purpose

Guide for selecting when to use expensive "thinking" models vs standard models.

---

## What Are Thinking Models?

Models with extended reasoning capabilities:
- OpenAI o1, o1-pro
- Claude Opus
- Gemini 2.0 Pro

They cost 10-100x more but provide deeper analysis.

---

## Use Thinking Models For

### 1. System Architecture
- Multi-service design
- Database schema decisions
- API contract design
- Migration strategies

### 2. Complex Refactoring
- Large codebase restructuring
- Breaking changes analysis
- Dependency untangling
- Performance optimization

### 3. Risky Logic
- Financial calculations
- Security implementations
- Concurrent/parallel code
- State machine design

### 4. Spec Compliance
- Regulatory requirements
- API compatibility checks
- Contract verification
- Edge case analysis

---

## Don't Use Thinking Models For

### Mechanical Tasks
- Code formatting ❌
- Variable renaming ❌
- Scaffolding ❌
- Simple CRUD ❌

### Well-Understood Patterns
- Standard API handlers ❌
- Common UI components ❌
- Routine test cases ❌

---

## Decision Framework

```
Is this task:
├── Mechanical? → Use Tier 1 (cheap)
├── Well-understood? → Use Tier 2 (standard)
├── Novel or risky? → Consider Tier 3 (thinking)
└── Security-critical? → Use Tier 4 (adversarial)
```

---

## Cost Comparison

| Task | Standard Model | Thinking Model |
|------|---------------|----------------|
| Simple function | $0.01 | $0.50 (overkill) |
| API design | $0.05 | $0.50 (justified) |
| Architecture | $0.10 | $1.00 (required) |
| Security review | $0.20 | $2.00 (required) |

---

## Prompting Thinking Models

### Do:
- Provide full context upfront
- Ask for reasoning steps
- Request trade-off analysis
- Specify constraints clearly

### Don't:
- Use for iteration (expensive)
- Ask vague questions
- Skip context to save tokens
- Ignore the reasoning output

---

## Related Documents

- [Model Routing Policy](../01_SOP/Model_Routing_Policy.md)
- [Task Classification Framework](../03_FRAMEWORKS/Task_Classification_Framework.md)
- [Cost Governance](../01_SOP/Cost_Governance.md)
