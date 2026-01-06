# Prompt Library — Canonical Prompts

This folder contains **approved, versioned prompts**.

## Rules

- No ad-hoc prompts for critical work
- Prompts are shared assets
- Prompts must declare allowed models

Each prompt file includes:
- Purpose
- Allowed / disallowed models
- Example usage

If a prompt is not here, it is not production-approved.

## Categories

| Category | Purpose |
|----------|---------|
| [Architecture](Architecture/) | System design, refactoring |
| [Implementation](Implementation/) | Feature building, APIs |
| [Review](Review/) | Code review, security |
| [Mechanical](Mechanical/) | Formatting, scaffolding |

---

## Prompt File Format

Every prompt file must include:

```markdown
# Prompt Name

## Purpose
What this prompt is for.

## Allowed Models
- Model 1
- Model 2

## Disallowed Models
- Model 3 (reason)

## The Prompt
\`\`\`
Actual prompt text here
\`\`\`

## Example Usage
How to use with context.

## Version History
- v1.0 (date): Initial version
```

---

**Authority:** Prompt changes require team review.
