# Review and Audit Workflows

## Purpose

Guide for using AI in code review and audit processes.

---

## AI-Assisted Code Review

### When to Use AI Review
- Large PRs (>500 lines)
- Unfamiliar codebases
- Security-sensitive changes
- Performance-critical code

### Review Prompts

#### General Review
```
Review this PR for:
1. Logic errors
2. Edge cases not handled
3. Performance concerns
4. Security issues
5. Code style violations

Be adversarial. Assume bugs exist.
```

#### Security Review
```
Analyze this code for security vulnerabilities:
1. Injection attacks
2. Authentication bypasses
3. Authorization flaws
4. Data exposure
5. Cryptographic issues

Report severity and exploitability.
```

---

## Audit Workflow

### Pre-Audit Preparation
1. Gather all changed files
2. Identify critical paths
3. Prepare context document
4. Select appropriate model (Tier 3/4)

### Audit Execution
1. Run security scan prompt
2. Run spec compliance check
3. Run edge case analysis
4. Compile findings

### Post-Audit
1. Prioritize by severity
2. Create tickets for issues
3. Document false positives
4. Update knowledge base

---

## Review Checklist

Before merging AI-reviewed code:

- [ ] AI review completed
- [ ] Human reviewed AI findings
- [ ] Critical issues addressed
- [ ] Edge cases tested
- [ ] Security concerns cleared

---

## Logging Requirements

All AI reviews must log:
- PR/commit reference
- Model used
- Prompt version
- Findings summary
- Human verification notes

---

## Anti-Patterns

### Don't: Skip Human Review
AI review supplements, not replaces, human judgment.

### Don't: Use Cheap Models
Security and architecture reviews require Tier 3/4.

### Don't: Ignore Context
Provide full system context for accurate review.

---

## Related Documents

- [AI Usage SOP](../01_SOP/AI_Usage_SOP.md)
- [Security and Data Policy](../01_SOP/Security_and_Data_Policy.md)
- [Adversarial Review Prompts](../04_PROMPT_LIBRARY/Review/Adversarial_Review.md)
