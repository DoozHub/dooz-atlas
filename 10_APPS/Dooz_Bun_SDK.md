# @dooz/sdk (Bun SDK)

> TypeScript/Bun SDK for integrating with Dooz Core

---

## Overview

The Dooz SDK provides a unified interface for integrating applications with Dooz Core authentication, licensing, and feature management.

```
┌──────────────────────────────────────────────────────────────┐
│                      DOOZ BUN SDK                            │
├──────────────────────────────────────────────────────────────┤
│  🔐 Authentication       │  💳 Licensing                     │
│  👥 Tenant Management    │  🔧 Feature Flags                 │
│  📊 Audit Logging        │  🔄 Caching                       │
└──────────────────────────────────────────────────────────────┘
```

---

## Installation

```bash
# From GitHub
bun add github:DoozHub/dooz-bun-sdk

# Or from npm (when published)
bun add @dooz/sdk
```

---

## Quick Start

```typescript
import { DoozClient } from '@dooz/sdk';

const dooz = new DoozClient({
    apiEndpoint: 'https://api.dooz.app',
    serviceToken: process.env.DOOZ_SERVICE_TOKEN,
});

// Check license
if (await dooz.hasLicense('my-app')) {
    // User has access
}

// Get tenant info
const tenant = await dooz.getCurrentTenant();

// Check feature flag
if (await dooz.hasFeature('advanced-analytics')) {
    // Show advanced features
}

// Check permission
if (await dooz.can('app.my-app.manage')) {
    // Show management UI
}

// Log audit entry
await dooz.audit('document.verified', { documentId: '123' });
```

---

## Configuration

```typescript
const dooz = new DoozClient({
    apiEndpoint: 'https://api.dooz.app',  // Required
    serviceToken: 'srv_...',               // For service auth
    userToken: 'eyJhb...',                 // For user context
    tenantId: 'tenant-uuid',               // Lock to tenant
    debug: false,                          // Debug logging
    timeout: 30000,                        // Request timeout (ms)
    cacheEnabled: true,                    // Response caching
    cacheTtl: 300,                         // Cache TTL (seconds)
});
```

---

## API Reference

### Tenant

- `getCurrentTenant()` - Get current tenant
- `getTenantConfig()` - Get tenant config

### License

- `hasLicense(appName)` - Check license
- `getLicenseInfo(appName)` - Get license details
- `getSeats(appName)` - Get seat info

### Features

- `getFeatures()` - Get all features
- `hasFeature(feature)` - Check feature

### Permissions

- `can(permission)` - Check permission
- `canAll(permissions)` - Check multiple
- `getRoles()` - Get user roles
- `hasRole(role)` - Check role

### Audit

- `audit(action, metadata, options)` - Log entry

### Trial

- `isTrial()` - Check trial status
- `trialDaysRemaining()` - Get days remaining

---

## Scoped Clients

```typescript
// For specific user
const userClient = dooz.withUserToken(token);

// For specific tenant  
const tenantClient = dooz.forTenant('tenant-id');
```

---

## Error Handling

```typescript
import { DoozError, DoozAuthError, DoozLicenseError } from '@dooz/sdk';

try {
    await dooz.hasLicense('my-app');
} catch (error) {
    if (error instanceof DoozAuthError) {
        // Handle auth error
    }
}
```

---

## Development

```bash
bun install
bun run build
bun test
```

---

## Related Documentation

- [Dooz Core Integration](../09_ECOSYSTEM/Architecture.md)
- [Multi-Tenancy](../09_ECOSYSTEM/Multi_Tenancy.md)
- [Security](../09_ECOSYSTEM/Security.md)

---

*Repository: DoozHub/dooz-bun-sdk*
