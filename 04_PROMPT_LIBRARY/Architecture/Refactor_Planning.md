# Refactor Planning Prompt

## Purpose

Plan large-scale refactoring with risk assessment.

## Allowed Models
- Claude Opus
- GPT-4 o1

## Disallowed Models
- Standard models (need deep reasoning)

## The Prompt

```
You are helping plan a codebase refactoring project.

Current State:
[DESCRIBE_CURRENT_CODE]

Target State:
[DESCRIBE_DESIRED_STATE]

Constraints:
- Must maintain backward compatibility: [YES/NO]
- Timeline: [TIMELINE]
- Risk tolerance: [LOW/MEDIUM/HIGH]

Please provide:

1. **Scope Analysis**
   - Files/modules affected
   - Dependencies that will change
   - APIs that will break

2. **Migration Strategy**
   - Phased approach recommendation
   - Order of operations
   - Rollback points

3. **Risk Assessment**
   - What could go wrong
   - Mitigation strategies
   - Testing requirements

4. **Effort Estimate**
   - Rough time breakdown by phase
   - Resource requirements

5. **Pre-Flight Checklist**
   - What must be true before starting
```

## Example Usage

Current State: Authentication is scattered across 15 controllers with duplicate logic.

Target State: Centralized auth middleware with role-based access control.

## Version History
- v1.0 (2026-01-06): Initial version
