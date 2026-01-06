# Self-Hosted Inference

## Purpose

Implementation guide for running local AI models.

---

## Infrastructure Options

### Single Developer (Mac)
- Ollama (recommended)
- LM Studio
- llama.cpp

### Team Server
- vLLM on GPU server
- TGI (Text Generation Inference)
- Triton Inference Server

### Kubernetes
- vLLM operator
- Knative + GPU
- Ray Serve

---

## Ollama Setup (Recommended)

### Installation
```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh
```

### Model Selection
```bash
# Coding models
ollama pull qwen2.5-coder:7b   # General coding
ollama pull deepseek-coder:6.7b # Fast completion
ollama pull codellama:13b       # Larger context

# General models
ollama pull llama3.2:7b        # Balanced
ollama pull mistral:7b         # Fast
```

### Service Configuration
```bash
# Start as service
ollama serve

# API endpoint
curl http://localhost:11434/v1/chat/completions
```

---

## vLLM Setup (Team Server)

### Requirements
- NVIDIA GPU with 24GB+ VRAM
- CUDA 12.0+
- Python 3.10+

### Installation
```bash
pip install vllm

# Run server
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-Coder-7B-Instruct \
  --port 8000
```

### Docker Deployment
```yaml
services:
  vllm:
    image: vllm/vllm-openai:latest
    runtime: nvidia
    ports:
      - "8000:8000"
    volumes:
      - ./models:/models
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
    command: >
      --model Qwen/Qwen2.5-Coder-7B-Instruct
      --tensor-parallel-size 1
```

---

## IDE Configuration

### VS Code
```json
{
  "github.copilot.advanced": {
    "customEngine": {
      "url": "http://localhost:11434/v1"
    }
  }
}
```

### Cursor
Settings → Models → Add OpenAI-compatible endpoint

---

## Monitoring

Track:
- Requests per minute
- Latency percentiles
- GPU utilization
- Memory usage

---

## Related Documents

- [Self-Hosted Model Guide](../02_GUIDES/Self_Hosted_Model_Guide.md)
- [Model Routing Policy](../01_SOP/Model_Routing_Policy.md)
