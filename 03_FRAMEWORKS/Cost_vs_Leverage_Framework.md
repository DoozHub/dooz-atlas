# Cost vs Leverage Framework

## Purpose

Evaluate when AI investment is justified by productivity gains.

**Currency:** INR (₹) @ 1 USD = ₹90

---

## The ROI Equation

```
AI Value = (Time Saved × Hourly Rate) - (Token Cost + Review Overhead)
```

If positive → Use AI  
If negative → Do manually

---

## Leverage Categories

### High Leverage (Use AI)
| Scenario | Why |
|----------|-----|
| Repetitive tasks | Automation pays off quickly |
| Large refactors | Manual effort would be huge |
| Boilerplate generation | Low token cost, high time save |
| Test generation | Multiplies coverage fast |

### Low Leverage (Skip AI)
| Scenario | Why |
|----------|-----|
| Tiny changes | Prompt overhead > time saved |
| Novel architecture | AI guidance unreliable |
| Heavily context-dependent | Context costs exceed value |
| One-off scripts | Manual is faster |

---

## Cost Drivers

### Token Costs
| Model Tier | Cost per 1M tokens |
|------------|-------------------|
| Tier 1 (cheap) | ₹9 - ₹45 |
| Tier 2 (standard) | ₹90 - ₹450 |
| Tier 3 (thinking) | ₹1,350 - ₹5,400 |
| Tier 4 (adversarial) | ₹5,400+ |

### Hidden Costs
- Review time
- Iteration loops
- Context building
- Error correction
- Rework

---

## Decision Matrix

| Task Size | Complexity | AI Recommendation |
|-----------|-----------|-------------------|
| Small | Simple | Manual (overhead too high) |
| Small | Complex | AI advisor (Tier 3) |
| Large | Simple | AI autonomous (Tier 1) |
| Large | Complex | AI assisted (Tier 2-3) |

---

## Break-Even Analysis

### When AI Saves Time

```
If: Task would take 30 minutes manually
And: AI completes in 5 minutes + 10 min review
And: Token cost is ₹45
And: Hourly rate is ₹500

Then:
Manual cost = 0.5 × ₹500 = ₹250
AI cost = 0.25 × ₹500 + ₹45 = ₹170

Savings = ₹80 ✓
```

### When AI Wastes Time

```
If: Task would take 5 minutes manually
And: AI takes 3 minutes + 10 min review (iterations)
And: Token cost is ₹180

Then:
Manual cost = 0.08 × ₹500 = ₹40
AI cost = 0.22 × ₹500 + ₹180 = ₹290

Loss = -₹250 ✗
```

---

## Optimization Strategies

1. **Batch similar tasks** — Amortize context cost
2. **Use cached prompts** — Reduce iteration
3. **Start cheap** — Escalate tiers only if needed
4. **Know when to stop** — Diminishing returns

---

## Related Documents

- [Cost Governance](../01_SOP/Cost_Governance.md)
- [Model Routing Policy](../01_SOP/Model_Routing_Policy.md)
- [Task Classification Framework](Task_Classification_Framework.md)
