# UX Principles for Agent Interfaces

## Purpose

Define user experience guidelines for AI-powered interfaces.

---

## Core Principles

### 1. Transparency
Users must understand what the agent is doing.

**Do:**
- Show current operation clearly
- Display progress indicators
- Explain what actions are being taken

**Don't:**
- Hide operations
- Use vague status messages
- Let actions happen silently

---

### 2. Control
Users must be able to stop and adjust.

**Do:**
- Provide pause/stop buttons
- Allow mid-operation corrections
- Support undo where possible

**Don't:**
- Lock users out during operations
- Make stopping difficult
- Ignore user interrupts

---

### 3. Cost Awareness
Users must see resource consumption.

**Do:**
- Display token usage
- Show cost estimates
- Warn before expensive operations

**Don't:**
- Hide cost information
- Surprise users with bills
- Make usage tracking optional

---

### 4. Predictability
Same input should produce similar output.

**Do:**
- Use consistent UI patterns
- Provide operation previews
- Show expected outcomes

**Don't:**
- Vary UI randomly
- Skip confirmation for important actions
- Change behavior without notice

---

## UI Patterns

### Operation Preview
Before any significant action, show:
- What will happen
- What will change
- Estimated cost
- Rollback options

### Progress Display
During operations, show:
- Current step
- Total steps (if known)
- Elapsed time
- Running cost

### Result Display
After operations, show:
- What changed
- Final cost
- Any warnings
- Next steps

---

## Related Documents

- [Guardrails and Permissions](Guardrails_and_Permissions.md)
- [Token Tracking Design](Token_Tracking_Design.md)
