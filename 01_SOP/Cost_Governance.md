# Cost Governance

**Version:** 1.1  
**Effective:** 2026-01-06  
**Authority:** CTO

---

## Purpose

Establish budget controls for AI usage to prevent cost explosions.

---

## Limits

### Per Engineer Per Day
| Limit Type | Tokens | Approx Cost |
|------------|--------|-------------|
| Soft Limit | 300K | ~₹270 |
| Hard Limit | 1M | ~₹900 |

Exceeding soft limit triggers notification.  
Exceeding hard limit requires CTO approval to continue.

### Per Project Per Month
| Project Size | Budget |
|--------------|--------|
| Small | ₹5,000 |
| Medium | ₹25,000 |
| Large | ₹1,00,000 |
| Enterprise | Custom |

---

## Tracking Requirements

### Mandatory Logging
All AI tool usage must log:
- Model name
- Input tokens
- Output tokens
- Total cost
- Timestamp
- User ID

### Dashboards
- Real-time token usage per user
- Daily/weekly cost rollups
- Project-level aggregation
- Anomaly detection alerts

---

## Optimization Strategies

### 1. Use Cheaper Models First
Try Tier 1 models before escalating.

### 2. Prompt Efficiency
- Remove unnecessary context
- Use structured outputs
- Cache repeated queries

### 3. Self-Hosted Models
Route high-volume tasks to local models.

### 4. Batch Operations
Combine multiple small requests into single prompts.

---

## Escalation

When limits are exceeded:

1. **Soft limit:** Notification sent, continue with awareness
2. **Hard limit:** Access paused, requires CTO approval
3. **Budget overrun:** Incident review required

---

## Related Documents

- [AI Usage SOP](AI_Usage_SOP.md)
- [Model Routing Policy](Model_Routing_Policy.md)
- [Cost Explosion Postmortems](../05_KNOWLEDGE_BASE/Cost_Explosion_Postmortems.md)
