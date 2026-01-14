# Migrations Guide

> Database migration conventions for Dooz.

---

## Migration Basics

### Creating Migrations

```bash
# Core migrations
php artisan make:migration create_devices_table

# Package migrations (run from package directory)
php artisan make:migration create_calibration_ops_devices_table --path=packages/dooz/calibration-ops/database/migrations
```

### Running Migrations

```bash
# Central database
php artisan migrate

# Tenant databases
php artisan tenants:migrate

# Specific tenant
php artisan tenants:migrate --tenants=acme
```

---

## Naming Conventions

### Migration Files

```
{timestamp}_{action}_{table_name}_table.php
```

| Action | Example |
|--------|---------|
| Create | `create_devices_table` |
| Add column | `add_status_to_devices_table` |
| Modify | `modify_code_column_in_devices_table` |
| Drop column | `drop_legacy_field_from_devices_table` |
| Drop table | `drop_old_devices_table` |

### Table Names

- Plural nouns: `devices`, `certificates`
- App prefix for packages: `calibration_ops_devices`
- Snake_case: `device_categories`

---

## Migration Structure

### Create Table

```php
public function up(): void
{
    Schema::create('calibration_ops_devices', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->string('device_code')->unique();
        $table->string('model');
        $table->string('serial_number')->nullable();
        $table->foreignUuid('category_id')
            ->constrained('calibration_ops_categories')
            ->onDelete('restrict');
        $table->string('status')->default('active');
        $table->timestamps();
        $table->softDeletes();
        
        $table->index('status');
        $table->index(['category_id', 'status']);
    });
}

public function down(): void
{
    Schema::dropIfExists('calibration_ops_devices');
}
```

### Add Column

```php
public function up(): void
{
    Schema::table('calibration_ops_devices', function (Blueprint $table) {
        $table->date('last_calibration_date')->nullable()->after('status');
    });
}

public function down(): void
{
    Schema::table('calibration_ops_devices', function (Blueprint $table) {
        $table->dropColumn('last_calibration_date');
    });
}
```

---

## Column Type Reference

| Type | Usage |
|------|-------|
| `uuid` | Primary keys, foreign keys |
| `string` | Short text (< 255 chars) |
| `text` | Long text |
| `integer` | Whole numbers |
| `decimal(10, 2)` | Money, precise decimals |
| `boolean` | True/false flags |
| `date` | Dates without time |
| `timestamp` | Date + time |
| `json` | JSON data (avoid if possible) |

---

## Foreign Keys

```php
// Standard FK
$table->foreignUuid('user_id')
    ->constrained()
    ->onDelete('cascade');

// Custom table name
$table->foreignUuid('category_id')
    ->constrained('calibration_ops_categories')
    ->onDelete('restrict');

// Nullable FK
$table->foreignUuid('approved_by')
    ->nullable()
    ->constrained('tenant_users')
    ->onDelete('set null');
```

### Delete Behaviors

| Behavior | Use Case |
|----------|----------|
| `cascade` | Delete children when parent deleted |
| `restrict` | Prevent deletion if children exist |
| `set null` | Set FK to null on parent delete |

---

## Indexes

```php
// Single column
$table->index('status');

// Composite (order matters)
$table->index(['tenant_id', 'status']);

// Unique
$table->unique('device_code');

// Unique composite
$table->unique(['tenant_id', 'device_code']);
```

---

## Tenant Migrations

Package migrations run in tenant context:

```php
// In package ServiceProvider
public function boot(): void
{
    $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
}
```

Migration file:

```php
// No tenant_id needed - automatically scoped
Schema::create('calibration_ops_devices', function (Blueprint $table) {
    $table->uuid('id')->primary();
    // ... columns
});
```

---

## Prohibited Patterns

| Pattern | Reason |
|---------|--------|
| `$table->id()` | Use `uuid` for all PKs |
| Raw SQL in migrations | Use Schema builder |
| Data manipulation | Use seeders instead |
| `dropColumn` without `down()` | Migrations must be reversible |
| Enum columns | Use string with validation |

---

## Rollback Safety

Always test rollback:

```bash
php artisan migrate
php artisan migrate:rollback
php artisan migrate
```

If rollback fails, migration is not production-ready.
