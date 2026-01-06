# Model Catalog

Reference of AI models approved for use at DoozieSoft.

**Last Updated:** January 2026  
**Currency:** INR (₹) @ 1 USD = ₹90

---

## Tier 1: Fast/Cheap

| Model | Provider | Context | Cost (1M tokens) | Best For |
|-------|----------|---------|------------------|----------|
| GPT-4o-mini | OpenAI | 128K | ₹14/₹54 | Mechanical tasks, formatting |
| Claude 3.5 Haiku | Anthropic | 200K | ₹23/₹113 | Quick completions |
| Gemini 2.0 Flash-Lite | Google | 1M | ₹7/₹27 | Cost-effective large context |
| Gemini 2.0 Flash | Google | 1M | ₹9/₹36 | Fast multimodal tasks |

---

## Tier 2: Standard

| Model | Provider | Context | Cost (1M tokens) | Best For |
|-------|----------|---------|------------------|----------|
| GPT-4o | OpenAI | 128K | ₹450/₹1,350 | General coding |
| Claude Sonnet 4 | Anthropic | 200K | ₹270/₹1,350 | Feature implementation, dev workflows |
| Gemini 2.0 Flash | Google | 1M | ₹9/₹36 | Real-time apps, large codebases |

---

## Tier 3: Thinking/Reasoning

| Model | Provider | Context | Cost (1M tokens) | Best For |
|-------|----------|---------|------------------|----------|
| GPT-4.5 | OpenAI | 128K | ₹900/₹2,700 | Nuanced tasks, reduced hallucinations |
| Claude Opus 4 | Anthropic | 200K | ₹1,350/₹6,750 | Long-running tasks, extended thinking |
| Claude Opus 4.5 | Anthropic | 200K | ₹1,800/₹9,000 | **Latest** - Superior reasoning, agentic mastery |
| o1 | OpenAI | 128K | ₹1,350/₹5,400 | Complex reasoning, math |
| Gemini 2.0 Pro | Google | 2M | ₹270/₹1,350 | Massive codebases, agentic workflows |

### Key Model Capabilities (January 2026)

| Model | Extended Thinking | Multimodal | Tool Use | Agentic | Notes |
|-------|-------------------|------------|----------|---------|-------|
| GPT-4.5 | ❌ | ✅ Images | ✅ | Limited | Best for natural conversation |
| Claude Opus 4 | ✅ Hours-long | ✅ Images | ✅ | ✅ Excellent | Sustained complex tasks |
| **Claude Opus 4.5** | ✅ Enhanced | ✅ Images | ✅ Native | ✅ Best-in-class | Top-tier reasoning, coding |
| Claude Sonnet 4 | ✅ | ✅ Images | ✅ | ✅ Good | Balanced speed/quality |
| o1 | ✅ Chain-of-thought | ❌ | Limited | Limited | Math & logic focused |
| Gemini 2.0 Pro | ✅ | ✅ Full (image/video/audio) | ✅ Native | ✅ Excellent | Google ecosystem integration |

---

## Tier 4: Adversarial/Expert

| Model | Provider | Context | Cost | Best For |
|-------|----------|---------|------|----------|
| o1-pro | OpenAI | 128K | ₹1,800+/task | Deep security analysis |
| Claude Opus 4.5 (extended) | Anthropic | 200K | ₹2,250-13,500/task | Best-in-class adversarial review |
| Claude Opus 4 (extended) | Anthropic | 200K | ₹1,350-9,000/task | Adversarial review, spec compliance |

---

## Self-Hosted Options

| Model | Size | VRAM Req | Best For |
|-------|------|----------|----------|
| Qwen 3 | 7B | 8GB | General coding |
| Qwen 3 | 14B | 16GB | Better quality |
| Qwen 3 | 32B | 24GB | Competitive quality |
| Qwen 3 | 72B | 48GB+ | Near-frontier performance |
| Llama 3.3 | 8B | 8GB | General purpose |
| Llama 3.3 | 70B | 40GB+ | High quality |
| DeepSeek-V3 | 67B | 48GB+ | Excellent reasoning |
| Mistral Large | 123B | 80GB+ | Enterprise-grade |

### Self-Hosted Recommendations

| Use Case | Recommended Model | Notes |
|----------|-------------------|-------|
| High-volume mechanical | Qwen 3 7B | Fast, cost-effective |
| Sensitive data processing | Qwen 3 32B+ | No API data exposure |
| Offline/Edge deployment | Llama 3.3 8B | Low resource requirements |
| Quality-critical tasks | DeepSeek-V3 / Qwen 3 72B | Approaches GPT-4o quality |

---

## Model Selection Quick Reference

```
Task Complexity → Model Selection

Simple/Mechanical  → GPT-4o-mini, Haiku, Flash-Lite
Standard Coding    → GPT-4o, Claude Sonnet 4, Gemini Flash
Architecture       → Claude Opus 4.5, GPT-4.5, o1
Security Review    → o1-pro, Claude Opus 4.5 (extended)
Agentic Workflows  → Claude Opus 4.5, Gemini 2.0 Pro
```

---

## Anthropic Claude Family (January 2026)

| Model | Tier | Strengths |
|-------|------|-----------|
| Claude 3.5 Haiku | 1 | Speed, cost-efficiency |
| Claude Sonnet 4 | 2 | Balanced, great for daily dev |
| Claude Opus 4 | 3 | Extended thinking, complex tasks |
| **Claude Opus 4.5** | 3-4 | **New flagship** - Best reasoning, agentic capabilities |

---

## Related

- [Model Routing Policy](../01_SOP/Model_Routing_Policy.md)
- [Self-Hosted Model Guide](../02_GUIDES/Self_Hosted_Model_Guide.md)
- [Cost Assumptions](Cost_Assumptions.md)

---

*Review quarterly for model updates and pricing changes.*
