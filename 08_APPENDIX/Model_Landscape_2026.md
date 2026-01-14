# 2026 AI Model Landscape

> Comprehensive guide to available AI models and their optimal use cases

---

## Overview

This document provides an up-to-date catalog of AI models available in the Dooz ecosystem, including recommendations for task-based model selection.

---

## Model Categories

### 1. Reasoning Models

Best for: Complex analysis, planning, multi-step logic

| Model | Provider | Context | Strengths |
|-------|----------|---------|-----------|
| GPT-4o | OpenAI | 200K | Balanced performance, fast |
| Claude Sonnet 4 | Anthropic | 200K | Long context, nuanced reasoning |
| DeepSeek R1 | DeepSeek | 128K | Complex math, coding |
| Gemini 2.0 Pro | Google | 2M | Massive context window |

### 2. Speed/Throughput Models

Best for: High-volume, lower-complexity tasks

| Model | Provider | Context | Strengths |
|-------|----------|---------|-----------|
| GPT-4o-mini | OpenAI | 200K | Cost-effective, fast |
| Claude Haiku 4 | Anthropic | 200K | Quick responses, low latency |
| Qwen 2.5 7B | Alibaba | 128K | Local deployment capable |
| Llama 3.3 70B | Meta | 128K | Open source, customizable |

### 3. Coding Models

Best for: Code generation, debugging, refactoring

| Model | Provider | Context | Strengths |
|-------|----------|---------|-----------|
| Claude 3.5 Sonnet | Anthropic | 200K | Best overall coding |
| GPT-4o | OpenAI | 200K | Good all-rounder |
| DeepSeek Coder V2 | DeepSeek | 128K | Specialized coding |
| CodeLlama 70B | Meta | 128K | Open source coding |

### 4. Vision/Multimodal

Best for: Image analysis, document understanding

| Model | Provider | Context | Strengths |
|-------|----------|---------|-----------|
| GPT-4o | OpenAI | 200K | Best overall vision |
| Claude 3.5 Vision | Anthropic | 200K | Detailed analysis |
| Gemini 1.5 Pro | Google | 2M | Long video/-image context |

### 5. Local/Edge Models

Best for: Privacy-sensitive, offline, cost optimization

| Model | Size | VRAM | Use Case |
|-------|------|------|----------|
| Phi-4 | 3GB | 4GB | Lightweight tasks |
| Llama 3.2 3B | 4GB | 6GB | Simple reasoning |
| Qwen 2.5 7B | 10GB | 12GB | General purpose |
| Llama 3.3 70B | 40GB | 48GB | Complex tasks |

---

## Dooz Router Task Mapping

The AI Router automatically selects optimal models based on task type:

| Task Type | Primary Model | Fallback | Confidence Target |
|-----------|---------------|----------|-------------------|
| `extraction` | GPT-4o-mini | Claude Haiku | 85% |
| `summarization` | Claude Haiku | GPT-4o-mini | 80% |
| `comparison` | Claude Sonnet | GPT-4o | 85% |
| `risk_analysis` | Claude Sonnet | GPT-4o | 90% |
| `code_generation` | Claude Sonnet | DeepSeek Coder | 90% |
| `reasoning` | GPT-4o | DeepSeek R1 | 85% |
| `general` | GPT-4o-mini | Claude Haiku | 75% |
| `creative` | Claude Sonnet | GPT-4o | 80% |
| `vision` | GPT-4o | Claude 3.5 Vision | 85% |
| `long_context` | Claude Sonnet | Gemini 2.0 Pro | 80% |

---

## Cost Optimization

### Price Comparison (per 1M tokens)

| Model | Input | Output |
|-------|-------|--------|
| GPT-4o | $2.50 | $10.00 |
| GPT-4o-mini | $0.10 | $0.40 |
| Claude Sonnet 4 | $3.00 | $15.00 |
| Claude Haiku 4 | $0.25 | $1.25 |
| DeepSeek R1 | $0.55 | $2.19 |
| DeepSeek Coder | $0.27 | $1.10 |

### Cost-Saving Strategies

1. **Use fast models for simple tasks**
   - Summarization → Claude Haiku (save ~70%)
   - Extraction → GPT-4o-mini (save ~90%)

2. **Cache common queries**
   - Implement semantic caching layer
   - Expected hit rate: 30-50%

3. **Batch processing**
   - Group similar requests
   - Reduce per-request overhead

4. **Local models for development**
   - Use Phi-4 for testing
   - Only hit cloud for production

---

## Performance Benchmarks

### Common Tasks (2026 Q1)

| Task | Best Model | Avg. Latency | Success Rate |
|------|------------|--------------|--------------|
| Code Generation | Claude Sonnet | 2.1s | 94% |
| Document QA | Claude Sonnet | 1.8s | 91% |
| Data Extraction | GPT-4o-mini | 0.8s | 96% |
| Creative Writing | Claude Sonnet | 2.5s | 89% |
| Math/Reasoning | DeepSeek R1 | 3.2s | 87% |
| Translation | GPT-4o | 1.2s | 97% |

---

## Model Selection Decision Tree

```
Is this a simple, repetitive task?
├── YES → Use GPT-4o-mini or Claude Haiku
└── NO → Does it require complex reasoning?
         ├── YES → Use DeepSeek R1 or GPT-4o
         └── NO → Is it code-related?
                  ├── YES → Use Claude Sonnet
                  └── NO → Is long context needed?
                           ├── YES → Use Claude Sonnet or Gemini 2.0 Pro
                           └── NO → Default to Claude Sonnet
```

---

## Provider Reliability (2026 Q1)

| Provider | Uptime | Avg. Latency | Rate Limits |
|----------|--------|--------------|-------------|
| OpenAI | 99.95% | 450ms | 10K RPM |
| Anthropic | 99.92% | 520ms | 5K RPM |
| DeepSeek | 99.88% | 680ms | 8K RPM |
| Google | 99.97% | 380ms | 15K RPM |

---

## Deprecation Timeline

| Model | Status | Deprecation Date | Replacement |
|-------|--------|------------------|-------------|
| GPT-4 Turbo | Deprecated | Q2 2026 | GPT-4o |
| Claude 3 Opus | Deprecated | Q1 2026 | Claude Sonnet 4 |
| Gemini 1.5 Pro | Legacy | Q3 2026 | Gemini 2.0 Pro |

---

## Related Documentation

- [Model Routing Policy](../01_SOP/Model_Routing_Policy.md)
- [AI Router Integration](../09_ECOSYSTEM/AI_Router_Integration.md)
- [Cost Governance](../01_SOP/Cost_Governance.md)

---

*Last Updated: January 2026*
*Version: 2026.1*
