# ADR-004: Event-Driven Architecture

## Status
**Accepted** — Implemented via dooz-bridge

## Context

As the DOOZ ecosystem grew to 13+ modules, we needed a communication pattern that decouples services while enabling real-time updates and data consistency.

### Requirements

- Loose coupling between services
- Asynchronous communication
- Event replay capability
- Guaranteed delivery (at-least-once)
- Easy to debug and monitor
- No vendor lock-in

### Options Considered

1. **Synchronous REST Calls**
   - Direct HTTP calls between services
   - Simple but tight coupling
   - Cascading failures

2. **Message Queue (RabbitMQ/Redis)**
   - Dedicated message broker
   - Additional infrastructure
   - Complexity

3. **Event Bus with Webhooks** (Selected)
   - Pub/sub with HTTP delivery
   - dooz-bridge implementation
   - Decoupled, observable

4. **gRPC with Streaming**
   - High performance
   - Type-safe
   - Tight coupling, harder to debug

## Decision

We chose an **Event-Driven Architecture** using dooz-bridge as the central event bus with webhook delivery.

### Rationale

- **Loose Coupling** — Services don't know about each other
- **Scalability** — Easy to add new consumers
- **Resilience** — Failed deliveries can be retried
- **Observability** — All events visible in one place
- **Flexibility** — Webhooks work with any HTTP client

## Consequences

### Positive

✅ **Decoupling**: Services evolve independently
✅ **Scalability**: Add consumers without changing publishers
✅ **Audit Trail**: Complete event history
✅ **Flexibility**: External systems can subscribe via webhooks
✅ **Resilience**: Retry logic handles temporary failures

### Negative

❌ **Complexity**: Debugging distributed systems is harder
❌ **Latency**: Asynchronous = eventual consistency
❌ **Ordering**: Event ordering requires careful design
❌ **Storage**: Events must be stored for replay

## Implementation

### Event Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Service A  │────>│   Bridge     │────>│   Service B  │
│  (Publisher) │     │  (Event Bus) │     │  (Consumer)  │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ↓
                     ┌──────────────┐
                     │   SQLite     │
                     │   (Storage)  │
                     └──────────────┘
```

### Event Schema

```typescript
interface Event {
  id: string;           // UUID
  topic: string;        // e.g., "intent.created"
  payload: unknown;     // Event data
  timestamp: string;    // ISO 8601
  source: string;       // Publishing service
}
```

### Subscription Pattern

```typescript
// Service B subscribes to events
POST /api/subscriptions
{
  "appId": "dooz-brain",
  "topicPattern": "intent.*",  // Wildcard matching
  "webhookUrl": "http://brain:3333/api/webhooks/bridge"
}
```

### Publishing Events

```typescript
// Service A publishes event
POST /api/events/publish
{
  "topic": "intent.created",
  "payload": {
    "intentId": "123",
    "title": "Build feature X"
  }
}
```

## Event Topics

| Topic | Publisher | Consumers | Purpose |
|-------|-----------|-----------|---------|
| `intent.created` | PM Suite | Brain, Hub | New work item |
| `intent.transitioned` | PM Suite | Hub | Status change |
| `decision.committed` | PM Suite | Brain | Decision logged |
| `memory.ingested` | Brain | Hub | Knowledge updated |
| `user.login` | Core | All | Authentication |

## Delivery Guarantees

- **At-Least-Once**: Events delivered one or more times
- **Retry**: Exponential backoff (1s, 2s, 4s, 8s...)
- **Dead Letter**: Failed events moved to DLQ after 5 retries
- **Idempotency**: Consumers handle duplicate events

## Event Sourcing vs Event-Driven

We use **Event-Driven** (not full Event Sourcing):

- Events trigger actions, not state reconstruction
- Current state in databases
- Events stored for replay and audit

## Related Decisions

- ADR-001: Multi-Tenancy Strategy
- ADR-005: LLM Routing Abstraction

## References

- [Event-Driven Architecture Patterns](https://martinfowler.com/articles/201701-event-driven.html)
- dooz-bridge: `README.md`

---

**Date:** 2025-01  
**Author:** Infrastructure Team  
**Review Date:** 2026-01
