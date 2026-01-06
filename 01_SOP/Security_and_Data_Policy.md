# Security and Data Policy

**Version:** 1.0  
**Effective:** 2026-01-06  
**Authority:** CTO

---

## Purpose

Define data handling rules for AI-assisted development.

---

## Data Classification

### Never Send to External AI
- Production credentials
- API keys and secrets
- Customer PII
- Source code containing security logic
- Database connection strings
- Internal URLs and infrastructure details

### Use Self-Hosted Only
- Customer data processing
- Financial calculations
- Medical/health data
- Legal documents

### OK for External AI
- Generic code patterns
- Documentation
- Test fixtures (sanitized)
- Open source references

---

## Secret Detection

### Pre-Prompt Scanning
Before sending any context to AI:
1. Scan for API key patterns
2. Check for credential files
3. Detect environment variables
4. Flag hardcoded passwords

### Automated Enforcement
AG-Guard plugin blocks prompts containing:
- `-----BEGIN.*PRIVATE KEY-----`
- `AKIA[0-9A-Z]{16}`
- `password\s*=\s*["'][^"']+["']`

---

## Prompt Hygiene

### Required Sanitization
1. Replace real customer names with placeholders
2. Use example.com for URLs
3. Anonymize database content
4. Remove internal hostnames

### Review Before Send
For prompts > 1000 tokens, review for leakage.

---

## Incident Response

If sensitive data is sent to external AI:

1. **Immediately:** Document what was sent
2. **Within 1 hour:** Rotate affected credentials
3. **Within 24 hours:** Incident report filed
4. **Within 1 week:** Root cause analysis

---

## Related Documents

- [AI Usage SOP](AI_Usage_SOP.md)
- [Violations and Escalation](Violations_and_Escalation.md)
- [AG-Guard Plugin](../07_IMPLEMENTATION/AG_Guard_Plugin.md)
