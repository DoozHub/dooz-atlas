# Dooz Quick Start

> Get running in under 5 minutes

---

## What is Dooz?

Dooz is a modular SaaS platform where you can:
- 🏢 **Run the platform** - Host for multiple organizations
- 📦 **Build apps** - Create custom business applications
- 📱 **Create clients** - Desktop and mobile apps using the REST API

---

## Choose Your Path

### 🖥️ I want to run Dooz (Platform Setup)

```bash
# Clone and install
git clone https://github.com/DoozHub/dooz-core.git
cd dooz-core && composer install && bun install

# Configure
cp .env.example .env
php artisan key:generate
# Edit .env with your database credentials

# Setup database
php artisan migrate --seed

# Run!
php artisan serve
```

**Open:** http://localhost:8000

---

### 📦 I want to build a Dooz app

```bash
# From dooz-core directory
cp -r packages/dooz/app-template packages/dooz/my-app

# Edit packages/dooz/my-app/composer.json
# Change "name": "dooz/app-template" to "dooz/my-app"

# Register it
composer require dooz/my-app:*
php artisan migrate

# Your app is now available!
```

**Key files to modify:**
- `composer.json` - Package name and metadata
- `manifest.json` - Permissions, roles, plans
- `src/Providers/*ServiceProvider.php` - Registration
- `routes/*.php` - Your endpoints

---

### 📱 I want to build a client app (Desktop/Mobile)

```bash
# 1. Get your API token (login first)
curl -X POST https://your-dooz.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Response: {"access_token": "eyJ..."}

# 2. Use the token for API calls
curl https://your-dooz.app/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**SDK Coming Soon:** `npm install @dooz/sdk`

---

## Essential Commands

| Command | Purpose |
|---------|---------|
| `php artisan serve` | Start dev server |
| `php artisan migrate` | Run database migrations |
| `php artisan test` | Run test suite |
| `php artisan route:list` | List all routes |
| `bun run dev` | Start frontend build |

---

## Key URLs

| URL | Purpose |
|-----|---------|
| `/` | Main web application |
| `/api/auth/login` | API authentication |
| `/api/health/ping` | Health check |
| `/api/platform-admin/docs` | Swagger UI |

---

## Environment Variables

```bash
# Required
APP_KEY=base64:...           # php artisan key:generate
DB_DATABASE=dooz_core
DB_USERNAME=root
DB_PASSWORD=secret

# Optional but recommended
REDIS_HOST=127.0.0.1
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
```

---

## Project Structure

```
dooz-core/
├── app/                 # Core application code
├── packages/dooz/       # Installable app packages
│   ├── core-contracts/  # Shared interfaces
│   ├── sdk/             # Developer SDK
│   ├── app-template/    # Your starting point
│   └── quicky/          # Example app
├── config/              # Configuration
├── routes/api.php       # API routes
└── docs/                # Documentation
```

---

## Next Steps

1. 📖 Read the [Developer Guide](./DEVELOPER_GUIDE.md)
2. 🏗️ Explore the [App Template](../dooz-core/packages/dooz/app-template/)
3. 📚 Check the [API Docs](../dooz-core/docs/api/openapi.yaml)
4. 💬 Join #dooz-dev on Slack

---

## Need Help?

- 📖 [Full Documentation](./DEVELOPER_GUIDE.md)
- 🐛 [GitHub Issues](https://github.com/DoozHub/dooz-core/issues)
- 💬 Slack: #dooz-dev
- 📧 dev@dooz.app

---

*Welcome to Dooz!* 🚀
