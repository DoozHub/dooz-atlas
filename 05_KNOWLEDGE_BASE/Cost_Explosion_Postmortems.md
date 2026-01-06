# Cost Explosion Postmortems

Analysis of incidents where AI costs exceeded expectations.

---

## Postmortem Template

1. Incident date
2. Expected cost vs actual cost
3. Cause of explosion
4. Detection method
5. Resolution
6. Prevention measures

---

## Incident #001: Infinite Context Loop
*Date: [Placeholder]*

### Metrics
- **Expected:** ~$5 for refactoring session
- **Actual:** $87 before detection

### Cause
Agent kept requesting the same file with different context windows, creating a loop:
1. Get file context
2. Determine more context needed
3. Request expanded context
4. Repeat

### Detection
Anomaly alert triggered at $50 threshold.

### Resolution
- Terminated session
- Reviewed logs to identify loop
- Reran with explicit context bounds

### Prevention
- Added context size limits per request
- Implemented loop detection in AG-Guard
- Session cost caps with warnings

---

## Incident #002: Thinking Model for Mechanical Task
*Date: [Placeholder]*

### Metrics
- **Expected:** ~$0.10 per file
- **Actual:** ~$2.00 per file (20x)

### Cause
Default model was set to o1-pro in IDE. Used for routine formatting.

### Detection
Weekly cost review.

### Resolution
Model routing updated.

### Prevention
- IDE defaults to Tier 1 models
- Explicit escalation for Tier 3/4
- Task classification reminder in workflow

---

## Add New Postmortems

When costs exceed 3x expectation, document:
1. What task triggered it
2. What model was used
3. Why it cost more than expected
4. How to prevent recurrence
