# Using GitHub Copilot Correctly

## Purpose

Guide for effective and safe use of GitHub Copilot in daily development.

---

## When to Use Copilot

### Good For
- Boilerplate code generation
- Common patterns (CRUD, API handlers)
- Test case scaffolding
- Documentation comments
- Simple refactors

### Not Good For
- Complex business logic
- Security-sensitive code
- Architecture decisions
- Code you don't understand

---

## Settings

### Recommended Configuration
```json
{
  "github.copilot.enable": {
    "*": true,
    "markdown": true,
    "plaintext": false
  },
  "github.copilot.inlineSuggest.enable": true
}
```

### Disable for Sensitive Files
- `.env` files
- Credential configs
- Security modules

---

## Usage Patterns

### 1. Comment-Driven Development
Write a clear comment, let Copilot complete:
```python
# Parse ISO date string and return datetime object
# Handle timezone conversion to UTC
def parse_date(date_string: str) -> datetime:
```

### 2. Test Generation
Write test function signature, Copilot fills in:
```python
def test_user_creation_with_valid_email():
```

### 3. Pattern Repetition
Start a pattern, let Copilot continue:
```javascript
const userSchema = z.object({
  name: z.string(),
  // Copilot continues similar patterns
```

---

## Review Checklist

Before accepting Copilot suggestions:

- [ ] Does it match the intended logic?
- [ ] Are there edge case issues?
- [ ] Is it the idiomatic solution?
- [ ] Are there security concerns?
- [ ] Does it follow project conventions?

---

## Anti-Patterns

### Don't: Accept Without Reading
Every suggestion needs review.

### Don't: Use for Critical Paths
Authentication, payments, security = manual code.

### Don't: Ignore Context
Copilot doesn't know your full system.

---

## Related Documents

- [AI Usage SOP](../01_SOP/AI_Usage_SOP.md)
- [Using Agentic Tools](Using_Agentic_Tools.md)
