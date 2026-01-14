# Dooz Infrastructure Setup Journey

**Date:** January 6, 2026  
**Server:** 192.168.0.100  
**Domain:** *.dooz.dsshub.in

---

## Summary

Today we enhanced two documentation viewers and set up core infrastructure for DoozieSoft's dogfooding environment.

---

## 1. Dooz Atlas Viewer Enhancements

### What We Did
- Moved `viewer/` to repository root level
- Created symlinks in `public/` for markdown files
- Added **Neo-Analog design** with light/dark theme toggle
- Implemented **full-text search** with highlighting
- Fixed **markdown hyperlinks** to navigate within viewer (not raw .md files)
- Added Google Fonts (Inter, JetBrains Mono)

### Model Documentation Updates
- Updated `Model_Routing_Policy.md` to v2.0 (January 2026 models)
- Updated `Model_Catalog.md` with GPT-4.5, Claude Opus 4.5, Gemini 2.0 family
- Converted all costs from **USD ($) to INR (₹)** at 90x rate
- Reduced per-engineer budgets (500K→300K soft, 2M→1M hard)

### Repository
- **GitHub:** [DoozHub/dooz-atlas](https://github.com/DoozHub/dooz-atlas)
- **Viewer:** http://localhost:5174/

---

## 2. Dooz Ecosystem Viewer Enhancements

### What We Did
- Moved `docs-viewer/` to repository root level
- Applied same enhancements: theme toggle, search, link handling
- Added `dooz-deploy.md` to Operations section

### Operations Docs Updated
| Document | Changes |
|----------|---------|
| `DEPLOYMENT.md` | Dogfooding-first strategy, 3-month validation, Docker stacks |
| `MONITORING.md` | Docker-first logging, simple monitoring, health checks |
| `INCIDENT_RESPONSE.md` | Informal response for internal use, Docker runbooks |

### Repository
- **GitHub:** [DoozHub/dooz-ecosystem](https://github.com/DoozHub/dooz-ecosystem)
- **Viewer:** http://localhost:5175/

---

## 3. Dogfooding Environment Strategy

### Environment Flow
```
*.dooz.dsshub.in (dogfood) → 3 months validation → *.dooz.app (prod)
```

### Key Principle
This is **NOT** a test environment — it's DoozieSoft's internal production use of Dooz.

---

## 4. Infrastructure on 192.168.0.100

### Architecture (per `dooz-deploy.md`)
```
Internet → Cloudflare → cloudflared → Traefik → Containers
```

### Directory Structure
```
/opt/dooz/
├── infra/dooz-base/     # Traefik, cloudflared (frozen)
├── stacks/
│   └── dooz-data/       # PostgreSQL, Redis ✅ DEPLOYED
├── data/                # Docker volumes
└── backups/             # Database dumps
```

### Networks
| Network | Purpose |
|---------|---------|
| `dooz-public` | Ingress-facing containers |
| `dooz-internal` | Databases, workers (no public access) |

---

## 5. dooz-data Stack Deployment

### Services Deployed

| Container | Image | Status | Network |
|-----------|-------|--------|---------|
| `dooz-data-postgres` | postgres:16-alpine | ✅ Healthy | dooz-internal |
| `dooz-data-redis` | redis:7-alpine | ✅ Healthy | dooz-internal |

### Connection Details
```env
# PostgreSQL
DB_HOST=dooz-data-postgres
DB_PORT=5432
DB_DATABASE=dooz_core
DB_USERNAME=dooz

# Redis
REDIS_HOST=dooz-data-redis
REDIS_PORT=6379
```

### Stack Location
- Server: `/opt/dooz/stacks/dooz-data/`
- Repo: `stacks/dooz-data/`

---

## 6. What's Next

| Stack | Purpose | Status |
|-------|---------|--------|
| `dooz-base` | Traefik + cloudflared | ✅ Running |
| `dooz-data` | PostgreSQL + Redis | ✅ Deployed today |
| `dooz-core` | Laravel core app | ⏳ Next |
| Internal tools | Wiki, admin | ⏳ Later |
| Workers | Background jobs | ⏳ Later |

---

## Git Commits Today

### DoozHub/dooz-atlas
1. Initial commit: AI Development Knowledge System (79 files)

### DoozHub/dooz-ecosystem
1. Add enhanced docs viewer (51 files)
2. Add dooz-deploy.md to viewer
3. Update operations docs for dogfood environment
4. Add dooz-data stack (PostgreSQL + Redis)

---

## Quick Reference

### Start Viewers
```bash
# Dooz Atlas
cd ~/Documents/doozie/ai/dooz-atlas && bun run dev

# Dooz Ecosystem
cd ~/Documents/doozie/ai/dooz-ecosystem && bun run dev
```

### Check Server Status
```bash
ssh akshay@192.168.0.100 'docker ps'
```

### Verify dooz-data
```bash
ssh akshay@192.168.0.100 'docker exec dooz-data-postgres pg_isready && docker exec dooz-data-redis redis-cli ping'
```
