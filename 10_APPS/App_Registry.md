# App Registry

> Central registry of all applications in the Dooz ecosystem

---

## Overview

The App Registry provides a centralized index of all applications in the Dooz ecosystem, enabling discovery, documentation, and automation tooling.

```
┌──────────────────────────────────────────────────────────────┐
│ APP REGISTRY (infra-registry)                                │
├──────────────────────────────────────────────────────────────┤
│ 📋 Application Index        │ 🔍 Discovery                  │
│ 📊 Metadata                 │ 🔄 Auto-Sync                  │
│ 🤖 AI Agent Context         │ 📦 Integration Ready          │
└──────────────────────────────────────────────────────────────┘
```

---

## Naming Convention

All DoozHub repositories follow a strict naming convention:

| Prefix | Tier | Description | Examples |
|--------|------|-------------|----------|
| `app-*` | Marketplace | Tenant-installable Laravel packages | app-todo, app-worklog |
| `desktop-*` | Desktop | Tauri desktop applications | desktop-brain, desktop-hub |
| `mobile-*` | Mobile | Flutter mobile applications | mobile-quicky |
| `cloud-*` | Cloud | Cloud-hosted microservices | cloud-perspective, cloud-pm-suite |
| `lib-*` | Library | Reusable libraries/SDKs | lib-ai-router |
| `infra-*` | Infrastructure | Dev tools, registries, templates | infra-registry, infra-app-template |
| `dooz-*` | Core/Governance | Core platform & governance | dooz-core, dooz-veto |

---

## Structure

```
registry.json     # Application index with metadata
BRAIN.md          # AI agent context
```

---

## Schema

```json
{
  "version": "4.0.0",
  "updated_at": "2026-04-14",
  "ecosystem": "Dooz",
  "organization": "DoozHub",
  "naming_convention": {
    "app-*": "Marketplace Laravel packages",
    "desktop-*": "Tauri desktop applications",
    "mobile-*": "Flutter mobile applications",
    "cloud-*": "Cloud-hosted microservices",
    "lib-*": "Reusable libraries and SDKs",
    "infra-*": "Infrastructure and dev tools",
    "dooz-*": "Core platform and governance"
  },
  "apps": [
    {
      "name": "dooz-core",
      "version": "1.0.0",
      "description": "Multi-tenant SaaS platform",
      "repo": "DoozHub/dooz-core",
      "tier": "core",
      "stack": "PHP/Laravel",
      "license": "MIT",
      "category": "platform"
    }
  ]
}
```

---

## Registered Applications by Tier

### Core Platform (`dooz-*`)
| App | Status | Description |
|-----|--------|-------------|
| dooz-core | ✅ active | Multi-tenant SaaS platform (Laravel 12) |
| dooz-atlas | ✅ active | Complete ecosystem documentation |
| dooz-veto | ✅ active | Constraint engine (Rust) |
| dooz-code | ✅ active | Autonomous code executor |
| doz-intent-lang | ✅ active | DIL transpiler |
| dooz-orchestrator | ✅ active | Agent orchestration pipeline |
| dooz-auth | 🟡 dev | Shared Tauri auth module |
| dooz-cartridges | 🟡 dev | Plugin registry |

### Desktop Applications (`desktop-*`)
| App | Status | Description |
|-----|--------|-------------|
| desktop-brain | ✅ active | AI-powered knowledge base (Tauri) |
| desktop-hub | ✅ active | Personal launcher dashboard |
| desktop-bridge | ✅ active | CLI tool wrapper GUI |
| desktop-cowork | ✅ active | AI coworker agent |
| desktop-copilot | ✅ active | Chat interface for Brain |
| desktop-hindsight | ✅ active | Decision tracking & calibration |
| desktop-yantra | 🟡 beta | Desktop-native AI agent |
| desktop-quicky | 🟡 beta | Quicky desktop client |

### Mobile Applications (`mobile-*`)
| App | Status | Description |
|-----|--------|-------------|
| mobile-quicky | ✅ active | Quicky mobile client (Flutter) |

### Cloud Services (`cloud-*`)
| App | Status | Description |
|-----|--------|-------------|
| cloud-pm-suite | ✅ active | Project management (Bun/Hono) |
| cloud-perspective | ✅ active | Doc verification (Bun/Hono) |
| cloud-ai-platform | ✅ active | Agentic SDLC platform |
| cloud-app-builder | 🟡 beta | AI app builder |
| cloud-website-builder | 🟡 beta | Website generator |

### Marketplace Apps (`app-*`)
| App | Status | Description |
|-----|--------|-------------|
| app-todo | ✅ active | Task management |
| app-worklog | ✅ active | Time tracking & invoicing |
| app-notes | ✅ active | Note-taking |
| app-quicky | ✅ active | Task relay system |
| app-renew | ✅ active | Renewal management |
| app-calibration | ✅ active | Calibration management |
| app-activity-tracker | ✅ active | Activity tracking |
| app-accountant | 🟡 beta | Bookkeeping |
| app-compliance | 🟡 beta | Compliance management |
| app-contracts | 🟡 beta | Contract management |
| app-mini-suite | 🟡 beta | Productivity bundle |
| app-ui | ✅ active | Shared UI components |

### Libraries (`lib-*`)
| App | Status | Description |
|-----|--------|-------------|
| lib-ai-router | ✅ active | Multi-provider LLM routing |
| lib-bun-sdk | ✅ active | TypeScript/Bun SDK |

### Infrastructure (`infra-*`)
| App | Status | Description |
|-----|--------|-------------|
| infra-registry | ✅ active | Central app registry |
| infra-app-template | ✅ active | App boilerplate |
| infra-test-app | ✅ active | QA test app |
| infra-template | 🟡 dev | Template package |

---

## Usage

This registry is consumed by:
- **Dooz Ecosystem documentation** — Automated docs generation
- **AI agents** — Context for understanding the ecosystem
- **Automation tooling** — CI/CD and deployment pipelines
- **App Marketplace** — Discovery and installation
- **GitHub Actions** — Auto-sync to marketplace

---

## Auto-Sync

The registry auto-syncs from `dooz-core`:

```
dooz-core packages → CI/CD → infra-registry → Webhook → Marketplace
```

See: [SyncMarketplaceCommand](../../../dooz-core/app/Console/Commands/SyncMarketplaceCommand.php)

---

## Contributing

1. Create your app following the [boilerplate](../../../boilerplate)
2. Update `registry.json` with your app metadata
3. Submit PR to [DoozHub/infra-registry](https://github.com/DoozHub/infra-registry)
4. CI/CD will auto-sync to dooz-core marketplace

---

## Related Documentation

- [Component Catalog](../09_ECOSYSTEM/01_CORE/Component_Catalog.md)
- [Developer Guide](../09_ECOSYSTEM/02_DEVELOPMENT/Developer_Guide.md)
- [Ecosystem Structure](../../../dooz-ecosystem/ECOSYSTEM_STRUCTURE.md)

---

> **Repository**: [DoozHub/infra-registry](https://github.com/DoozHub/infra-registry)  
> **Version**: 4.0.0  
> **Last Updated**: 2026-04-14
