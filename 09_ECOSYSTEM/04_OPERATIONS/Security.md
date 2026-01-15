# Security

> Security policies and practices for Dooz.

---

## Core Principles

1. **Defense in depth** — Multiple layers of security
2. **Least privilege** — Minimum required access
3. **Secure by default** — Security is not opt-in
4. **Fail securely** — Errors should not expose data

---

## Authentication

### Web Application

- Laravel Passport (OAuth2)
- Token-based API authentication
- Session-based web authentication
- 2FA via TOTP (optional per tenant)

### Desktop Apps

- Local SQLite databases encrypted at rest
- API tokens stored in secure keychain
- No plaintext credential storage

---

## Authorization

### Roles

| Role | Access |
|------|--------|
| Super Admin | All tenants, all features |
| Tenant Admin | Single tenant, all features |
| Manager | Elevated access within department |
| User | Standard access |

### Permissions

Managed via `spatie/laravel-permission`:

```php
// In controller
$this->authorize('view', $device);

// In policy
public function view(User $user, Device $device): bool
{
    return $user->tenant_id === $device->tenant_id;
}
```

---

## Data Protection

### At Rest

| Data | Encryption |
|------|------------|
| Database | MySQL TDE (production) |
| Desktop SQLite | AES-256-GCM |
| File uploads | Encrypted S3 |
| Secrets | Environment variables |

### In Transit

- TLS 1.3 required
- HSTS enabled
- Certificate pinning (mobile apps)

### Sensitive Fields

Never log or expose:

- Passwords
- API tokens
- Credit card numbers
- Personal identification numbers

---

## Input Validation

### Rules

1. Validate all input (never trust client)
2. Use Laravel validation rules
3. Sanitize output for XSS prevention
4. Use parameterized queries (always)

### Example

```php
$validated = $request->validate([
    'device_code' => ['required', 'string', 'max:50', 'regex:/^[A-Z0-9-]+$/'],
    'model' => ['required', 'string', 'max:100'],
    'category_id' => ['required', 'uuid', 'exists:calibration_ops_categories,id'],
]);
```

---

## Tenant Isolation

### Database Level

- Separate database per tenant
- No cross-tenant queries possible

### Application Level

- All queries scoped to current tenant
- Policy checks include tenant verification
- Foreign keys cannot reference other tenant data

### Verification

```php
// In model policy
public function view(User $user, Device $device): bool
{
    return $user->tenant_id === tenant('id');
}
```

---

## API Security

### Rate Limiting

```php
// Applied via middleware
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});
```

### Token Scopes

```php
// Issue token with scopes
$token = $user->createToken('API Token', ['read:devices', 'write:devices']);

// Check scope
if ($request->user()->tokenCan('write:devices')) {
    // Allow write operation
}
```

---

## Security Headers

Applied via middleware:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

---

## Vulnerability Handling

### Reporting

Security issues reported to: `security@dooziesoft.com`

### Response Timeline

| Severity | Response | Fix |
|----------|----------|-----|
| Critical | 4 hours | 24 hours |
| High | 24 hours | 7 days |
| Medium | 48 hours | 30 days |
| Low | 7 days | 90 days |

---

## Prohibited Practices

| Never Do | Reason |
|----------|--------|
| Store passwords in plaintext | Obvious |
| Log full request bodies | May contain secrets |
| Use `eval()` or dynamic execution | Code injection risk |
| Trust client-side validation only | Easily bypassed |
| Disable CSRF protection | Session hijacking |
| Use HTTP in production | Data interception |
| Hardcode secrets in code | Git history exposure |
