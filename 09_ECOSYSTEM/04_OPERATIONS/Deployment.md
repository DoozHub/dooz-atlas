# Deployment

> Deployment procedures for Dooz applications.

---

## Environment Strategy

DoozieSoft uses a **dogfooding-first** approach for all Dooz ecosystem apps.

| Environment | Domain | Server | Purpose |
|-------------|--------|--------|---------|
| Local | `localhost:*` | Developer machine | Development |
| **Dogfood** | `*.dooz.dsshub.in` | 192.168.0.100 | DoozieSoft internal use |
| Production | `*.dooz.app` | TBD | Customer-facing (post-validation) |

### Dogfooding Environment (Primary)

**Domain:** `*.dooz.dsshub.in`  
**Server:** `192.168.0.100`  
**Status:** Active

This is **NOT** a test/staging environment. It's DoozieSoft's real internal usage of the Dooz ecosystem:
- Used by DoozieSoft team for daily operations
- Apps are validated here for **3 months** before customer production
- Issues discovered here prevent customer impact
- Feedback drives product improvements

> **See [Dooz Deploy Architecture](dooz-deploy.md) for infrastructure details.**

---

## Deployment Pipeline

```
Code Push → CI Tests → Build → Deploy to Dogfood → Monitor (3 months) → Promote to Prod
```

### Triggers

| Branch | Action |
|--------|--------|
| `feature/*` | Run tests only |
| `develop` | Deploy to dogfood |
| `main` | Deploy to production (after 3-month validation) |

---

## Pre-Deployment Checklist

- [ ] All tests pass
- [ ] Migrations tested locally
- [ ] No breaking API changes (or version bumped)
- [ ] Environment variables configured
- [ ] Rollback plan documented
- [ ] Follows [dooz-deploy.md](dooz-deploy.md) stack template

---

## Dogfood Stack Deployment

### Stack Naming (per dooz-deploy.md)

| Item | Rule | Example |
|------|------|---------|
| Infra stack | `dooz-base` | (already deployed) |
| App stack | `dooz-<app>` | `dooz-core` |
| Container | `dooz-<app>-<role>` | `dooz-core-nginx` |
| Hostname | `<app>.dooz.dsshub.in` | `core.dooz.dsshub.in` |

### Deploy New App (Docker Compose)

```bash
# SSH to dogfood server
ssh akshay@192.168.0.100

# Navigate to stacks
cd /opt/dooz/stacks/dooz-<app>

# Deploy stack
docker compose up -d

# Verify routing
curl -I https://<app>.dooz.dsshub.in
```

### No Manual SSH Deploy

**Do NOT** deploy using bare SSH + git pull. Use Docker stacks only:
- ❌ No `git pull` on server
- ❌ No `composer install` on server
- ❌ No `npm install` on server
- ✅ Build image locally or in CI
- ✅ Deploy using docker-compose

---

## Dooz Core Deployment

### hostname

```
core.dooz.dsshub.in
```

### Stack Composition

- `dooz-core-nginx` → public-facing
- `dooz-core-php` → Laravel app
- (Future) `dooz-core-worker` → queue processing
- (Future) `dooz-core-scheduler` → cron jobs

### First-Time Setup

```bash
# Create stack directory
mkdir -p /opt/dooz/stacks/dooz-core
cd /opt/dooz/stacks/dooz-core

# Create docker-compose.yml from golden template
# Add Traefik labels for routing
# Configure .env file

# Deploy
docker compose up -d
```

---

## Desktop App Releases

### Build

```bash
cd dooz-brain  # or dooz-hub, dooz-buddy, etc.
bun install
bun run tauri build
```

### Outputs

- macOS: `src-tauri/target/release/bundle/dmg/*.dmg`
- Windows: `src-tauri/target/release/bundle/msi/*.msi`
- Linux: `src-tauri/target/release/bundle/appimage/*.AppImage`

### Release Process

1. Tag version: `git tag v1.2.0`
2. Push tag: `git push origin v1.2.0`
3. CI builds all platforms
4. Upload to GitHub Releases
5. Update app-registry version

---

## Rollback

### Docker Stack

```bash
# Rollback to previous image
docker compose down
# Update docker-compose.yml to previous tag
docker compose up -d
```

### Database Migrations

```bash
# Inside the container
docker exec -it dooz-core-php php artisan migrate:rollback --step=1
```

### Desktop App

- Previous version remains installed until user updates
- Users can download previous version from GitHub Releases

---

## Environment Variables

### Dogfood (dooz.dsshub.in)

```env
APP_ENV=dogfood
APP_DEBUG=false
APP_KEY=base64:...
APP_URL=https://core.dooz.dsshub.in

DB_HOST=dooz-data-postgres
DB_DATABASE=dooz_core
DB_USERNAME=dooz
DB_PASSWORD=...

REDIS_HOST=dooz-data-redis

# Logging to stderr (Docker pattern)
LOG_CHANNEL=stderr
```

---

## Health Checks

### Endpoints

```
GET /health          # Basic health check
GET /health/db       # Database connectivity
GET /health/redis    # Cache connectivity
GET /health/queue    # Queue status
```

### Verify via Cloudflare Tunnel

```bash
curl https://core.dooz.dsshub.in/health
```

---

## Validation Period

Apps on `*.dooz.dsshub.in` must run for **3 months** before production promotion:

| Milestone | Duration | Focus |
|-----------|----------|-------|
| Week 1-2 | Stability | No crashes, basic functionality |
| Month 1 | Features | Core workflows working |
| Month 2 | Edge cases | Handle unusual inputs |
| Month 3 | Performance | Load, memory, sustained use |

After 3 months of successful dogfooding → Ready for `*.dooz.app` (customer production).

---

## Related Documents

- [Dooz Deploy Architecture](dooz-deploy.md) - Infrastructure playbook
- [Monitoring](MONITORING.md) - Observability
- [Incident Response](INCIDENT_RESPONSE.md) - Handling issues
