# Dooz Copilot

> The flagship AI assistant for the Dooz ecosystem

---

## Overview

Dooz Copilot is an intelligent conversational interface that connects users to the Dooz Brain memory system, providing contextual assistance powered by MCP (Model Context Protocol) tools and Oracle confidence scoring.

```
┌──────────────────────────────────────────────────────────────┐
│                      DOOZ COPILOT                            │
├──────────────────────────────────────────────────────────────┤
│  🧠 Brain Integration    │  🔐 DIT Authentication            │
│  📊 Confidence Scoring   │  💬 Rich Chat Interface           │
│  🎨 DoozieSoft Design    │  🔧 MCP Tools                     │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Brain Integration** | Query and manage persistent memory via MCP tools |
| **DIT Authentication** | Decentralized Identity Token validation |
| **Confidence Scoring** | Oracle-powered response confidence display |
| **Rich Chat Interface** | Markdown rendering with tool call visualization |
| **DoozieSoft Design** | Consistent, accessible UI |

---

## Architecture

```
dooz-copilot/
├── src/
│   ├── api/           # MCP client & DIT validation
│   ├── components/    # React UI components
│   ├── hooks/         # Custom React hooks
│   ├── stores/        # Zustand state management
│   ├── styles/        # CSS using design tokens
│   └── types/         # TypeScript definitions
└── index.html
```

---

## MCP Tools

Dooz Copilot uses these Brain MCP tools:

| Tool | Description |
|------|-------------|
| `search_memory` | Query the Brain knowledge graph |
| `write_memory` | Store new OMO objects |
| `link_memory` | Create relationships between OMOs |
| `get_context` | Retrieve contextual information |

---

## Quick Start

```bash
npm install
npm run dev
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript |
| **State** | Zustand |
| **API** | MCP Protocol |
| **Auth** | DIT (Decentralized Identity Token) |
| **Styling** | DoozieSoft Design System |

---

## Related Documentation

- [Brain Integration](../09_ECOSYSTEM/Brain_Integration.md)
- [MCP Protocol](../09_ECOSYSTEM/API_Contracts.md)
- [Oracle Confidence Scoring](Dooz_Oracle.md)

---

*Repository: DoozHub/dooz-copilot*
