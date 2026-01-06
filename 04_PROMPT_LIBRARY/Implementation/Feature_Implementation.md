# Feature Implementation Prompt

## Purpose

Guide AI through implementing a new feature within existing patterns.

## Allowed Models
- Claude Sonnet
- GPT-4o
- Gemini 2.0 Flash

## Disallowed Models
- Tier 1 models (need code understanding)

## The Prompt

```
Implement a new feature following existing patterns.

Feature: [FEATURE_DESCRIPTION]

Requirements:
- [REQUIREMENT_1]
- [REQUIREMENT_2]

Existing patterns to follow:
[EXAMPLE_OF_SIMILAR_FEATURE]

Constraints:
- Follow [FRAMEWORK] conventions
- Use existing [UTILITIES_OR_PATTERNS]
- Maintain [STYLE_GUIDE]

Please implement:

1. **Files to create/modify**
   - List each file with changes

2. **Implementation**
   - Complete working code
   - Following existing patterns exactly

3. **Tests**
   - Unit tests for new code
   - Integration test if applicable

4. **Checklist**
   - [ ] Follows existing patterns
   - [ ] Error handling included
   - [ ] Types/interfaces defined
   - [ ] Tests written
```

## Example Usage

Feature: Add user notification preferences

Requirements:
- Email opt-in/out
- Push notification settings
- Preference persistence

Existing patterns: See UserSettings model and preferences controller

## Version History
- v1.0 (2026-01-06): Initial version
