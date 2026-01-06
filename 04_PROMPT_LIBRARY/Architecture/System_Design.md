# System Design Prompt

## Purpose

Guide AI through system architecture design with trade-off analysis.

## Allowed Models
- Claude Opus
- GPT-4 o1
- Gemini 2.0 Pro

## Disallowed Models
- GPT-4o-mini (insufficient reasoning)
- Haiku (too shallow)

## The Prompt

```
You are a senior systems architect helping design a new system component.

Context:
- System: [SYSTEM_NAME]
- Current architecture: [BRIEF_DESCRIPTION]
- Constraints: [CONSTRAINTS]

I need to design: [COMPONENT_DESCRIPTION]

Please provide:

1. **Options Analysis**
   - List 2-3 architectural options
   - For each: pros, cons, trade-offs
   - Consider: scalability, maintainability, cost, complexity

2. **Recommendation**
   - Your recommended approach
   - Key reasoning
   - Risks to monitor

3. **Implementation Outline**
   - High-level steps
   - Key interfaces
   - Dependencies

4. **Questions**
   - What additional context would change your recommendation?

Think step by step. Be explicit about assumptions.
```

## Example Usage

```
Context:
- System: E-commerce platform
- Current architecture: Monolithic PHP application
- Constraints: Must maintain existing database, 2 week timeline

I need to design: A notification service for order updates

[Rest of prompt...]
```

## Version History
- v1.0 (2026-01-06): Initial version
