# Risky Logic Analysis Prompt

## Purpose

Analyze code with high consequence of failure (financial, security, data).

## Allowed Models
- Claude Opus
- GPT-4 o1-pro
- Gemini 2.0 Pro

## Disallowed Models
- All Tier 1/2 models (critical analysis required)

## The Prompt

```
You are analyzing code that handles critical/risky operations.

Code:
```[LANGUAGE]
[CODE_HERE]
```

This code handles: [DESCRIPTION_OF_WHAT_IT_DOES]

Failure consequences: [WHAT_HAPPENS_IF_WRONG]

Please analyze:

1. **Correctness**
   - Does the logic match the intended behavior?
   - Edge cases not handled?
   - Off-by-one errors?

2. **Safety**
   - Race conditions?
   - State corruption possibilities?
   - Resource leaks?

3. **Security**
   - Input validation gaps?
   - Authorization checks?
   - Information leakage?

4. **Failure Modes**
   - What happens on error?
   - Is it fail-safe or fail-open?
   - Recovery possible?

5. **Recommendations**
   - Specific fixes (with code)
   - Additional safeguards
   - Testing requirements

Be adversarial. Assume bugs exist until proven otherwise.
```

## Example Usage

Code handling: Payment processing with stripe webhook

Failure consequences: Double charges, lost revenue, customer trust

## Version History
- v1.0 (2026-01-06): Initial version
