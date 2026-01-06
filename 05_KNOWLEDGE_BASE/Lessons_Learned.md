# Lessons Learned

A collection of insights from AI-assisted development at DoozieSoft.

---

## General Insights

### Context is King
*Date: 2026-01*

AI quality directly correlates with context quality. Spending 5 minutes building good context saves 30 minutes of iteration.

**Do:**
- Include relevant file excerpts
- Explain the "why" not just the "what"
- Reference existing patterns

**Don't:**
- Dump entire codebases
- Assume AI knows your conventions
- Skip error messages

---

### Cheaper Models Are Underrated
*Date: 2026-01*

For 80% of tasks, Tier 1 models (GPT-4o-mini, Haiku) perform nearly as well as expensive models at 1/10th the cost.

**When cheap works:**
- Scaffolding
- Formatting
- Simple refactors
- Documentation

**When to upgrade:**
- Security-sensitive
- Complex reasoning
- Architecture

---

### Review Time is Not Wasted Time
*Date: 2026-01*

Teams that skip review end up spending 3x more time on bug fixes.

Every AI output needs human verification. Plan for it.

---

## Tool-Specific Insights

### Antigravity
- Planning mode is worth the extra step
- Set boundaries explicitly at session start
- Watch for scope creep in long sessions

### Cursor
- Tab mode for inline, agent mode for multi-file
- Context files significantly improve quality
- Can burn through tokens quickly in agent mode

### Claude Code
- Great for terminal-based workflows
- Memory across sessions can help or hurt
- Be explicit about file paths

---

## Add Your Lessons

Format:
```markdown
### [Title]
*Date: YYYY-MM*

[Description of lesson]

**Context:** [When this applies]
**Action:** [What to do]
```
