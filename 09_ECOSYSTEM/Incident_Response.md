# Incident Response

> Handling incidents for Dooz ecosystem on dogfood (*.dooz.dsshub.in).

---

## Dogfood Context

The dogfood environment (`*.dooz.dsshub.in`) is DoozieSoft's internal production usage.

**Key Difference:** We are both the operators AND the users. Incidents affect our own productivity, so we have strong incentive to fix them quickly and prevent recurrence.

---

## Incident Severity Levels

| Level | Definition | Examples |
|-------|------------|----------|
| SEV-1 | Complete service outage | App unreachable, data loss |
| SEV-2 | Major feature broken | Auth failing, core workflow broken |
| SEV-3 | Degraded performance | Slow responses, partial failures |
| SEV-4 | Minor issue | UI bug, edge case error |

---

## Response Times (Dogfood)

Since we're using this ourselves, response is informal but still timely:

| Severity | Response | Notes |
|----------|----------|-------|
| SEV-1 | Immediately | Stop what you're doing |
| SEV-2 | Within hours | Prioritize fix |
| SEV-3 | Same day | Investigate when convenient |
| SEV-4 | Next available | Log for later |

---

## Incident Workflow

```
Notice Issue → Check Logs → Fix or Rollback → Verify → Document
```

### 1. Notice Issue

- You're using the app and something breaks
- Someone on Slack mentions it
- Health check fails

### 2. Check Logs

```bash
# SSH to dogfood server
ssh akshay@192.168.0.100

# Check container status
docker ps

# Check specific service logs
docker logs -f dooz-core-php --tail 200

# Check Traefik logs
docker logs dooz-base-traefik --tail 100

# Check Cloudflare tunnel
docker logs dooz-base-cloudflared --tail 100
```

### 3. Fix or Rollback

**Quick Fix:**
```bash
# Restart container
docker compose restart dooz-core-php

# Or restart entire stack
cd /opt/dooz/stacks/dooz-core
docker compose down && docker compose up -d
```

**Rollback:**
```bash
# Edit docker-compose.yml to previous image tag
# Re-deploy
docker compose up -d
```

### 4. Verify

```bash
curl https://core.dooz.dsshub.in/health
```

### 5. Document

For SEV-1/SEV-2: Create a brief postmortem in Slack or docs.

---

## Common Runbooks

### Service Unreachable (502/503)

1. Check container running: `docker ps | grep dooz-<app>`
2. Check container logs: `docker logs dooz-<app>-<role>`
3. Check container on network: `docker network inspect dooz-public`
4. Check Traefik routing: `docker logs dooz-base-traefik | grep <app>`
5. Restart if needed: `docker compose restart`

### Cloudflare Tunnel Down

1. Check tunnel status: `docker logs dooz-base-cloudflared`
2. Verify credentials: Check `/etc/cloudflared/` mounted correctly
3. Restart tunnel: `docker restart dooz-base-cloudflared`
4. Check Cloudflare dashboard for tunnel status

### Database Connection Failed

1. Check DB container: `docker ps | grep dooz-data-postgres`
2. Check DB logs: `docker logs dooz-data-postgres`
3. Check connectivity from app: `docker exec dooz-core-php pg_isready -h dooz-data-postgres`
4. Restart DB if needed: `docker restart dooz-data-postgres`

### Queue Backlog

1. Check queue size: `docker exec dooz-core-php php artisan queue:monitor`
2. Check failed jobs: `docker exec dooz-core-php php artisan queue:failed`
3. Retry failed: `docker exec dooz-core-php php artisan queue:retry all`
4. Scale workers if needed

---

## Postmortem Template (For SEV-1/2)

```markdown
# Incident: {Short Title}

**Date:** YYYY-MM-DD
**Duration:** X hours
**Severity:** SEV-{1|2}

## What Happened
{One paragraph}

## Root Cause
{What actually caused it}

## Fix Applied
{What we did}

## Prevention
- [ ] Action item - Owner - Due date
```

---

## Escalation

For dogfood, escalation is informal:
- Can't fix in 1 hour? → Ask team on Slack
- Data loss risk? → Stop and get help
- Infrastructure issue? → Check dooz-base first

---

## What We Learn Here

Incidents on dogfood are **valuable learning**:
- Discover issues before customers do
- Build runbooks for production
- Test incident response procedures
- Improve monitoring coverage

Every dogfood incident makes our eventual production deployment safer.

---

## Related Documents

- [Dooz Deploy Architecture](dooz-deploy.md) - Infrastructure
- [Deployment](DEPLOYMENT.md) - Deploy procedures
- [Monitoring](MONITORING.md) - Observability
