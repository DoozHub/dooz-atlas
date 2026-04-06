# Dooz Ecosystem — Current Repository Map

> **Date**: 2026-04-07  
> **Purpose**: Categorize all repos in dooz-hub

---

## Categories

### 1. Laravel Packages (Inside dooz-core)

These are Composer packages that run **inside dooz-core** as dependencies:

| Package | Composer Name | Description |
|---------|---------------|-------------|
| `calibration-ops` | `dooz/calibration-ops` | Calibration operations |
| `core-contracts` | `dooz/core-contracts` | Shared interfaces |
| `quicky` | `dooz/quicky` | Task & time tracking |
| `renew` | `dooz/renew` | Subscription renewals |
| `sdk` | `dooz/sdk` | Developer SDK |
| `mini-suite` | `dooz/mini-suite` | Mini productivity |
| `sync` | `dooz/sync` | Cross-tenant sync |
| `ui` | `dooz/ui` | UI components |
| `worklog` | `dooz/worklog` | Work logging |
| `activity-tracker` | `dooz/activity-tracker` | Activity tracking |
| `calibration` | `dooz/calibration` | Calibration tracking |
| `dooz-accountant` | `dooz/accountant` | AU bookkeeping |
| `dooz-compliance` | `dooz/compliance` | Compliance management |
| `dooz-contracts` | `dooz/contracts` | Contract lifecycle |
| `dooz-iot` | `dooz/iot` | IoT package |

> These packages live in `dooz-core/packages/dooz/` but are maintained in separate repos for modular development.

---

### 2. Standalone Web Applications

These run independently with their own ports:

| App | Tech | Port | Description |
|-----|------|------|-------------|
| `dooz-core` | Laravel 12 | 8000* | Main platform (needs PHP/PostgreSQL) |
| `dooz-pm-suite` | Bun + Hono | 3000 | Project management |
| `dooz-perspective` | Bun + Hono | 3003 | Multi-LLM verification |
| `dooz-website-builder` | Next.js 15 | 3000* | AI website generation |

*Port conflict - needs resolution

---

### 3. Desktop Applications (Tauri)

Local-only, not forwarded via tunnel:

| App | Description |
|-----|-------------|
| `dooz-brain` | Local-first memory |
| `dooz-bridge` | CLI wrapper |
| `dooz-cowork` | Desktop AI operator |
| `dooz-hub` | Launcher dashboard |
| `dooz-yantra` | AI agent |
| `quicky_desktop` | Desktop productivity |

---

### 4. Mobile Applications

| App | Tech | Description |
|-----|------|-------------|
| `quicky_mobile` | Flutter | iOS/Android app |

---

### 5. SDKs & Libraries

| Project | Tech | Description |
|---------|------|-------------|
| `dooz-ai-router` | TypeScript | Multi-provider LLM routing |
| `dooz-auth` | Rust | Unified desktop auth |
| `dooz-bun-sdk` | TypeScript | SDK for Bun/Node |
| `dooz-intent-lang` | PHP | DIL transpiler |
| `dooz-veto` | Rust | Constraint engine |

---

### 6. Infrastructure & Templates

| Project | Description |
|---------|-------------|
| `app-registry` | Central app index |
| `app-template` | Laravel package template |
| `boilerplate` | App boilerplate |
| `manual-test-app` | Test app |
| `dooz-cartridges` | Public plugin registry |

---

### 7. Not Part of Ecosystem

These are external/legacy and should be removed:

| Folder | Status |
|--------|--------|
| `dooz-atlas` | **KEEP** - This repo is dooz-atlas |

---

## Summary

| Category | Count |
|----------|-------|
| Laravel Packages | 16 |
| Standalone Web Apps | 4 |
| Desktop Apps | 6 |
| Mobile Apps | 1 |
| SDKs/Libraries | 5 |
| Infrastructure | 5 |
| **Total** | **37** |

---

*Last updated: 2026-04-07*
