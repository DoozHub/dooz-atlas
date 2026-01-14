# KiloCore SDK (dooz_new)

> Platform-agnostic SDK that extracts agent logic from VS Code extensions, enabling AI agents to operate across different environments.

---

## Overview

A platform-agnostic SDK that extracts agent logic from VS Code extensions, enabling AI agents to operate across Node.js, WebContainers, VS Code, and other environments.

```
┌──────────────────────────────────────────────────────────────┐
│                       KILOCORE SDK                           │
├──────────────────────────────────────────────────────────────┤
│  🌐 Platform Agnostic    │  🔌 IHostEnvironment Interface    │
│  🤖 Agent Abstraction    │  📡 MCP Server Pattern            │
│  📦 Modular Architecture │  🔧 Easy Extension                │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Platform Agnostic** | Works across Node.js, WebContainers, VS Code |
| **Interface-Based Design** | Uses `IHostEnvironment` to abstract platform operations |
| **MCP Server Pattern** | All tools as Message Control Protocol servers |
| **Modular Architecture** | Easy to extend with new tools and environments |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    KILOCORE ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ NodeHostEnv  │    │WebContainer  │    │VSCodeHostEnv │  │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘  │
│         │                   │                   │          │
│         └───────────────────┼───────────────────┘          │
│                             ▼                              │
│                  ┌─────────────────────┐                   │
│                  │  IHostEnvironment   │                   │
│                  │    (Interface)      │                   │
│                  └──────────┬──────────┘                   │
│                             │                               │
│                             ▼                               │
│                  ┌─────────────────────┐                   │
│                  │       Agent         │                   │
│                  └──────────┬──────────┘                   │
│                             │                               │
│              ┌──────────────┼──────────────┐               │
│              ▼              ▼              ▼               │
│        ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│        │FileSystem│  │ Terminal │  │ Message  │          │
│        │   MCP    │  │   MCP    │  │   MCP    │          │
│        └──────────┘  └──────────┘  └──────────┘          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Components

### IHostEnvironment Interface

```typescript
interface IHostEnvironment {
  executeCommand(command: string): Promise<string>;
  showMessage(message: string): Promise<void>;
  createFile(path: string, content: string): Promise<void>;
  readFile(path: string): Promise<string>;
  listFiles(path: string): Promise<string[]>;
  createTerminal(): Promise<ITerminal>;
  createWebview(): Promise<IWebview>;
}
```

### Agent Class

The core agent using dependency injection:

```typescript
const hostEnvironment = new NodeHostEnvironment();
const agent = new Agent(hostEnvironment);
agent.registerToolServer("file_system", new FileSystemMCP(hostEnvironment));
```

### Host Environments

| Environment | Use Case |
|-------------|----------|
| `NodeHostEnvironment` | Node.js runtime |
| `WebContainerHostEnvironment` | WebContainer API |
| `VSCodeHostEnvironment` | VS Code extensions |

### MCP Servers

| Server | Purpose |
|--------|---------|
| `FileSystemMCP` | File operations |
| `TerminalMCP` | Terminal commands |
| `MessageMCP` | User messaging |
| `WebviewMCP` | Webview management |

---

## Documentation

| Document | Description |
|----------|-------------|
| `architecture-design.md` | Full architecture documentation |
| `README.md` | Installation and usage |

---

## Installation

```bash
npm install kilocore-sdk
```

---

*Repository: dooz_new*
