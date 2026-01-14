# DoozHub Ecosystem Overview

> Auto-generated documentation of all DoozHub organization repositories

## Repository Status Summary

| Category | Active | Total |
|----------|--------|-------|
| Core Platform | 4 | 4 |
| AI & Intelligence | 5 | 5 |
| Builder Tools | 2 | 2 |
| Productivity Apps | 6 | 6 |
| Client Apps | 2 | 2 |
| Infrastructure | 4 | 4 |
| **Total** | **23** | **23** |

---

## Core Platform

### dooz-core
**Language:** PHP | **Last Updated:** 2025-12-28

The heart of the Dooz ecosystem - a Laravel-based multi-tenant SaaS platform providing:
- Multi-tenancy with team/organization support
- User authentication and authorization
- Billing and subscription management
- API gateway for all Dooz services
- App marketplace integration

### dooz-hub
**Language:** TypeScript | **Last Updated:** 2025-12-19

Web-based dashboard and control center for:
- Managing tenants and organizations
- App installations and configurations
- User management and permissions
- Analytics and reporting
- System health monitoring

### core-contracts
**Language:** PHP | **Last Updated:** 2025-12-18

Shared interfaces and contracts for Dooz packages:
- Service provider contracts
- Repository interfaces
- Event definitions
- Data transfer objects

### ui
**Language:** Blade | **Last Updated:** 2025-12-23

Shared UI component library:
- Blade components for Laravel apps
- Consistent design system
- Form components and validation
- Layout templates

---

## AI & Intelligence

### dooz-brain (Local)
**Language:** Rust + TypeScript | **Status:** Active Development

Local-first organizational memory system:
- SQLite-based memory storage
- Hierarchical OMO (Organizational Memory Object) model
- AI-powered cortex for background thinking
- MCP server for AI assistant integration
- Decay engine for memory relevance

### dooz-yantra
**Language:** Rust | **Last Updated:** 2025-12-22

Modular AI agent framework (YANTRA = Yet Another Neural Task Reasoning Agent):
- Computer Use capabilities
- Multi-persona support
- Action execution pipelines
- MCP tool integration

### dooz_ballpark_ai
**Language:** PHP | **Last Updated:** 2025-12-10

AI-powered estimation and quoting tool:
- Project estimation from requirements
- Cost calculation engine
- Learning from historical data

### dooz-bridge
**Language:** TypeScript | **Last Updated:** 2025-12-17

Inter-app communication bridge:
- Event bus for Dooz ecosystem
- Cross-tenant message routing
- Webhook management
- Real-time sync coordination

### dooz-cartridges
**Language:** Various | **Last Updated:** 2025-12-09 | **Visibility:** Public

Pluggable feature modules for Dooz Brain:
- Weather, crypto, news cartridges
- AI-enhanced insights per cartridge
- Consistent cartridge manifest format

---

## Builder Tools

### dooz-website-builder
**Language:** TypeScript | **Last Updated:** 2025-12-24

AI-powered website generation platform:
- No-code website creation
- Component-based design
- AI content generation
- Export to static sites

### dooz-app-builder
**Language:** PHP | **Last Updated:** 2025-12-19

Low-code application builder for Dooz ecosystem:
- Visual workflow designer
- Database schema builder
- API endpoint generation
- App marketplace publishing

---

## Productivity Apps

### quicky
**Language:** Blade | **Last Updated:** 2025-12-24

Quick task and time tracking app:
- Pomodoro timer integration
- Task categorization
- Daily/weekly reports
- Calendar sync

### worklog
**Language:** Blade | **Last Updated:** 2025-12-24

Detailed work logging system:
- Time entry with notes
- Project-based tracking
- Billable hours calculation
- Export to invoicing

### calibration
**Language:** PHP | **Last Updated:** 2025-12-15

Equipment and process calibration tracking:
- Calibration schedules
- Compliance reporting
- Certificate management

### calibration-ops
**Language:** Blade | **Last Updated:** 2025-12-16

Operational dashboard for calibration management:
- Real-time calibration status
- Technician assignments
- Audit trails

### activity-tracker
**Language:** PHP | **Last Updated:** 2025-12-15

User activity monitoring:
- Session tracking
- Feature usage analytics
- Audit logging

### mini-suite
**Language:** PHP | **Last Updated:** 2025-12-15

Lightweight productivity bundle:
- Notes, tasks, contacts
- All-in-one starter package

---

## Client Apps

### quicky_desktop
**Language:** TypeScript (Tauri) | **Last Updated:** 2025-12-23

Native desktop client for Quicky:
- System tray integration
- Global hotkeys
- Offline support
- Background sync

### quicky_mobile
**Language:** Dart (Flutter) | **Last Updated:** 2025-12-22

Mobile app for Quicky:
- iOS and Android support
- Push notifications
- Widget support
- Biometric authentication

---

## Infrastructure

### app-registry
**Last Updated:** 2025-12-24

Central registry for Dooz marketplace:
- App metadata and manifests
- Version tracking
- Auto-synced from builds

### boilerplate
**Language:** PHP | **Last Updated:** 2025-12-15

Starter template for new Dooz apps:
- Standard app structure
- Pre-configured dependencies
- Best practice implementations

### manual-test-app
**Language:** PHP | **Last Updated:** 2025-12-15

Testing sandbox:
- Manual QA testing
- Feature verification
- Edge case simulation

### .github / .github-private
GitHub organization configuration:
- Issue/PR templates
- Workflow definitions
- Organization settings

---

## Development Status Legend

| Status | Description |
|--------|-------------|
| 🟢 Active | Regular commits in last 7 days |
| 🟡 Maintained | Updated within last 30 days |
| 🔵 Stable | Mature, occasional updates |
| ⚪ Planning | In design phase |

---

## Integration Map

```
                    ┌─────────────────┐
                    │   dooz-core     │
                    │   (Platform)    │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼────┐        ┌─────▼─────┐      ┌─────▼─────┐
    │dooz-hub │        │ dooz-brain│      │  Apps     │
    │(Web UI) │        │ (Memory)  │      │(quicky,   │
    └─────────┘        └─────┬─────┘      │ worklog)  │
                             │            └─────┬─────┘
                      ┌──────▼──────┐           │
                      │dooz-yantra  │           │
                      │(AI Agent)   │           │
                      └──────┬──────┘           │
                             │                  │
         ┌───────────────────┼──────────────────┘
         │                   │
    ┌────▼────┐        ┌─────▼─────┐
    │quicky   │        │  Mobile   │
    │_desktop │        │  Apps     │
    └─────────┘        └───────────┘
```

---

*Last updated: 2025-12-28*
