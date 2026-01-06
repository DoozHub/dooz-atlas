# Logging and Observability

## Purpose

Implementation guide for comprehensive logging of AI operations.

---

## What to Log

### Every AI Request
| Field | Type | Required |
|-------|------|----------|
| timestamp | ISO8601 | Yes |
| request_id | UUID | Yes |
| user_id | string | Yes |
| session_id | UUID | Yes |
| model | string | Yes |
| input_tokens | int | Yes |
| output_tokens | int | Yes |
| cost | decimal | Yes |
| latency_ms | int | Yes |
| status | enum | Yes |

### Every Tool Operation
| Field | Type | Required |
|-------|------|----------|
| operation_id | UUID | Yes |
| request_id | UUID | Yes |
| tool_type | string | Yes |
| target | string | Yes |
| action | string | Yes |
| result | enum | Yes |
| error | string | No |

---

## Log Structure

```json
{
  "timestamp": "2026-01-06T10:30:45.123Z",
  "level": "info",
  "event": "ai_request",
  "data": {
    "request_id": "req_abc123",
    "user_id": "user_123",
    "session_id": "sess_xyz789",
    "model": "claude-3-sonnet",
    "input_tokens": 1500,
    "output_tokens": 2300,
    "cost": 0.057,
    "latency_ms": 2340,
    "status": "success"
  }
}
```

---

## Storage Strategy

### Hot Storage (30 days)
- Elasticsearch or similar
- Full-text searchable
- Real-time queries

### Warm Storage (1 year)
- Structured logs in database
- Aggregated metrics
- Audit queries

### Cold Storage (7 years)
- Compressed archives
- Compliance retention
- Rare access

---

## Metrics to Track

### Real-Time
- Requests per minute
- Token usage rate
- Error rate
- Average latency
- Active sessions

### Daily Aggregates
- Total cost by user
- Total cost by project
- Model usage distribution
- Blocked operations count
- Top operations by count

---

## Alerting Rules

```yaml
alerts:
  - name: cost_spike
    condition: "hourly_cost > 3 * avg_hourly_cost"
    severity: warning
    
  - name: error_spike
    condition: "error_rate > 10%"
    severity: critical
    
  - name: blocked_operations
    condition: "blocked_count > 10 per hour"
    severity: info
```

---

## Dashboard Panels

1. **Cost Overview** - Daily/weekly/monthly spend
2. **Usage Breakdown** - By user, model, operation
3. **Error Tracking** - Failed requests, blocked ops
4. **Trend Analysis** - Usage over time
5. **Audit Log** - Recent operations

---

## Related Documents

- [Cost Governance](../01_SOP/Cost_Governance.md)
- [Token Tracking Design](../06_UI_AGENTIC_AI/Token_Tracking_Design.md)
