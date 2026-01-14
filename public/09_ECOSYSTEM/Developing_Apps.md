# Developing Dooz Ecosystem Apps

> How to create a new application as a package within Dooz Core.

---

## Overview

Dooz Core uses a **package-based architecture**. Each application (calibration-ops, worklog, quicky, etc.) is a self-contained Laravel package living in `packages/dooz/`. This allows:

- Independent development and versioning
- Shared Core infrastructure (multi-tenancy, auth, UI)
- Clean separation of domain logic
- Easy enable/disable per tenant

---

## Quick Start

### 1. Create Package Directory

```bash
cd dooz-core/packages/dooz
mkdir your-app-name
cd your-app-name
```

### 2. Create Package Structure

```
your-app-name/
├── composer.json
├── README.md
├── src/
│   ├── YourAppServiceProvider.php
│   ├── Http/
│   │   └── Controllers/
│   ├── Models/
│   └── Services/
├── database/
│   └── migrations/
├── resources/
│   └── views/
├── routes/
│   └── web.php
└── tests/
```

### 3. Create composer.json

```json
{
    "name": "dooz/your-app-name",
    "description": "Description of your app",
    "type": "library",
    "version": "1.0.0",
    "license": "MIT",
    "autoload": {
        "psr-4": {
            "Dooz\\YourAppName\\": "src/"
        }
    },
    "extra": {
        "laravel": {
            "providers": [
                "Dooz\\YourAppName\\YourAppServiceProvider"
            ]
        }
    },
    "require": {
        "php": "^8.2",
        "illuminate/support": "^10.0|^11.0|^12.0",
        "illuminate/database": "^10.0|^11.0|^12.0"
    }
}
```

### 4. Create Service Provider

```php
<?php

namespace Dooz\YourAppName;

use Illuminate\Support\ServiceProvider;

class YourAppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Register bindings
    }

    public function boot(): void
    {
        // Load routes
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
        
        // Load views
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'your-app');
        
        // Load migrations
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
    }
}
```

### 5. Register in Core

Add to `dooz-core/composer.json`:

```json
{
    "require": {
        "dooz/your-app-name": "@dev"
    },
    "autoload": {
        "psr-4": {
            "Dooz\\YourAppName\\": "packages/dooz/your-app-name/src/"
        }
    }
}
```

### 6. Install

```bash
composer dump-autoload
php artisan migrate
```

---

## Package Conventions

### Naming

| Element | Convention | Example |
|---------|------------|---------|
| Package name | `dooz/{kebab-case}` | `dooz/calibration-ops` |
| Namespace | `Dooz\{PascalCase}` | `Dooz\CalibrationOps` |
| Provider | `{Name}ServiceProvider` | `CalibrationOpsServiceProvider` |
| Table prefix | `{app}_` | `calibration_ops_devices` |

### Multi-Tenancy

All models must use tenant-aware base classes:

```php
use App\Models\TenantAwareModel;

class Device extends TenantAwareModel
{
    protected $table = 'calibration_ops_devices';
}
```

### Routes

Prefix routes with the app name:

```php
Route::prefix('calibration-ops')
    ->middleware(['web', 'auth', 'tenant'])
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index']);
    });
```

---

## Required Files Checklist

- [ ] `composer.json` — Package manifest
- [ ] `README.md` — Package documentation
- [ ] `src/{Name}ServiceProvider.php` — Laravel service provider
- [ ] `routes/web.php` — Route definitions
- [ ] `database/migrations/` — Database migrations (with app prefix)
- [ ] `resources/views/` — Blade views (optional if API-only)
- [ ] `tests/` — Feature and unit tests

---

## Registration with App Registry

After creating the package, register it in `app-registry/registry.json`:

```json
{
    "name": "your-app-name",
    "version": "1.0.0",
    "description": "Your app description",
    "repo": "DoozHub/your-app-name"
}
```

---

## Existing Packages Reference

| Package | Purpose |
|---------|---------|
| `calibration-ops` | Device calibration workflow management |
| `worklog` | Time tracking and work logging |
| `quicky` | Lightweight task relay system |
| `ui` | Shared UI components |
| `core-contracts` | Interface contracts for Core |
| `boilerplate` | Starter template for new packages |

---

## Stop Conditions (per DOOZ_CORE_DOCTRINE)

Before developing, define:

1. What specific user problem does this app solve?
2. What is the minimum viable feature set?
3. When is "good enough to ship"?

Do NOT start coding without answering these.
