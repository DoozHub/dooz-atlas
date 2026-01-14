# Brain.md

> Context Control Protocol for LLMs - Stateless RAM Model

---

## Overview

Brain.md is a CLI tool that compiles human-readable `brain.md` files into token-optimized TOON (Token-Oriented Object Notation) payloads for injection into LLM context windows.

```
┌──────────────────────────────────────────────────────────────┐
│                        BRAIN.MD                             │
├──────────────────────────────────────────────────────────────┤
│  📝 Brain.md Files       │  🔀 TOON Parser                   │
│  📏 Token Optimization   │  �️ Pointer Resolution            │
│  💾 Live Context         │  👁️ Watch Mode                    │
│  💰 Token Budget         │  📋 Mode-Specific Prompts         │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **TOON Parser** | Full-featured parser supporting sections, key-value pairs, tabular arrays, heredocs |
| **Pointer Resolution** | Automatically resolves and injects external file references |
| **Live Context Management** | `brain boot` creates editable context.md for session state |
| **Watch Mode** | Auto-recompiles on file changes with debouncing |
| **Token Budget Enforcement** | Ensures payloads stay within specified limits |
| **Mode-Specific Prompts** | Strict, Creative, and Analysis driver modes |
| **Comment Stripping** | Removes comments from final payload |

---

## TOON Format

```yaml
KERNEL:
  role: "Senior Developer"
  mode: "Strict/Code-Only"
  token_budget: 4000

MEMORY_POINTERS[1]{type, path, description}:
  file, "@schema.sql", "Database schema"

PROCESS_STACK[1]{priority, task}:
  1, "Optimize database queries"
```

---

## Commands

| Command | Description |
|---------|-------------|
| `brain boot <source>` | Initialize session, create context.md |
| `brain watch <file>` | Watch for changes, auto-compile |
| `brain compile <file>` | Compile directly to output/clipboard |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | Python 3.10+ |
| **Build** | Poetry, pip |
| **Testing** | pytest, coverage |

---

## Installation

```bash
# Development mode
pip install -e ".[dev]"

# Production
pip install -e brain-md
```

---

*Repository: experiments/brain-md*
