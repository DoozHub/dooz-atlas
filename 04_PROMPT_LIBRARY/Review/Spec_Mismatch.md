# Spec Mismatch Prompt

## Purpose

Verify code matches specification/requirements.

## Allowed Models
- Claude Opus
- GPT-4o

## Disallowed Models
- Tier 1 models

## The Prompt

```
Compare implementation against specification.

Specification:
[PASTE_SPEC_OR_REQUIREMENTS]

Implementation:
```[LANGUAGE]
[CODE_HERE]
```

Check for:

1. **Missing Requirements**
   - What specs are NOT implemented?
   - Partial implementations?

2. **Incorrect Behavior**
   - Where does code differ from spec?
   - Wrong outputs for given inputs?

3. **Extra Behavior**
   - What does code do that spec doesn't require?
   - Is this intentional or drift?

4. **Edge Case Coverage**
   - Does spec define edge cases?
   - Are they implemented?

5. **Contract Violations**
   - Input/output mismatches?
   - Type mismatches?

Format findings as:
| Spec Item | Status | Issue |
|-----------|--------|-------|
| ... | ✓/✗/Partial | Description |
```

## Version History
- v1.0 (2026-01-06): Initial version
