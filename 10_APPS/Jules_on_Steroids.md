# Jules on Steroids

> An unofficial, community-driven ecosystem that supercharges Google Jules AI with visual orchestration, IDE integration, and powerful developer tools.

## Overview

Jules on Steroids is an **unofficial, community-driven ecosystem** built on top of Google Jules, an AI-powered coding assistant developed by Google. While Google provides the core Jules API and CLI tool, this ecosystem creates a **developer-friendly layer** that enhances the experience with multiple interfaces and integrations.

## Key Features

| Tool | Purpose | Value Proposition |
|------|---------|-------------------|
| `@community/jules-sdk` | TypeScript SDK | Simplifies Jules API integration with full TypeScript support |
| `jules-vscode` | VS Code Extension | Bring Jules directly into your IDE with sidebar, commands, and status bar |
| `jules-control-center` | Desktop App | Visual session management with Kanban boards and real-time updates |
| `jules-mcp-server` | MCP Protocol Server | Enable AI-to-AI communication with Claude, Cursor, and other MCP clients |
| `jules-github-action-reporter` | GitHub Action | Automatically debug CI/CD failures with Jules |
| `jules-review-companion` | Browser Extension | Enhance GitHub PR reviews with "Fix with Jules" functionality |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | TypeScript 5.4+ |
| Runtime | Node.js 20+ |
| Package Manager | pnpm 8+ |
| SDK Build | tsup 8.0 |
| Desktop App | Tauri 2.0 + React 18.3 |
| Frontend Build | Vite 5.3 |
| Styling | Tailwind CSS 3.4 |
| State Management | Zustand 4.5 |
| Backend | Rust 1.75+ |
| VS Code | VS Code API 1.92 |

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           User Interface Layer                           │
├─────────────────────┬─────────────────────┬─────────────────────────────┤
│   VS Code Extension │  Control Center     │  Browser Extension          │
│   (VS Code API)     │  (Tauri + React)    │  (Chrome Extensions API)    │
└──────────┬──────────┴──────────┬──────────┴──────────────┬──────────────┘
           │                     │                          │
           └─────────────────────┼──────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         Application Layer                                │
├─────────────────────┬─────────────────────┬─────────────────────────────┤
│   jules-vscode      │  jules-control-     │  jules-mcp-server           │
│   (TypeScript)      │  center (React)     │  (TypeScript)               │
└──────────┬──────────┴──────────┬──────────┴──────────────┬──────────────┘
           │                     │                          │
           └─────────────────────┼──────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          SDK Layer (jules-sdk)                           │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Auth      │  │    HTTP     │  │  Streaming  │  │   Session   │     │
│  │  Provider   │  │   Client    │  │   Client    │  │  Management │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         External Services                                │
├─────────────────┬───────────────────┬───────────────────────────────────┤
│  Google Jules   │   GitHub API      │   MCP Clients                     │
│  API            │                   │   (Claude, Cursor)                │
└─────────────────┴───────────────────┴───────────────────────────────────┘
```

## Repository Structure

| Repository | Description | Status |
|------------|-------------|--------|
| `jules-sdk` | TypeScript SDK for Jules API with authentication, streaming, session management | Active |
| `jules-vscode` | VS Code extension with sidebar, commands, status bar integration | Active |
| `jules-control-center` | Cross-platform desktop app (Tauri + React) for visual session management | Active |
| `jules-mcp-server` | Model Context Protocol server for AI-to-AI communication | Planning |
| `jules-github-action-reporter` | GitHub Action for automated CI/CD failure investigation | Planning |
| `jules-review-companion` | Chrome extension for GitHub PR review enhancement | Planning |

## Core Principles

1. **Privacy First**: No telemetry, no analytics, no data collection. Everything stays local.
2. **Security by Design**: Credentials stored in OS keychains, HTTPS enforcement, no secrets in logs.
3. **Type Safety**: All TypeScript code uses strict mode with comprehensive type definitions.
4. **Open Source**: All code is open and auditable.
5. **Community Driven**: Features prioritized by community feedback and use cases.

## Quick Start

```bash
# Clone the repository
git clone git@github.com:DoozieSoftware/jules-on-steroids.git
cd jules-on-steroids

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Build all projects
pnpm run build

# Run tests
pnpm test
```

### SDK Usage

```typescript
import { JulesClient, ApiKeyProvider } from '@community/jules-sdk';

const client = new JulesClient({
  projectId: 'your-project-id',
  authProvider: new ApiKeyProvider('your-api-key'),
});

const session = await client.createSession({
  repo: 'github.com/user/repo',
  task: 'Add unit tests',
});
```

## Development

- **Coding Standards**: TypeScript Strict Mode, ESLint + Prettier, JSDoc comments
- **Test Coverage Target**: 80%
- **Branch Strategy**: `main` for releases, `develop` for integration, feature branches

## Roadmap

| Phase | Timeline | Goal |
|-------|----------|------|
| Phase 1: Foundation | Weeks 1-2 | Complete MVP functionality |
| Phase 2: Control Center | Weeks 3-4 | Build desktop app features |
| Phase 3: Ecosystem | Weeks 5-8 | Complete remaining projects |
| Phase 4: Polish & Release | Weeks 9-12 | Prepare for public release (v1.0) |

## Documentation Links

- README: `README.md`
- Onboarding: `ONBOARDING.md`
- Contributing: `CONTRIBUTING.md`
- Architecture: `ARCHITECTURE_VALIDATION.md`
- Deployment Security: `DEPLOYMENT_SECURITY.md`
- MVP PRD: `MVP_PRD.md`
- Roadmap: `MOSCOW_ODDBALL_ROADMAP.md`
- Gap Analysis: `GAP_ANALYSIS.md`

## Legal Disclaimer

> This is an **unofficial community project**. "Google Jules", the Jules logo, and the Jules API are trademarks or services of **Google LLC**. This organization and its repositories are **not affiliated with, endorsed by, or sponsored by Google**.
