# Multi-Tenancy in Dooz

> How tenant isolation works in Dooz Core.

---

## Architecture

Dooz uses **database-per-tenant** isolation via [stancl/tenancy](https://tenancyforlaravel.com/).

```
┌─────────────────────────────────────────────────────────────┐
│                      CORE DATABASE                           │
│  tenants │ users │ applications │ subscriptions             │
└─────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           │                  │                  │
           ▼                  ▼                  ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ tenant_acme_db  │ │ tenant_beta_db  │ │ tenant_gamma_db │
│                 │ │                 │ │                 │
│ tenant_users    │ │ tenant_users    │ │ tenant_users    │
│ departments     │ │ departments     │ │ departments     │
│ app_tables...   │ │ app_tables...   │ │ app_tables...   │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## Tenant Resolution

Tenants are resolved by:

1. **Subdomain** — `acme.dooz.app`
2. **Domain** — `app.acme.com` (custom domain)
3. **Path** — `/tenant/acme/...` (API fallback)

### Resolution Middleware

```php
// Applied automatically via stancl/tenancy
Route::middleware(['tenant'])->group(function () {
    // All routes here are tenant-scoped
});
```

---

## Creating a Tenant

```php
use App\Models\Tenant;

$tenant = Tenant::create([
    'name' => 'Acme Corp',
    'slug' => 'acme',
    'domain' => 'acme.dooz.app',
]);

// Database is auto-created and migrated
```

Or via Artisan:

```bash
php artisan dooz:tenant:create "Acme Corp" --domain="acme.dooz.app"
```

---

## Tenant-Aware Models

All app models MUST extend `TenantAwareModel`:

```php
<?php

namespace Dooz\YourApp\Models;

use App\Models\TenantAwareModel;

class Device extends TenantAwareModel
{
    protected $table = 'calibration_ops_devices';
    
    protected $fillable = ['device_code', 'model', 'status'];
}
```

### What TenantAwareModel Provides

- Automatic connection to tenant database
- Scoping to current tenant
- Prevents cross-tenant data access

---

## Running Tenant Migrations

```bash
# Run migrations for all tenants
php artisan tenants:migrate

# Run for specific tenant
php artisan tenants:migrate --tenants=acme

# Rollback
php artisan tenants:migrate:rollback
```

---

## Tenant Context in Code

### Check Current Tenant

```php
use Stancl\Tenancy\Facades\Tenancy;

$tenant = tenant(); // Current tenant model
$tenantId = tenant('id');

if (Tenancy::initialized()) {
    // Inside tenant context
}
```

### Run Code in Tenant Context

```php
use App\Models\Tenant;

$tenant = Tenant::find('acme');

$tenant->run(function () {
    // Code runs in tenant context
    $users = TenantUser::all();
});
```

---

## Central vs Tenant Tables

| Database | Tables |
|----------|--------|
| Central | `tenants`, `users`, `applications`, `subscriptions`, `oauth_*` |
| Tenant | `tenant_users`, `departments`, `locations`, `{app}_*` tables |

---

## Security Rules

1. **Never** query tenant tables without tenant context
2. **Never** hard-code tenant database connections
3. **Always** use `TenantAwareModel` for tenant data
4. **Never** expose tenant IDs in URLs (use slugs)
5. **Always** validate tenant access in authorization

---

## Common Pitfalls

| Issue | Cause | Fix |
|-------|-------|-----|
| "Table not found" | No tenant context | Ensure route has `tenant` middleware |
| Cross-tenant data leak | Direct DB query | Use TenantAwareModel |
| Migration not applied | Ran on central DB | Use `tenants:migrate` |
| Wrong tenant in queue job | Context lost | Use `TenantAwareJob` |
