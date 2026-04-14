# ADR-001: Multi-Tenancy Strategy

## Status
**Accepted** — Implemented in dooz-core v12.x

## Context

As DOOZ evolved from a single-tenant application to a SaaS platform, we needed to decide how to isolate customer data while maintaining operational efficiency.

### Requirements

- Data isolation between tenants (customers)
- Ability to scale horizontally
- Minimal operational complexity
- Support for tenant-specific customizations
- Cost-effective for small and large tenants

### Options Considered

1. **Shared Database, Tenant Discriminator Column**
   - Single database with `tenant_id` column
   - Row-level security or application-level filtering

2. **Schema-per-Tenant**
   - Single database, separate schema per tenant
   - Shared connection pool

3. **Database-per-Tenant** (Selected)
   - Separate database per tenant
   - Connection switching based on tenant

4. **Complete Application Instance per Tenant**
   - Separate deployment per tenant
   - Maximum isolation, highest cost

## Decision

We chose **Database-per-Tenant** using the `stancl/tenancy` Laravel package.

### Rationale

- **Strong Data Isolation** — Complete database separation ensures tenant data never co-mingles
- **Operational Simplicity** — Backup/restore per tenant is straightforward
- **Performance** — No cross-tenant query overhead
- **Customization** — Tenants can have different database schemas
- **Compliance** — Easier to meet data residency requirements

## Consequences

### Positive

✅ **Security**: Database-level isolation prevents data leaks
✅ **Scalability**: Can distribute tenants across database servers
✅ **Flexibility**: Different tenants can have different database versions
✅ **Compliance**: Easier GDPR compliance with data deletion

### Negative

❌ **Connection Management**: Need to switch database connections per request
❌ **Cross-Tenant Queries**: Complex queries across tenants require federation
❌ **Migrations**: Must run migrations for each tenant database
❌ **Monitoring**: More databases to monitor and maintain

## Implementation

```php
// Tenant resolution middleware
public function handle($request, Closure $next)
{
    $tenant = $this->resolveTenant($request);
    $tenant->configure()->use();
    
    return $next($request);
}
```

### Database Structure

```
PostgreSQL Server
├── dooz-core (platform database)
│   ├── tenants table
│   ├── users table (superadmin)
│   └── licenses table
├── tenant-acme-corp (tenant database)
│   ├── users table
│   ├── projects table
│   └── custom_tables...
└── tenant-globex (tenant database)
    └── ...
```

## Alternatives Reconsidered

### Why Not Shared Database?

- Risk of data leakage through query bugs
- Harder to implement true data deletion
- Performance impact from tenant filtering
- Schema changes affect all tenants simultaneously

### Why Not Schema-per-Tenant?

- PostgreSQL schema limitations on number of schemas
- More complex permission management
- Less tooling support than database-per-tenant

## Related Decisions

- ADR-002: Desktop Technology (Tauri)
- ADR-004: Event Architecture

## References

- [stancl/tenancy Documentation](https://tenancyforlaravel.com/)
- [AWS Multi-Tenant SaaS Strategies](https://aws.amazon.com/saas/)
- dooz-core: `app/Http/Middleware/Tenancy.php`

---

**Date:** 2025-01  
**Author:** Core Team  
**Review Date:** 2026-01
