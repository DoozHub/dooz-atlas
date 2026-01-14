# Clippy's Revenge

> A desktop-native AI agent that resurrects the iconic Microsoft Office Assistant as a proactive, agentic coding companion.

---

## Overview

Clippy's Revenge reimagines the classic Microsoft Office Assistant as a modern, agentic AI coding companion using the Model Context Protocol (MCP).

```
┌──────────────────────────────────────────────────────────────┐
│                    CLIPPYS REVENGE                           │
├──────────────────────────────────────────────────────────────┤
│  📎 Always-On-Top       │  🤖 MCP Integration                │
│  💬 Proactive Chat      │  🧠 Personality Modes              │
│  🔌 VS Code Extension   │  🛡️ Safety Controls               │
│  💻 Desktop Overlay     │  🎯 Build Error Detection          │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Always-on-top overlay** | Transparent, frameless Clippy floating on desktop |
| **Proactive interventions** | Detects build failures and linter errors |
| **MCP integration** | Read/write files, execute commands securely |
| **Personality modes** | Intern, Passive-Aggressive, Doomsday modes |
| **VS Code extension** | Monitors terminal output and diagnostics |
| **Safety controls** | Requires approval before destructive actions |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Desktop** | Electron, Tauri (maybe) |
| **Frontend** | React |
| **AI** | Anthropic Claude (via MCP) |
| **Protocol** | Model Context Protocol (MCP) |
| **IDE Integration** | VS Code Extension |
| **Database** | SQLite |

---

## Architecture

```
clippy_revenge/
├── src/
│   ├── main/           # Electron main process
│   │   ├── animation/  # Animation state management
│   │   ├── chat/       # Chat service and message store
│   │   ├── intervention/ # Proactive intervention logic
│   │   ├── ipc/        # IPC handlers
│   │   ├── kiro/       # Kiro hook system (WebSocket server)
│   │   ├── llm/        # LLM client (Anthropic)
│   │   ├── mcp/        # MCP client manager
│   │   ├── persistence/ # SQLite database layer
│   │   ├── personality/ # Personality engine
│   │   ├── safety/     # Safety controls
│   │   └── window/     # Window manager
│   ├── renderer/       # React frontend
│   └── shared/         # Shared types
├── vscode-extension/   # VS Code extension for event detection
└── tests/              # Test suites
```

---

## Documentation

| Document | Description |
|----------|-------------|
| `README.md` | Project overview and features |
| `CLIPPY_DOCUMENTATION.md` | Comprehensive documentation |
| `DEVELOPMENT.md` | Development guide |
| `ROADMAP.md` | Future plans |
| `KIROWEEN_SUBMISSION.md` | Kiroween hackathon submission |

---

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- VS Code (for extension)

---

*Repository: clippy_revenge*
