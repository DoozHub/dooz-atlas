# API Handlers Prompt

## Purpose

Generate API endpoint handlers following REST conventions.

## Allowed Models
- Claude Sonnet
- GPT-4o
- Gemini 2.0 Flash

## Disallowed Models
- Tier 1 models

## The Prompt

```
Create an API endpoint handler.

Endpoint: [METHOD] [PATH]
Purpose: [WHAT_IT_DOES]

Request:
- Body: [SCHEMA]
- Query params: [PARAMS]
- Auth required: [YES/NO]

Response:
- Success: [SCHEMA]
- Errors: [ERROR_CASES]

Follow pattern from:
[EXISTING_HANDLER_EXAMPLE]

Requirements:
- Input validation
- Error handling
- Proper HTTP status codes
- TypeScript types (if applicable)

Generate:
1. Handler function
2. Request/response types
3. Validation schema
4. Basic test cases
```

## Example Usage

Endpoint: POST /api/users/:id/notifications
Purpose: Update user notification preferences

Request body: { email: boolean, push: boolean }
Auth required: Yes (must be same user or admin)

## Version History
- v1.0 (2026-01-06): Initial version
