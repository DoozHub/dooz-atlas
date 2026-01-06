# Failure Case Studies

Detailed analysis of significant AI-related failures.

---

## Case Study Template

Each case study should include:
1. Incident summary
2. What went wrong
3. Root cause
4. Impact
5. What we learned
6. Preventive measures implemented

---

## Case #001: Recursive File Deletion
*Date: [Placeholder]*

### Summary
Agentic tool given permission to "clean up unused files" deleted active configuration.

### What Went Wrong
- Vague instruction: "clean up unused files"
- No explicit file exclusions
- Agent determined config files were "unused"

### Root Cause
Agent interpreted "unused" based on import analysis, missed runtime loading.

### Impact
- 2 hours downtime
- Configuration reconstruction from memory

### Lessons
- Never use vague cleanup instructions
- Explicitly list what can/cannot be deleted
- Review deletion operations before execution

### Prevention
- Added mandatory deletion preview
- AG-Guard now blocks rm commands by default

---

## Case #002: [Add More Cases]

*Placeholder for additional case studies*

---

## Reporting New Failures

When adding a new case:
1. Use the template above
2. Be honest about what happened
3. Focus on systemic issues, not blame
4. Update relevant SOPs if needed
