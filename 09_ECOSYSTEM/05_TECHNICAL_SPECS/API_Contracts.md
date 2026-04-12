# API Contracts

> REST API conventions for Dooz Core.

---

## Base URL

```
Production: https://api.dooz.app/v1
Staging:    https://api.staging.dooz.app/v1
Local:      http://localhost:8000/api/v1
```

---

## Authentication

All API requests require Bearer token:

```http
Authorization: Bearer {access_token}
```

Tokens are issued via OAuth2 (Laravel Passport).

---

## Request Format

### Headers

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
X-Tenant: {tenant_slug}       # Optional, for multi-tenant context
```

### JSON Body

```json
{
    "field_name": "value",
    "nested": {
        "key": "value"
    }
}
```

---

## Response Format

### Success Response

```json
{
    "success": true,
    "data": {
        "id": "uuid",
        "name": "Example",
        "created_at": "2025-01-01T00:00:00Z"
    },
    "meta": {
        "request_id": "uuid"
    }
}
```

### Success with Pagination

```json
{
    "success": true,
    "data": [...],
    "meta": {
        "current_page": 1,
        "per_page": 25,
        "total": 100,
        "last_page": 4
    },
    "links": {
        "first": "?page=1",
        "prev": null,
        "next": "?page=2",
        "last": "?page=4"
    }
}
```

### Error Response

```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "The given data was invalid.",
        "details": {
            "email": ["The email field is required."]
        }
    },
    "meta": {
        "request_id": "uuid"
    }
}
```

---

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Malformed request |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable | Validation error |
| 429 | Too Many Requests | Rate limited |
| 500 | Server Error | Internal error |

---

## Endpoint Conventions

### Resource URLs

```
GET    /api/v1/{resources}           # List
POST   /api/v1/{resources}           # Create
GET    /api/v1/{resources}/{id}      # Show
PUT    /api/v1/{resources}/{id}      # Replace
PATCH  /api/v1/{resources}/{id}      # Update
DELETE /api/v1/{resources}/{id}      # Delete
```

### Nested Resources

```
GET    /api/v1/devices/{id}/certificates
POST   /api/v1/devices/{id}/certificates
```

### Actions

```
POST   /api/v1/devices/{id}/send-for-calibration
POST   /api/v1/certificates/{id}/approve
```

---

## Query Parameters

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `page` | Pagination | `?page=2` |
| `per_page` | Items per page (max 100) | `?per_page=50` |
| `sort` | Sort field | `?sort=created_at` |
| `order` | Sort direction | `?order=desc` |
| `filter[field]` | Filter by field | `?filter[status]=active` |
| `include` | Eager load relations | `?include=certificates,vendor` |
| `fields` | Sparse fieldsets | `?fields=id,name,status` |

---

## Rate Limiting

| Tier | Limit | Use Case |
|------|-------|----------|
| Free | 60 requests/minute | Unauthenticated / Trial tenants |
| Starter | 300 requests/minute | Basic subscription |
| Business | 1,000 requests/minute | Standard subscription |
| Enterprise | Unlimited | Enterprise tier |

**Middleware:** `App\Http\Middleware\TieredRateLimitMiddleware`

**Features:**
- Tier-based rate limiting per tenant
- Redis-backed distributed rate limiting
- User-specific rate limit overrides
- Circuit breaker pattern for failing endpoints

**Headers:**

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed |
| `X-RateLimit-Remaining` | Remaining requests in window |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |
| `Retry-After` | Seconds until retry allowed (on 429) |

Error response (429):
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "max_requests": 60,
      "window": "60 seconds",
      "retry_after_seconds": 30,
      "retry_after_human": "30 seconds"
    }
  }
}
```

---

## Rate Limiting

| Tier | Limit |
|------|-------|
| Default | 60 requests/minute |
| Authenticated | 300 requests/minute |
| Premium | 1000 requests/minute |

Rate limit headers:

```http
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 297
X-RateLimit-Reset: 1640000000
```

---

## Versioning

- Major version in URL: `/api/v1/`, `/api/v2/`
- Breaking changes require new major version
- Non-breaking additions allowed within version

---

## API Endpoints Reference

### Notifications API

Multi-channel notification system with preferences and delivery tracking.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/notifications` | List user notifications |
| GET | `/api/v1/notifications/unread-count` | Get unread count |
| POST | `/api/v1/notifications/mark-all-read` | Mark all as read |
| GET | `/api/v1/notifications/{id}` | Get notification details |
| PATCH | `/api/v1/notifications/{id}/read` | Mark single as read |
| DELETE | `/api/v1/notifications/{id}` | Dismiss notification |

**Categories:** general, billing, security, app, marketing, system  
**Levels:** info, success, warning, error  
**Channels:** email, push, sms, in_app, database

---

### File Storage API

Multi-tenant file storage with S3 support.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/files` | List files (folder support) |
| POST | `/api/v1/files` | Upload file |
| GET | `/api/v1/files/{id}` | Get file metadata |
| GET | `/api/v1/files/{id}/download` | Download file |
| DELETE | `/api/v1/files/{id}` | Delete file |

**Features:**
- Folder hierarchy with versioning
- Share links with tokens and expiration
- Storage quotas per tenant
- File checksum verification
- S3-compatible storage backend

---

### Audit Log API

Complete activity tracking with entity change history.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/audit-logs` | List audit logs |
| GET | `/api/v1/audit-logs/{id}` | Get audit log details |

**Tracked Actions:**
- Entity changes with old/new values
- IP address and user agent logging
- GDPR compliant data retention
- Filterable by action, user, entity

---

### Global Search API

Cross-model fuzzy search across tenant-scoped data.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/search?q={query}` | Global search |

**Searchable Models:**
- Tenant (name, slug)
- User (name, email)
- App (name, description)

Returns tenant-scoped results with fuzzy matching (LIKE queries).

---

## SDK API Endpoints

Additional endpoints available via SDK API (`/sdk-api/v1/`):

### Audit Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/sdk-api/v1/audit/log` | Log audit entry from SDK |
| GET | `/sdk-api/v1/audit/recent` | Get recent audit logs |

---

*Last updated: 2026-04-12 — Added v1.1.0 endpoints (Notifications, File Storage, Audit Logs, Global Search)*
