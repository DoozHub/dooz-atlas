# Token Tracking Design

## Purpose

Design patterns for tracking and displaying token usage.

---

## Tracking Requirements

### Per Request
- Input tokens
- Output tokens
- Model used
- Cost calculation

### Per Session
- Cumulative tokens
- Running cost
- Rate of consumption

### Per User
- Daily totals
- Trend over time
- Limit status

---

## Implementation

### Middleware Pattern

```typescript
async function trackTokens(request, response, model) {
  const start = Date.now();
  const result = await makeRequest(request);
  
  const usage = {
    requestId: generateId(),
    timestamp: new Date(),
    model,
    inputTokens: result.usage.prompt_tokens,
    outputTokens: result.usage.completion_tokens,
    cost: calculateCost(model, result.usage),
    latencyMs: Date.now() - start,
  };
  
  await saveUsage(usage);
  await updateSessionTotals(sessionId, usage);
  await checkLimits(userId, usage);
  
  return result;
}
```

### Cost Calculation

```typescript
const MODEL_COSTS = {
  'gpt-4o-mini': { input: 0.15, output: 0.60 },  // per 1M tokens
  'gpt-4o': { input: 5.00, output: 15.00 },
  'claude-3-sonnet': { input: 3.00, output: 15.00 },
  'claude-3-opus': { input: 15.00, output: 75.00 },
};

function calculateCost(model: string, usage: TokenUsage): number {
  const rates = MODEL_COSTS[model];
  const inputCost = (usage.prompt_tokens / 1_000_000) * rates.input;
  const outputCost = (usage.completion_tokens / 1_000_000) * rates.output;
  return inputCost + outputCost;
}
```

---

## Display Patterns

### Real-time Counter
Show tokens accumulating during operation:
```
Tokens: 12,450 ↑ | Cost: $0.23
```

### Session Summary
End-of-session display:
```
Session Complete
─────────────────
Duration: 23 minutes
Operations: 15
Tokens: 145,230
Cost: $2.18
```

### Limit Warning
When approaching limits:
```
⚠️ 80% of daily limit used
Tokens: 400,000 / 500,000
```

---

## Related Documents

- [Cost Visualization](Cost_Visualization.md)
- [Cost Governance](../01_SOP/Cost_Governance.md)
