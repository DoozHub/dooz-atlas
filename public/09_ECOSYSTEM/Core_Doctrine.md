# DOOZ CORE DOCTRINE

**Version:** 1.0.0  
**Scope:** All Dooz engineering, architecture, and AI-assisted development  
**Authority:** This document is binding. Violations override technical arguments.

---

## 1. Title & Scope

This doctrine governs all software development within the Dooz ecosystem. It applies to:

- Human engineers
- AI coding agents
- CTO-level decision makers
- All repositories under Dooz control

No exception exists for "good reasons." The doctrine is the reason.

---

## 2. Core Assertion

**Done systems outperform perfect systems.**

A shipped, stabilized, imperfect system generates value. An unshipped, elegant, refined system generates nothing.

The purpose of engineering is to produce working software that solves problems. The purpose is NOT to produce beautiful code, optimal architecture, or maximally abstracted solutions.

Code that runs in production is superior to code that is "almost ready."

---

## 3. Failure Pattern: The Infinite Software Crisis

The default failure mode of modern software development is:

1. Build a working solution
2. See how it could be "better"
3. Refactor toward the "better" solution
4. Discover new improvements during refactoring
5. Repeat indefinitely
6. Never ship, or ship something worse than the original

This pattern is accelerated by:

- AI coding assistants (infinite iteration capacity)
- High intelligence (more perceived improvements)
- Perfectionism disguised as professionalism
- Absence of external deadlines

The result is software that is always "almost done" and never deployed.

---

## 4. CTO-Specific Risk Profile

A CTO with high technical ability is a liability, not an asset, without restraint.

The risk:

- Sees structural problems others cannot see
- Has the ability to "fix" them
- Lacks the constraint to ignore them
- Spends capacity on refinement instead of shipping
- Creates complexity that only they can maintain

The mitigation:

- CTO building power must be time-boxed
- CTO must be interrupted by shipping deadlines
- CTO must not have unilateral refactoring authority
- Revenue, scale, or failure must authorize rewrites—not architectural insight

---

## 5. The Kill-Switch Principle

Every coding session, task, or sprint MUST have a predefined STOP CONDITION.

A stop condition is:

- A specific, measurable outcome that defines "done"
- Defined BEFORE work begins
- Non-negotiable once set

If a stop condition is not defined, work must not begin.

If a stop condition is reached, work MUST stop regardless of:

- Visible improvements
- Newly discovered bugs (unless critical)
- Architectural elegance opportunities
- "Just one more thing"

The kill-switch exists because humans and AI cannot self-regulate refinement.

---

## 6. Dooz Counter-Doctrine (Rules)

### NEVER RULES

1. **NEVER** refactor without explicit authorization from a shipping deadline or failure event
2. **NEVER** abstract code until duplication exists in THREE or more places
3. **NEVER** rewrite a working system for architectural reasons alone
4. **NEVER** start coding without a defined stop condition
5. **NEVER** continue past a stop condition
6. **NEVER** optimize for hypothetical scale
7. **NEVER** add configuration for cases that do not exist
8. **NEVER** pursue elegance at the cost of shipping

### STOP RULES

1. **STOP** when the defined feature works
2. **STOP** when the test passes
3. **STOP** when the user problem is solved
4. **STOP** when 80% of value is captured with 20% of effort
5. **STOP** when improvement requires rewriting unrelated code
6. **STOP** when time-box expires

### ALLOWED ZONES

1. Vibe coding IS ALLOWED within time-boxed sessions
2. AI-assisted generation IS ALLOWED for first drafts
3. Quick experimentation IS ALLOWED before committing
4. Ugly code IS ALLOWED if it ships and works
5. Duplication IS ALLOWED until the third instance
6. Tech debt IS ALLOWED if documented

### PROHIBITED ZONES

1. Refactoring during active feature development
2. Speculative abstraction
3. Framework migrations without revenue justification
4. Infinite test coverage pursuit
5. "Cleaning up" unrelated code in a PR
6. Rewrites triggered by architectural discomfort

---

## 7. Vibe Coding Policy

Vibe coding is defined as: AI-assisted rapid development without detailed upfront planning.

### Vibe Coding IS ALLOWED when:

- Building a first draft or prototype
- Working within a defined time-box (max 4 hours)
- A stop condition exists before starting
- The output is subject to review before merge

### Vibe Coding IS PROHIBITED when:

- No stop condition is defined
- Working on core business logic without review
- Modifying code that is already in production
- Refactoring or rewriting existing systems

### Vibe Coding CONSTRAINTS:

- Maximum session length: 4 hours
- Maximum consecutive vibe sessions: 2
- Mandatory cool-down: 1 hour between sessions
- All vibe output must be reviewed before merge

Unconstrained vibe coding is an existential risk to shipping.

---

## 8. Hard Stop Definitions

The following thresholds trigger mandatory work stoppage:

| Condition | Stop Action |
|-----------|-------------|
| Time-box expired | Stop immediately, commit current state |
| Feature works end-to-end | Stop adding to it |
| Tests pass | Stop writing more tests |
| 3 refactoring impulses in one session | Stop and ship |
| PR exceeds 500 lines | Stop, split, or ship partial |
| "One more thing" thought occurs | Stop and review stop condition |
| Improvement requires touching >3 files | Stop and get approval |

---

## 9. Evaluation Criteria

### Good Enough to Ship

A feature is shippable when:

1. It solves the stated user problem
2. It does not break existing functionality
3. It handles the primary happy path
4. Critical errors are caught (not all errors)
5. It can be understood by another engineer
6. It can be reverted if necessary

A feature is NOT required to:

- Cover all edge cases
- Be optimally performant
- Be maximally abstracted
- Have complete test coverage
- Be architecturally ideal

### Definition of Done

"Done" means:

- Stop condition met
- Code merged to main
- Deployed or deployable
- Documentation exists (if user-facing)

"Done" does NOT mean:

- Perfect
- Elegant
- Complete
- Future-proof

---

## 10. Enforcement & Violations

### What Constitutes a Violation

A doctrine violation occurs when:

1. Work continues past a defined stop condition
2. Refactoring occurs without explicit authorization
3. Code is rewritten for architectural reasons without failure/revenue trigger
4. AI is used without defined stop conditions
5. A PR contains unrelated "cleanup"
6. Ship date is missed due to refinement

### Enforcement Authority

This doctrine has enforcement authority. It can be cited to:

- **BLOCK** a PR
- **REJECT** a refactoring proposal
- **STOP** ongoing work
- **OVERRIDE** technical arguments

Technical arguments do not override doctrine violations. "It would be better if..." is not grounds for exemption.

### AI Agent Binding

AI agents operating within the Dooz ecosystem are bound by this doctrine. AI agents MUST:

1. Ask for STOP CONDITIONS before generating code
2. Prefer boring, explicit code over clever abstractions
3. Reject abstraction unless duplication already exists (3+ instances)
4. Default to the smallest viable implementation
5. Avoid refactors unless explicitly authorized with justification
6. Recommend STOPPING when stop conditions are met
7. Flag when work appears to exceed stop conditions

AI agents MUST NOT:

1. Suggest refactoring without explicit request
2. Generate "improved" versions of working code
3. Propose architectural changes during feature work
4. Continue generating after requirements are met
5. Pursue elegance over completion

---

## Doctrine Finalization

This doctrine is frozen.

Changes require:

- Documented failure caused by current rules
- Approval from Dooz leadership
- Version increment

This doctrine is designed to CONSTRAIN, not enable.  
It exists because intelligence without restraint produces infinite software.  
It is enforceable by humans and AI alike.  
It can be cited to BLOCK work, not to justify it.

**Stabilization over elegance. Shipping over polish. Done over perfect.**
