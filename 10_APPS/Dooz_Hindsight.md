# Dooz Hindsight

> The "I Told You So" System — Decision Intelligence & Calibration

---

## Overview

Hindsight is a decision tracking system that helps individuals and teams become better decision-makers by comparing predictions against actual outcomes over time.

```
┌──────────────────────────────────────────────────────────────┐
│                      DOOZ HINDSIGHT                          │
├──────────────────────────────────────────────────────────────┤
│  📝 Decision Recording   │  📊 Pattern Detection             │
│  🎯 Calibration Scoring  │  🔄 Scheduled Reviews             │
│  📈 Trend Analysis       │  🧠 AI-Powered Insights           │
└──────────────────────────────────────────────────────────────┘
```

---

## Why Hindsight?

Every day we make decisions based on predictions:
- "This feature will take 2 weeks"
- "Customers will love this new design"
- "This hire will be a great culture fit"

But how often do we go back and check? **Almost never.**

Hindsight creates a feedback loop for decision-making, helping you:
- **Record decisions** with your predicted outcomes
- **Review outcomes** at 30/60/90 day intervals
- **Calculate calibration** — are you overconfident or underconfident?
- **Identify patterns** — where do you consistently miss?
- **Learn continuously** — improve future predictions

---

## Calibration Score

Your calibration score ranges from **-1 to +1**:

| Score | Meaning |
|-------|---------|
| -1.0 | Extremely pessimistic (reality better than predicted) |
| -0.5 | Moderately pessimistic |
| 0.0 | Perfectly calibrated |
| +0.5 | Moderately optimistic (reality worse than predicted) |
| +1.0 | Extremely optimistic |

---

## Key Features

### 1. Decision Recording

Capture the full context of decisions:
- **What** — The decision itself
- **Why** — Reasoning and context
- **Alternatives** — What you didn't choose
- **Prediction** — Expected outcome with confidence level

### 2. Scheduled Reviews

Automatic prompts to review decisions:
- **30-day check-in**: Early signal detection
- **60-day review**: Mid-term assessment
- **90-day analysis**: Full outcome evaluation

### 3. Pattern Detection

AI-powered analysis identifies:
- Overconfidence in specific domains
- Systematic biases
- Blind spots in decision-making
- Improving or declining accuracy

### 4. Organizational Learning

Aggregate insights across teams:
- Which decision types need more deliberation?
- Where should you trust your gut?
- What external factors consistently surprise you?

---

## Example Output

```
📊 Calibration Report for Q4 2024
═════════════════════════════════════

Decisions reviewed: 47
Average calibration: -0.23 (slightly pessimistic)

Patterns detected:
  📈 Technical estimates: overconfident (+0.31)
  📉 Market predictions: underconfident (-0.45)
  ✅ Timeline estimates: accurate (+0.08)

Recommendations:
  • Add 30% buffer to technical complexity estimates
  • Trust your market instincts more — you're too cautious
  • Your timeline estimates are solid, keep it up!
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript |
| **State** | Zustand |
| **Visualization** | Recharts |
| **Build** | Vite |
| **Styling** | DoozieSoft Design System |

---

## Quick Start

```bash
npm install
npm run dev
npm run build
```

---

## Integration Points

- **dooz-brain**: Store decision OMOs for context
- **dooz-oracle**: Confidence scoring on predictions
- **dooz-pm-suite**: Link decisions to project intents

---

## Related Documentation

- [Decision Intelligence](../05_KNOWLEDGE_BASE/Decision_Intelligence.md)
- [Oracle Confidence Scoring](../06_UI_AGENTIC_AI/Oracle_Confidence_Scoring.md)
- [PM Suite Integration](Dooz_PM_Suite.md)

---

*Repository: DoozHub/dooz-hindsight*
