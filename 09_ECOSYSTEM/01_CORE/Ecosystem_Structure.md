# Dooz Ecosystem — Current Repository Map

> **Date**: 2026-04-07  
> **Purpose**: Categorize all repos in dooz-hub

---

## Categories

### 1. Laravel Packages (Inside dooz-core)

These are Composer packages that live in `dooz-core/packages/dooz/`:

| Package | Composer Name | Description | Status |
|---------|---------------|-------------|--------|
| `activity-tracker` | `dooz/activity-tracker` | Activity tracking | ✅ In composer.json |
| `app-template` | `dooz/app-template` | Package template | ⚪ Template |
| `boilerplate` | `dooz/boilerplate` | App boilerplate | ⚪ Template |
| `calibration` | `dooz/calibration` | Calibration tracking | ✅ In composer.json |
| `calibration-ops` | `dooz/calibration-ops` | Calibration operations | ✅ In composer.json |
| `core-contracts` | `dooz/core-contracts` | Shared interfaces | ✅ In composer.json |
| `dooz-accountant` | `dooz/accountant` | AU bookkeeping | ✅ In composer.json |
| `dooz-compliance` | `dooz/compliance` | Compliance management | ✅ In composer.json |
| `dooz-contracts` | `dooz/contracts` | Contract lifecycle | ✅ In composer.json |
| `dooz-iot` | `dooz/iot` | IoT package | ✅ In composer.json |
| `manual-test-app` | `dooz/manual-test-app` | Test app for boilerplate | ⚪ Not installed |
| `mini-suite` | `dooz/mini-suite` | Mini productivity | ✅ In composer.json |
| `quicky` | `dooz/quicky` | Task & time tracking | ✅ In composer.json |
| `renew` | `dooz/renew` | Subscription renewals | ✅ In composer.json |
| `sdk` | `dooz/sdk` | Developer SDK | ✅ In composer.json |
| `sync` | `dooz/sync` | Cross-tenant sync | ✅ In composer.json |
| `ui` | `dooz/ui` | UI components | ✅ In composer.json |
| `worklog` | `dooz/worklog` | Work logging | ✅ In composer.json |

> These packages live in `dooz-core/packages/dooz/` and are installed via Composer path repositories.

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
| `dooz-cartridges` | Public plugin registry |

### 7. This Repository

| Folder | Status |
|--------|--------|
| `dooz-atlas` | **This is dooz-atlas** - documentation & knowledge base |

---

## Summary

| Category | Count |
|----------|-------|
| Laravel Packages (inside dooz-core) | 16 |
| Standalone Web Apps | 3 |
| Desktop Apps | 6 |
| Mobile Apps | 1 |
| SDKs/Libraries | 5 |
| Infrastructure | 4 |
| **Total in root** | **22** |

---

*Last updated: 2026-04-07*
