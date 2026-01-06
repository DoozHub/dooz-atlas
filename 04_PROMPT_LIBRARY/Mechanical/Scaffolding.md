# Scaffolding Prompt

## Purpose

Generate boilerplate code structures.

## Allowed Models
- GPT-4o-mini
- Claude Haiku
- Any Tier 1 model

## The Prompt

```
Generate scaffolding for [COMPONENT_TYPE].

Name: [NAME]
Framework: [FRAMEWORK]
Directory: [TARGET_DIR]

Follow pattern from:
[EXISTING_EXAMPLE]

Generate:
1. File structure
2. Boilerplate code for each file
3. Basic types/interfaces
4. Placeholder implementations

Include:
- Standard imports
- Export statements
- Basic error handling
- Type definitions

Do NOT include:
- Business logic
- Complex implementations
- External dependencies beyond basics
```

## Example Usage

Generate scaffolding for: React component
Name: UserProfile
Framework: React + TypeScript
Directory: src/components/users/

Follow pattern: src/components/settings/SettingsPanel.tsx

## Version History
- v1.0 (2026-01-06): Initial version
