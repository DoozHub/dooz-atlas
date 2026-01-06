# Self-Hosted Model Guide

## Purpose

Guide for setting up and using self-hosted AI models for cost optimization and data privacy.

---

## When to Self-Host

### Good Candidates
- High-volume mechanical tasks
- Sensitive data processing
- Offline development needs
- Cost optimization at scale

### Keep External
- Architecture decisions (need best models)
- Security reviews (need cutting-edge)
- Complex reasoning tasks

---

## Recommended Models

### Code Generation
| Model | Size | Use Case |
|-------|------|----------|
| DeepSeek Coder | 6.7B | Light code completion |
| CodeLlama | 13B | General code generation |
| Qwen 2.5 Coder | 7B-32B | Full-featured coding |

### General Purpose
| Model | Size | Use Case |
|-------|------|----------|
| Llama 3.2 | 3B-70B | General tasks |
| Qwen 2.5 | 7B-72B | Multilingual, reasoning |
| Mistral | 7B | Fast inference |

---

## Infrastructure Options

### Local Development
```bash
# Using Ollama
ollama run qwen2.5-coder:7b

# Using LM Studio
# GUI-based, download from lmstudio.ai
```

### Team Server
- GPU server with NVIDIA A100/H100
- Minimum 24GB VRAM for 13B models
- Docker + vLLM for serving

### Cloud Self-Hosted
- AWS (p4d/p5 instances)
- GCP (A100 instances)
- Modal.com (serverless GPU)

---

## Setup: Ollama (Recommended)

### Install
```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh
```

### Pull Model
```bash
ollama pull qwen2.5-coder:7b
```

### Run Server
```bash
ollama serve
# API available at http://localhost:11434
```

### Configure IDE
Point your IDE to the local endpoint:
- Base URL: `http://localhost:11434/v1`
- Model: `qwen2.5-coder:7b`

---

## Cost Comparison

| Scenario | External API | Self-Hosted |
|----------|-------------|-------------|
| 1M tokens/day | ~$30/day | ~$5/day (amortized) |
| 10M tokens/day | ~$300/day | ~$15/day (amortized) |

Break-even: ~2-3 weeks for heavy users.

---

## Limitations

### Self-Hosted Models Cannot
- Match GPT-4/Claude quality
- Handle complex architecture
- Provide cutting-edge capabilities

### Always Hybrid
Use self-hosted for:
- Volume tasks
- Sensitive data

Use external for:
- Quality-critical work
- Complex reasoning

---

## Related Documents

- [Model Routing Policy](../01_SOP/Model_Routing_Policy.md)
- [Cost Governance](../01_SOP/Cost_Governance.md)
- [Self-Hosted Inference](../07_IMPLEMENTATION/Self_Hosted_Inference.md)
