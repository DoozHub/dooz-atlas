# App Registry

> Central registry of all applications in the Doozie ecosystem

---

## Overview

The App Registry provides a centralized index of all applications in the Doozie ecosystem, enabling discovery, documentation, and automation tooling.

```
┌──────────────────────────────────────────────────────────────┐
│                      APP REGISTRY                            │
├──────────────────────────────────────────────────────────────┤
│  📋 Application Index    │  🔍 Discovery                      │
│  📊 Metadata             │  🔄 Auto-Sync                      │
│  🤖 AI Agent Context     │  📦 Integration Ready              │
└──────────────────────────────────────────────────────────────┘
```

---

## Structure

```
registry.json    # Application index with metadata
BRAIN.md         # AI agent context
```

---

## Schema

```json
{
  "apps": [
    {
      "name": "app-name",
      "description": "Short description",
      "type": "web|desktop|mobile|library",
      "repo": "github-url",
      "stack": ["tech1", "tech2"],
      "status": "active|beta|deprecated",
      "documentation": "path/to/docs"
    }
  ]
}
```

---

## Usage

This registry is consumed by:
- **Dooz Ecosystem documentation** — Automated documentation generation
- **AI agents** — Context for understanding the ecosystem
- **Automation tooling** — CI/CD and deployment pipelines
- **App Marketplace** — Discovery and installation

---

## Contributing

1. Add your app to `registry.json`
2. Include required metadata
3. Submit PR

---

## Registered Applications

| App | Type | Status | Description |
|-----|------|--------|-------------|
| dooz-core | platform | active | Multi-tenant SaaS platform |
| dooz-brain | desktop | active | AI-powered knowledge base |
| dooz-copilot | web | active | AI assistant interface |
| dooz-hub | desktop | active | Media management |
| dooz-pilot | desktop | active | Workflow automation |
| dooz-sync | library | active | E2E encrypted sync |
| dooz-bridge | service | active | Event-driven communication |
| And more... | | | See registry.json for full list |

---

## Related Documentation

- [Ecosystem Overview](../09_ECOSYSTEM/Overview.md)
- [Developer Guide](../09_ECOSYSTEM/Developer_Guide.md)
- [Coding Standards](../09_ECOSYSTEM/Coding_Standards.md)

---

*Repository: DoozHub/app-registry*
