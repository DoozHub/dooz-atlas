# Change Log

History of significant changes to this documentation.

---

## 2026-01-06: Initial Release

### Added
- Complete documentation structure created
- **01_SOP**: AI Usage SOP, Model Routing Policy, Cost Governance, Security and Data Policy, Violations and Escalation
- **02_GUIDES**: Using Copilot, Using Agentic Tools, When to Use Thinking Models, Self-Hosted Model Guide, Review and Audit Workflows
- **03_FRAMEWORKS**: Task Classification, Agentic Control, Architecture vs Execution, Human in the Loop, Cost vs Leverage
- **04_PROMPT_LIBRARY**: Architecture, Implementation, Review, and Mechanical prompt categories
- **05_KNOWLEDGE_BASE**: Lessons Learned, Failure Case Studies, Cost Explosion Postmortems, Model Behavior Notes, Tool Comparison
- **06_UI_AGENTIC_AI**: UX Principles, Guardrails, Agent Metadata Schema, Token Tracking, Cost Visualization, Reference Architecture
- **07_IMPLEMENTATION**: AG-Guard Plugin, Logging and Observability, Redmine Integration, CI/CD Enforcement, Self-Hosted Inference
- **08_APPENDIX**: Glossary, Model Catalog, Cost Assumptions

### Notes
- Initial version for review
- Placeholder content in some sections
- Case studies to be filled with real incidents

---

## 2026-04-12: Dooz Core v1.1.0 Documentation Update

### Added
- Documented **Notifications System** — Multi-channel notifications (email, push, SMS, in-app)
- Documented **File Storage System** — Multi-tenant file storage with S3 support
- Documented **API Documentation Portal** — Auto-generated OpenAPI/Swagger docs
- Documented **Audit Logging System** — Complete activity tracking
- Documented **Global Search System** — Cross-model search with fuzzy matching

### Changed
- Updated [Dooz_Core.md](../10_APPS/Dooz_Core.md) to reflect v1.1.0 features
- Updated tech stack from Laravel 11 → Laravel 12
- Updated roadmap phases to mark Phase 3 (Core Infrastructure) as complete
- Updated feature matrix with new v1.1.0 capabilities

### Notes
- Dooz Core v1.1.0 released 2026-04-11
- 10 new database tables added
- 25+ new PHP files
- 1,500+ lines of code
- All features follow tenant isolation pattern

---

## Template for Future Entries

```markdown
## YYYY-MM-DD: Brief Title

### Added
- New documents or sections

### Changed
- Modified documents

### Deprecated
- Documents being phased out

### Removed
- Deleted documents

### Fixed
- Corrections

### Notes
- Additional context
```

---

*Maintainer: [CODEOWNER]*
