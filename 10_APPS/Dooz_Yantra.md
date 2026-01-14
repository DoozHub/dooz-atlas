# dooz-yantra

> Yet Another Neural Task Reasoning Agent - A modular AI agent framework

## Overview

YANTRA is a Rust-based AI agent framework designed for autonomous task execution with human-in-the-loop oversight. It powers the intelligent capabilities across the Dooz ecosystem.

## Architecture

```
┌────────────────────────────────────────────┐
│              YANTRA Core                   │
├────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Personas │  │  Actions │  │MCP Tools │ │
│  └──────────┘  └──────────┘  └──────────┘ │
├────────────────────────────────────────────┤
│           Execution Pipeline               │
├────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐ │
│  │      Computer Use Interface          │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

## Key Features

### 1. Multi-Persona Support
- Switch between specialized agent personas
- Context-aware personality adaptation
- Custom persona definitions via YAML

### 2. Computer Use
- Native screen capture and OCR
- Mouse/keyboard automation
- Browser automation via WebDriver
- File system operations

### 3. MCP Integration
- Implements Model Context Protocol
- Tool provider for AI assistants
- Resource exposure for context

### 4. Action Pipeline
- Declarative action definitions
- Retry with exponential backoff
- Rollback on failure
- Audit trail logging

## Status

| Component | Status |
|-----------|--------|
| Core Framework | ✅ Complete |
| Computer Use v1 | ✅ Complete |
| Persona System | ✅ Complete |
| MCP Server | 🟡 In Progress |
| Brain Integration | ✅ Complete |

## Integration Points

- **dooz-brain**: Yantra provides AI reasoning for Brain's cortex
- **dooz-hub**: Admin interface for agent configuration
- **dooz-cartridges**: Cartridges can define Yantra actions

## Tech Stack

- **Language**: Rust (core) + TypeScript (integrations)
- **Runtime**: Native binary (Tauri-compatible)
- **Dependencies**: tokio, serde, reqwest

---

*Repository: DoozHub/dooz-yantra*
