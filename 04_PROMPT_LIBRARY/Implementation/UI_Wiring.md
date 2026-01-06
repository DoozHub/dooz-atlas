# UI Wiring Prompt

## Purpose

Connect UI components to backend APIs and state management.

## Allowed Models
- Claude Sonnet
- GPT-4o

## Disallowed Models
- Tier 1 models

## The Prompt

```
Wire a UI component to backend functionality.

Component: [COMPONENT_NAME]
Purpose: [WHAT_IT_DOES]

Backend API:
- Endpoint: [ENDPOINT]
- Request: [REQUEST_SHAPE]
- Response: [RESPONSE_SHAPE]

UI Framework: [REACT/VUE/SVELTE]
State Management: [ZUSTAND/REDUX/PINIA/etc]

Requirements:
- Loading states
- Error handling
- Optimistic updates (if applicable)
- Form validation (if applicable)

Generate:
1. API client function
2. State/hooks for data
3. Component integration code
4. Error boundary handling
```

## Example Usage

Component: NotificationSettings form
Purpose: Allow user to toggle email/push notifications

Backend: PUT /api/users/:id/notification-preferences
State: Zustand store with user preferences

## Version History
- v1.0 (2026-01-06): Initial version
