# Dooz Core - Technical Specification

> Architecture and implementation details for Dooz Core platform

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                 │
│                        (Nginx / CloudFlare)                             │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Server    │    │   Web Server    │    │   Web Server    │
│   (Laravel)     │    │   (Laravel)     │    │   (Laravel)     │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     MySQL       │    │     Redis       │    │  Meilisearch    │
│   (Primary)     │    │    (Cache)      │    │   (Search)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│  MySQL Replica  │
│   (Read Only)   │
└─────────────────┘
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Laravel | 11.x |
| PHP | PHP-FPM | 8.3+ |
| Database | MySQL / PostgreSQL | 8.0 / 15+ |
| Cache | Redis | 7.x |
| Queue | Redis / SQS | - |
| Search | Meilisearch | 1.x |
| Storage | S3-compatible | - |
| Web Server | Nginx / Caddy | - |

---

## Database Schema

### Core Tables

```sql
-- Tenants (Organizations)
CREATE TABLE tenants (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    domain VARCHAR(255) UNIQUE,
    settings JSON,
    plan_id VARCHAR(50),
    status ENUM('active', 'suspended', 'deleted'),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Users
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id CHAR(36) NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    avatar VARCHAR(255),
    settings JSON,
    email_verified_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE KEY (tenant_id, email),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Roles
CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id CHAR(36),
    name VARCHAR(100) NOT NULL,
    guard_name VARCHAR(50),
    permissions JSON,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- App Installations
CREATE TABLE app_installations (
    id CHAR(36) PRIMARY KEY,
    tenant_id CHAR(36) NOT NULL,
    app_name VARCHAR(100) NOT NULL,
    version VARCHAR(20),
    settings JSON,
    permissions JSON,
    status ENUM('active', 'disabled', 'pending'),
    installed_at TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE KEY (tenant_id, app_name),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

### Indexes Strategy

```sql
-- Performance indexes
CREATE INDEX idx_users_tenant_email ON users(tenant_id, email);
CREATE INDEX idx_users_tenant_created ON users(tenant_id, created_at);
CREATE INDEX idx_installations_tenant ON app_installations(tenant_id, status);
```

---

## API Design

### Authentication

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/user
```

### Tenant Context

All API requests include tenant context via:
- Subdomain: `{tenant}.dooz.app`
- Header: `X-Tenant-ID: {tenant_id}`
- Token claims: JWT includes `tenant_id`

### Response Format

```json
{
  "data": { ... },
  "meta": {
    "pagination": { ... }
  },
  "links": {
    "self": "...",
    "next": "..."
  }
}
```

### Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The given data was invalid.",
    "details": {
      "email": ["The email field is required."]
    }
  }
}
```

---

## Caching Strategy

### Cache Layers

| Layer | TTL | Purpose |
|-------|-----|---------|
| Route | 1 hour | API response caching |
| Model | 15 min | Eloquent model caching |
| Query | 5 min | Database query caching |
| Config | 1 day | Tenant configuration |

### Cache Keys

```php
// Pattern: {tenant}:{resource}:{id}:{version}
"tenant:abc123:user:456:v1"
"tenant:abc123:apps:installed:v1"
"tenant:abc123:permissions:user:456:v1"
```

### Invalidation

```php
// Event-based invalidation
event(new TenantSettingsUpdated($tenant));
// Triggers: Cache::tags(['tenant:'.$tenant->id])->flush();
```

---

## Security

### Authentication

- OAuth 2.0 with JWT tokens
- Token lifetime: 1 hour (access), 7 days (refresh)
- Rate limiting: 60 req/min (auth), 300 req/min (API)

### Authorization

```php
// Gate checks
Gate::define('manage-users', function ($user) {
    return $user->hasPermission('users.manage');
});

// Policy
class UserPolicy {
    public function update(User $user, User $target) {
        return $user->tenant_id === $target->tenant_id 
            && $user->hasPermission('users.update');
    }
}
```

### Data Isolation

- Tenant scoping via global scope
- All queries automatically filtered
- Cross-tenant access explicitly denied

---

## Queue & Jobs

### Queue Configuration

| Queue | Workers | Purpose |
|-------|---------|---------|
| default | 3 | General async tasks |
| webhooks | 2 | Webhook delivery |
| email | 2 | Email sending |
| sync | 1 | Sync operations |

### Job Patterns

```php
class ProcessWebhook implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    public $tries = 3;
    public $backoff = [60, 300, 900]; // Exponential backoff
    
    public function handle() { ... }
    
    public function failed($exception) {
        // Log to webhook_failures table
    }
}
```

---

## Monitoring

### Metrics Collected

- Request latency (p50, p95, p99)
- Error rates by endpoint
- Queue depth and processing time
- Cache hit/miss ratios
- Database query performance

### Health Checks

```
GET /health/live    # Is app running?
GET /health/ready   # Can accept traffic?
GET /health/db      # Database connected?
GET /health/cache   # Cache connected?
```

---

## Deployment

### Environment Variables

```bash
APP_ENV=production
APP_KEY=base64:...
DB_CONNECTION=mysql
DB_HOST=db.internal
REDIS_HOST=redis.internal
QUEUE_CONNECTION=redis
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

### Docker Compose (Development)

```yaml
services:
  app:
    build: .
    ports: ["8000:8000"]
    depends_on: [db, redis]
    
  db:
    image: mysql:8
    volumes: ["db_data:/var/lib/mysql"]
    
  redis:
    image: redis:7-alpine
```

---

## Related Files

- [Architecture](../ARCHITECTURE.md)
- [API Contracts](../API_CONTRACTS.md)
- [Data Model](../DATA_MODEL.md)
