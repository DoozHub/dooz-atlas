# Cost Visualization

## Purpose

Patterns for displaying AI costs to users effectively.

---

## Display Principles

### 1. Always Visible
Cost should never be hidden. Users should always know current spend.

### 2. Contextual
Show cost relative to limits, averages, and expectations.

### 3. Actionable
Users should be able to act on cost information.

---

## UI Components

### Cost Ticker (Always Visible)

```
┌─────────────────────────┐
│ 💰 $2.34 today          │
│ ████████░░ 47% of limit │
└─────────────────────────┘
```

### Operation Preview

Before expensive operations:
```
┌────────────────────────────────┐
│ ⚠️ Estimated Cost: $1.50       │
│                                │
│ This operation uses claude-3-  │
│ opus for code review.          │
│                                │
│ [Proceed] [Use cheaper model]  │
└────────────────────────────────┘
```

### Cost Breakdown Chart

```
Daily Spending by Model
═══════════════════════
claude-opus    ████████░░░░  $4.20  42%
gpt-4o        ████░░░░░░░░  $2.10  21%
sonnet        ███░░░░░░░░░  $1.50  15%
gpt-4o-mini   ██░░░░░░░░░░  $0.80  8%
other         █░░░░░░░░░░░  $0.40  4%
```

### Trend Display

```
Weekly Cost Trend
─────────────────
Mon  ████  $12
Tue  ██    $6
Wed  ██████ $18
Thu  ███   $9
Fri  ████  $12  (today, projected)
```

---

## Alert Patterns

### Soft Warning (80% of limit)
```
⚠️ Approaching daily limit
You've used $40 of your $50 limit.
Consider using cheaper models for routine tasks.
```

### Hard Warning (100% of limit)
```
⛔ Daily limit reached
Further operations require approval.
[Request Extension] [View Usage]
```

### Cost Spike Alert
```
📈 Unusual spending detected
Last hour: $15 (normal: $3)
[Review Sessions] [Pause All]
```

---

## Related Documents

- [Token Tracking Design](Token_Tracking_Design.md)
- [Cost Governance](../01_SOP/Cost_Governance.md)
