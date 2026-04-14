# ADR-002: Desktop Technology Choice

## Status
**Accepted** — Implemented across dooz-hub, dooz-brain, dooz-pilot

## Context

Several DOOZ applications (Hub, Brain, Pilot) require desktop deployment for system integration, offline capability, and native OS features.

### Requirements

- Cross-platform (Windows, macOS, Linux)
- Native system access (files, notifications, tray)
- Small bundle size for easy distribution
- Modern web frontend stack (React/TypeScript)
- Auto-update capability

### Options Considered

1. **Electron** (Most Popular)
   - Node.js + Chromium
   - Large ecosystem
   - Heavy bundle size (~100-200MB)

2. **Tauri** (Selected)
   - Rust backend + WebView frontend
   - Small bundle size (~3-5MB)
   - Growing ecosystem

3. **Flutter Desktop**
   - Dart framework
   - Custom UI, not web-based
   - Learning curve for web developers

4. **Native (Swift/C#)**
   - Platform-specific builds
   - Maximum performance
   - High development cost

## Decision

We chose **Tauri 2.0** for all desktop applications.

### Rationale

- **Bundle Size** — ~5MB vs ~150MB for Electron
- **Security** — Rust memory safety, minimal attack surface
- **Performance** — Native Rust backend, OS WebView frontend
- **Web Stack** — Keep React/TypeScript skills
- **Native APIs** — Full OS integration via Rust

## Consequences

### Positive

✅ **Distribution**: Small downloads, fast updates
✅ **Security**: Rust eliminates memory safety bugs
✅ **Resource Usage**: Low memory and CPU footprint
✅ **Development**: Single codebase for web + desktop
✅ **Community**: Growing ecosystem and documentation

### Negative

❌ **Rust Learning Curve**: Team needed to learn Rust
❌ **Ecosystem Maturity**: Smaller than Electron
❌ **WebView Variability**: Different engines per OS
❌ **Build Complexity**: Rust toolchain requirements

## Implementation

### Architecture

```
Tauri Desktop App
├── Frontend (React + TypeScript)
│   ├── UI Components
│   ├── State Management (Zustand)
│   └── API Calls
├── Backend (Rust)
│   ├── Commands (expose to frontend)
│   ├── Native OS APIs
│   └── Local Database (SQLite)
└── Tauri Runtime
    ├── WebView
    └── IPC Bridge
```

### Example Command

```rust
// src-tauri/src/main.rs
#[tauri::command]
async fn launch_app(app_path: String) -> Result<String, String> {
    std::process::Command::new(app_path)
        .spawn()
        .map_err(|e| e.to_string())?;
    Ok("Launched".to_string())
}
```

```typescript
// Frontend usage
import { invoke } from '@tauri-apps/api/core';

await invoke('launch_app', { appPath: '/Applications/Code.app' });
```

## Applications Using Tauri

| Application | Purpose | Bundle Size |
|-------------|---------|-------------|
| dooz-hub | Desktop launcher | ~4MB |
| dooz-brain | Knowledge management | ~5MB |
| dooz-pilot | CLI orchestrator | ~6MB |

## Performance Comparison

| Metric | Electron | Tauri |
|--------|----------|-------|
| Bundle Size | 150MB | 5MB |
| Memory Usage | 300MB | 80MB |
| Cold Start | 3s | 1s |
| Auto-update | Yes | Yes |

## Migration Path

Existing applications were refactored:

1. Extracted React frontend from web apps
2. Created Tauri shell around frontend
3. Implemented Rust commands for native features
4. Added auto-updater
5. Signed binaries for distribution

## Related Decisions

- ADR-001: Multi-Tenancy Strategy
- ADR-003: Runtime Selection (Bun)

## References

- [Tauri Documentation](https://tauri.app/)
- [Tauri vs Electron Comparison](https://tauri.app/about/)
- dooz-hub: `src-tauri/src/main.rs`

---

**Date:** 2025-01  
**Author:** Desktop Team  
**Review Date:** 2026-01
