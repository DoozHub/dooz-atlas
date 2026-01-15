# Testing Guide

> Testing patterns and requirements for Dooz.

---

## Testing Philosophy

1. **Test behavior, not implementation**
2. **Happy path first, edge cases second**
3. **80% coverage is sufficient** (per DOOZ_CORE_DOCTRINE)
4. **Tests must run fast** — slow tests don't get run

---

## PHP (Laravel)

### Test Structure

```
tests/
├── Feature/           # HTTP, integration tests
│   └── DeviceTest.php
├── Unit/              # Isolated unit tests
│   └── DeviceServiceTest.php
└── TestCase.php       # Base test class
```

### Running Tests

```bash
# All tests
php artisan test

# Specific file
php artisan test tests/Feature/DeviceTest.php

# Filter by name
php artisan test --filter=test_can_create_device

# With coverage
php artisan test --coverage
```

### Feature Test Example

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DeviceTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_devices(): void
    {
        Device::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/devices');

        $response->assertOk()
            ->assertJsonCount(3, 'data');
    }

    public function test_can_create_device(): void
    {
        $payload = [
            'device_code' => 'DEV-001',
            'model' => 'Caliper X100',
        ];

        $response = $this->postJson('/api/v1/devices', $payload);

        $response->assertCreated()
            ->assertJsonPath('data.device_code', 'DEV-001');
        
        $this->assertDatabaseHas('devices', ['device_code' => 'DEV-001']);
    }
}
```

### Unit Test Example

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use Dooz\CalibrationOps\Services\DueDateCalculator;

class DueDateCalculatorTest extends TestCase
{
    public function test_calculates_due_date_from_frequency(): void
    {
        $calculator = new DueDateCalculator();
        $lastDate = new DateTime('2025-01-01');
        
        $dueDate = $calculator->calculate($lastDate, frequencyDays: 90);
        
        $this->assertEquals('2025-04-01', $dueDate->format('Y-m-d'));
    }
}
```

---

## TypeScript (React)

### Test Structure

```
src/
├── components/
│   ├── DeviceList.tsx
│   └── DeviceList.test.tsx
└── hooks/
    ├── useDevices.ts
    └── useDevices.test.ts
```

### Running Tests

```bash
# All tests
bun test

# Watch mode
bun test --watch

# Coverage
bun test --coverage
```

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import { DeviceList } from './DeviceList';

describe('DeviceList', () => {
  it('renders device names', () => {
    const devices = [
      { id: '1', name: 'Caliper A' },
      { id: '2', name: 'Gauge B' },
    ];

    render(<DeviceList devices={devices} onSelect={() => {}} />);

    expect(screen.getByText('Caliper A')).toBeInTheDocument();
    expect(screen.getByText('Gauge B')).toBeInTheDocument();
  });
});
```

---

## Rust (Tauri)

### Running Tests

```bash
cd src-tauri
cargo test
```

### Test Example

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_brain_md() {
        let content = "## Layer\nCore\n";
        let result = parse_brain_md(content, "test");
        
        assert_eq!(result.layer, "Core");
    }
}
```

---

## What to Test

| Type | Test |
|------|------|
| API endpoints | Request/response, status codes |
| Services | Business logic, calculations |
| Models | Relationships, scopes |
| Components | Rendering, user interaction |
| Hooks | State changes, API calls |

## What NOT to Test

| Skip | Reason |
|------|--------|
| Framework code | Laravel/React is tested upstream |
| Getters/setters | No logic to test |
| Private methods | Test through public API |
| Third-party packages | Not your responsibility |

---

## Test Naming

```php
// Pattern: test_{action}_{condition}_{expected_result}
public function test_create_device_with_invalid_code_returns_422(): void
```

---

## Stop Conditions (per DOOZ_CORE_DOCTRINE)

- Tests pass = STOP writing more tests
- 80% coverage = STOP pursuing 100%
- Happy path covered = STOP unless edge case is critical
