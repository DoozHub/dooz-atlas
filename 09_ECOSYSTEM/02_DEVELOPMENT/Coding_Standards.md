# Coding Standards

> PHP, TypeScript, and Rust style guide for Dooz.

---

## General Principles

1. **Clarity over cleverness** — Code should be obvious
2. **Boring over novel** — Prefer established patterns
3. **Explicit over implicit** — State intent clearly
4. **Consistency over preference** — Match existing code

---

## PHP (Laravel)

### Formatting

- PSR-12 standard
- 4-space indentation
- 120-character line limit
- Run `composer pint` before commit

### Naming

| Element | Convention | Example |
|---------|------------|---------|
| Class | PascalCase | `DeviceController` |
| Method | camelCase | `getActiveDevices()` |
| Variable | camelCase | `$deviceCount` |
| Constant | SCREAMING_SNAKE | `MAX_RETRIES` |
| Config key | snake_case | `calibration_ops.reminder_days` |

### Classes

```php
<?php

declare(strict_types=1);

namespace Dooz\CalibrationOps\Services;

use Dooz\CalibrationOps\Models\Device;

final class DeviceService
{
    public function __construct(
        private readonly DeviceRepository $repository,
    ) {}

    public function findActive(): Collection
    {
        return $this->repository->findByStatus(DeviceStatus::ACTIVE);
    }
}
```

### Controllers

- One public method per controller (invokable) OR resource methods only
- No business logic in controllers
- Return types always specified

```php
public function __invoke(Request $request): JsonResponse
{
    $devices = $this->deviceService->findActive();
    
    return response()->json(['data' => $devices]);
}
```

### Models

- Define `$fillable` explicitly
- Use typed properties
- Define relationships with return types

```php
protected $fillable = ['device_code', 'model', 'status'];

public function certificates(): HasMany
{
    return $this->hasMany(Certificate::class);
}
```

---

## TypeScript (React)

### Formatting

- 2-space indentation
- Single quotes for strings
- Semicolons required
- Run `bun lint` before commit

### Naming

| Element | Convention | Example |
|---------|------------|---------|
| Component | PascalCase | `DeviceList` |
| Hook | camelCase, `use` prefix | `useDevices` |
| Variable | camelCase | `deviceCount` |
| Constant | SCREAMING_SNAKE | `MAX_ITEMS` |
| Type | PascalCase | `DeviceStatus` |
| File | PascalCase for components | `DeviceList.tsx` |

### Components

```typescript
interface DeviceListProps {
  devices: Device[];
  onSelect: (device: Device) => void;
}

export function DeviceList({ devices, onSelect }: DeviceListProps) {
  return (
    <ul>
      {devices.map((device) => (
        <li key={device.id} onClick={() => onSelect(device)}>
          {device.name}
        </li>
      ))}
    </ul>
  );
}
```

### Hooks

```typescript
export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevices().then(setDevices).finally(() => setLoading(false));
  }, []);

  return { devices, loading };
}
```

---

## Rust (Tauri)

### Formatting

- Run `cargo fmt` before commit
- Follow Rust API Guidelines

### Naming

| Element | Convention | Example |
|---------|------------|---------|
| Struct | PascalCase | `DeviceInfo` |
| Function | snake_case | `get_active_devices` |
| Variable | snake_case | `device_count` |
| Constant | SCREAMING_SNAKE | `MAX_RETRIES` |
| Module | snake_case | `device_service` |

### Tauri Commands

```rust
#[tauri::command]
pub fn get_device(
    state: State<AppState>,
    id: String,
) -> ApiResponse<Device> {
    let db = state.db.lock().unwrap();
    
    match DeviceRepository::find_by_id(&db, &id) {
        Ok(device) => ApiResponse::ok(device),
        Err(e) => ApiResponse::err(e.to_string()),
    }
}
```

---

## Prohibited Patterns

| Pattern | Reason |
|---------|--------|
| Magic strings | Use constants or enums |
| Nested ternaries | Reduces readability |
| God classes | Violates single responsibility |
| Unused imports | Noise, remove them |
| `any` type (TS) | Defeats type safety |
| `unwrap()` in prod (Rust) | Use error handling |

---

## Code Review Checklist

- [ ] Follows naming conventions
- [ ] No magic strings/numbers
- [ ] Types are explicit
- [ ] Error handling is present
- [ ] No unused code
- [ ] Matches surrounding style
