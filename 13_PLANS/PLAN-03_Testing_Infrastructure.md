# PLAN-03: Testing Infrastructure Expansion

> **Priority:** MEDIUM  
> **Est. Time:** 6 hours  
> **Prerequisites:** PLAN-02 (CI/CD) — need workflows to run tests  
> **Next Plan:** PLAN-05 (Code Quality)

---

## Objective

Establish comprehensive testing infrastructure across the ecosystem. Currently only dooz-core has meaningful test coverage. All TypeScript, Python, and Rust projects need test frameworks configured and baseline tests written.

**Success Criteria:**
- All 13 modules have test configuration
- Each module has at least 5 meaningful tests
- Tests run in CI/CD automatically
- Coverage reporting configured where applicable

---

## Current State

### Testing Coverage Matrix

| Project | Test Framework | Test Files | Coverage | Status |
|---------|---------------|------------|----------|--------|
| dooz-core | PHPUnit | 109 files | ~60% | ✅ Good |
| dooz-bridge | Bun Test | 1 file | ~10% | ⚠️ Minimal |
| dooz-pm-suite | Bun Test | 0 files | 0% | ❌ None |
| dooz-ai-router | Bun Test | 0 files | 0% | ❌ None |
| dooz-ai-platform | Python | 2 files | ~15% | ⚠️ Minimal |
| dooz-brain | None | 0 files | 0% | ❌ None |
| dooz-hub | None | 0 files | 0% | ❌ None |
| dooz-pilot | None | 0 files | 0% | ❌ None |
| dooz-copilot | None | 0 files | 0% | ❌ None |
| dooz-hindsight | None | 0 files | 0% | ❌ None |
| dooz-perspective | None | 0 files | 0% | ❌ None |
| dooz-atlas | None | 0 files | 0% | ❌ None |
| neo-analog | None | 0 files | 0% | ❌ None |

### Critical Gaps

1. **Zero TypeScript test coverage** (excluding dooz-core PHP)
2. **No Rust tests** for Tauri backends
3. **No E2E tests** for desktop apps
4. **No integration tests** for API modules

---

## Target State

### Testing Standards by Language

**TypeScript/Bun Projects:**
```json
{
  "scripts": {
    "test": "bun test",
    "test:coverage": "bun test --coverage",
    "test:watch": "bun test --watch"
  }
}
```

**TypeScript/Node Projects:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

**Python Projects:**
```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py", "*_test.py"]
```

**Rust Projects:**
```toml
[dev-dependencies]
tokio-test = "0.4"
mockall = "0.12"
```

### Minimum Test Requirements

Each module must have:

1. **Unit Tests** — Individual function/class testing
   - At least 5 tests per major service
   - Happy path and error cases

2. **Integration Tests** — API endpoint testing
   - Database setup/teardown
   - Full request/response cycles

3. **Smoke Tests** — Build verification
   - App starts without errors
   - Critical paths work

---

## Execution Checklist

### Phase 1: TypeScript/Bun Projects (dooz-bridge, dooz-pm-suite, dooz-ai-router)

**dooz-bridge:**
- [ ] Expand existing `tests/bridge.test.ts`
- [ ] Add webhook delivery tests
- [ ] Add subscription management tests
- [ ] Add event bus tests
- [ ] Target: 10+ tests, 40% coverage

**dooz-pm-suite:**
- [ ] Create `tests/intent.service.test.ts`
  - Test intent CRUD operations
  - Test state transitions
  - Test validation rules
- [ ] Create `tests/decision.service.test.ts`
  - Test decision creation
  - Test append-only ledger
- [ ] Create `tests/api.test.ts`
  - Integration tests for all endpoints
- [ ] Target: 15+ tests, 50% coverage

**dooz-ai-router:**
- [ ] Create `tests/router.test.ts`
  - Test provider selection logic
  - Test fallback mechanisms
  - Test rate limiting
- [ ] Create `tests/providers.test.ts`
  - Mock provider responses
  - Test provider switching
- [ ] Target: 10+ tests, 40% coverage

### Phase 2: TypeScript/Node Projects (dooz-copilot, dooz-hindsight, dooz-perspective, dooz-atlas)

**dooz-copilot:**
- [ ] Setup Vitest configuration
- [ ] Create `src/__tests__/components/` directory
- [ ] Add component smoke tests
- [ ] Target: 5+ component tests

**dooz-hindsight:**
- [ ] Setup Vitest configuration
- [ ] Create `src/__tests__/charts.test.ts`
  - Test chart data transformations
- [ ] Target: 5+ tests

**dooz-perspective:**
- [ ] Setup Vitest configuration
- [ ] Add UI component tests
- [ ] Target: 5+ tests

**dooz-atlas:**
- [ ] Create markdown validation tests
- [ ] Test documentation links
- [ ] Target: 3+ tests

### Phase 3: Python Project (dooz-ai-platform)

**dooz-ai-platform:**
- [ ] Expand existing `tests/e2e_workflow.py`
- [ ] Create `tests/test_agents.py`
  - Test agent initialization
  - Test tool calling
- [ ] Create `tests/test_llm_client.py`
  - Mock LLM responses
  - Test routing logic
- [ ] Add pytest configuration to pyproject.toml
- [ ] Target: 10+ tests, 30% coverage

### Phase 4: Rust Projects (dooz-brain, dooz-hub, dooz-pilot)

**dooz-brain:**
- [ ] Add tests in `src-tauri/src/`
  - Test MCP server handlers
  - Test memory operations
  - Test RAG context building
- [ ] Target: 10+ Rust tests

**dooz-hub:**
- [ ] Add tests in `src-tauri/src/`
  - Test tile operations
  - Test vault encryption
- [ ] Target: 5+ Rust tests

**dooz-pilot:**
- [ ] Add tests in `src-tauri/src/`
  - Test PTY operations
  - Test cartridge loading
- [ ] Target: 5+ Rust tests

### Phase 5: Test Infrastructure

**Global Configuration:**
- [ ] Create root `vitest.workspace.ts` for unified testing
- [ ] Add test coverage badges to READMEs
- [ ] Document testing standards in Atlas

**Coverage Reporting:**
- [ ] Setup Codecov or similar (optional)
- [ ] Add coverage thresholds to CI

---

## Testing Patterns

### Bun Test Pattern (TypeScript)

```typescript
// tests/example.test.ts
import { describe, it, expect, beforeEach } from 'bun:test';
import { MyService } from '../src/services/my.service';

describe('MyService', () => {
  let service: MyService;
  
  beforeEach(() => {
    service = new MyService();
  });
  
  it('should do something', () => {
    const result = service.doSomething();
    expect(result).toBe(true);
  });
  
  it('should handle errors', () => {
    expect(() => service.doSomethingInvalid()).toThrow();
  });
});
```

### Vitest Pattern (React/Node)

```typescript
// src/__tests__/Component.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Pytest Pattern (Python)

```python
# tests/test_example.py
import pytest
from my_module import MyClass

class TestMyClass:
    @pytest.fixture
    def instance(self):
        return MyClass()
    
    def test_something(self, instance):
        result = instance.do_something()
        assert result is True
    
    def test_error_handling(self, instance):
        with pytest.raises(ValueError):
            instance.do_something_invalid()
```

### Rust Test Pattern

```rust
// src/my_module.rs
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_something() {
        let result = do_something();
        assert!(result.is_ok());
    }
    
    #[test]
    fn test_error_handling() {
        let result = do_something_invalid();
        assert!(result.is_err());
    }
}
```

---

## Verification Steps

1. **Run All Tests:**
   ```bash
   # Test each project
   cd dooz-bridge && bun test
   cd dooz-pm-suite && bun test
   cd dooz-ai-platform && pytest
   cd dooz-core && php artisan test
   # etc...
   ```

2. **Verify CI Integration:**
   - Push test branch
   - Confirm tests run in GitHub Actions
   - Verify coverage reports generated

3. **Coverage Check:**
   ```bash
   # Generate coverage report
   bun test --coverage
   # Should show >40% for priority projects
   ```

---

## Dependencies

- **PLAN-02** — CI/CD must be in place to run tests
- **Package managers** — Bun, npm, pip, cargo
- **Test libraries** — bun:test, vitest, pytest

---

## Next Steps

After completing PLAN-03:

1. **PLAN-05** — Standardize linting rules
2. Monitor test flakiness and fix
3. Add integration tests for module interactions
4. Consider E2E testing with Playwright

---

**Definition of Done:**
- [ ] All 13 modules have test configuration
- [ ] Each module has ≥5 tests
- [ ] Tests run successfully in CI
- [ ] Coverage reports generated
- [ ] Git commit: "test: Add comprehensive test infrastructure"

**Estimated Completion:** 6 hours  
**Priority:** MEDIUM — Critical for code quality
