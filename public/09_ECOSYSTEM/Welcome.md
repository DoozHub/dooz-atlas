# Welcome to the Dooz Ecosystem

> The complete documentation for building on the Dooz platform

---

## What is Dooz?

**Dooz** is a modular SaaS platform for building and deploying business applications at scale. Think of it as an operating system for your business tools - each app is independent yet seamlessly integrated.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         THE DOOZ ECOSYSTEM                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│   │ dooz-brain  │  │  dooz-hub   │  │ dooz-pilot  │  │  your-app   │   │
│   │   (AI PKB)  │  │  (Media)    │  │ (Workflows) │  │   (...)     │   │
│   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │
│          │                │                │                │          │
│          └────────────────┴────────────────┴────────────────┘          │
│                                    │                                    │
│                           ┌────────▼────────┐                          │
│                           │   DOOZ CORE     │                          │
│                           │  - Multi-tenant │                          │
│                           │  - Auth & SSO   │                          │
│                           │  - Marketplace  │                          │
│                           │  - Billing      │                          │
│                           │  - Sync API     │                          │
│                           └─────────────────┘                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Core Principles

| Principle | Description |
|-----------|-------------|
| 🏢 **Tenant-First** | Organizations own their data and users |
| 📦 **Modular** | Apps are independent, composable packages |
| 🔐 **Secure** | Per-tenant isolation, role-based access |
| ⚡ **Fast** | Redis caching, <100ms API responses |
| 🌐 **Open** | Standard APIs, exportable data, no lock-in |

---

## Documentation Sections

### 🚀 Getting Started
- [Quick Start](QUICKSTART.md) - Get running in 5 minutes
- [Developer Guide](DEVELOPER_GUIDE.md) - Comprehensive developer reference
- [Architecture](ARCHITECTURE.md) - System design overview

### 🏗️ Building Apps
- [Developing Apps](DEVELOPING_APPS.md) - Create your own Dooz app
- [Core Contracts](../dooz-core/packages/dooz/core-contracts/) - Shared interfaces
- [SDK Guide](../dooz-core/packages/dooz/sdk/) - Developer SDK

### 🔄 Sync & Offline
- [Dooz Sync PRD](DOOZ_SYNC_PRD.md) - Sync product spec
- [Sync Integration](DOOZ_SYNC_INTEGRATION.md) - Client SDK integration
- [Client App Guide](CLIENT_APP_GUIDE.md) - Desktop/mobile apps

### 🔧 Technical Reference
- [API Contracts](API_CONTRACTS.md) - REST API specifications
- [Data Model](DATA_MODEL.md) - Database schemas
- [Multi-Tenancy](MULTI_TENANCY.md) - Tenant isolation
- [Security](SECURITY.md) - Security practices

### 📚 Guidelines
- [Coding Standards](CODING_STANDARDS.md) - Code style
- [Testing Guide](TESTING_GUIDE.md) - Test patterns
- [Migrations Guide](MIGRATIONS_GUIDE.md) - Database migrations
- [Webhook Patterns](WEBHOOK_PATTERNS.md) - Event handling

---

## The Dooz Ethos

> **"Build once, deploy everywhere, own your data."**

We believe in:

1. **Developer Happiness** - Clear documentation, consistent APIs, tools that get out of your way
2. **Business Flexibility** - Pay only for what you use, mix and match apps
3. **Technical Excellence** - Sub-100ms responses, 99.9% uptime, comprehensive testing

---

## Key Components

### Dooz Core
The platform foundation providing:
- Multi-tenant architecture
- User authentication & authorization
- App marketplace
- Subscription billing
- Sync API for local-first apps

### Dooz Apps
Independent packages that plug into Core:
- **dooz-brain** - AI-powered personal knowledge base
- **dooz-hub** - Media management system
- **dooz-pilot** - Workflow automation
- **dooz-sync** - E2E encrypted sync service

### Dooz Bridge
Cross-platform client SDK for:
- Desktop apps (Tauri)
- Mobile apps (Flutter)
- Web apps (React/Vue)

---

## Getting Help

| Resource | Link |
|----------|------|
| 📖 Documentation | You're here! |
| 🐛 Issues | [GitHub Issues](https://github.com/DoozHub/dooz-core/issues) |
| 💬 Community | Slack #dooz-dev |
| 📧 Email | dev@dooz.app |

---

*Welcome to the ecosystem. Let's build something great!* 🚀
