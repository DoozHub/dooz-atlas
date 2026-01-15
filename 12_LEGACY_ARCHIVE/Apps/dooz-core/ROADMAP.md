# Dooz Core - Roadmap

> Development phases and feature planning

---

## Overview

Dooz Core is the foundation platform. This roadmap focuses on stability, scalability, and developer experience.

---

## Phase 1: Foundation ✅

**Status:** Complete

### Completed Features
- [x] Multi-tenant architecture with full isolation
- [x] User authentication (email/password, OAuth)
- [x] Role-based access control (RBAC)
- [x] Tenant management and configuration
- [x] Core API structure and routing
- [x] Database migrations and seeders
- [x] Basic error handling and logging

### Outcomes
- Tenants can be created and managed
- Users can register, login, and be assigned roles
- Permissions are enforced at route and resource level

---

## Phase 2: App Ecosystem ✅

**Status:** Complete

### Completed Features
- [x] App manifest system
- [x] App installation and uninstallation
- [x] Permission delegation to apps
- [x] Navigation registry for app menus
- [x] Settings framework per app
- [x] App-level event system

### Outcomes
- Apps can be installed from marketplace
- Apps get isolated permissions
- Apps integrate into platform navigation

---

## Phase 3: Billing & Subscriptions 🔄

**Status:** In Progress

### Features
- [ ] Stripe Connect integration
- [ ] Subscription plan management
- [ ] Usage-based metering
- [ ] Invoice generation
- [ ] Payment method management
- [ ] Tax calculation (Stripe Tax)
- [ ] Dunning management
- [ ] Subscription lifecycle events

### Dependencies
- Stripe account setup
- Webhook endpoint configuration
- Plan/pricing definition

---

## Phase 4: Sync Platform

**Status:** Planned

### Features
- [ ] Device registration API
- [ ] Chunk-based sync protocol
- [ ] E2E encryption integration
- [ ] Storage backend abstraction
- [ ] User-provided storage support
- [ ] Bandwidth metering
- [ ] Sync analytics

### Dependencies
- dooz-sync package completion
- SDK for client apps

---

## Phase 5: Analytics & Insights

**Status:** Planned

### Features
- [ ] Platform usage dashboard
- [ ] Tenant analytics
- [ ] App performance metrics
- [ ] Custom report builder
- [ ] Export capabilities
- [ ] Alerting system
- [ ] Revenue analytics

### Dependencies
- Data warehouse setup
- BI tool integration

---

## Phase 6: Enterprise Features

**Status:** Planned

### Features
- [ ] SAML/SSO integration
- [ ] Advanced audit logging
- [ ] Compliance reporting (SOC 2, GDPR)
- [ ] Custom domains per tenant
- [ ] White-labeling options
- [ ] SLA management
- [ ] Dedicated infrastructure option

### Dependencies
- Enterprise customer requirements
- Compliance certifications

---

## Phase 7: Developer Platform

**Status:** Planned

### Features
- [ ] Public API documentation portal
- [ ] Developer console
- [ ] API key management
- [ ] Webhook configuration UI
- [ ] SDK generation (OpenAPI)
- [ ] Sandbox environments
- [ ] Rate limit management

### Dependencies
- OpenAPI spec completion
- Developer portal design

---

## Phase 8: Scale & Performance

**Status:** Planned

### Features
- [ ] Horizontal scaling support
- [ ] Read replica configuration
- [ ] CDN integration
- [ ] Edge caching
- [ ] Database sharding strategy
- [ ] Queue optimization
- [ ] Load testing suite

### Dependencies
- Traffic growth projections
- Infrastructure budget

---

## Technical Debt Backlog

### Priority 1 (High)
- [ ] Improve test coverage to 80%
- [ ] Add API versioning
- [ ] Implement request tracing
- [ ] Optimize N+1 queries

### Priority 2 (Medium)
- [ ] Refactor permission caching
- [ ] Improve error messages
- [ ] Add rate limiting headers
- [ ] Database query optimization

### Priority 3 (Low)
- [ ] Code documentation
- [ ] Improve logging format
- [ ] Clean up deprecated code
- [ ] Optimize container images

---

## Success Metrics

| Metric | Target |
|--------|--------|
| API Latency (p95) | < 100ms |
| Error Rate | < 0.1% |
| Uptime | 99.9% |
| Test Coverage | > 80% |
| Security Scan | No critical issues |

---

## Notes

- Timelines are intentionally omitted to allow flexibility
- Phases may overlap based on resource availability
- Customer feedback may reprioritize features
- Security and stability always take precedence
