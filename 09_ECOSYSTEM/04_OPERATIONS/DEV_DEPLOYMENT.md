# Dooz Ecosystem — Local Development Deployment Guide

> **Date**: 2026-04-07  
> **Purpose**: Run the full Dooz ecosystem locally with Cloudflare tunnel for remote testing  
> **Constraint**: No Docker — native processes only to minimize resource usage

---

## ⚠️ IMPORTANT: Repository Structure

The parent folder is named `dooz-hub` but contains dooz-atlas (the docs repo). All ecosystem code is in subdirectories.

```
/home/akshay/dev/dooz-hub/          ← Parent folder
├── dooz-atlas/                    ← Documentation & knowledge base (THIS IS THE MAIN REPO)
├── dooz-core/                    ← Main Laravel platform (core) - port 8000
│   └── packages/dooz/            ← All packages below live here as symlinked deps
├── dooz-pm-suite/                ← Bun + Hono API - port 3000
├── dooz-perspective/            ← Bun + Hono API - port 3003
├── dooz-website-builder/         ← Next.js - port 3000 (conflict)
├── [desktop apps...]             ← Tauri apps (run locally)
└── [SDKs/libraries...]           ← Shared libraries
```

---

## Prerequisites — Install These First

**Run these commands with sudo access:**

```bash
# Update package lists
sudo apt update

# Install PHP 8.3 + extensions (for Laravel apps)
sudo apt install -y php8.3 php8.3-cli php8.3-mbstring php8.3-xml php8.3-curl \
  php8.3-zip php8.3-pgsql php8.3-sqlite3 php8.3-redis php8.3-bcmath php8.3-intl

# Install Composer
sudo apt install -y composer

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Redis
sudo apt install -y redis-server

# Install cloudflared (Cloudflare Tunnel)
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
sudo chmod +x /usr/local/bin/cloudflared
```

**Verify installation:**
```bash
php -v          # Should show PHP 8.3+
composer --version
psql --version  # Should show PostgreSQL 15+
redis-server --version
cloudflared --version
```

---

## System Requirements

| Resource | Available | Required | Status |
|----------|-----------|----------|--------|
| **RAM** | 7.6GB | ~2.3GB | ✅ OK |
| **CPU** | 8 cores | ~4 cores | ✅ OK |
| **Disk** | 830GB free | ~5GB | ✅ OK |

---

## Quick Start (What Works Now)

Without PHP/PostgreSQL/Redis installed, you can run:

```bash
# PM Suite (port 3000)
cd ~/dev/dooz-hub/dooz-pm-suite
mkdir -p data
bun run src/index.ts &

# Perspective (port 3003)
cd ~/dev/dooz-hub/dooz-perspective
mkdir -p data
bun run src/index.ts &

# Test
curl http://localhost:3000/api/intents
curl http://localhost:3003/api/v1/health
```

---

## Full Setup (After Installing Prerequisites)

### 1. Start Infrastructure
```bash
sudo systemctl start postgresql
sudo systemctl start redis-server
```

### 2. Create Databases
```sql
-- As postgres user
sudo -u postgres psql

CREATE DATABASE dooz_core;
CREATE USER dooz_dev WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE dooz_core TO dooz_dev;
```

### 3. Configure dooz-core
```bash
cd ~/dev/dooz-hub/dooz-core
cp .env.example .env
# Edit .env with database credentials
composer install
php artisan key:generate
php artisan migrate
php artisan serve --port=8000 --host=0.0.0.0 &
```

### 4. Start Standalone Services
```bash
# PM Suite
cd ~/dev/dooz-hub/dooz-pm-suite
mkdir -p data
bun run src/index.ts &

# Perspective
cd ~/dev/dooz-hub/dooz-perspective
mkdir -p data
bun run src/index.ts &
```

---

## Service Port Map

| # | Service | Port | Tech | Status |
|---|---------|------|------|--------|
| 1 | **dooz-core** | 8000 | Laravel 12 | Needs PHP/PostgreSQL |
| 2 | **dooz-pm-suite** | 3000 | Bun + Hono | ✅ Ready |
| 3 | **dooz-perspective** | 3003 | Bun + Hono | ✅ Ready |
| 4 | **dooz-website-builder** | 3000* | Next.js 15 | Port conflict |

---

## Cloudflare Tunnel Setup

### Quick Tunnel (Temporary)
```bash
# Forward a single service
cloudflared tunnel --url http://localhost:3000
```

### Permanent Tunnel (Full Config)

1. Create tunnel:
```bash
cloudflared tunnel create dooz-dev
```

2. Configure `~/.cloudflared/config.yml`:
```yaml
tunnel: dooz-dev
credentials-file: ~/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: pm.dev.dooz.app
    service: http://localhost:3000
  - hostname: perspective.dev.dooz.app
    service: http://localhost:3003
  - service: http_status:404
```

3. Route DNS:
```bash
cloudflared tunnel route dns dooz-dev pm.dev.dooz.app
cloudflared tunnel route dns dooz-dev perspective.dev.dooz.app
```

4. Run:
```bash
cloudflared tunnel run dooz-dev
```

---

## Stop Everything

```bash
# Kill all Laravel servers
pkill -f "php artisan serve"

# Kill all Bun processes
pkill -f "bun run"

# Stop tunnel
pkill -f cloudflared
```

---

## Notes

- **dooz-core packages**: quicky, worklog, calibration-ops, sync, sdk, ui, renew, mini-suite, activity-tracker, calibration, dooz-accountant, dooz-compliance, dooz-contracts, dooz-iot all run INSIDE dooz-core
- **Desktop apps**: dooz-hub, dooz-brain, dooz-bridge, dooz-yantra, dooz-cowork, quicky_desktop run locally (not forwarded)
- **Mobile**: quicky_mobile runs on device

---

*Last updated: 2026-04-07*
