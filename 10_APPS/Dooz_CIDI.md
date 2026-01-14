# Dooz CIDI

> A secure, self-hosted CI/DI control plane built with Laravel 11 and Filament.

---

## Overview

Doozie CI/DI is a secure, self-hosted continuous integration/deployment control plane for managing build pipelines, artifact storage, and deployment workflows.

```
┌──────────────────────────────────────────────────────────────┐
│                         DOOZ CIDI                            │
├──────────────────────────────────────────────────────────────┤
│  🔄 CI/CD Pipeline       │  🐳 Docker-based Runtime          │
│  📦 Artifact Storage     │  🗃️ Laravel 11 + Filament         │
│  🔒 Self-Hosted          │  ⚙️ Redis Queue + PostgreSQL      │
│  🌐 Traefik Proxy        │  ☁️ MinIO S3 Storage              │
└──────────────────────────────────────────────────────────────┘
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      DOOZ CIDI STACK                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Traefik   │───►│  Laravel 11 │───►│ PostgreSQL  │     │
│  │   (Proxy)   │    │  + Filament │    │   (DB)      │     │
│  └─────────────┘    └──────┬──────┘    └─────────────┘     │
│                            │                                │
│                  ┌─────────▼─────────┐                     │
│                  │    Horizon        │                     │
│                  │   (Queue Worker)  │                     │
│                  └─────────┬─────────┘                     │
│                            │                                │
│         ┌──────────────────┼──────────────────┐            │
│         ▼                  ▼                  ▼            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│  │   Redis     │    │   MinIO     │    │   Docker    │   │
│  │  (Queue)    │    │   (S3)      │    │  (Runtime)  │   │
│  └─────────────┘    └─────────────┘    └─────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **App** | Laravel 11, Filament (admin UI) |
| **Worker** | Horizon queue workers |
| **Database** | PostgreSQL 16 |
| **Cache/Queue** | Redis 7 |
| **Artifact Storage** | MinIO (S3 compatible) |
| **Proxy** | Traefik v3 |
| **Runtime** | Docker Compose |
| **OS** | Ubuntu 22.04+ |

---

## Components

| Component | Purpose |
|-----------|---------|
| **Filament Admin** | UI for pipeline management |
| **Horizon Workers** | Background job processing |
| **MinIO** | S3-compatible object storage |
| **Traefik** | Reverse proxy with Cloudflare Tunnel |
| **Docker** | Build/runtime containers |

---

## Documentation

| Document | Description |
|----------|-------------|
| `IFLOW.md` | Integration flow documentation |
| `FALLBACK-GUIDE.md` | Fallback procedures |
| `USAGE.md` | Usage guide |
| `README.md` | Installation and setup |

---

## Installation

```bash
# Clone repository
git clone https://github.com/dooziesoft/doozie-cidi.git /opt/doozie-cidi
cd /opt/doozie-cidi

# Setup environment
./bootstrap.sh

# Deploy
./deploy-laravel.sh
```

---

*Repository: dooz-cidi*
