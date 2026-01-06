# Agentic Control Framework

## Purpose

Define levels of AI autonomy and when each is appropriate.

---

## Autonomy Levels

### Level 0: Suggestion Only
AI provides suggestions. Human types all code.

**Tools:** GitHub Copilot inline, ChatGPT

**Use when:**
- Learning new patterns
- Security-sensitive code
- Understanding complex logic

---

### Level 1: Assisted Editing
AI can edit files with human approval per change.

**Tools:** Cursor (ask mode), Claude in chat

**Use when:**
- Refactoring known code
- Adding features to existing patterns
- Bug fixes with clear root cause

---

### Level 2: Supervised Execution
AI executes multi-step tasks. Human reviews before commit.

**Tools:** Antigravity, Cursor (agent mode)

**Use when:**
- Multi-file changes
- Test generation
- Documentation updates

---

### Level 3: Autonomous with Guardrails
AI operates independently within defined boundaries.

**Tools:** CI/CD agents, automated formatters

**Use when:**
- Mechanical operations only
- Well-defined, reversible tasks
- Comprehensive test coverage exists

---

## Control Matrix

| Task Type | Max Autonomy | Required Controls |
|-----------|-------------|-------------------|
| Formatting | Level 3 | None |
| Scaffolding | Level 2 | Light review |
| Feature dev | Level 2 | Full review |
| Architecture | Level 1 | Heavy review |
| Security | Level 0 | Expert review |
| Production deploy | Level 1 | Approval gate |

---

## Guardrail Requirements by Level

### Level 2+ Requires:
- File change logging
- Rollback capability
- Human pause trigger
- Cost monitoring

### Level 3 Requires:
- Comprehensive tests
- Automated validation
- Defined rollback
- Anomaly detection

---

## Escalation Triggers

Automatically reduce autonomy when:
- Error rate increases
- Unexpected file changes
- Token usage spikes
- Agent requests clarification
- Test failures occur

---

## Related Documents

- [Human in the Loop Model](Human_in_the_Loop_Model.md)
- [Using Agentic Tools](../02_GUIDES/Using_Agentic_Tools.md)
- [AI Usage SOP](../01_SOP/AI_Usage_SOP.md)
