# Dooz Identity Token (DIT)

> Unified identity and policy context across desktop and cloud

*Version: 1.0 | Status: Active*

---

## Overview

The **Dooz Identity Token (DIT)** is a signed JWT that provides unified identity, tenant context, and policy information across all Dooz ecosystem components. Every request to Brain, Core, Bridge, and agent systems must include a valid DIT.

---

## Problem Statement

The Dooz ecosystem has a split-brain identity challenge:

| Component | Current Auth | Data Location |
|-----------|--------------|---------------|
| dooz-core | Laravel Passport (OAuth2) | Cloud MySQL |
| dooz-brain | Local only | Desktop SQLite |
| dooz-yantra | Session-based | Memory |
| dooz-bridge | API keys | Cloud |

**Without DIT:**
- No unified tenant context across local + cloud
- No way for agents to prove identity to multiple systems
- No policy version enforcement
- No device-specific access control

**With DIT:**
- Single token proves identity everywhere
- Tenant/user/device context in every request
- Policy version tracked for compliance
- Revocable access at any point

---

## Token Specification

### DIT Structure

```typescript
interface DoozIdentityToken {
  // ========== HEADER (JWT Standard) ==========
  header: {
    alg: 'RS256' | 'ES256';    // Algorithm
    typ: 'JWT';
    kid: string;                // Key ID for rotation
  };
  
  // ========== PAYLOAD ==========
  payload: {
    // Standard JWT claims
    iss: string;                // Issuer (dooz-core URL)
    sub: string;                // Subject (user_id)
    aud: string[];              // Audience (allowed services)
    exp: number;                // Expiration (Unix timestamp)
    nbf: number;                // Not before
    iat: number;                // Issued at
    jti: string;                // JWT ID (for revocation)
    
    // Dooz-specific claims
    dit: {
      version: '1.0';           // DIT spec version
      
      // Identity
      tenant_id: string;        // Tenant UUID
      user_id: string;          // User UUID
      device_id?: string;       // Device UUID (for local apps)
      session_id: string;       // Session UUID
      
      // Authorization
      scopes: string[];         // Granted scopes
      roles: string[];          // User roles in tenant
      permissions: string[];    // Explicit permissions
      
      // Policy
      policy_version: string;   // Active policy version
      policy_hash: string;      // Hash of policy for verification
      
      // Context
      tenant_name: string;      // Human-readable
      user_email: string;       // For logging/display
      
      // Restrictions
      allowed_apps: string[];   // Apps this token can access
      ip_restrictions?: string[];  // Allowed IP ranges
      mfa_verified: boolean;    // MFA status
    };
  };
  
  // ========== SIGNATURE ==========
  signature: string;            // RS256/ES256 signature
}
```

### Example Token Payload

```json
{
  "iss": "https://app.dooz.io",
  "sub": "usr_a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "aud": ["dooz-brain", "dooz-core", "dooz-bridge", "dooz-yantra"],
  "exp": 1736553600,
  "nbf": 1736467200,
  "iat": 1736467200,
  "jti": "dit_xyz789",
  "dit": {
    "version": "1.0",
    "tenant_id": "ten_fedcba98-7654-3210-fedc-ba9876543210",
    "user_id": "usr_a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "device_id": "dev_11223344-5566-7788-99aa-bbccddeeff00",
    "session_id": "ses_aabbccdd-eeff-0011-2233-445566778899",
    "scopes": [
      "brain:read",
      "brain:write",
      "core:read",
      "core:write",
      "yantra:execute"
    ],
    "roles": ["admin", "developer"],
    "permissions": [
      "memory.read",
      "memory.write",
      "memory.delete",
      "agent.execute",
      "agent.configure"
    ],
    "policy_version": "2025.01.10",
    "policy_hash": "sha256:abc123def456...",
    "tenant_name": "Acme Corp",
    "user_email": "alice@acme.com",
    "allowed_apps": ["*"],
    "mfa_verified": true
  }
}
```

---

## Scope Definitions

### Standard Scopes

| Scope | Description | Risk Level |
|-------|-------------|------------|
| `brain:read` | Read memories from Brain | Low |
| `brain:write` | Create/update memories | Medium |
| `brain:delete` | Delete memories | High |
| `brain:admin` | Full Brain access | Critical |
| `core:read` | Read Core data | Low |
| `core:write` | Modify Core data | Medium |
| `core:admin` | Full Core access | Critical |
| `yantra:execute` | Run agent actions | High |
| `yantra:configure` | Configure agents | High |
| `bridge:emit` | Emit events | Medium |
| `bridge:subscribe` | Subscribe to events | Low |

### App-Specific Scopes

Apps can define custom scopes with the pattern `{app}:{action}`:

```
quicky:tasks:read
quicky:tasks:write
worklog:entries:create
contracts:documents:upload
```

---

## Token Lifecycle

### Issuance

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │────▶│ dooz-core   │────▶│   DIT       │
│   Login     │     │ (Passport)  │     │   Issued    │
└─────────────┘     └──────┬──────┘     └─────────────┘
                          │
                   OAuth2 + DIT claims
                          │
                    ┌─────▼─────┐
                    │ Response: │
                    │ - access  │
                    │ - refresh │
                    │ - dit     │
                    └───────────┘
```

### Token Flow

```
┌─────────────┐
│ Client App  │
│ (Hub/Brain) │
└──────┬──────┘
       │
       │ Request + DIT Header
       │ Authorization: Bearer <dit>
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│                    TARGET SERVICE                         │
│                                                          │
│  1. Extract DIT from Authorization header                │
│  2. Verify signature against public key                  │
│  3. Check expiration (exp > now)                         │
│  4. Check audience (service in aud[])                    │
│  5. Validate tenant_id against request context           │
│  6. Check required scopes for operation                  │
│  7. Verify policy_version is current                     │
│  8. Process request with tenant/user context             │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Refresh

```typescript
// Token refresh (before expiration)
const refreshResponse = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${refreshToken}`,
  },
});

const { access_token, dit, expires_in } = await refreshResponse.json();
```

### Revocation

```typescript
// Revoke specific token
await fetch('/api/auth/revoke', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${dit}` },
  body: JSON.stringify({ jti: 'dit_xyz789' }),
});

// Revoke all tokens for device
await fetch('/api/auth/revoke-device', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${dit}` },
  body: JSON.stringify({ device_id: 'dev_11223344...' }),
});
```

---

## Validation

### Validation Steps

Each service MUST perform these checks:

```typescript
interface DITValidationResult {
  valid: boolean;
  error?: string;
  claims?: DITClaims;
}

async function validateDIT(token: string, requiredScopes: string[]): Promise<DITValidationResult> {
  // 1. Decode and verify signature
  const decoded = await verifyJWT(token, publicKey);
  if (!decoded) {
    return { valid: false, error: 'Invalid signature' };
  }
  
  // 2. Check expiration
  if (decoded.exp < Date.now() / 1000) {
    return { valid: false, error: 'Token expired' };
  }
  
  // 3. Check not-before
  if (decoded.nbf > Date.now() / 1000) {
    return { valid: false, error: 'Token not yet valid' };
  }
  
  // 4. Check audience
  if (!decoded.aud.includes(SERVICE_NAME)) {
    return { valid: false, error: 'Invalid audience' };
  }
  
  // 5. Check revocation (optional, requires revocation list)
  if (await isRevoked(decoded.jti)) {
    return { valid: false, error: 'Token revoked' };
  }
  
  // 6. Check required scopes
  const hasScopes = requiredScopes.every(s => decoded.dit.scopes.includes(s));
  if (!hasScopes) {
    return { valid: false, error: 'Insufficient scopes' };
  }
  
  // 7. Check policy version (optional, for strict compliance)
  if (decoded.dit.policy_version !== CURRENT_POLICY_VERSION) {
    // Log warning, may require re-auth
  }
  
  return { valid: true, claims: decoded.dit };
}
```

### Validation in Each Service

#### dooz-brain (Rust)

```rust
// src-tauri/src/auth/dit.rs

use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};

#[derive(Debug, Deserialize)]
pub struct DITClaims {
    pub tenant_id: String,
    pub user_id: String,
    pub device_id: Option<String>,
    pub scopes: Vec<String>,
    pub policy_version: String,
}

pub fn validate_dit(token: &str, required_scopes: &[&str]) -> Result<DITClaims, AuthError> {
    let key = DecodingKey::from_rsa_pem(PUBLIC_KEY)?;
    let mut validation = Validation::new(Algorithm::RS256);
    validation.set_audience(&["dooz-brain"]);
    
    let token_data = decode::<DITClaims>(token, &key, &validation)?;
    
    // Check scopes
    for scope in required_scopes {
        if !token_data.claims.scopes.contains(&scope.to_string()) {
            return Err(AuthError::InsufficientScopes);
        }
    }
    
    Ok(token_data.claims)
}
```

#### dooz-core (Laravel)

```php
// app/Http/Middleware/ValidateDIT.php

namespace App\Http\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ValidateDIT
{
    public function handle($request, Closure $next, ...$requiredScopes)
    {
        $token = $request->bearerToken();
        
        if (!$token) {
            return response()->json(['error' => 'DIT required'], 401);
        }
        
        try {
            $decoded = JWT::decode($token, new Key(config('auth.dit_public_key'), 'RS256'));
            
            // Validate audience
            if (!in_array('dooz-core', $decoded->aud)) {
                throw new \Exception('Invalid audience');
            }
            
            // Validate scopes
            foreach ($requiredScopes as $scope) {
                if (!in_array($scope, $decoded->dit->scopes)) {
                    return response()->json(['error' => 'Insufficient scopes'], 403);
                }
            }
            
            // Inject tenant context
            $request->merge([
                'dit' => $decoded->dit,
                'tenant_id' => $decoded->dit->tenant_id,
                'user_id' => $decoded->dit->user_id,
            ]);
            
            return $next($request);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid DIT: ' . $e->getMessage()], 401);
        }
    }
}
```

#### dooz-yantra / MCP (TypeScript)

```typescript
// src/auth/dit-validator.ts

import jwt from 'jsonwebtoken';

interface DITClaims {
  tenant_id: string;
  user_id: string;
  device_id?: string;
  scopes: string[];
  policy_version: string;
}

export async function validateDIT(
  token: string, 
  requiredScopes: string[]
): Promise<DITClaims> {
  const publicKey = await getPublicKey();
  
  const decoded = jwt.verify(token, publicKey, {
    algorithms: ['RS256'],
    audience: ['dooz-yantra', 'dooz-brain'],
  }) as { dit: DITClaims };
  
  // Check scopes
  for (const scope of requiredScopes) {
    if (!decoded.dit.scopes.includes(scope)) {
      throw new Error(`Missing scope: ${scope}`);
    }
  }
  
  return decoded.dit;
}

// MCP tool wrapper with DIT enforcement
export function withDIT<T>(
  requiredScopes: string[],
  handler: (claims: DITClaims, params: T) => Promise<unknown>
) {
  return async (params: T & { dit: string }) => {
    const claims = await validateDIT(params.dit, requiredScopes);
    return handler(claims, params);
  };
}
```

---

## Integration Patterns

### Pattern 1: Web App (Hub)

```typescript
// On login, store DIT alongside access token
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  const { access_token, dit, refresh_token } = await response.json();
  
  // Store tokens
  localStorage.setItem('dit', dit);
  localStorage.setItem('refresh_token', refresh_token);
  
  // Set default header for all requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${dit}`;
};
```

### Pattern 2: Desktop App (Brain)

```typescript
// Tauri app receives DIT after OAuth flow
import { invoke } from '@tauri-apps/api/tauri';

const authenticateDesktop = async () => {
  // Open OAuth window
  const { dit, refresh_token } = await invoke('oauth_login');
  
  // Store securely in system keychain
  await invoke('store_credentials', { dit, refresh_token });
  
  // All subsequent Brain operations include DIT
  await invoke('search_memory', { 
    query: 'project plans',
    dit,  // Passed to Rust backend
  });
};
```

### Pattern 3: Agent (Yantra)

```typescript
// Agent receives DIT from parent context
class YantraAgent {
  private dit: string;
  
  constructor(dit: string) {
    this.dit = dit;
  }
  
  async executeAction(action: Action): Promise<Result> {
    // All MCP calls include DIT
    const result = await this.mcp.call('search_memory', {
      query: action.query,
      dit: this.dit,
    });
    
    // Log for audit
    await this.logAgentRun({
      dit: this.dit,
      action,
      result,
    });
    
    return result;
  }
}
```

### Pattern 4: Cross-Service Call

```typescript
// Bridge event emission with DIT
const emitEvent = async (event: DoozEvent, dit: string) => {
  // DIT travels with the event for authorization
  await bridge.emit({
    ...event,
    _dit: dit,  // Internal field for validation
  });
};

// Receiving service validates DIT
bridge.on('meeting.ended', async (event) => {
  const claims = await validateDIT(event._dit, ['brain:write']);
  
  // Now safe to create memory with tenant context
  await brain.createMemory({
    tenant_id: claims.tenant_id,
    user_id: claims.user_id,
    ...event.payload,
  });
});
```

---

## Security Considerations

### Key Management

| Concern | Mitigation |
|---------|------------|
| Key exposure | Store private key in HSM/KMS |
| Key rotation | Use `kid` header, support multiple keys |
| Key distribution | Public key available at well-known endpoint |

### Token Security

| Concern | Mitigation |
|---------|------------|
| Token theft | Short expiration (15-60 min) |
| Replay attacks | Include `jti` for one-time use (optional) |
| Man-in-the-middle | HTTPS only, pin certificates |
| Privilege escalation | Scopes are minimum necessary |

### Revocation Strategy

```typescript
// Revocation list (Redis-backed for performance)
const REVOCATION_TTL = 24 * 60 * 60; // 24 hours

async function revokeToken(jti: string): Promise<void> {
  await redis.setex(`revoked:${jti}`, REVOCATION_TTL, '1');
}

async function isRevoked(jti: string): Promise<boolean> {
  return await redis.exists(`revoked:${jti}`) === 1;
}
```

---

## Migration Path

### Phase 1: Issuance (Week 1)

1. Add DIT claims to Passport token response
2. Update login endpoints to return DIT
3. Store DIT in client apps alongside access token

### Phase 2: Validation (Week 2)

1. Add DIT validation middleware to Core
2. Add DIT validation to Brain MCP
3. Log all requests without DIT (warning, don't block)

### Phase 3: Enforcement (Week 3)

1. Require DIT for all Brain MCP calls
2. Require DIT for all Core API calls
3. Require DIT for Yantra agent execution

### Phase 4: Policy Integration (Week 4)

1. Add policy_version to DIT
2. Implement policy version checking
3. Add device_id for desktop apps
4. Implement revocation

---

## API Reference

### Endpoints

#### POST /api/auth/token

Issue new DIT (after OAuth flow).

```json
// Request
{
  "grant_type": "authorization_code",
  "code": "abc123",
  "redirect_uri": "https://app.dooz.io/callback"
}

// Response
{
  "access_token": "...",
  "dit": "eyJhbGciOiJSUzI1NiIs...",
  "refresh_token": "...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

#### POST /api/auth/refresh

Refresh DIT.

```json
// Request
{
  "grant_type": "refresh_token",
  "refresh_token": "..."
}

// Response
{
  "access_token": "...",
  "dit": "eyJhbGciOiJSUzI1NiIs...",
  "expires_in": 3600
}
```

#### POST /api/auth/revoke

Revoke DIT.

```json
// Request
{
  "token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type_hint": "dit"
}

// Response
{
  "revoked": true
}
```

#### GET /.well-known/dit-keys

Public key for DIT validation.

```json
{
  "keys": [
    {
      "kty": "RSA",
      "kid": "dit-key-2025-01",
      "use": "sig",
      "alg": "RS256",
      "n": "...",
      "e": "AQAB"
    }
  ]
}
```

---

## Checklist

For a service to be DIT-compliant:

- [ ] Accept DIT in Authorization header
- [ ] Validate signature against public key
- [ ] Check expiration and not-before
- [ ] Verify audience includes service name
- [ ] Check required scopes for each operation
- [ ] Extract tenant_id and user_id from claims
- [ ] Log all requests with DIT user context
- [ ] Handle expired/invalid tokens gracefully
- [ ] Implement token refresh for long sessions

---

## References

- [OAuth 2.0 RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)
- [JWT RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)
- [Laravel Passport](https://laravel.com/docs/passport)
- [Organizational Memory Patterns](Organizational_Memory_Patterns.md)

---

*Document: Dooz Identity Token Specification*
*Version: 1.0*
*Last Updated: 2025-01-10*
