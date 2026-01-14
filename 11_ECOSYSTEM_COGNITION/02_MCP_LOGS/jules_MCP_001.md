# MCP Entry: jules

**Repo:** /Users/akshaydoozie/Documents/doozie/jules
**Iteration:** 001
**Timestamp:** 2026-01-15
**Analyst:** SequentialThinking MCP

## Observations

- Monorepo with 6 sub-projects (SDK, VS Code, Control Center, MCP Server, GitHub Action, Review Companion)
- Unofficial community ecosystem for Google Jules AI
- Well-documented with ONBOARDING.md, ARCHITECTURE_VALIDATION.md, MVP_PRD.md
- Clear legal disclaimer about not being affiliated with Google
- Technology stack: TypeScript, Tauri, React, Rust

## Inferences

1. **Strategic importance**: Jules ecosystem fills gaps in Google Jules offering (CLI-only focus)
2. **Architecture-first**: Well-planned with MVP PRD and detailed roadmap
3. **Community-driven**: Open source, welcomes contributions
4. **Type-safe**: Strict TypeScript mode, 80% test coverage target

## Risks

1. **Dependency on Google**: Changes to Jules API could break ecosystem
2. **Unofficial status**: No guarantee of longevity or compatibility
3. **Scope creep**: 6 projects in various stages of completion

## Recommendations

1. Consider wrapping Jules SDK for Dooz ecosystem integration
2. Align Jules tooling with Dooz design system (Neo-Analog)
3. Evaluate if Dooz AI Router can integrate with Jules MCP server

## Next Analysis Step

Document dwf (ERP system) with higher business value
