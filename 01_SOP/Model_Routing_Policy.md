# Model Routing Policy

**Version:** 2.0  
**Effective:** 2026-01-06  
**Authority:** CTO

---

## Purpose

Define which AI models are approved for which task categories, following dynamic model routing best practices for cost optimization, performance, and reliability.

---

## Model Tiers (January 2026)

### Tier 1: Fast/Cheap (Mechanical Tasks)
- **Use:** Formatting, renaming, scaffolding, simple refactors, boilerplate generation
- **Models:** GPT-4o-mini, Claude 3.5 Haiku, Gemini 2.0 Flash-Lite, local models (Qwen, Llama)
- **Cost:** < ₹1 per task
- **Latency:** < 500ms

### Tier 2: Standard (Cognitive Tasks)
- **Use:** Feature implementation, API design, bug fixes, code review
- **Models:** GPT-4o, Claude Sonnet 4, Gemini 2.0 Flash
- **Cost:** ₹1 - ₹9 per task
- **Latency:** < 2s

### Tier 3: Thinking/Reasoning (Architectural Tasks)
- **Use:** System design, complex refactoring, multi-file changes, extended thinking tasks
- **Models:** Claude Opus 4.5, Claude Opus 4, GPT-4.5, o1, Gemini 2.0 Pro
- **Cost:** ₹9 - ₹90 per task
- **Latency:** 2-30s (extended thinking may be longer)

### Tier 4: Adversarial/Expert Review
- **Use:** Security audits, spec compliance, edge case discovery, agentic workflows
- **Models:** o1-pro, Claude Opus 4.5 (extended thinking mode), GPT-4.5 with chain-of-thought
- **Cost:** ₹90+ per review
- **Latency:** Variable

---

## Routing Matrix

| Task | Tier | Approved Models (Jan 2026) |
|------|------|----------------------------|
| Code formatting | 1 | GPT-4o-mini, Haiku, Flash-Lite |
| Variable renaming | 1 | GPT-4o-mini, Haiku, Flash-Lite |
| Boilerplate generation | 1 | GPT-4o-mini, local models |
| Simple CRUD | 2 | GPT-4o, Claude Sonnet 4, Gemini Flash |
| API endpoint | 2 | GPT-4o, Claude Sonnet 4 |
| Code review | 2 | Claude Sonnet 4, GPT-4o |
| Database schema | 3 | Claude Opus 4.5, o1, GPT-4.5 |
| Auth system design | 3 | Claude Opus 4.5, o1, GPT-4.5 |
| Multi-file refactoring | 3 | Claude Opus 4.5, GPT-4.5 |
| Agentic multi-step tasks | 3 | Claude Opus 4.5, Gemini 2.0 Pro |
| Security review | 4 | o1-pro, Claude Opus 4.5 (extended) |
| Production hotfix | 3 | Claude Opus 4.5, o1, with human review |
| Complex reasoning | 3 | Claude Opus 4.5, GPT-4.5 |

---

## Dynamic Routing Best Practices

### Policy-Driven Selection
1. **Assess task complexity first** - Use task classification to determine tier
2. **Balance cost vs. capability** - Don't use Tier 3/4 for mechanical tasks
3. **Consider latency requirements** - Real-time UX needs fast models

### Fallback Strategy
1. Primary model unavailable? → Route to same-tier alternative
2. Rate limited? → Queue and retry with exponential backoff
3. Critical path? → Maintain fallback chain: Primary → Secondary → Tier-down

### A/B Testing New Models
- Run new models on 10% traffic before full rollout
- Compare quality, latency, and cost metrics
- Graduate to prod after 7-day evaluation period

---

## Model Capabilities Reference (Jan 2026)

| Model | Strengths | Context Window | Notes |
|-------|-----------|----------------|-------|
| **Claude Opus 4.5** | Best-in-class reasoning, agentic mastery, superior coding | 200K | **New flagship** - top choice for complex tasks |
| **GPT-4.5** | Human-like text, reduced hallucinations, multilingual (14 langs) | 128K | Premium pricing, best for nuanced tasks |
| **Claude Opus 4** | Long-running tasks, extended thinking, superior coding | 200K | Excels at multi-stage agentic workflows |
| **Claude Sonnet 4** | Balance of speed/quality, great for dev workflows | 200K | Improved accuracy, instruction-following |
| **Gemini 2.0 Pro** | Multimodal, native tool use, agentic design | 2M | Integrates with Google ecosystem |
| **Gemini 2.0 Flash** | Low latency, multimodal | 1M | Best for real-time applications |
| **o1 / o1-pro** | Deliberate reasoning, math, complex logic | 128K | Extended chain-of-thought |

---

## Prohibited Uses

| Model | Never Use For |
|-------|---------------|
| GPT-4o-mini, Flash-Lite | Security decisions, architecture, sensitive data analysis |
| Any model | Unreviewed production code deployment |
| Agentic tools | Unsupervised file deletion, DB mutations without approval |
| Cloud models | PII processing without data handling agreement |

---

## Self-Hosted Priority

When available, prefer self-hosted models for:
- **Sensitive data processing** - Avoid cloud API data exposure
- **High-volume mechanical tasks** - Cost optimization (Qwen 3, Llama 3.3)
- **Predictable latency** - No rate limits on local inference
- **Offline scenarios** - Edge deployment requirements

See [Self-Hosted Model Guide](../02_GUIDES/Self_Hosted_Model_Guide.md).

---

## Agentic AI Routing

For multi-step agentic workflows:

1. **Planning phase** → Use Tier 3 thinking models (Claude Opus 4.5, GPT-4.5)
2. **Execution steps** → Route individual subtasks to appropriate tier
3. **Verification** → Use Tier 3/4 for review and validation
4. **Tool use** → Gemini 2.0 for native tool integration

---

## Observability Requirements

All routed requests must log:
- Model used and tier
- Task classification
- Latency (TTFB, total)
- Token counts (input/output)
- Cost estimate
- Success/failure status

---

## Related Documents

- [AI Usage SOP](AI_Usage_SOP.md)
- [Cost Governance](Cost_Governance.md)
- [Task Classification Framework](../03_FRAMEWORKS/Task_Classification_Framework.md)
- [When to Use Thinking Models](../02_GUIDES/When_to_Use_Thinking_Models.md)
