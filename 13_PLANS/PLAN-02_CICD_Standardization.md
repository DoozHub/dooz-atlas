# PLAN-02: CI/CD Pipeline Standardization

> **Priority:** HIGH  
> **Est. Time:** 4 hours  
> **Prerequisites:** PLAN-01 (Root README) recommended  
> **Next Plan:** PLAN-03 (Testing Infrastructure)

---

## Objective

Standardize and complete CI/CD pipelines for all 13 modules. Currently only 7 projects have CI/CD, leaving 6 without automated testing, building, or deployment.

**Success Criteria:**
- All 13 modules have GitHub Actions workflows
- Consistent workflow structure across projects
- Automated testing on PR
- Build verification before merge
- Clear status badges in each README

---

## Current State

### Existing CI/CD (7 projects)

| Project | Workflows | Status |
|---------|-----------|--------|
| dooz-core | 4 workflows | ✅ Active |
| dooz-brain | build.yml | ✅ Active |
| dooz-hub | build.yml | ✅ Active |
| dooz-pilot | build.yml, ci.yml | ✅ Active |
| quicky_mobile | build.yml | ✅ Active |
| quicky_desktop | build.yml | ✅ Active |
| app-template | ci.yml | ✅ Active |

### Missing CI/CD (6 projects)

| Project | Language | Priority | Reason |
|---------|----------|----------|--------|
| dooz-bridge | TypeScript/Bun | HIGH | Event bus - critical infrastructure |
| dooz-pm-suite | TypeScript/Bun | HIGH | PM tool - actively developed |
| dooz-ai-router | TypeScript/Bun | MEDIUM | LLM routing - important |
| dooz-ai-platform | Python | MEDIUM | AI platform - growing |
| dooz-copilot | TypeScript/React | MEDIUM | AI assistant - user-facing |
| dooz-hindsight | TypeScript/React | LOW | Analytics - stable |
| dooz-perspective | TypeScript/React | LOW | UI component - stable |
| dooz-atlas | TypeScript/React | LOW | Documentation - content-driven |
| neo-analog | CSS/JS | LOW | Design system - stable |

---

## Target State

Every module has:

1. **ci.yml** — Pull request validation
   - Linting
   - Type checking (if applicable)
   - Unit tests
   - Build verification

2. **build.yml** — Build artifacts
   - Production builds
   - Artifact generation
   - Cross-platform support (for desktop apps)

3. **deploy.yml** (optional) — Deployment automation
   - Staging deployment on merge
   - Production deployment (manual trigger)

4. **README Badge** — Status visibility
   - Build status badge
   - Test coverage badge (where applicable)

---

## Execution Checklist

### Step 1: Create Standard Workflow Templates

**Location:** `/dooz-ecosystem/.github/workflows/templates/`

Create reusable templates:

- [ ] **bun-ci.yml** — For Bun-based TypeScript projects
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: oven-sh/setup-bun@v1
        - run: bun install
        - run: bun run lint || true
        - run: bun run test || true
        - run: bun run build
  ```

- [ ] **node-ci.yml** — For Node.js projects
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      strategy:
        matrix:
          node-version: [18, 20, 22]
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: ${{ matrix.node-version }}
        - run: npm ci
        - run: npm run lint || true
        - run: npm test || true
        - run: npm run build
  ```

- [ ] **python-ci.yml** — For Python projects
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-python@v5
          with:
            python-version: '3.11'
        - run: pip install -r requirements.txt
        - run: pip install pytest ruff
        - run: ruff check . || true
        - run: pytest || true
  ```

- [ ] **tauri-build.yml** — For Tauri desktop apps
  ```yaml
  name: Build
  on: [push, pull_request]
  jobs:
    build:
      strategy:
        matrix:
          platform: [ubuntu-latest, windows-latest, macos-latest]
      runs-on: ${{ matrix.platform }}
      steps:
        - uses: actions/checkout@v4
        - uses: oven-sh/setup-bun@v1
        - uses: dtolnay/rust-action@stable
        - run: bun install
        - run: bun run tauri build
  ```

### Step 2: Create Missing Workflows

**Priority 1: Critical Infrastructure (dooz-bridge, dooz-pm-suite)**

- [ ] **dooz-bridge/.github/workflows/ci.yml**
  - Use bun-ci.yml template
  - Include SQLite database setup
  - Test webhook endpoints
  - Build verification

- [ ] **dooz-bridge/.github/workflows/build.yml**
  - Production build
  - Docker image build (optional)

- [ ] **dooz-pm-suite/.github/workflows/ci.yml**
  - Use bun-ci.yml template
  - Include Drizzle ORM migrations test
  - Database integration tests

- [ ] **dooz-pm-suite/.github/workflows/build.yml**
  - Production build
  - Artifact upload

**Priority 2: AI Platform (dooz-ai-router, dooz-ai-platform)**

- [ ] **dooz-ai-router/.github/workflows/ci.yml**
  - Use bun-ci.yml template
  - LLM provider integration tests (mocked)

- [ ] **dooz-ai-platform/.github/workflows/ci.yml**
  - Use python-ci.yml template
  - Include AI agent tests

**Priority 3: Frontend Apps (dooz-copilot, dooz-hindsight, dooz-perspective)**

- [ ] **dooz-copilot/.github/workflows/ci.yml**
  - Use node-ci.yml template
  - React component tests
  - Vite build verification

- [ ] **dooz-hindsight/.github/workflows/ci.yml**
  - Use node-ci.yml template
  - Chart rendering tests

- [ ] **dooz-perspective/.github/workflows/ci.yml**
  - Use node-ci.yml template
  - UI component tests

**Priority 4: Supporting Projects (dooz-atlas, neo-analog)**

- [ ] **dooz-atlas/.github/workflows/ci.yml**
  - Markdown linting
  - Link validation
  - Vite build verification

- [ ] **neo-analog/.github/workflows/ci.yml**
  - CSS build verification
  - Token validation

### Step 3: Update README Badges

For each project that gets CI/CD:

- [ ] Add build status badge to README.md
  ```markdown
  ![CI](https://github.com/DoozHub/[repo]/workflows/CI/badge.svg)
  ```

- [ ] Update documentation to reflect CI/CD status

### Step 4: Standardize Existing Workflows

Review and update existing workflows for consistency:

- [ ] **dooz-core** — Ensure latest action versions
- [ ] **dooz-brain** — Add test step if tests exist
- [ ] **dooz-hub** — Add test step if tests exist
- [ ] **dooz-pilot** — Verify cross-platform builds

---

## Verification Steps

1. **Workflow Validation:**
   ```bash
   # Check YAML syntax for each new workflow
   for file in .github/workflows/*.yml; do
     echo "Checking $file..."
     python3 -c "import yaml; yaml.safe_load(open('$file'))"
   done
   ```

2. **GitHub Actions Dashboard:**
   - Push to a test branch
   - Verify workflows appear in Actions tab
   - Confirm they run without errors

3. **Badge Verification:**
   - Open each README in GitHub
   - Confirm badges render correctly
   - Click badges to verify they link to Actions

---

## File Locations

New files to create:

```
dooz-ecosystem/
├── .github/
│   └── workflows/
│       └── templates/
│           ├── bun-ci.yml
│           ├── node-ci.yml
│           ├── python-ci.yml
│           └── tauri-build.yml
dooz-bridge/
└── .github/
    └── workflows/
        ├── ci.yml
        └── build.yml
dooz-pm-suite/
└── .github/
    └── workflows/
        ├── ci.yml
        └── build.yml
dooz-ai-router/
└── .github/
    └── workflows/
        └── ci.yml
dooz-ai-platform/
└── .github/
    └── workflows/
        └── ci.yml
dooz-copilot/
└── .github/
    └── workflows/
        └── ci.yml
dooz-hindsight/
└── .github/
    └── workflows/
        └── ci.yml
dooz-perspective/
└── .github/
    └── workflows/
        └── ci.yml
dooz-atlas/
└── .github/
    └── workflows/
        └── ci.yml
neo-analog/
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Dependencies

- **PLAN-01** — Root README should exist to reference in workflow docs
- **Existing workflows** — Reference dooz-core, dooz-brain for patterns

---

## Next Steps

After completing PLAN-02:

1. **PLAN-03**: Add testing infrastructure to projects now that CI is ready
2. **PLAN-05**: Standardize linting rules for CI to enforce
3. Monitor CI runs and fix any failures

---

## Rollback Plan

If workflows cause issues:

1. Disable workflow in GitHub UI (Actions → Workflow → Disable)
2. Fix issues in branch
3. Re-enable and re-test

---

**Definition of Done:**
- [ ] All 6 missing projects have ci.yml
- [ ] Critical projects (bridge, pm-suite) have build.yml
- [ ] All projects have CI badges in README
- [ ] At least one successful CI run on main branch
- [ ] Git commit: "ci: Add standardized GitHub Actions workflows"

**Estimated Completion:** 4 hours  
**Priority:** HIGH — Enables automated quality gates
