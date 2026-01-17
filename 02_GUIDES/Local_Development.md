# Local Development Guide

> How to run the Dooz Ecosystem locally for development and testing.

---

## Prerequisites

- **Docker Desktop** - For PostgreSQL & Redis
- **Bun** - JavaScript/TypeScript runtime (v1.3+)
- **Node.js** - For some packages (v20+)
- **PHP 8.3** - For dooz-core Laravel
- **Rust** - For dooz-brain server (cargo)
- **Composer** - PHP dependency manager

---

## Quick Start

```bash
# Start entire ecosystem
cd dooz-ecosystem
./start-local.sh

# Stop services (keep Docker running)
./stop-local.sh

# Stop everything including Docker
./stop-local.sh --all
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       DOCKER CONTAINERS                         │
│  ┌──────────────────────────┐  ┌──────────────────────────┐    │
│  │       PostgreSQL         │  │         Redis            │    │
│  │         :5432            │  │         :6379            │    │
│  │  DBs: dooz, dooz_core,   │  │                          │    │
│  │       pm_suite           │  │                          │    │
│  └──────────────────────────┘  └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                       NATIVE SERVICES                           │
│                                                                  │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐            │
│  │  Bridge    │◄──►│  PM-Suite  │◄──►│   Brain    │            │
│  │   :3001    │    │   :3000    │    │   :3333    │            │
│  └────────────┘    └────────────┘    └────────────┘            │
│                                                                  │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐            │
│  │   Core     │    │   Atlas    │    │ AI-Router  │            │
│  │   :8000    │    │   :5176    │    │   :5181    │            │
│  └────────────┘    └────────────┘    └────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Port Assignments

| Service | Port | Description |
|---------|------|-------------|
| **PostgreSQL** | 5432 | All databases (dooz, dooz_core, pm_suite) |
| **Redis** | 6379 | Caching |
| **dooz-bridge** | 3001 | Event bus |
| **dooz-pm-suite** | 3000 | PM API + UI |
| **dooz-brain** | 3333 | Memory server |
| **dooz-core** | 8000 | Laravel backend |
| Core Vite | 5173 | Asset server |
| **dooz-atlas** | 5176 | Documentation |
| **dooz-ai-router** | 5181 | AI gateway |

---

## Database Access (PostgreSQL)

```bash
# Connect via Docker
docker exec -it dooz-postgres psql -U dooz -d dooz

# Available databases:
#   - dooz         (general/pm-suite)
#   - dooz_core    (Laravel core app)
#   - pm_suite     (PM Suite if separate)

# Credentials
# User: dooz
# Password: dooz
```

---

## Individual Service Setup

### dooz-bridge (Event Bus)

```bash
cd dooz-bridge
cp .env.example .env
bun install
bun run dev
# Running on http://localhost:3001
```

### dooz-pm-suite (PM API)

```bash
cd dooz-pm-suite
cp .env.example .env
bun install
PORT=3000 bun run dev
# Running on http://localhost:3000
```

### dooz-brain (Memory Server)

```bash
cd dooz-brain/server
cargo build --release
./target/release/dooz-brain-server --port 3333
```

### dooz-core (Laravel)

```bash
cd dooz-core
composer install
cp .env.example .env
php artisan key:generate

# Update .env database credentials:
# DB_USERNAME=dooz
# DB_PASSWORD=dooz
# DB_DATABASE=dooz_core

php artisan migrate
php artisan serve --port=8000

# Assets (separate terminal):
npm install
npm run dev
```

---

## Setting Up Tenant & Applications

### 1. Create DoozieSoft Tenant

1. Access http://localhost:8000/admin
2. Login with admin credentials
3. Navigate to Tenants → Create New
4. Enter: Name: `DoozieSoft`, Slug: `dooziesoft`

### 2. Activate Quicky & Worklog

Via admin panel: Tenants → dooziesoft → Modules → Enable Quicky, Worklog

---

## Health Checks

```bash
curl http://localhost:3001/health  # Bridge
curl http://localhost:3000/api     # PM-Suite
curl http://localhost:3333/api/health  # Brain
curl http://localhost:8000/api     # Core
```

---

## Logs

```bash
# View all logs
tail -f /tmp/dooz-*.log

# Specific service
tail -f /tmp/dooz-bridge.log
```

---

## Troubleshooting

### Port already in use
```bash
lsof -ti:3001 | xargs kill -9
```

### PostgreSQL not ready
```bash
# Check container status
docker logs dooz-postgres

# Wait for ready
docker exec dooz-postgres pg_isready -U dooz
```

### Brain server not found
```bash
cd dooz-brain/server
cargo build --release
```
