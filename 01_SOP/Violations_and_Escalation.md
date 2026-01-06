# Violations and Escalation

**Version:** 1.0  
**Effective:** 2026-01-06  
**Authority:** CTO

---

## Purpose

Define enforcement procedures for SOP violations.

---

## Violation Categories

### Category A: Critical
- Sending credentials to external AI
- Unreviewed code to production
- Bypassing security controls
- Data breach via AI context

**Response:** Immediate access suspension, incident review

### Category B: Serious
- Exceeding hard token limits
- Using wrong model tier for critical work
- Ignoring human-in-the-loop requirements
- Ad-hoc prompts for production code

**Response:** Warning, mandatory training, 30-day monitoring

### Category C: Minor
- Exceeding soft token limits
- Incomplete logging
- Using deprecated prompts
- Documentation gaps

**Response:** Notification, self-correction

---

## Escalation Path

```
Detection → Team Lead → Engineering Manager → CTO
    ↓
Category C: Resolved at Team Lead
Category B: Engineering Manager decision
Category A: Immediate CTO involvement
```

---

## Detection Methods

### Automated
- Token limit monitoring
- Secret pattern scanning
- Model usage auditing
- Cost anomaly detection

### Manual
- Code review findings
- Peer reports
- Audit discoveries
- Incident investigations

---

## Remediation

### Required Actions
1. **Acknowledge:** Written acknowledgment of violation
2. **Understand:** Review relevant SOP documentation
3. **Prevent:** Implement safeguards to prevent recurrence
4. **Verify:** Follow-up review within 30 days

### Training
Category B violations require completion of:
- AI Usage SOP review
- Relevant framework review
- Practical assessment

---

## Appeals

Violations may be appealed within 5 business days to:
1. Engineering Manager (Category C)
2. CTO (Category A, B)

Appeals must include:
- Circumstances of violation
- Mitigating factors
- Proposed remediation

---

## Related Documents

- [AI Usage SOP](AI_Usage_SOP.md)
- [Security and Data Policy](Security_and_Data_Policy.md)
- [Logging and Observability](../07_IMPLEMENTATION/Logging_and_Observability.md)
