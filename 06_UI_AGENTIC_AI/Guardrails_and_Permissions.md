# Guardrails and Permissions

## Purpose

Define access controls and safety guardrails for agent UIs.

---

## Permission Model

### User Roles

| Role | Can Do | Cannot Do |
|------|--------|-----------|
| Viewer | Read-only interactions | Any writes |
| Developer | Standard agentic ops | Production access |
| Senior Dev | All dev + elevated | Security bypass |
| Admin | All + config changes | None |

---

## Guardrail Categories

### Hard Guardrails (Cannot Be Bypassed)
- No production database writes
- No credential access without audit
- No file deletion in protected paths
- Cost limits enforced

### Soft Guardrails (Require Confirmation)
- Large file changes (>100 lines)
- Operations in unfamiliar directories
- Commands with side effects
- Approaching cost limits

### Advisory Guardrails (Warnings Only)
- Using expensive models
- Long-running operations
- Unusual patterns detected

---

## Implementation Patterns

### Command Allowlist
```javascript
const ALLOWED_COMMANDS = [
  'npm install',
  'npm run test',
  'git status',
  // ...
];

const BLOCKED_COMMANDS = [
  /rm -rf/,
  /DROP TABLE/,
  /DELETE FROM/,
  // ...
];
```

### Path Protection
```javascript
const PROTECTED_PATHS = [
  '/config',
  '/.env',
  '/secrets',
  '/production',
];
```

### Cost Gates
```javascript
const COST_GATES = {
  warning: 10,    // $10 warning
  confirm: 25,    // $25 requires confirm
  hard_stop: 100, // $100 stops session
};
```

---

## Escalation Flow

```
Operation Requested
       │
       ├── In allowlist? → Execute
       │
       ├── Soft blocked? → Request confirmation
       │                        ↓
       │                   User confirms → Execute
       │                   User denies → Block
       │
       └── Hard blocked? → Block + Log + Alert
```

---

## Related Documents

- [Human in the Loop Model](../03_FRAMEWORKS/Human_in_the_Loop_Model.md)
- [AG-Guard Plugin](../07_IMPLEMENTATION/AG_Guard_Plugin.md)
