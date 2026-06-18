# Dooz Ecosystem — Native (no-Docker) Deployment Guide

> Scope: v1.0.0 production deployment on a single Linux host (Ubuntu 22.04+)
> using **MySQL 8** as the system of record, **Bun 1.3+** for services, and
> **systemd** for process supervision.
>
> Anti-Docker: this deployment uses native packages only. The Dooz user
> is "no Docker" by policy; if you need containers, see the legacy
> `docker-compose.local.yml` at the repo root for the dev path.
>
> Status: **DRAFT (W5.5)**, not yet exercised end-to-end on a fresh host.

## Components

| Service | Port | Process | Data plane |
|---|---:|---|---|
| `dooz-core` (Laravel) | 8000 | `php artisan serve` (or php-fpm + nginx) | MySQL `dooz_core` |
| `dooz-bridge` (Bun) | 3001 | `bun src/index.ts` | SQLite (`./data/bridge.sqlite`) |
| `cloud-pm-suite` (Bun) | 3000 | `bun src/index.ts` | SQLite (default) / MySQL in prod |
| `cloud-perspective` (Bun) | 3002 | `bun src/index.ts` | SQLite (`./data/perspective.db`) |
| `operator-engine` (Bun) | 8001 | `bun src/index.ts` | MySQL `operator_engine` + in-memory |
| `lib-ai-router` (Bun) | 5181 | `bun src/index.ts` | In-memory + env-configured RAG sources |
| `desktop-hub` (Tauri) | desktop | user-launched | local SQLite |
| `desktop-cowork` (Tauri) | desktop | user-launched | local SQLite |

## Pre-flight: system packages

```bash
# 1. Install MySQL 8 (native, not docker)
sudo apt-get update
sudo apt-get install -y mysql-server-8.0
sudo systemctl enable --now mysql

# 2. Install PHP 8.2+ and required extensions for dooz-core
sudo apt-get install -y php8.2-fpm php8.2-cli php8.2-mysql php8.2-mbstring \
  php8.2-xml php8.2-curl php8.2-zip php8.2-bcmath php8.2-intl php8.2-redis
# Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# 3. Install Bun (>= 1.3)
curl -fsSL https://bun.sh/install | bash

# 4. Nginx for the public-facing dooz-core
sudo apt-get install -y nginx
```

## MySQL: schema + user provisioning

```bash
# Run as mysql root.
sudo mysql <<'SQL'
CREATE DATABASE dooz_core     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE operator_engine CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE pm_suite       CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'dooz_app'@'localhost' IDENTIFIED BY '${DOOZ_DB_PASSWORD}';
GRANT ALL PRIVILEGES ON dooz_core.*     TO 'dooz_app'@'localhost';
GRANT ALL PRIVILEGES ON operator_engine.* TO 'dooz_app'@'localhost';
GRANT ALL PRIVILEGES ON pm_suite.*       TO 'dooz_app'@'localhost';
FLUSH PRIVILEGES;
SQL
```

Store `DOOZ_DB_PASSWORD` in `/etc/dooz/secrets.env` (chmod 600, root only).

## Per-service layout

```text
/opt/dooz/
├── env/
│   ├── dooz-core.env
│   ├── dooz-bridge.env
│   ├── cloud-pm-suite.env
│   ├── cloud-perspective.env
│   ├── operator-engine.env
│   └── lib-ai-router.env
├── apps/
│   ├── dooz-core/             # git clone DoozHub/dooz-core
│   ├── dooz-bridge/           # git clone DoozHub/dooz-bridge (or use submodule)
│   ├── cloud-pm-suite/
│   ├── cloud-perspective/
│   ├── operator-engine/
│   └── lib-ai-router/
├── data/
│   ├── bridge.sqlite
│   ├── perspective.db
│   └── pm-suite.db
├── logs/
│   └── *.log
└── backups/                   # DR snapshot dir (see dooz-atlas DR runbook)
```

## Per-service systemd unit

See `systemd/dooz-core.service`, `systemd/operator-engine.service`, etc.
Each unit:

- Runs as a dedicated unprivileged `dooz` user.
- Reads env from `/etc/dooz/env/<service>.env` (mode 0600).
- Writes logs to `/opt/dooz/logs/`.
- Restarts on failure (Restart=on-failure, RestartSec=5s).
- Has `Wants=network-online.target` and an `After=` on MySQL.

## Per-service .env convention

Each `.env` file is owned by `root:dooz` mode 0640. Every secret-bearing
var follows the rule: **in production, unset = service refuses to start**.

Example `operator-engine.env`:

```bash
NODE_ENV=production
PORT=8001
OPERATOR_SYSTEM_SECRET=<32-byte hex>
OPERATOR_ENGINE_DB_HOST=127.0.0.1
OPERATOR_ENGINE_DB_PORT=3306
OPERATOR_ENGINE_DB_NAME=operator_engine
OPERATOR_ENGINE_DB_USER=dooz_app
OPERATOR_ENGINE_DB_PASSWORD_FILE=/etc/dooz/secrets/db-password
```

The `*_FILE` convention lets systemd LoadCredential mount the secret
without it being in the unit file or `Environment=`.

## Bring-up checklist

1. MySQL running, databases created, app user granted.
2. `/etc/dooz/secrets/*` provisioned (mode 0600, root owner).
3. Per-service `composer install` / `bun install` complete.
4. Migrations run:
   - `cd /opt/dooz/apps/dooz-core && php artisan migrate --force`
   - `cd /opt/dooz/apps/operator-engine && bun run db:migrate`
5. `sudo systemctl daemon-reload && sudo systemctl enable --now dooz-core dooz-bridge cloud-pm-suite cloud-perspective operator-engine lib-ai-router nginx`
6. Tail logs: `journalctl -u operator-engine -f`.
7. Smoke: `curl http://localhost:8001/health` and `curl http://localhost:8000/up`.

## Backups

See `dooz-atlas/03_FRAMEWORKS/dr-runbook.md` for the verified procedure.
The TL;DR is `mysql_dump.sh` (this directory) and the
`operator-engine/scripts/snapshot.ts` exporter.

## Hardening notes

- Bind every service to `127.0.0.1` by default; expose only `dooz-core` via nginx.
- `ufw allow 22, 80, 443`; block the rest.
- `fail2ban` for SSH and the Laravel login form.
- TLS termination at nginx (Let's Encrypt).
- `logrotate` for the per-service logs in `/opt/dooz/logs/`.
