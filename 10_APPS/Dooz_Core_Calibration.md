# Dooz Core (Calibration Device Life Cycle Management)

> Multi-tenant SaaS platform for managing calibration device workflows, vendor management, and compliance.

---

## Overview

The Dooz Calibration Device Life Cycle Management System is a web and mobile application for manufacturing organizations to automate and manage the complete calibration workflow for precision devices.

```
┌──────────────────────────────────────────────────────────────┐
│                        DOOZ CORE                             │
├──────────────────────────────────────────────────────────────┤
│  📏 Device Management     │  🔄 Calibration Workflow         │
│  📅 Scheduling & Reminders│  🏢 Vendor Management            │
│  📜 Certificate Management│  📊 Reporting & Analytics        │
│  👥 Multi-Tenant SaaS     │  🔒 Role-Based Access            │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Device Master Management** | Create/manage device entries, models, serial numbers, calibration frequency |
| **Calibration Scheduling** | Auto calculate due dates, send reminders |
| **Due Tracking** | Track overdue devices, trigger escalations |
| **Vendor Management** | Vendor master, category mapping, recommendation engine |
| **Workflow Management** | Complete workflow from device send to certificate approval |
| **Certificate Management** | Upload, verify, approve calibration certificates |
| **Lead Time Planning** | Calculate send-out dates based on vendor lead times |
| **Reporting & Analytics** | Calibration status, vendor performance reports |

---

## Multi-Tenant Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   DOOZ CORE ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              SUPERADMIN (Platform)                   │    │
│  │  • Manages tenants                                   │    │
│  │  • Platform settings                                 │    │
│  │  • Subscription management                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐              │
│         ▼                  ▼                  ▼              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Tenant 1   │    │  Tenant 2   │    │  Tenant N   │     │
│  │  (Isolated) │    │  (Isolated) │    │  (Isolated) │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Structure

| Database | Purpose |
|----------|---------|
| **Core Database** | Manages tenants, users, apps, subscriptions, licenses |
| **Tenant Database** | Isolated data per tenant (users, departments, locations, etc.) |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | PHP, Laravel |
| **Frontend** | Livewire, Alpine.js |
| **Database** | MySQL |
| **Queue** | Redis (implied) |
| **Package Manager** | Composer, npm |

---

## Console Commands

| Command | Description |
|---------|-------------|
| `dooz:tenant:create "Name" --domain="..."` | Create new tenant |
| `dooz:create-user --email="..." --name="..." --tenant="..."` | Create user |
| `dooz:assign-seat --user="..." --app="..." --tenant="..."` | Assign seat |
| `dooz:list-tenants` | List all tenants |

---

## Documentation

| Document | Description |
|----------|-------------|
| `app-working-requirements.md` | Working requirements |
| `ALPINE_FIXES_SUMMARY.md` | Alpine.js fixes |
| `ALL_FIXES_SUMMARY.md` | All fixes summary |

---

*Repository: dooz-core*
