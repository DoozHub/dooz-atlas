# Monitoring

> Observability and alerting for Dooz ecosystem on dogfood (*.dooz.dsshub.in).

---

## Monitoring Philosophy

For dogfood environment (`192.168.0.100`), keep monitoring **simple and boring**:
- No Prometheus/Grafana (premature complexity)
- No distributed tracing (yet)
- Focus on logs, health endpoints, and basic metrics

---

## Monitoring Stack

| Tool | Purpose | Environment |
|------|---------|-------------|
| Docker logs | Container stdout/stderr | All |
| Laravel Telescope | Request/query debugging | Local only |
| Laravel Pail | Real-time log tailing | All |
| Health Endpoints | Uptime monitoring | All |
| Traefik Dashboard | Ingress debugging | 192.168.0.100 |

---

## Logging (Docker-First)

### Log Pattern

All containers log to `stderr` (Docker captures automatically).

```bash
# View logs for a stack
docker compose logs -f dooz-core-php

# View all stack logs
docker compose logs -f

# Filter by time
docker compose logs --since="1h" dooz-core-nginx
```

### Laravel Configuration

```env
LOG_CHANNEL=stderr
LOG_LEVEL=info
```

### Log Levels

| Level | Usage |
|-------|-------|
| `emergency` | System unusable |
| `alert` | Immediate action needed |
| `critical` | Critical conditions |
| `error` | Runtime errors |
| `warning` | Exceptional occurrences |
| `notice` | Normal but significant |
| `info` | Informational messages |
| `debug` | Debug only (never in dogfood/prod) |

---

## Real-Time Monitoring

### Container Logs

```bash
# SSH to dogfood server
ssh akshay@192.168.0.100

# Tail specific container
docker logs -f dooz-core-php --tail 100

# Filter errors
docker logs dooz-core-php 2>&1 | grep -i error
```

### Laravel Pail (inside container)

```bash
docker exec -it dooz-core-php php artisan pail
docker exec -it dooz-core-php php artisan pail --filter="level:error"
```

### Traefik Dashboard

```bash
# Access locally on server
curl http://localhost:8080/dashboard/
```

---

## Health Checks

### Endpoints to Implement

```
GET /health          # Basic health check
GET /health/db       # Database connectivity
GET /health/redis    # Cache connectivity
GET /health/queue    # Queue status
```

### Testing from Outside

```bash
curl https://core.dooz.dsshub.in/health
curl https://core.dooz.dsshub.in/health/db
```

### Health Check Code

```php
Route::get('/health', function () {
    $checks = [
        'database' => DB::connection()->getPdo() ? 'ok' : 'fail',
        'redis' => Redis::ping() ? 'ok' : 'fail',
    ];

    $status = collect($checks)->every(fn($v) => $v === 'ok') ? 'ok' : 'degraded';

    return response()->json([
        'status' => $status,
        'version' => config('app.version'),
        'environment' => 'dogfood',
        'checks' => $checks,
    ], $status === 'ok' ? 200 : 503);
});
```

---

## Metrics to Watch

### Application (Dogfood)

| Metric | Action Threshold |
|--------|------------------|
| Response time P95 | > 3 seconds (investigate) |
| Error rate | > 5% (investigate) |
| Queue backlog | > 100 jobs (investigate) |
| Failed jobs | > 5/hour (check logs) |

### Infrastructure (192.168.0.100)

| Metric | Action Threshold |
|--------|------------------|
| CPU usage | > 70% sustained |
| Memory usage | > 80% |
| Disk usage | > 85% |
| Container restarts | Any unexpected restart |

### Quick Check Commands

```bash
# Server resources
ssh akshay@192.168.0.100 "htop"  # or top
ssh akshay@192.168.0.100 "df -h"
ssh akshay@192.168.0.100 "free -h"

# Docker status
ssh akshay@192.168.0.100 "docker ps"
ssh akshay@192.168.0.100 "docker stats --no-stream"
```

---

## Alerting (Simple for Dogfood)

### Current Approach

| Issue | How We Know |
|-------|-------------|
| Service down | Team notices (dogfood users) |
| Errors | Check logs during daily use |
| Performance | Feel it during daily use |

### Future (When Needed)

| Severity | Channel |
|----------|---------|
| Critical | Slack #dooz-alerts |
| Error | Slack #dooz-alerts |
| Warning | Weekly review |

---

## Debugging Issues on Dogfood

### Steps

1. Check service accessible: `curl https://<app>.dooz.dsshub.in/health`
2. SSH to server: `ssh akshay@192.168.0.100`
3. Check container status: `docker ps`
4. Check container logs: `docker logs -f dooz-<app>-<role>`
5. Check Traefik routing: `docker logs dooz-base-traefik`
6. Check Cloudflare tunnel: `docker logs dooz-base-cloudflared`

### Common Issues

| Symptom | Check |
|---------|-------|
| 502 Bad Gateway | Container crashed or not on dooz-public network |
| 404 Not Found | Traefik label misconfigured |
| Slow responses | Container resource limits, DB queries |
| Connection refused | Container not running |

---

## Related Documents

- [Dooz Deploy Architecture](dooz-deploy.md) - Infrastructure
- [Deployment](DEPLOYMENT.md) - Deploy procedures
- [Incident Response](INCIDENT_RESPONSE.md) - Handling issues
