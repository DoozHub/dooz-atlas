# Deprecation

> How to deprecate features in Dooz.

---

## Deprecation Timeline

| Phase | Duration | State |
|-------|----------|-------|
| Announce | Day 0 | Feature marked deprecated |
| Warning | 3 months | Warnings in logs/UI |
| Removal | 6 months | Feature removed |

Minimum deprecation period: **6 months** from announcement.

---

## Deprecation Markers

### PHP

```php
/**
 * @deprecated 1.5.0 Use DeviceService::find() instead
 * @see DeviceService::find()
 */
public function getDevice(string $id): Device
{
    trigger_error(
        'getDevice() is deprecated, use DeviceService::find() instead',
        E_USER_DEPRECATED
    );
    
    return $this->deviceService->find($id);
}
```

### TypeScript

```typescript
/**
 * @deprecated Use fetchDevice() instead
 */
export function getDevice(id: string): Promise<Device> {
  console.warn('getDevice() is deprecated, use fetchDevice() instead');
  return fetchDevice(id);
}
```

### Rust

```rust
#[deprecated(since = "1.5.0", note = "Use find_device instead")]
pub fn get_device(id: &str) -> Option<Device> {
    find_device(id)
}
```

---

## API Deprecation

### Headers

```http
Deprecation: true
Sunset: Sat, 01 Jul 2025 00:00:00 GMT
Link: <https://docs.dooz.app/migration>; rel="deprecation"
```

### Response Body

```json
{
    "data": {...},
    "meta": {
        "deprecation_warning": "This endpoint is deprecated. Use /api/v2/devices instead. Sunset: 2025-07-01"
    }
}
```

---

## Deprecation Notice

Create deprecation notice in:

1. **CHANGELOG.md** — Document the deprecation
2. **Migration guide** — How to update
3. **Code docs** — @deprecated tags
4. **API docs** — Mark as deprecated

### Notice Template

```markdown
## Deprecation Notice: `getDevice()`

**Deprecated in:** v1.5.0
**Removal in:** v2.0.0 (July 2025)
**Replaced by:** `DeviceService::find()`

### Migration

Before:
```php
$device = $this->getDevice($id);
```

After:
```php
$device = $this->deviceService->find($id);
```

### Reason
The new method provides better error handling and caching.
```

---

## Database Schema Deprecation

1. Add new column/table
2. Migrate data in background
3. Update code to use new schema
4. Mark old columns deprecated
5. Stop writing to old columns
6. Remove old columns (next major)

Never remove columns without:
- Data migration complete
- No code references
- Major version bump

---

## Configuration Deprecation

```php
// config/calibration-ops.php

return [
    // Deprecated: Use 'notification_channels' instead
    // Will be removed in v2.0
    'email_notifications' => env('ENABLE_EMAIL', true),
    
    // New configuration
    'notification_channels' => ['email', 'slack'],
];
```

Log warning on usage:

```php
if (config('calibration-ops.email_notifications') !== null) {
    Log::warning('Config key "email_notifications" is deprecated. Use "notification_channels" instead.');
}
```

---

## Removal Checklist

Before removing deprecated feature:

- [ ] Deprecation period complete (6+ months)
- [ ] No usage in logs (last 30 days)
- [ ] Migration guide published
- [ ] Announced in changelog
- [ ] Major version bump planned
