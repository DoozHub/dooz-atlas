# Security Check Prompt

## Purpose

Focused security review of code changes.

## Allowed Models
- Claude Opus
- GPT-4 o1-pro

## Disallowed Models
- All Tier 1/2 models

## The Prompt

```
Perform a security review of this code.

Code:
```[LANGUAGE]
[CODE_HERE]
```

Context:
- This code handles: [FUNCTIONALITY]
- Exposed to: [INTERNAL/PUBLIC/API]
- Data sensitivity: [LOW/MEDIUM/HIGH/CRITICAL]

Check for (OWASP Top 10 + common issues):

1. **Injection**
   - SQL injection
   - Command injection
   - LDAP/XPath injection

2. **Broken Authentication**
   - Weak password handling
   - Session management issues
   - Token exposure

3. **Sensitive Data Exposure**
   - Logging secrets
   - Response leakage
   - Insecure storage

4. **XXE / XSS**
   - XML external entities
   - Cross-site scripting
   - Content injection

5. **Broken Access Control**
   - Missing authorization checks
   - IDOR vulnerabilities
   - Privilege escalation

6. **Security Misconfiguration**
   - Debug modes
   - Default credentials
   - Insecure headers

7. **Insecure Deserialization**
   - Untrusted data parsing
   - Object manipulation

8. **Supply Chain**
   - Vulnerable dependencies
   - Untrusted sources

For each finding:
- CWE ID (if applicable)
- Severity: Critical/High/Medium/Low
- Proof of concept
- Remediation
```

## Version History
- v1.0 (2026-01-06): Initial version
