# Dooz Core

> The foundation platform powering the entire Dooz ecosystem

---

## Overview

Dooz Core is the multi-tenant SaaS platform that provides authentication, authorization, app marketplace, billing, and shared infrastructure for all Dooz applications.

```
┌─────────────────────────────────────────────────────────────┐
│                       DOOZ CORE                             │
├─────────────────────────────────────────────────────────────┤
│  🔐 Authentication    │  👥 User Management                 │
│  🏢 Multi-Tenancy     │  📦 App Marketplace                 │
│  💳 Billing           │  🔗 Webhooks                        │
│  🔄 Sync API          │  📊 Analytics                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Tenancy** | Complete tenant isolation with per-tenant databases optional |
| **OAuth 2.0** | Standard authentication with social login support |
| **Role-Based Access** | Granular permission system at tenant level |
| **App Marketplace** | Discover, install, and manage Dooz apps |
| **Subscription Billing** | Stripe-powered billing with metered usage |
| **Webhook System** | Event-driven notifications with retry logic |
| **Sync API** | E2E encrypted sync for local-first apps |

---

## Pricing Model

### Platform Fee Structure

| Component | Pricing |
|-----------|---------|
| **Base Platform** | Free (open source) |
| **Dooz Cloud Hosting** | $29/month base + usage |
| **Support Plans** | Community, Pro ($99/mo), Enterprise |

### Tenant Pricing (Per Organization)

| Tier | Users | Storage | Price |
|------|-------|---------|-------|
| **Free** | 3 | 1 GB | $0 |
| **Starter** | 10 | 10 GB | $19/mo |
| **Business** | 50 | 100 GB | $49/mo |
| **Enterprise** | Unlimited | Unlimited | Custom |

### API Rate Limits

| Tier | Requests/min | Webhooks/day |
|------|-------------|--------------|
| Free | 60 | 1,000 |
| Starter | 300 | 10,000 |
| Business | 1,000 | 100,000 |
| Enterprise | Unlimited | Unlimited |

---

## Licensing

### Open Source License

Dooz Core is licensed under **MIT License**:

- ✅ Free to use commercially
- ✅ Free to modify and distribute
- ✅ No attribution required (but appreciated)
- ✅ Self-hosting allowed

### Dooz Cloud License

For managed hosting on Dooz Cloud:

- Standard Terms of Service apply
- Data processed in region of choice
- 99.9% SLA for Business+ tiers
- Enterprise agreements available

---

## Roadmap

### Phase 1: Foundation ✅
- [x] Multi-tenant architecture
- [x] User authentication & authorization
- [x] Tenant management
- [x] Role-based permissions

### Phase 2: Marketplace ✅
- [x] App installation system
- [x] Permission management
- [x] App navigation registry
- [x] Settings framework

### Phase 3: Billing
- [ ] Stripe integration
- [ ] Subscription management
- [ ] Usage metering
- [ ] Invoice generation
- [ ] Tax handling

### Phase 4: Sync Platform
- [ ] Device registration
- [ ] Chunk-based sync
- [ ] E2E encryption
- [ ] Conflict resolution

### Phase 5: Analytics
- [ ] Usage dashboards
- [ ] App performance metrics
- [ ] Tenant insights
- [ ] Custom reports

### Phase 6: Enterprise
- [ ] SSO/SAML integration
- [ ] Audit logging
- [ ] Advanced compliance
- [ ] Custom domains
- [ ] White-labeling

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Laravel 11 |
| Database | MySQL/PostgreSQL |
| Cache | Redis |
| Queue | Redis/SQS |
| Search | Meilisearch |
| Storage | S3-compatible |

---

## Related Documentation

- [Architecture](../07_IMPLEMENTATION/ARCHITECTURE.md)
- [Multi-Tenancy](../07_IMPLEMENTATION/MULTI_TENANCY.md)
- [API Contracts](../07_IMPLEMENTATION/API_CONTRACTS.md)
- [Security](../07_IMPLEMENTATION/SECURITY.md)
