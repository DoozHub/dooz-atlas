# Cost Assumptions

Baseline cost assumptions for planning and governance.

**Currency:** INR (₹) @ 1 USD = ₹90

---

## Model Pricing (per 1M tokens)

### OpenAI
| Model | Input | Output |
|-------|-------|--------|
| GPT-4o-mini | ₹14 | ₹54 |
| GPT-4o | ₹450 | ₹1,350 |
| GPT-4.5 | ₹900 | ₹2,700 |
| o1 | ₹1,350 | ₹5,400 |
| o1-pro | Variable | Variable |

### Anthropic
| Model | Input | Output |
|-------|-------|--------|
| Haiku | ₹23 | ₹113 |
| Sonnet 4 | ₹270 | ₹1,350 |
| Opus 4 | ₹1,350 | ₹6,750 |
| Opus 4.5 | ₹1,800 | ₹9,000 |

### Google
| Model | Input | Output |
|-------|-------|--------|
| Flash-Lite | ₹7 | ₹27 |
| Flash | ₹9 | ₹36 |
| Pro | ₹270 | ₹1,350 |

---

## Typical Task Costs

| Task Type | Tokens (approx) | Model Tier | Typical Cost |
|-----------|-----------------|------------|--------------|
| Format file | 2K | 1 | ₹0.10 |
| Rename vars | 5K | 1 | ₹0.20 |
| Simple function | 10K | 2 | ₹5 |
| API endpoint | 20K | 2 | ₹9 |
| Feature impl | 50K | 2 | ₹23 |
| Architecture review | 30K | 3 | ₹90 |
| Security audit | 50K | 4 | ₹270 |

---

## Budget Guidelines

### Per Engineer Per Day (Reduced Budgets)
| Usage Level | Tokens | Cost |
|-------------|--------|------|
| Light | 100K | ~₹180 |
| Normal | 200K | ~₹360 |
| Heavy | 300K | ~₹540 |
| Hard limit | 1M | ~₹1,800 |

### Per Project Per Month
| Project Size | Budget |
|--------------|--------|
| Small | ₹5,000 |
| Medium | ₹25,000 |
| Large | ₹1,00,000 |
| Enterprise | Custom |

---

## Self-Hosted Cost Comparison

### Hardware Amortization
- M3 Max (64GB): ~₹3,15,000 / 3 years = ₹288/day
- A100 server: ~₹13,50,000 / 3 years = ₹1,233/day

### Break-Even Analysis
At 300K tokens/day:
- Cloud cost: ~₹540/day
- Self-hosted M3: ~₹288/day + electricity (~₹50)
- **Savings:** ~₹200/day
- Break-even: ~3-4 weeks

---

*Last updated: 2026-01-06*  
*Pricing changes frequently. Verify with providers.*
