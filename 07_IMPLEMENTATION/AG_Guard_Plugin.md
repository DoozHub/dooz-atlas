# AG-Guard Plugin

## Purpose

Implementation guide for the AG-Guard plugin that enforces guardrails in agentic workflows.

---

## Overview

AG-Guard is a middleware plugin that:
- Intercepts agent operations
- Validates against policies
- Blocks dangerous operations
- Logs all activity

---

## Architecture

```
Agent Request
      │
      ▼
┌─────────────┐
│  AG-Guard   │
│  ┌───────┐  │
│  │Pattern│──┼──▶ Block or Allow
│  │Matcher│  │
│  ├───────┤  │
│  │Policy │──┼──▶ Enforce rules
│  │Engine │  │
│  ├───────┤  │
│  │Logger │──┼──▶ Audit trail
│  └───────┘  │
└──────┬──────┘
       │
       ▼
   Tool Executor
```

---

## Pattern Matching Rules

### File Path Rules
```yaml
file_rules:
  blocked_paths:
    - "**/.env*"
    - "**/secrets/**"
    - "**/credentials*"
  
  protected_paths:
    - "**/config/**"
    - "**/production/**"
    confirmation_required: true
  
  allowed_paths:
    - "**/src/**"
    - "**/tests/**"
```

### Command Rules
```yaml
command_rules:
  blocked:
    - pattern: "rm -rf"
      reason: "Dangerous recursive delete"
    - pattern: "DROP TABLE"
      reason: "Database destruction"
    - pattern: "curl.*|.*>.*"
      reason: "Piped downloads"
  
  require_confirmation:
    - pattern: "npm install"
    - pattern: "git push"
    - pattern: "docker"
```

### Content Rules
```yaml
content_rules:
  block_patterns:
    - name: "private_key"
      pattern: "-----BEGIN.*PRIVATE KEY-----"
    - name: "aws_key"
      pattern: "AKIA[0-9A-Z]{16}"
    - name: "password"
      pattern: "password\\s*=\\s*['\"]"
```

---

## Implementation

### Middleware Hook

```typescript
import { AgGuard } from '@dooziesoft/ag-guard';

const guard = new AgGuard({
  rulesPath: './ag-guard-rules.yaml',
  logLevel: 'info',
  onBlock: (operation, reason) => {
    console.log(`Blocked: ${operation} - ${reason}`);
  },
});

// Hook into agent
agent.use(guard.middleware());
```

### Custom Rules

```typescript
guard.addRule({
  name: 'custom-rule',
  type: 'command',
  pattern: /deploy.*production/,
  action: 'confirm',
  message: 'Production deployment requires confirmation',
});
```

---

## Logging

All operations logged with:
- Timestamp
- Operation type
- Target (file/command)
- Decision (allow/block/confirm)
- User ID
- Session ID

---

## Related Documents

- [Guardrails and Permissions](../06_UI_AGENTIC_AI/Guardrails_and_Permissions.md)
- [Logging and Observability](Logging_and_Observability.md)
