# PLAN-07: Environment Configuration Audit

> **Priority:** LOW  
> **Est. Time:** 2 hours  
> **Prerequisites:** None  
> **Next Plan:** Complete

---

## Objective

Audit and standardize environment configuration across all modules. Ensure every project has complete .env.example files, documentation, and validation.

**Success Criteria:**
- All 13 modules have complete .env.example
- Environment variables documented
- Configuration validation in code
- Production checklist for each module

---

## Current State

### Environment Config Status

| Module | .env.example | Documentation | Validation |
|--------|--------------|---------------|------------|
| dooz-core | ✅ | ✅ | ✅ |
| dooz-pm-suite | ⚠️ | ⚠️ | ❌ |
| dooz-bridge | ⚠️ | ⚠️ | ❌ |
| dooz-brain | ⚠️ | ⚠️ | ❌ |
| Others | ❌ | ❌ | ❌ |

### Issues

1. **Missing examples** — Hard to set up new environments
2. **Undocumented variables** — Meaning unclear
3. **No validation** — Typos only found at runtime
4. **Inconsistent naming** — Different patterns per module

---

## Target State

### Standard .env.example Structure

```bash
# ============================================
# [Module Name] Environment Configuration
# ============================================

# Application
APP_NAME=dooz-[module]
APP_ENV=local
APP_PORT=3000
APP_DEBUG=true

# Database
DATABASE_URL=postgresql://user:pass@localhost/dbname
# For SQLite: DATABASE_URL=./data/db.sqlite

# External Services
BRAIN_URL=http://localhost:3333
CORE_URL=http://localhost:8000
BRIDGE_URL=http://localhost:3001

# AI/LLM (if applicable)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
DEFAULT_LLM_PROVIDER=openai

# Security
JWT_SECRET=generate-with-openssl-rand-base64-32
ENCRYPTION_KEY=...

# Monitoring
LOG_LEVEL=info
SENTRY_DSN=

# Feature Flags
ENABLE_FEATURE_X=true
```

### Validation Requirements

```typescript
// config/validate.ts
import { z } from 'zod';

const configSchema = z.object({
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export const config = configSchema.parse(process.env);
```

---

## Execution Checklist

### Step 1: Audit Existing Configs

**For each module, check:**

- [ ] Does .env.example exist?
- [ ] Are all required variables listed?
- [ ] Are optional variables marked?
- [ ] Are secrets clearly marked (***REQUIRED***)?
- [ ] Is there a description for each variable?

**Create audit report:**
```markdown
| Module | Status | Missing Variables |
|--------|--------|-------------------|
| dooz-core | ✅ | None |
| dooz-bridge | ⚠️ | BRAIN_URL, LOG_LEVEL |
| ... | ... | ... |
```

### Step 2: Create Missing .env.example Files

**Priority 1 (Critical):**
- [ ] dooz-bridge/.env.example
- [ ] dooz-pm-suite/.env.example
- [ ] dooz-brain/.env.example

**Priority 2 (Important):**
- [ ] dooz-ai-router/.env.example
- [ ] dooz-ai-platform/.env.example
- [ ] dooz-copilot/.env.example

**Priority 3 (Supporting):**
- [ ] dooz-hindsight/.env.example
- [ ] dooz-perspective/.env.example
- [ ] dooz-atlas/.env.example
- [ ] neo-analog/.env.example

### Step 3: Add Configuration Validation

**TypeScript Projects:**

- [ ] Install Zod
  ```bash
  bun add zod
  ```

- [ ] Create config validator
  ```typescript
  // src/config/index.ts
  import { z } from 'zod';
  
  const envSchema = z.object({
    PORT: z.string().default('3000').transform(Number),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string().min(1),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  });
  
  export const config = envSchema.parse(process.env);
  ```

- [ ] Use in application
  ```typescript
  import { config } from './config';
  
  app.listen(config.PORT);
  ```

**Python Projects:**

- [ ] Install pydantic-settings
  ```bash
  pip install pydantic-settings
  ```

- [ ] Create config
  ```python
  # config.py
  from pydantic_settings import BaseSettings
  
  class Settings(BaseSettings):
      port: int = 8000
      database_url: str
      log_level: str = "info"
      
      class Config:
          env_file = ".env"
  
  settings = Settings()
  ```

### Step 4: Document Configuration

**For each module, create CONFIG.md:**

```markdown
# Configuration Guide

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| DATABASE_URL | Database connection | postgresql://... |

## Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| LOG_LEVEL | info | Logging verbosity |
| DEBUG | false | Enable debug mode |

## Production Checklist

- [ ] Set APP_ENV=production
- [ ] Use strong JWT_SECRET
- [ ] Enable SSL
- [ ] Set LOG_LEVEL=warn
```

### Step 5: Create Environment Setup Script

**Location:** `/dooz-ecosystem/scripts/setup-env.sh`

```bash
#!/bin/bash
# Setup environment files for all modules

echo "Setting up DOOZ environment..."

for dir in dooz-*/; do
  if [ -f "$dir/.env.example" ]; then
    if [ ! -f "$dir/.env" ]; then
      cp "$dir/.env.example" "$dir/.env"
      echo "✓ Created $dir/.env"
    else
      echo "⚠ $dir/.env already exists"
    fi
  fi
done

echo "Done! Edit .env files with your configuration."
```

---

## Verification Steps

1. **Run Setup Script:**
   ```bash
   ./scripts/setup-env.sh
   # Should create all .env files
   ```

2. **Validate Configs:**
   ```bash
   cd dooz-bridge && bun run dev
   # Should start without errors
   ```

3. **Check Examples:**
   ```bash
   # Each .env.example should have all required vars
   grep -E "^\w+=" dooz-bridge/.env.example | wc -l
   # Should show expected count
   ```

---

## Dependencies

- **None** — Can be done anytime

---

**Definition of Done:**
- [ ] All 13 modules have .env.example
- [ ] Configuration validation in 5+ modules
- [ ] Production checklists created
- [ ] Setup script tested
- [ ] Git commit: "chore: Standardize environment configuration"

**Estimated Completion:** 2 hours  
**Priority:** LOW — Improves developer onboarding
