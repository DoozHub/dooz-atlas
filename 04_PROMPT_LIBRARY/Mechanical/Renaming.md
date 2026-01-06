# Renaming Prompt

## Purpose

Systematic renaming of variables, functions, or files.

## Allowed Models
- GPT-4o-mini
- Claude Haiku
- Any Tier 1 model

## The Prompt

```
Rename [ENTITY_TYPE] across codebase.

Current name: [OLD_NAME]
New name: [NEW_NAME]

Files to check:
[LIST_OF_FILES]

Requirements:
- Update all references
- Preserve functionality
- Update imports/exports
- Update comments/docs
- Maintain casing conventions (camelCase, snake_case, etc.)

Output:
For each file, show the diff of changes.
```

## Example Usage

Rename function: getUserData → fetchUserProfile
Files: src/api/*.ts, src/hooks/*.ts

## Version History
- v1.0 (2026-01-06): Initial version
