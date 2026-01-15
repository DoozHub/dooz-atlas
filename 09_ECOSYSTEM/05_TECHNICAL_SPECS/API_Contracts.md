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
