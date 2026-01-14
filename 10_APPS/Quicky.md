# Quicky Suite

> Quick task and time tracking across all platforms

## Suite Components

| App | Platform | Language | Status |
|-----|----------|----------|--------|
| quicky (backend) | Server | PHP/Blade | ✅ Active |
| quicky_desktop | macOS/Windows/Linux | TypeScript/Tauri | ✅ Active |
| quicky_mobile | iOS/Android | Dart/Flutter | ✅ Active |

## Overview

Quicky is a fast, focused productivity tool for tracking tasks and time. Available on web, desktop, and mobile with real-time sync.

## Features

### Core Features (All Platforms)
- Quick task capture
- Pomodoro timer
- Time tracking
- Daily/weekly reports
- Calendar integration

### Desktop Exclusive
- System tray quick entry
- Global hotkeys (Cmd/Ctrl+Shift+Q)
- Menu bar timer
- Focus mode with notifications

### Mobile Exclusive
- Widgets for quick entry
- Haptic feedback
- Biometric lock
- Push notifications

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    dooz-core                        │
│                  (Backend API)                       │
└─────────────────────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
    ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
    │  quicky   │  │  quicky   │  │  quicky   │
    │  (web)    │  │  _desktop │  │  _mobile  │
    └───────────┘  └───────────┘  └───────────┘
```

## Sync Strategy

- **Online**: Real-time sync via dooz-bridge
- **Offline**: Local SQLite, sync on reconnect
- **Conflict**: Last-write-wins with version vectors

---

*Repositories: DoozHub/quicky, DoozHub/quicky_desktop, DoozHub/quicky_mobile*
