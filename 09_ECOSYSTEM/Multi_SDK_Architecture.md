# Multi-SDK Architecture Strategy

> **Version:** 1.0.0  
> **Status:** Proposed  
> **Scope:** Cross-language SDK development for Dooz Core integration

---

## Executive Summary

This document proposes an architecture for building **dooz-core-api** as a language-agnostic REST/gRPC facade over the PHP core, enabling SDKs in multiple languages (Node.js/Bun, Python, Rust, Go, .NET) to consume Dooz Core functionality while keeping PHP as the single source of truth.

---

## Current State Analysis

### dooz-perspective (Bun/TypeScript)

```
dooz-perspective/
├── src/
│   ├── index.ts         # Hono REST API server
│   ├── pipeline.ts      # Multi-agent verification orchestrator
│   ├── agents/          # Verifier, Auditor, Synthesizer agents
│   └── lib/             # Database, OpenRouter client, types
└── ui/                  # React frontend
```

**Problem:** dooz-perspective operates independently without integration to dooz-core:
- No tenant awareness
- No licensing integration  
- No user authentication from core
- No audit logging to core
- No feature flags from core

### dooz-core (PHP Laravel)

```
dooz-core/
├── packages/dooz/
│   ├── sdk/             # PHP SDK for internal apps
│   ├── core-contracts/  # PHP interfaces/contracts
│   ├── calibration-ops/ # App package example
│   └── worklog/         # App package example
├── routes/
│   └── api.php          # REST API routes
└── app/                 # Laravel application
```

**Current SDK Capabilities (PHP only):**
- `Dooz::tenant()` - Get current tenant
- `Dooz::hasLicense($app)` - Check license
- `Dooz::hasFeature($feature)` - Check feature flags
- `Dooz::can($permission)` - Check permissions
- `Dooz::audit($action, $data)` - Audit logging
- `BelongsToTenant` trait - Auto-scoping
- `RequiresLicense` trait - License protection

---

## Proposed Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CONSUMER APPLICATIONS                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   dooz-      │  │   Future     │  │   Future     │  │   Future     │     │
│  │ perspective  │  │  Python App  │  │   Rust App   │  │   Go App     │     │
│  │   (Bun)      │  │              │  │              │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                 │                 │              │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐     │
│  │  BunSDK     │  │  PythonSDK   │  │   RustSDK    │  │   GoSDK      │     │
│  │  (TypeScript)│  │              │  │              │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         └──────────────────┼─────────────────┼─────────────────┘              │
│                            │                 │                                │
│                     ┌──────▼─────────────────▼─────────┐                     │
│                     │       HTTP (REST) / gRPC         │                     │
│                     └──────────────┬───────────────────┘                     │
└────────────────────────────────────┼────────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────────┐
│                          DOOZ-CORE-API (Gateway)                             │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                        API Gateway Layer                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │   Auth      │  │   Rate      │  │  Request    │  │  Response   │   │ │
│  │  │ Middleware  │  │  Limiting   │  │ Validation  │  │ Transform   │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                        SDK API Endpoints                                │ │
│  │                                                                         │ │
│  │  /api/sdk/v1/                                                          │ │
│  │  ├── auth/                                                              │ │
│  │  │   ├── token            # Service token exchange                     │ │
│  │  │   └── validate         # Token validation                           │ │
│  │  ├── tenant/                                                            │ │
│  │  │   ├── current          # Get current tenant context                 │ │
│  │  │   └── config           # Get tenant configuration                   │ │
│  │  ├── license/                                                           │ │
│  │  │   ├── check            # Check license for app                      │ │
│  │  │   ├── seats            # Get seat information                       │ │
│  │  │   └── features         # Get enabled features                       │ │
│  │  ├── permissions/                                                       │ │
│  │  │   ├── check            # Check user permission                      │ │
│  │  │   └── roles            # Get user roles                             │ │
│  │  ├── audit/                                                             │ │
│  │  │   └── log              # Log audit entry                            │ │
│  │  └── sync/                                                              │ │
│  │      ├── push             # Push data to core                          │ │
│  │      └── pull             # Pull data from core                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└────────────────────────────────────┬────────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────────┐
│                            DOOZ CORE (PHP Laravel)                          │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │   Tenant       │  │    License     │  │    Auth        │                │
│  │   Management   │  │    Engine      │  │   Passport     │                │
│  └────────────────┘  └────────────────┘  └────────────────┘                │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         Core Database                                   │ │
│  │   users │ tenants │ subscriptions │ app_licenses │ tenant_seats       │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Strategy

### Phase 1: dooz-core-api (Gateway Service)

Create new API routes in dooz-core dedicated to SDK consumption:

```php
// routes/sdk-api.php
Route::prefix('api/sdk/v1')->middleware(['throttle:sdk'])->group(function () {
    // Service Authentication
    Route::post('auth/token', [SdkAuthController::class, 'exchangeToken']);
    Route::post('auth/validate', [SdkAuthController::class, 'validateToken']);
    
    // Tenant Context
    Route::middleware(['sdk.auth'])->group(function () {
        Route::get('tenant/current', [SdkTenantController::class, 'current']);
        Route::get('tenant/config', [SdkTenantController::class, 'config']);
        
        // License Management
        Route::get('license/check/{appName}', [SdkLicenseController::class, 'check']);
        Route::get('license/features', [SdkLicenseController::class, 'features']);
        Route::get('license/seats/{appName}', [SdkLicenseController::class, 'seats']);
        
        // Permissions
        Route::post('permissions/check', [SdkPermissionController::class, 'check']);
        Route::get('permissions/roles', [SdkPermissionController::class, 'roles']);
        
        // Audit
        Route::post('audit/log', [SdkAuditController::class, 'log']);
        
        // Data Sync
        Route::post('sync/push', [SdkSyncController::class, 'push']);
        Route::post('sync/pull', [SdkSyncController::class, 'pull']);
    });
});
```

### Phase 2: BunSDK (TypeScript/JavaScript)

Create a standalone npm package `@dooz/sdk` that wraps dooz-core-api:

```typescript
// @dooz/sdk/src/index.ts
export class DoozClient {
    private baseUrl: string;
    private token: string;
    
    constructor(config: DoozConfig) {
        this.baseUrl = config.apiEndpoint;
        this.token = config.serviceToken;
    }
    
    // Authentication
    async validateToken(): Promise<boolean> { ... }
    
    // Tenant
    async getTenant(): Promise<Tenant> { ... }
    async getTenantConfig(): Promise<TenantConfig> { ... }
    
    // License
    async hasLicense(appName: string): Promise<boolean> { ... }
    async getFeatures(): Promise<Feature[]> { ... }
    async getSeats(appName: string): Promise<SeatInfo> { ... }
    
    // Permissions
    async can(permission: string): Promise<boolean> { ... }
    async getRoles(): Promise<Role[]> { ... }
    
    // Audit
    async audit(action: string, data: Record<string, any>): Promise<void> { ... }
    
    // Sync
    async push(entity: string, data: any): Promise<SyncResult> { ... }
    async pull(entity: string, since?: Date): Promise<SyncResult> { ... }
}
```

### Phase 3: Future SDKs

Using OpenAPI spec generated from dooz-core-api, auto-generate SDKs:

| SDK | Generator | Package |
|-----|-----------|---------|
| **Python** | openapi-generator (python) | `dooz-sdk` on PyPI |
| **Rust** | openapi-generator (rust) | `dooz-sdk` on crates.io |
| **Go** | openapi-generator (go) | `github.com/doozhub/dooz-sdk-go` |
| **.NET** | NSwag or openapi-generator | `Dooz.Sdk` on NuGet |

---

## SDK Interface Contract

All SDKs must implement this interface contract:

```
┌───────────────────────────────────────────────────────────────┐
│                     IDoozSdk Interface                        │
├───────────────────────────────────────────────────────────────┤
│  // Authentication                                            │
│  validateToken() → bool                                       │
│  getServiceToken(appId, secret) → Token                       │
│                                                               │
│  // Tenant Context                                            │
│  getCurrentTenant() → Tenant                                  │
│  getTenantConfig() → Config                                   │
│                                                               │
│  // Licensing                                                 │
│  hasLicense(appName) → bool                                   │
│  getFeatures() → Feature[]                                    │
│  hasFeature(featureName) → bool                               │
│  getSeatInfo(appName) → SeatInfo                              │
│                                                               │
│  // Permissions                                               │
│  can(permission) → bool                                       │
│  hasRole(role) → bool                                         │
│  getRoles() → Role[]                                          │
│                                                               │
│  // Audit                                                     │
│  audit(action, metadata) → void                               │
│                                                               │
│  // Trial                                                     │
│  isTrial() → bool                                             │
│  trialDaysRemaining() → int                                   │
│                                                               │
│  // Sync                                                      │
│  push(entity, data) → SyncResult                              │
│  pull(entity, since?) → SyncResult                            │
└───────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

### Service-to-Service Auth

```
┌──────────────┐     ┌───────────────┐     ┌─────────────┐
│  Consumer    │     │  dooz-core-   │     │  dooz-core  │
│  Application │     │     api       │     │   (PHP)     │
└──────┬───────┘     └───────┬───────┘     └──────┬──────┘
       │                     │                     │
       │  1. Register App    │                     │
       │  (one-time)         │                     │
       ├────────────────────────────────────────────►
       │                     │                     │
       │  2. Receive App ID + Secret               │
       │◄────────────────────────────────────────────┤
       │                     │                     │
       │  3. Exchange for    │                     │
       │     Service Token   │                     │
       ├────────────────────►│                     │
       │                     │  4. Validate        │
       │                     ├────────────────────►│
       │                     │                     │
       │                     │  5. Generate JWT    │
       │                     │◄────────────────────┤
       │  6. JWT Token       │                     │
       │◄────────────────────┤                     │
       │                     │                     │
       │  7. API Calls with  │                     │
       │     Bearer Token    │                     │
       ├────────────────────►│  8. Validate +     │
       │                     │     Forward         │
       │                     ├────────────────────►│
       │                     │                     │
```

### User Context Forwarding

For user-scoped operations, SDKs support forwarding user context:

```typescript
// Option 1: Direct user token
const client = new DoozClient({
    apiEndpoint: 'https://api.dooz.app',
    userToken: 'eyJhb...', // User's OAuth token
});

// Option 2: Service token with user impersonation
const client = new DoozClient({
    apiEndpoint: 'https://api.dooz.app',
    serviceToken: 'srv_...',
});
client.asUser('user-uuid').can('app.perspective.verify');
```

---

## Integration Example: dooz-perspective

### Before (Current Naive State)

```typescript
// index.ts - No core integration
app.post('/api/v1/sessions', async (c) => {
    const sessionId = uuidv4();
    // No tenant context
    // No licensing check
    // No audit trail
    await db.insert(schema.sessions).values({...});
    return c.json({ sessionId });
});
```

### After (With BunSDK Integration)

```typescript
// index.ts - Full core integration
import { DoozClient, requireLicense } from '@dooz/sdk';

const dooz = new DoozClient({
    apiEndpoint: process.env.DOOZ_CORE_API,
    serviceToken: process.env.DOOZ_SERVICE_TOKEN,
});

// Middleware: Verify license
app.use('*', async (c, next) => {
    const userToken = c.req.header('Authorization')?.split(' ')[1];
    if (userToken) {
        c.set('dooz', dooz.withUserToken(userToken));
    }
    await next();
});

app.post('/api/v1/sessions', async (c) => {
    const client: DoozClient = c.get('dooz');
    
    // 1. Check license
    if (!await client.hasLicense('dooz-perspective')) {
        return c.json({ error: 'License required' }, 403);
    }
    
    // 2. Get tenant context
    const tenant = await client.getCurrentTenant();
    
    // 3. Create session with tenant
    const sessionId = uuidv4();
    await db.insert(schema.sessions).values({
        id: sessionId,
        tenantId: tenant.id,  // Now tenant-aware!
        // ...
    });
    
    // 4. Audit logging
    await client.audit('session.created', {
        sessionId,
        tenantId: tenant.id,
    });
    
    return c.json({ sessionId });
});
```

---

## Directory Structure

### dooz-core (PHP) - New additions

```
dooz-core/
├── app/
│   └── Http/
│       └── Controllers/
│           └── Sdk/
│               ├── SdkAuthController.php
│               ├── SdkTenantController.php
│               ├── SdkLicenseController.php
│               ├── SdkPermissionController.php
│               ├── SdkAuditController.php
│               └── SdkSyncController.php
├── routes/
│   └── sdk-api.php          # SDK-specific routes
└── packages/dooz/
    └── core-contracts/
        └── src/
            └── Contracts/
                └── SdkServiceInterface.php
```

### @dooz/sdk (TypeScript/Bun) - New package

```
packages/dooz-sdk-ts/
├── src/
│   ├── index.ts
│   ├── client.ts
│   ├── auth.ts
│   ├── tenant.ts
│   ├── license.ts
│   ├── permissions.ts
│   ├── audit.ts
│   ├── sync.ts
│   └── types.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Comparison Matrix

| Feature | PHP SDK (existing) | BunSDK (proposed) | PythonSDK | RustSDK | GoSDK |
|---------|-------------------|-------------------|-----------|---------|-------|
| Tenant context | ✅ Local | ✅ API | ✅ API | ✅ API | ✅ API |
| License check | ✅ Local | ✅ API | ✅ API | ✅ API | ✅ API |
| Feature flags | ✅ Local | ✅ API | ✅ API | ✅ API | ✅ API |
| Permissions | ✅ Local | ✅ API | ✅ API | ✅ API | ✅ API |
| Audit logging | ✅ Local | ✅ API | ✅ API | ✅ API | ✅ API |
| Data sync | ✅ Local | ✅ API | ✅ API | ✅ API | ✅ API |
| Caching | ✅ Redis | ✅ In-memory | ✅ In-memory | ✅ In-memory | ✅ In-memory |
| Offline mode | N/A | 🔶 Planned | 🔶 Planned | 🔶 Planned | 🔶 Planned |

---

## Recommended Implementation Order

### Priority 1: Immediate (dooz-perspective integration)

1. **dooz-core-api routes** - Add SDK-specific API endpoints to dooz-core
2. **@dooz/sdk (TypeScript)** - Create npm package for Bun/Node consumption
3. **dooz-perspective integration** - Wire up dooz-perspective to use new SDK

### Priority 2: Near-term (Python ecosystem)

4. **OpenAPI spec** - Generate from dooz-core-api routes
5. **dooz-sdk (Python)** - For AI/ML integrations, data science tools

### Priority 3: Future (Systems languages)

6. **dooz-sdk (Rust)** - For performance-critical applications
7. **dooz-sdk (Go)** - For infrastructure tooling
8. **Dooz.Sdk (.NET)** - For enterprise integrations

---

## Design Principles

Following DOOZ_CORE_DOCTRINE:

1. **Ship working code** - Start with minimal viable BunSDK
2. **No premature abstraction** - Build only what dooz-perspective needs first
3. **API stability** - Version SDK API from day one
4. **Backward compatibility** - New SDKs consume same API as existing PHP SDK logic
5. **Single source of truth** - PHP/Laravel remains authoritative

---

## Verification Plan

### Automated Tests
- Unit tests in BunSDK package (`bun test`)
- Integration tests against dooz-core-api
- API contract tests (OpenAPI validation)

### Manual Verification
1. Deploy dooz-core with SDK API routes
2. Configure dooz-perspective with BunSDK
3. Verify:
   - License check returns correct status
   - Tenant context is passed properly
   - Audit entries appear in dooz-core
   - Session data includes tenant_id

---

## Questions for Approval

1. **API versioning**: Should SDK API be versioned separately from main API?
2. **SDK package location**: Create in new `dooz-sdk-ts` repo or within `dooz-core/packages`?
3. **Authentication**: Service token + user impersonation vs pure user token forwarding?
4. **Caching strategy**: Client-side caching TTL defaults?

---

## Next Steps (Pending Approval)

1. Create SDK API routes in dooz-core (`routes/sdk-api.php`)
2. Create `@dooz/sdk` TypeScript package
3. Integrate with dooz-perspective
4. Generate OpenAPI spec for future SDK auto-generation
