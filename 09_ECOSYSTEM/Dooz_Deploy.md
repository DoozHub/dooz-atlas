# Dooz Deployment Architecture & Playbook

**Status:** Locked  
**Scope:** Infrastructure, ingress, and application deployment discipline  
**Applies to:** All Dooz ecosystem services (current and future)

---

## 1. Core Philosophy

- Infrastructure must be **boring, predictable, and frozen**
- Product velocity > infra cleverness
- No Kubernetes, no Swarm, no premature observability
- One host, one Traefik, one Cloudflare Tunnel
- All apps follow a single golden template

> Infra exists to be forgotten, not admired.

---

## 2. High-Level Architecture

```
Internet
  ↓
Cloudflare DNS + Universal SSL
  ↓
Cloudflare Tunnel (cloudflared)
  ↓
Traefik (HTTP-only, routing)
  ↓
Application Containers
```

### Responsibility Split

| Layer | Responsibility |
|-----|----------------|
| Cloudflare | TLS, DNS, WAF, edge certs |
| cloudflared | Secure ingress tunnel |
| Traefik | Host-based routing only |
| App containers | Business logic |

---

## 3. Naming & Structure (Frozen)

### Directory Layout

```
/opt/dooz/
├── infra/
│   ├── dooz-base/        # ingress, networks (frozen)
│   └── templates/        # golden templates
├── stacks/
│   ├── dooz-core/        # Laravel core app
│   └── other-apps/
├── data/                 # docker volumes only
└── backups/              # dumps only
```

### Stack Naming

| Item | Rule |
|----|----|
| Infra stack | `dooz-base` |
| App stack | `dooz-<app>` |
| Container | `dooz-<app>-<role>` |
| Hostname | `<app>.dooz.dsshub.in` |

---

## 4. Networking Model (Non-Negotiable)

Two Docker networks only:

```text
dooz-public    → ingress-facing
dooz-internal  → DBs, workers, internal APIs
```

Rules:
- No app exposes ports
- Databases never join `dooz-public`
- Only Traefik binds to host port 80

---

## 5. dooz-base (Ingress Stack)

### Purpose
- Provide stable ingress and routing
- Never host applications
- Rarely changes

### Components
- Traefik v3 (HTTP only)
- Docker provider
- Cloudflare Tunnel as upstream TLS terminator

### Key Rules
- ❌ No HTTPS in Traefik
- ❌ No Let’s Encrypt
- ❌ No redirects
- ❌ No app containers here

---

## 6. Cloudflare Tunnel Discipline

### Tunnel Model
- Named tunnel (cert-based auth)
- One tunnel → multiple hostnames
- Config-driven via `/etc/cloudflared/config.yml`

### Subdomain Strategy (Collision-Safe)

```
dooz.dsshub.in
*.dooz.dsshub.in
```

Other `x.dsshub.in` can live on other servers safely.

### Ingress Example

```yaml
ingress:
  - hostname: dooz.dsshub.in
    service: http://localhost:80

  - hostname: "*.dooz.dsshub.in"
    service: http://localhost:80

  - service: http_status:404
```

### Cloudflare SSL Mode

```
SSL/TLS Mode: Full
```

Not Flexible  
Not Full (strict)

---

## 7. Golden App Stack Template

This template is the **starting point for every app**.

### Mandatory Properties
- Joins both networks
- Uses Traefik labels
- No TLS logic
- No exposed ports
- Explicit image tags
- Separate `.env` per stack

---

## 8. Laravel App Adaptation (dooz-core)

### Stack Composition

- `nginx` → public-facing
- `php-fpm` → app runtime
- Workers/schedulers → separate containers (later)

### Hostname

```
core.dooz.dsshub.in
```

### Key Rules (Laravel)

- ❌ No Apache
- ❌ No `artisan serve`
- ❌ No migrations on startup
- ❌ No queues inside app container
- ✅ Logs to `stderr`
- ✅ Build image separately

---

## 9. What Is Explicitly Forbidden

- Kubernetes / Swarm
- `latest` image tags
- Host bind mounts for code
- Shared databases between apps
- Infra changes for app needs
- “Temporary” exceptions

---

## 10. Operational Truths

- If ingress breaks later → app is wrong, not infra
- Infra changes require justification, not curiosity
- Stability is a feature
- Complexity is debt

---

## 11. Current Status

- dooz-base: ✅ deployed
- Cloudflare Tunnel: ✅ active
- Universal SSL: ✅ issuing
- Ingress: ✅ validated (whoami)
- Golden template: ✅ locked
- Ready for product work: ✅

---

## 12. Next Planned Stacks

1. `dooz-data` (Postgres, Redis, backups)
2. `dooz-core` (Laravel core platform)
3. Internal tools (wiki, admin)
4. Background workers & schedulers

Infra is now **closed for discussion**.
