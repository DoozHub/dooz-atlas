# Dooz Intent Language (DIL)

> Usage and patterns for the DIL transpiler.

---

## Overview

DIL (Dooz Intent Language) transpiles human-readable business intent declarations into production-ready PHP/Laravel code.

**Repository:** `dooz_intent_lang`

---

## Basic Syntax

### Intent Declaration

```dil
intent CreateDevice {
    description: "Creates a new calibration device"
    
    input {
        device_code: string required unique
        model: string required
        category_id: uuid required exists:calibration_ops_categories
        serial_number: string optional
    }
    
    output {
        device: Device
    }
    
    steps {
        1. validate input
        2. create device record
        3. log creation in audit
        4. return device
    }
}
```

### Generated PHP

```php
class CreateDeviceIntent
{
    public function execute(CreateDeviceInput $input): Device
    {
        $validated = $this->validate($input);
        
        $device = Device::create([
            'device_code' => $validated->device_code,
            'model' => $validated->model,
            'category_id' => $validated->category_id,
            'serial_number' => $validated->serial_number,
        ]);
        
        AuditLog::record('device.created', $device);
        
        return $device;
    }
}
```

---

## Input Types

| Type | Validation | Example |
|------|------------|---------|
| `string` | String value | `name: string` |
| `integer` | Numeric whole | `count: integer` |
| `decimal` | Numeric decimal | `amount: decimal(10,2)` |
| `boolean` | True/false | `is_active: boolean` |
| `date` | Date only | `due_date: date` |
| `datetime` | Date and time | `scheduled_at: datetime` |
| `uuid` | UUID reference | `device_id: uuid` |
| `email` | Email address | `contact: email` |

## Modifiers

| Modifier | Effect |
|----------|--------|
| `required` | Field must be provided |
| `optional` | Field can be null |
| `unique` | Must be unique in table |
| `exists:{table}` | FK must exist |
| `min:{n}` | Minimum value/length |
| `max:{n}` | Maximum value/length |

---

## Intent Patterns

### CRUD Intent

```dil
intent ListDevices {
    description: "Lists devices with filtering"
    
    input {
        status: string optional
        category_id: uuid optional
        page: integer optional default:1
        per_page: integer optional default:25 max:100
    }
    
    output {
        devices: Device[] paginated
    }
}
```

### Action Intent

```dil
intent SendForCalibration {
    description: "Sends a device for calibration"
    
    input {
        device_id: uuid required exists:calibration_ops_devices
        vendor_id: uuid required exists:calibration_ops_vendors
        notes: string optional
    }
    
    preconditions {
        device.status must be ACTIVE
        device must not have pending_calibration
    }
    
    effects {
        device.status becomes SENT
        create calibration_request record
        notify vendor via email
    }
}
```

### Query Intent

```dil
intent GetOverdueDevices {
    description: "Retrieves devices past calibration due date"
    
    input {
        days_overdue: integer optional default:0
    }
    
    output {
        devices: Device[]
    }
    
    query {
        where next_due_date < today - days_overdue
        where status = ACTIVE
        order by next_due_date asc
    }
}
```

---

## Transpilation

### Command

```bash
cd dooz_intent_lang
cargo run -- transpile path/to/intents.dil --output src/Intents/
```

### Options

| Flag | Description |
|------|-------------|
| `--output` | Output directory |
| `--language` | Target language (php, typescript) |
| `--validate` | Validate only, no output |
| `--verbose` | Detailed output |

---

## Integration with Core

### Registering Intents

```php
// In ServiceProvider
public function register(): void
{
    $this->app->bind(CreateDeviceIntent::class);
}
```

### Executing Intents

```php
$intent = app(CreateDeviceIntent::class);
$device = $intent->execute(new CreateDeviceInput([
    'device_code' => 'DEV-001',
    'model' => 'Caliper X100',
    'category_id' => $categoryId,
]));
```

---

## Best Practices

1. **One intent per business action** — Keep intents focused
2. **Use preconditions** — Validate business rules explicitly
3. **Document effects** — State what changes
4. **Avoid logic in intents** — Intents describe, not implement
5. **Version intents** — Breaking changes require new version
