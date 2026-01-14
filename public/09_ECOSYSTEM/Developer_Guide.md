# Dooz Developer Guide

> Your complete guide to building on the Dooz platform

---

## Table of Contents

1. [Welcome to Dooz](#welcome-to-dooz)
2. [Quick Start](#quick-start)
3. [Platform Philosophy](#platform-philosophy)
4. [Developer Onboarding](#developer-onboarding)
5. [Creating a Dooz App](#creating-a-dooz-app)
6. [Building Client Apps](#building-client-apps)
7. [REST API Reference](#rest-api-reference)
8. [Best Practices](#best-practices)
9. [Resources](#resources)

---

## Welcome to Dooz

Dooz is a **modular SaaS platform** designed for building and deploying business applications at scale. Think of it as an operating system for your business tools - each app is independent yet seamlessly integrated.

### What Makes Dooz Different?

| Traditional SaaS | Dooz Approach |
|-----------------|---------------|
| Monolithic codebase | Modular app packages |
| One-size-fits-all | Install only what you need |
| Vendor lock-in | Open standards, portable data |
| Users belong to app | Users belong to organization |

### Core Principles

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE DOOZ PHILOSOPHY                          │
├─────────────────────────────────────────────────────────────────┤
│  🏢 Tenant-First: Organizations own their data and users       │
│  📦 Modular: Apps are independent, composable packages         │
│  🔐 Secure: Per-tenant isolation, role-based access            │
│  ⚡ Fast: Redis caching, optimized queries (<100ms responses)  │
│  🌐 Open: Standard APIs, exportable data, no lock-in           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### For Core Platform Developers

```bash
# 1. Clone and install
git clone https://github.com/DoozHub/dooz-core.git
cd dooz-core
composer install
bun install

# 2. Configure environment
cp .env.example .env
php artisan key:generate

# 3. Setup database
php artisan migrate
php artisan db:seed

# 4. Start development server
php artisan serve
bun run dev
```

**Access Points:**
- Web App: http://localhost:8000
- API: http://localhost:8000/api
- API Docs: http://localhost:8000/api/platform-admin/docs

### For App Developers

```bash
# 1. Copy the app template
cp -r packages/dooz/app-template packages/dooz/my-app

# 2. Update package name
cd packages/dooz/my-app
# Edit composer.json with your app details

# 3. Register with composer
cd ../../..  # back to root
composer require dooz/my-app:*

# 4. Run migrations
php artisan migrate
```

### For Client App Developers (Desktop/Mobile)

```bash
# 1. Get API credentials from your Dooz instance
# Settings → API Keys → Generate Key

# 2. Use the SDK or direct REST calls
curl -X POST https://your-dooz.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "secret"}'

# Response contains access_token for subsequent requests
```

---

## Platform Philosophy

### The Dooz Ethos

> **"Build once, deploy everywhere, own your data."**

We believe in:

1. **Developer Happiness**
   - Clear documentation and examples
   - Consistent APIs and conventions
   - Tools that get out of your way

2. **Business Flexibility**
   - Pay only for what you use (per-app pricing)
   - Mix and match apps for your workflow
   - Export your data anytime

3. **Technical Excellence**
   - Sub-100ms response times
   - 99.9% uptime SLA
   - Comprehensive testing

### Multi-Tenancy Model

Dooz uses a **database-per-tenant** architecture for maximum isolation:

```
┌────────────────────────────────────────────────────────────────┐
│                        DOOZ PLATFORM                           │
├────────────────────────────────────────────────────────────────┤
│  CORE DATABASE (dooz_core)                                     │
│  ├── users (global user accounts)                              │
│  ├── tenants (organizations)                                   │
│  ├── subscriptions (billing)                                   │
│  └── apps (marketplace registry)                               │
├────────────────────────────────────────────────────────────────┤
│  TENANT A DATABASE          │  TENANT B DATABASE               │
│  (dooz_tenant_acme)         │  (dooz_tenant_globex)            │
│  ├── app-specific data      │  ├── app-specific data           │
│  ├── settings               │  ├── settings                    │
│  └── custom fields          │  └── custom fields               │
└────────────────────────────────────────────────────────────────┘
```

**Benefits:**
- Complete data isolation
- Independent scaling
- Easy data export/deletion (GDPR compliance)
- No cross-tenant data leakage possible

### Permission Model

```
Platform Level
├── platform_superadmin (God mode)
└── platform_admin (Manage all tenants)

Tenant Level
├── tenant_admin (Full organization access)
├── tenant_manager (Manage users, limited admin)
└── tenant_user (Standard user)

App Level
├── app.{name}.access (View the app)
├── app.{name}.create (Create items)
├── app.{name}.edit (Modify items)
├── app.{name}.delete (Remove items)
└── app.{name}.manage (App admin)
```

---

## Developer Onboarding

### Day 1: Environment Setup

**Prerequisites:**
- PHP 8.2+
- Composer 2.x
- Bun (or Node.js 20+)
- MySQL 8.0+ or PostgreSQL 15+
- Redis 7+

**Setup Steps:**
1. Clone the repository
2. Run `composer install && bun install`
3. Configure `.env` with database credentials
4. Run migrations and seeds
5. Start the development server

### Day 2: Understanding the Codebase

**Key Directories:**
```
dooz-core/
├── app/
│   ├── Http/Controllers/     # Request handling
│   ├── Models/               # Eloquent models
│   ├── Services/             # Business logic
│   └── Providers/            # Service registration
├── packages/dooz/            # App packages
│   ├── core-contracts/       # Shared interfaces
│   ├── sdk/                  # Developer SDK
│   ├── app-template/         # Starter template
│   └── {your-apps}/          # Installed apps
├── config/                   # Configuration
├── database/migrations/      # DB schemas
└── routes/                   # API & web routes
```

### Day 3: Building Your First Feature

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Write tests first (TDD encouraged)
3. Implement the feature
4. Run `php artisan test` to verify
5. Submit a pull request

### Ongoing: Best Practices

- Use the SDK traits (`BelongsToTenant`, `RequiresLicense`)
- Follow PSR-12 coding standards
- Write tests for new features
- Document API changes in OpenAPI spec

---

## Creating a Dooz App

### App Structure

Every Dooz app follows this structure:

```
packages/dooz/my-app/
├── composer.json           # Package metadata + Dooz manifest
├── manifest.json           # Permissions, roles, plans
├── src/
│   ├── Providers/
│   │   └── MyAppServiceProvider.php
│   ├── Facades/
│   │   └── MyApp.php
│   ├── Http/Controllers/
│   ├── Models/
│   ├── Services/
│   └── Database/Migrations/
├── routes/
│   ├── web.php
│   └── api.php
├── config/my-app.php
├── resources/views/
└── README.md
```

### Step-by-Step Guide

#### 1. Initialize Package

```json
// composer.json
{
    "name": "dooz/my-app",
    "description": "My awesome Dooz app",
    "type": "library",
    "require": {
        "php": "^8.2",
        "dooz/core-contracts": "^1.0"
    },
    "autoload": {
        "psr-4": {
            "Dooz\\MyApp\\": "src/"
        }
    },
    "extra": {
        "laravel": {
            "providers": [
                "Dooz\\MyApp\\Providers\\MyAppServiceProvider"
            ]
        },
        "dooz": {
            "name": "my-app",
            "display_name": "My App",
            "version": "1.0.0",
            "category": "productivity"
        }
    }
}
```

#### 2. Create Service Provider

```php
<?php

namespace Dooz\MyApp\Providers;

use Illuminate\Support\ServiceProvider;

class MyAppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../../config/my-app.php', 'my-app');
    }

    public function boot(): void
    {
        // Load routes
        $this->loadRoutesFrom(__DIR__.'/../../routes/web.php');
        $this->loadRoutesFrom(__DIR__.'/../../routes/api.php');
        
        // Load views
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'my-app');
        
        // Load migrations
        $this->loadMigrationsFrom(__DIR__.'/../Database/Migrations');
        
        // Publish config
        $this->publishes([
            __DIR__.'/../../config/my-app.php' => config_path('my-app.php'),
        ], 'my-app-config');
    }
}
```

#### 3. Define Manifest

```json
// manifest.json
{
    "name": "my-app",
    "display_name": "My App",
    "description": "What your app does",
    "version": "1.0.0",
    "permissions": {
        "app.my-app.access": "Access the app",
        "app.my-app.create": "Create items",
        "app.my-app.edit": "Edit items",
        "app.my-app.delete": "Delete items",
        "app.my-app.manage": "Full app management"
    },
    "roles": {
        "my-app.user": ["app.my-app.access"],
        "my-app.editor": ["app.my-app.access", "app.my-app.create", "app.my-app.edit"],
        "my-app.admin": ["app.my-app.*"]
    },
    "plans": [
        {
            "name": "free",
            "features": ["basic_feature"],
            "limits": {"items": 100}
        },
        {
            "name": "pro",
            "price": 9.99,
            "features": ["basic_feature", "advanced_feature"],
            "limits": {"items": -1}
        }
    ]
}
```

#### 4. Create Model with Tenant Scoping

```php
<?php

namespace Dooz\MyApp\Models;

use Illuminate\Database\Eloquent\Model;
use Dooz\Sdk\Traits\BelongsToTenant;

class Item extends Model
{
    use BelongsToTenant;  // Automatic tenant scoping!
    
    protected $table = 'my_app_items';
    
    protected $fillable = ['name', 'description', 'status'];
}
```

#### 5. Create Controller with License Check

```php
<?php

namespace Dooz\MyApp\Http\Controllers;

use App\Http\Controllers\Controller;
use Dooz\Sdk\Traits\RequiresLicense;
use Dooz\MyApp\Models\Item;

class ItemController extends Controller
{
    use RequiresLicense;
    
    protected string $appName = 'my-app';
    
    public function index()
    {
        $this->validateLicense();
        
        return view('my-app::items.index', [
            'items' => Item::all()  // Automatically scoped to tenant!
        ]);
    }
}
```

---

## Building Client Apps

### Desktop Apps (Tauri)

```javascript
// Tauri + TypeScript
import { invoke } from '@tauri-apps/api/tauri';

class DoozClient {
    private baseUrl: string;
    private accessToken: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async login(email: string, password: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        this.accessToken = data.access_token;
    }

    async getItems(): Promise<Item[]> {
        const response = await fetch(`${this.baseUrl}/api/my-app/items`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Accept': 'application/json'
            }
        });
        
        return response.json();
    }
}
```

### Mobile Apps (Flutter)

```dart
// Flutter / Dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class DoozApiClient {
  final String baseUrl;
  String? accessToken;
  
  DoozApiClient(this.baseUrl);
  
  Future<void> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    
    final data = jsonDecode(response.body);
    accessToken = data['access_token'];
  }
  
  Future<List<dynamic>> getItems() async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/my-app/items'),
      headers: {
        'Authorization': 'Bearer $accessToken',
        'Accept': 'application/json',
      },
    );
    
    return jsonDecode(response.body)['data'];
  }
}
```

### Web Apps (React/Vue)

```typescript
// TypeScript SDK usage
import { DoozSdk } from '@dooz/sdk';

const dooz = new DoozSdk({
    baseUrl: 'https://your-instance.dooz.app',
});

// Login
await dooz.auth.login('user@example.com', 'password');

// Use the API
const items = await dooz.apps.myApp.items.list();
const newItem = await dooz.apps.myApp.items.create({
    name: 'New Item',
    description: 'Created via SDK'
});
```

---

## REST API Reference

### Authentication

```bash
# Login
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "your-password"
}

# Response
{
    "access_token": "eyJ0eXAiOiJKV1Q...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "user": { "id": 1, "name": "User Name" }
}
```

### Standard Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/tenants` | List user's tenants |
| POST | `/api/tenants/{id}/switch` | Switch active tenant |
| GET | `/api/navigation` | Get navigation items |
| GET | `/api/notifications` | Get notifications |

### App-Specific Endpoints

Each app exposes its own endpoints:

```
/api/{app-name}/...
```

### Response Format

```json
// Success (single item)
{
    "data": { "id": 1, "name": "Item" }
}

// Success (list)
{
    "data": [...],
    "meta": {
        "current_page": 1,
        "per_page": 20,
        "total": 100
    }
}

// Error
{
    "error": "validation_error",
    "message": "The given data was invalid.",
    "errors": {
        "field": ["Error message"]
    }
}
```

### Rate Limits

| Endpoint Type | Limit |
|---------------|-------|
| Authentication | 10/hour |
| General API | 60/minute |
| Bulk operations | 10/minute |
| Export | 5/minute |

---

## Best Practices

### DO ✅

- **Use the SDK traits** for tenant scoping and license validation
- **Write tests** for all new features
- **Follow PSR-12** coding standards
- **Document your API** in OpenAPI format
- **Use Redis caching** for frequently accessed data
- **Log meaningful events** for debugging
- **Handle errors gracefully** with proper HTTP status codes

### DON'T ❌

- Access other tenant's data directly
- Hardcode tenant IDs or user IDs
- Skip license validation
- Store secrets in code
- Use synchronous operations for long tasks
- Ignore rate limits

### Security Checklist

- [ ] All routes require authentication
- [ ] Tenant isolation is enforced
- [ ] Input is validated and sanitized
- [ ] Sensitive data is encrypted
- [ ] API keys are stored securely
- [ ] HTTPS is enforced

---

## Resources

### Documentation
- [Architecture Guide](./ARCHITECTURE.md)
- [Multi-Tenancy](./MULTI_TENANCY.md)
- [Security](./SECURITY.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [Coding Standards](./CODING_STANDARDS.md)

### API & SDK
- [OpenAPI Spec](/docs/api/openapi.yaml)
- [Postman Collection](/docs/api/Dooz-Core-API.postman_collection.json)
- [Core Contracts](/packages/dooz/core-contracts/)
- [Dooz SDK](/packages/dooz/sdk/)

### Templates & Examples
- [App Template](/packages/dooz/app-template/)
- [Quicky App](/packages/dooz/quicky/) - Reference implementation

### Community
- Slack: #dooz-dev
- GitHub Issues: [DoozHub/dooz-core](https://github.com/DoozHub/dooz-core/issues)
- Email: dev@dooz.app

---

## Getting Help

1. **Check the docs** - Most questions are answered here
2. **Search issues** - Someone may have had the same problem
3. **Ask on Slack** - Quick questions and discussions
4. **Open an issue** - Bug reports and feature requests

---

*Happy building! The Dooz Team* 🚀
