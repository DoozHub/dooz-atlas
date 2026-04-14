# desktop-bridge

> CLI tool wrapper with GUI - wraps interactive CLI tools in a graphical interface

## Overview

Dooz Bridge is a Tauri 2.0 + React desktop application that wraps interactive CLI tools (Aider, Ollama, Claude CLI, etc.) in a graphical interface. It spawns pseudo-terminals via Rust and uses grammar-based pattern matching to detect CLI states.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DESKTOP BRIDGE                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Aider     │  │   Ollama    │  │ Claude CLI  │         │
│  │   (CLI)     │  │   (CLI)     │  │   (CLI)     │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│  ┌──────┴────────────────┴────────────────┴──────┐         │
│  │            PTY Engine (Rust)                   │         │
│  │     Grammar-based pattern matching            │         │
│  └──────┬───────────────────────────────────────┘         │
│         │                                                  │
│  ┌──────▼──────┐                                          │
│  │    GUI      │  React + TypeScript UI                  │
│  │  (Tauri)    │                                          │
│  └─────────────┘                                          │
└─────────────────────────────────────────────────────────────┘
```

## Features

### CLI Wrapping
- Wraps Aider, Ollama, Claude CLI, and other CLI tools
- Pseudo-terminal spawning via Rust
- Grammar-based pattern matching for CLI state detection
- Terminal output capture and display

### GUI Interface
- React + TypeScript frontend
- Terminal emulation
- Command palette
- Session management

### Integration
- Works with desktop-hub as launcher tile
- Connects to dooz-core for context
- Brain MCP integration for context awareness

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript |
| **Backend** | Rust (Tauri) |
| **PTY** | Rust pseudo-terminal |
| **Pattern Matching** | Grammar-based state detection |

## Supported Tools

| Tool | Status |
|------|--------|
| Aider | ✅ Supported |
| Ollama | ✅ Supported |
| Claude CLI | ✅ Supported |

## Status

| Feature | Status |
|---------|--------|
| CLI Wrapping | ✅ Complete |
| Pattern Matching | ✅ Complete |
| GUI Interface | ✅ Complete |
| Multi-tool Support | 🟡 In Progress |

---

> **Naming Convention**: This app is part of the `desktop-*` tier (desktop applications).
> Repository: [DoozHub/desktop-bridge](https://github.com/DoozHub/desktop-bridge)
> Last Updated: 2026-04-14
