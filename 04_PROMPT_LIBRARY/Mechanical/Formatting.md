# Formatting Prompt

## Purpose

Apply consistent code formatting.

## Allowed Models
- GPT-4o-mini
- Claude Haiku
- Any Tier 1 model

## The Prompt

```
Format this code according to style guide.

Style guide:
- [STYLE_RULES]

Code:
```[LANGUAGE]
[CODE_HERE]
```

Apply:
- Consistent indentation
- Proper spacing
- Line length limits
- Import ordering
- Trailing commas (if applicable)

Output the formatted code without explanation.
```

## Note

Prefer using automated formatters (Prettier, Black, etc.) when available.
Use this prompt only when manual intervention is needed.

## Version History
- v1.0 (2026-01-06): Initial version
