# Using Agentic Tools

## Purpose

Guide for using autonomous AI coding tools: Antigravity, Cursor, Claude Code, and similar.

---

## What Are Agentic Tools?

Agentic tools can:
- Execute multiple steps autonomously
- Read and write files
- Run commands
- Navigate codebases
- Make decisions

They require **more oversight** than inline completions.

---

## Approved Tools

| Tool | Tier | Primary Use |
|------|------|-------------|
| Antigravity | Enterprise | Full agentic development |
| Cursor | Team | IDE-integrated agents |
| Claude Code | Individual | Terminal-based agents |
| Windsurf | Team | Multi-file workflows |

---

## Safe Usage Pattern

### 1. Define Clear Scope
Before starting an agentic session:
- State the specific goal
- Define boundaries (files, operations)
- Set success criteria

### 2. Use Planning Mode First
For complex tasks:
1. Start in PLANNING mode
2. Review the implementation plan
3. Approve before EXECUTION
4. Verify changes

### 3. Monitor Operations
Watch for:
- Unexpected file changes
- Cost accumulation
- Scope creep
- Circular loops

---

## Human-in-the-Loop Requirements

### Always Require Approval For:
- Database operations
- File deletions
- Production changes
- Credential access
- External API calls
- Any `rm` or `DROP` commands

### Configure Guardrails
Set up AG-Guard or similar plugin to:
- Block dangerous operations
- Require confirmation for risky actions
- Log all operations

---

## Session Best Practices

### Start Sessions With:
```
I want to [specific goal].
Only modify files in [directory].
Do not [specific exclusions].
Pause for approval before [risky actions].
```

### End Sessions With:
- Review all changed files
- Run tests
- Check cost summary
- Commit with clear message

---

## Troubleshooting

### Agent Loops
If agent is repeating actions:
1. Stop immediately
2. Review what's stuck
3. Provide clearer context
4. Resume with constraints

### Cost Explosion
If tokens spike unexpectedly:
1. Terminate session
2. Review logs
3. Simplify the task
4. Use cheaper model tier

---

## Related Documents

- [Agentic Control Framework](../03_FRAMEWORKS/Agentic_Control_Framework.md)
- [Human in the Loop Model](../03_FRAMEWORKS/Human_in_the_Loop_Model.md)
- [Cost Governance](../01_SOP/Cost_Governance.md)
