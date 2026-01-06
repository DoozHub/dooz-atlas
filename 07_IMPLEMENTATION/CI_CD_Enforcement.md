# CI/CD Enforcement

## Purpose

Implement guardrails in CI/CD pipelines for AI-generated code.

---

## Pipeline Checks

### Pre-Commit Hooks
```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: ai-content-check
        name: Check AI-generated content
        entry: ./scripts/check-ai-content.sh
        language: script
        
      - id: prompt-library-check
        name: Verify prompts from library
        entry: ./scripts/check-prompt-usage.sh
        language: script
```

### CI Pipeline

```yaml
# .github/workflows/ai-review.yml
name: AI Code Review

on: [pull_request]

jobs:
  ai-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check for secrets
        run: |
          ./scripts/ai-secret-scan.sh
          
      - name: Verify prompt versions
        run: |
          ./scripts/check-prompt-versions.sh
          
      - name: Cost analysis
        run: |
          ./scripts/estimate-ai-cost.sh
          
      - name: AI review audit
        if: contains(github.event.pull_request.labels.*.name, 'ai-generated')
        run: |
          ./scripts/ai-review-check.sh
```

---

## Enforcement Rules

### Mandatory for AI-Generated Code

1. **Labeling**
   - PRs must be labeled if AI-generated
   - Commits must indicate AI assistance

2. **Review Requirements**
   - AI-generated PRs require human review
   - Cannot self-merge AI code

3. **Test Coverage**
   - AI code must meet coverage threshold
   - Integration tests required for significant changes

---

## Secret Scanning

```bash
#!/bin/bash
# ai-secret-scan.sh

PATTERNS=(
  "-----BEGIN.*PRIVATE KEY-----"
  "AKIA[0-9A-Z]{16}"
  "ghp_[a-zA-Z0-9]{36}"
  "sk-[a-zA-Z0-9]{48}"
)

for pattern in "${PATTERNS[@]}"; do
  if git diff --cached | grep -qE "$pattern"; then
    echo "ERROR: Potential secret detected"
    exit 1
  fi
done
```

---

## Cost Gates

Block merges if:
- PR estimated cost exceeds threshold
- Monthly budget exceeded
- Unusual token usage detected

---

## Related Documents

- [Security and Data Policy](../01_SOP/Security_and_Data_Policy.md)
- [AG-Guard Plugin](AG_Guard_Plugin.md)
