# LLM Vibe Check

> Pragmatic Model Evaluation for Real-World Software Development

---

## Overview

An open-source, community-driven experiment by **DoozieSoft** to qualify LLMs for real-world software agency work. Unlike academic benchmarks, this tests LLMs on practical, messy scenarios from actual tickets.

```
┌──────────────────────────────────────────────────────────────┐
│                    LLM VIBE CHECK                            │
├──────────────────────────────────────────────────────────────┤
│  🧪 Pragmatic Tests     │  📊 Real-World Scenarios          │
│  🤖 Model Comparison    │  📁 Prompt/Result Pairs           │
│  🎯 Code Refactoring    │  💬 Client Communication          │
│  🔧 Bug Detection       │  👥 Community Driven              │
└──────────────────────────────────────────────────────────────┘
```

---

## Philosophy

> **Progress over Perfection**

DoozieSoft doesn't need models that solve theoretical physics. They need partners that:
- Refactor messy code without over-engineering
- Communicate with clients like humans
- Find that one annoying VPC setting crashing an app

---

## How It Works

1. **Prompts**: High-friction scenarios from real DoozieSoft tickets
2. **Execution**: Manual model switching with GitHub Copilot or Kilo
3. **Results**: Store outputs in `/results/` for comparison

---

## Repository Structure

```
llm-vibe-check/
├── .kilocode/            # Custom persona for Kilo users
├── prompts/              # Pragmatic scenarios (Input)
├── results/              # Model-generated responses (Output)
│   ├── gpt-4o/
│   └── gemini-2.0-flash/
├── Master Execution Prompt.md
├── CONTRIBUTING.md
└── RESULTS.md
```

---

## Documentation

| Document | Description |
|----------|-------------|
| `Master Execution Prompt.md` | Main evaluation prompt |
| `RESULTS.md` | Model comparison results |
| `CONTRIBUTING.md` | How to add new prompts |

---

## Contributing

This is a living experiment. Add prompts when:
- An LLM gives a brilliant solution → **Add it**
- An LLM fails at a simple task → **Add that too**

---

*Repository: llm-vibe-check*
