# ADR-005: LLM Routing Abstraction

## Status
**Accepted** — Implemented as dooz-ai-router

## Context

With multiple LLM providers (OpenAI, Anthropic, Google, local models) and varying capabilities, costs, and availability, we needed a unified interface to route requests intelligently.

### Requirements

- Support multiple providers without vendor lock-in
- Automatic failover when providers are unavailable
- Cost optimization based on model capabilities
- Rate limiting and quota management
- Easy to add new providers
- Consistent API across all LLMs

### Options Considered

1. **Direct Provider Integration**
   - Each service calls providers directly
   - Maximum flexibility
   - Duplicated logic, vendor lock-in

2. **OpenRouter** (External Service)
   - Third-party routing service
   - Good provider coverage
   - External dependency, less control

3. **Custom Router** (Selected)
   - dooz-ai-router library
   - Full control over routing logic
   - Cost tracking, custom rules

4. **LiteLLM Proxy**
   - Open-source proxy
   - Good features
   - Additional infrastructure

## Decision

We built a **custom LLM routing layer** (dooz-ai-router) that abstracts provider APIs and implements intelligent routing.

### Rationale

- **Control**: Own the routing logic and cost optimization
- **Flexibility**: Add custom providers (self-hosted, enterprise)
- **Cost Tracking**: Detailed per-request cost analytics
- **Integration**: Deep integration with DOOZ ecosystem
- **Offline Capability**: Route to local models when needed

## Consequences

### Positive

✅ **Vendor Independence**: Easy to switch providers
✅ **Cost Optimization**: Route to cheapest capable model
✅ **High Availability**: Automatic failover
✅ **Observability**: Full visibility into LLM usage
✅ **Flexibility**: Support custom and local models

### Negative

❌ **Maintenance**: Must maintain router code
❌ **Complexity**: Additional abstraction layer
❌ **Latency**: Slight overhead from routing decision
❌ **Testing**: Need to test with multiple providers

## Implementation

### Router Architecture

```
┌─────────────────────────────────────────────┐
│           Application (DOOZ Service)        │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│           dooz-ai-router                    │
│  ┌──────────────┐  ┌──────────────────┐    │
│  │ Task Router  │──>│ Provider Selector│    │
│  └──────────────┘  └──────────────────┘    │
│         │                     │             │
│         ↓                     ↓             │
│  ┌──────────────┐      ┌──────────────┐    │
│  │ Rate Limiter │      │ Cost Tracker │    │
│  └──────────────┘      └──────────────┘    │
└─────────────────┬───────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    ↓             ↓             ↓
┌────────┐  ┌──────────┐  ┌──────────┐
│ OpenAI │  │Anthropic │  │  Ollama  │
└────────┘  └──────────┘  └──────────┘
```

### Routing Strategies

```typescript
// Task-based routing
const router = new LlmRouter({
  routing: {
    'code-generation': ['gpt-4', 'claude-3-opus'],
    'simple-chat': ['gpt-3.5', 'claude-3-haiku'],
    'analysis': ['claude-3-sonnet', 'gpt-4'],
  },
  fallback: ['ollama-local'],  // Local model fallback
});
```

### Cost-Based Routing

```typescript
// Route to cheapest capable model
const config = {
  models: [
    { name: 'gpt-4', costPer1k: 0.03, capabilities: ['code', 'analysis'] },
    { name: 'claude-3-haiku', costPer1k: 0.00025, capabilities: ['chat'] },
  ],
  strategy: 'cost-optimized',
};
```

## Provider Support

| Provider | Status | Models |
|----------|--------|--------|
| OpenAI | ✅ Active | GPT-4, GPT-3.5 |
| Anthropic | ✅ Active | Claude 3 family |
| Google | ✅ Active | Gemini Pro |
| Ollama | ✅ Active | Local models |
| Azure OpenAI | 🚧 Planned | Enterprise GPT |
| AWS Bedrock | 🚧 Planned | Enterprise models |

## Cost Tracking

```typescript
// Track costs per application
const result = await router.generate({
  task: 'code-review',
  prompt: 'Review this code...',
  metadata: { app: 'dooz-copilot', user: 'user-123' },
});

console.log(result.cost); // $0.002
console.log(result.model); // 'gpt-4'
```

## Fallback Chain

```
1. Try primary model (GPT-4)
2. If rate limited → Try secondary (Claude-3)
3. If unavailable → Try tertiary (Gemini)
4. If all fail → Use local model (Ollama)
5. If critical → Queue for retry
```

## Rate Limiting

```typescript
// Token bucket algorithm
const limiter = new TokenBucket({
  capacity: 100,      // Max concurrent requests
  refillRate: 10,     // Per second
  perApp: true,       // Per application limits
  perUser: true,      // Per user limits
});
```

## Related Decisions

- ADR-003: Runtime Selection (Bun)
- ADR-006: Knowledge Management (RAG)

## References

- [dooz-ai-router README](../../dooz-ai-router/README.md)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)

---

**Date:** 2025-01  
**Author:** AI Team  
**Review Date:** 2026-01
