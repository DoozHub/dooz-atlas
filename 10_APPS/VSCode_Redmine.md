# VS Code Redmine

> Integrate Redmine project management directly into VS Code

---

## Overview

A VS Code extension that brings Redmine project management capabilities directly into the editor, allowing developers to manage issues, track time, and view project status without leaving VS Code.

```
┌──────────────────────────────────────────────────────────────┐
│                    VS CODE REDMINE                           │
├──────────────────────────────────────────────────────────────┤
│  📋 Issue Management     │  ⏱️ Time Tracking                  │
│  🔗 Redmine Integration  │  📊 Project Status                 │
│  👁️ VS Code Native      │  🔄 Real-time Sync                 │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Issue Management** | Create, view, update Redmine issues |
| **Time Tracking** | Log time against issues |
| **Project Integration** | View project status and updates |
| **API Integration** | Connect to Redmine servers |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Extension** | TypeScript, VS Code API |
| **Build** | VS Code extension tools |
| **Testing** | Vitest |

---

## Configuration

| Setting | Description |
|---------|-------------|
| `redmine.serverUrl` | Redmine server URL |
| `redmine.apiKey` | API key for authentication |

---

## Project Structure

```
vscode-redmine/
├── src/              # TypeScript extension code
├── resources/        # Extension resources
├── out/              # Compiled output
├── package.json      # Extension configuration
└── redmine-vscode-*.vsix  # Built extension
```

---

*Repository: vscode-redmine*
