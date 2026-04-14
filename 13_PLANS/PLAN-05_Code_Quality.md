# PLAN-05: Code Quality Standardization

> **Priority:** MEDIUM  
> **Est. Time:** 3 hours  
> **Prerequisites:** PLAN-03 (Testing)  
> **Next Plan:** PLAN-07 (Environment Config)

---

## Objective

Standardize code quality tools across the ecosystem. Currently linting is inconsistent with only 2 projects having ESLint configs. All projects need consistent formatting, linting, and pre-commit hooks.

**Success Criteria:**
- All TypeScript projects have ESLint + Prettier
- All Python projects have Ruff or Black
- All PHP projects use Laravel Pint
- Pre-commit hooks configured
- Consistent editor configuration

---

## Current State

### Linting Coverage

| Project | ESLint | Prettier | Ruff/Black | Pint |
|---------|--------|----------|------------|------|
| dooz-core | ❌ | ❌ | — | ✅ |
| dooz-hindsight | ✅ | ❌ | — | — |
| dooz-pilot | ⚠️ | ❌ | — | — |
| dooz-copilot | ⚠️ | ❌ | — | — |
| Others | ❌ | ❌ | ❌ | ❌ |

### Issues

1. **No shared configs** — Each project invents its own rules
2. **No pre-commit hooks** — Code quality depends on manual runs
3. **Inconsistent formatting** — Mixed styles across files
4. **CI not enforcing** — No linting in GitHub Actions

---

## Target State

### Shared Configurations

**TypeScript/Bun Projects:**
```json
{
  "extends": "@dooz/eslint-config",
  "prettier": "@dooz/prettier-config"
}
```

**Python Projects:**
```toml
[tool.ruff]
extend = "@dooz/ruff-config"
```

**PHP Projects:**
```json
{
  "preset": "@dooz/laravel-pint"
}
```

### Pre-commit Hooks

All projects run on commit:
- Lint staged files
- Format code
- Run type checks
- Run tests (fast ones only)

---

## Execution Checklist

### Step 1: Create Shared Configs

**Location:** `/dooz-ecosystem/shared-configs/`

- [ ] **ESLint Config Package**
  ```javascript
  // shared-configs/eslint-config/index.js
  module.exports = {
    extends: [
      '@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
    rules: {
      // Custom Dooz rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  };
  ```

- [ ] **Prettier Config**
  ```javascript
  // shared-configs/prettier-config/index.json
  {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "printWidth": 100
  }
  ```

- [ ] **Ruff Config**
  ```toml
  # shared-configs/ruff-config/pyproject.toml
  [tool.ruff]
  line-length = 100
  select = ["E", "F", "I", "W"]
  ignore = ["E501"]
  ```

### Step 2: Configure TypeScript Projects

**For each TS project (dooz-bridge, dooz-pm-suite, dooz-ai-router, dooz-copilot, dooz-hindsight, dooz-perspective, dooz-atlas):**

- [ ] Install dependencies
  ```bash
  bun add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
  ```

- [ ] Create `.eslintrc.cjs`
  ```javascript
  module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
  };
  ```

- [ ] Create `.prettierrc`
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5"
  }
  ```

- [ ] Add scripts to package.json
  ```json
  {
    "scripts": {
      "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      "lint:fix": "eslint . --ext ts,tsx --fix",
      "format": "prettier --write \"src/**/*.{ts,tsx}\"",
      "format:check": "prettier --check \"src/**/*.{ts,tsx}\""
    }
  }
  ```

### Step 3: Configure Python Project

**dooz-ai-platform:**

- [ ] Add to `pyproject.toml`
  ```toml
  [tool.ruff]
  target-version = "py311"
  line-length = 100
  select = ["E", "F", "I", "W", "UP"]
  ```

- [ ] Create `.pre-commit-config.yaml`
  ```yaml
  repos:
    - repo: https://github.com/astral-sh/ruff-pre-commit
      rev: v0.1.0
      hooks:
        - id: ruff
          args: [--fix]
        - id: ruff-format
  ```

### Step 4: Setup Pre-commit Hooks

**For all projects:**

- [ ] Install pre-commit
  ```bash
  pip install pre-commit
  pre-commit install
  ```

- [ ] Create `.pre-commit-config.yaml`
  ```yaml
  repos:
    - repo: local
      hooks:
        - id: lint
          name: Lint
          entry: bun run lint
          language: system
          pass_filenames: false
          
        - id: format-check
          name: Format Check
          entry: bun run format:check
          language: system
          pass_filenames: false
          
        - id: test
          name: Test
          entry: bun test
          language: system
          pass_filenames: false
  ```

### Step 5: CI/CD Integration

**Add to all CI workflows:**

- [ ] Lint step
  ```yaml
  - name: Lint
    run: bun run lint
  ```

- [ ] Format check step
  ```yaml
  - name: Format Check
    run: bun run format:check
  ```

- [ ] Type check step (TypeScript)
  ```yaml
  - name: Type Check
    run: bun run type-check
  ```

### Step 6: Editor Configuration

**Create `.vscode/settings.json` for each project:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

---

## Verification Steps

1. **Lint Check:**
   ```bash
   cd dooz-bridge && bun run lint
   cd dooz-pm-suite && bun run lint
   # Should pass with no errors
   ```

2. **Format Check:**
   ```bash
   bun run format:check
   # Should pass or auto-fix
   ```

3. **Pre-commit Test:**
   ```bash
   # Make a test change
   git add .
   git commit -m "test: verify pre-commit hooks"
   # Hooks should run automatically
   ```

---

## Dependencies

- **PLAN-03** — Testing must be in place (pre-commit runs tests)
- **Node/Bun** — Package managers for tools
- **Python** — For pre-commit framework

---

**Definition of Done:**
- [ ] Shared configs created
- [ ] All TS projects have ESLint + Prettier
- [ ] Python project has Ruff configured
- [ ] Pre-commit hooks installed
- [ ] CI runs linting on all PRs
- [ ] Git commit: "chore: Standardize code quality tooling"

**Estimated Completion:** 3 hours  
**Priority:** MEDIUM — Improves code consistency
