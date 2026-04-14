# Dooz AI-Native Ecosystem Roadmap

> Vision: Every interaction in the Dooz platform is AI-assisted. Developers build apps as Laravel packages. The Dooz Copilot handles multi-tenancy, permissions, navigation, and data isolation automatically — so developers never think about infrastructure.

---

## 1. Current State Analysis

### What Works
- **Multi-tenancy**: `stancl/tenancy` v3 with database-per-tenant isolation (`core` + `tenant` connections)
- **Package system**: Apps live in `packages/dooz/*` as Laravel packages with `ServiceProvider` auto-discovery
- **App lifecycle**: `AppInstaller` handles install → migrate → seed → license → permissions in one transaction
- **Manifest validation**: `AppManifestService` validates app metadata, dependencies, pricing, permissions
- **Navigation registry**: `NavigationRegistry` auto-builds sidebar from installed apps + manifest `navigation` key
- **Permission system**: `spatie/laravel-permission` with `AppPermissionInstaller` auto-creating roles/permissions from manifest
- **AI foundation**: `AgentService` + `AgentToolInterface` provide the tool-calling skeleton; `AiRouterIntegrationService` connects to `lib-ai-router`
- **Base models**: `BaseModel` (core connection) and `BaseTenantModel` (tenant connection, auto-sets `tenant_id`)
- **Core contracts**: `dooz/core-contracts` provides `AppInstallerInterface`, `InstallResult`, `TenancyResolverInterface`, etc.
- **SDK**: `dooz/sdk` provides `DoozManager` facade for cross-app communication

### What's Broken or Missing
- **No developer onboarding path**: A developer cannot `composer create-project dooz/app-my-idea` and start coding
- **Boilerplate is skeletal**: `app-boilerplate` has an empty `register()` and no manifest, no AI tool registration, no tenant model
- **AI is mocked**: `AgentService::ask()` has a hardcoded mock — no real LLM integration, no streaming, no tool execution loop
- **No app scaffolding CLI**: No `php artisan dooz:make:app MyApp` command to generate a full package skeleton
- **Inconsistent package structure**: Some packages have `routes/`, some don't; some have views, some are API-only; no `dooz.yaml` manifest file standard
- **No hot-reload for packages**: Developers must `composer dump-autoload` after every change to a local package
- **No package-level tests**: Packages have no test infrastructure; testing requires booting the entire dooz-core
- **Hardcoded navigation routes**: `NavigationRegistry::getAppRoute()` has a hardcoded `$appRoutes` array instead of reading from manifests
- **Cross-package communication is ad-hoc**: No event bus contract for apps; apps call each other's services directly
- **No AI tool registry per app**: Apps cannot declare what AI tools they contribute; the `AgentToolInterface` exists but there's no discovery mechanism
- **51 middleware classes**: The middleware stack is overwhelming; most developers don't know which ones apply to their app routes

---

## 2. AI-Native Architecture Vision

### 2.1 The Dooz Copilot Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                        │
│   Web (Blade/Livewire)  │  Desktop (Tauri)  │  Mobile (Flutter) │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    DOOZ COPILOT LAYER                         │
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │ Intent      │→ │ Action       │→ │ Verification      │   │
│  │ Parser      │  │ Planner      │  │ Gate              │   │
│  └─────────────┘  └──────────────┘  └───────────────────┘   │
│         │                  │                    │              │
│         ▼                  ▼                    ▼              │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │ Context     │  │ Tool         │  │ Audit              │   │
│  │ Resolver    │  │ Executor     │  │ Logger             │   │
│  └─────────────┘  └──────────────┘  └───────────────────┘   │
│                                                               │
│  Tool Registry (auto-discovered from app manifests)          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ Todo   │ │Worklog │ │Renew   │ │Quicky  │ │ Custom │   │
│  │ Tools  │ │ Tools  │ │ Tools  │ │ Tools  │ │ Tools  │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    DOOZ CORE PLATFORM                         │
│                                                               │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐   │
│  │ Tenancy      │ │ Permission   │ │ Navigation         │   │
│  │ Engine       │ │ Engine       │ │ Engine             │   │
│  └──────────────┘ └──────────────┘ └────────────────────┘   │
│                                                               │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐   │
│  │ App Lifecycle │ │ License      │ │ Event Bus         │   │
│  │ Manager       │ │ Manager      │ │                    │   │
│  └──────────────┘ └──────────────┘ └────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    APP PACKAGES (Laravel Packages)            │
│                                                               │
│  app-todo    app-worklog    app-renew    app-quicky    ...   │
│  (submodule) (submodule)   (submodule)  (submodule)         │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Core Principles

1. **Apps are Laravel packages, never embedded code** — Every app lives in its own repo, installed via Composer as a git submodule under `packages/dooz/*`
2. **Multi-tenancy is invisible to the developer** — `BaseTenantModel` auto-sets connection and `tenant_id`; routes get `resolve.tenant` middleware automatically
3. **The manifest is the contract** — A `dooz.yaml` file in every app declares permissions, navigation, AI tools, dependencies, and pricing — the platform reads it and wires everything
4. **AI tools are first-class citizens** — Every app can declare `AgentToolInterface` implementations in its manifest; the Copilot discovers and routes to them automatically
5. **Action staging, never direct execution** — The Copilot proposes actions → user approves → audit log records → action executes. No autonomous writes without human confirmation.
6. **Convention over configuration** — Follow the package structure and naming convention, and everything (navigation, permissions, AI tools, routes) wires itself automatically

---

## 3. Phased Roadmap

### Phase 1: Developer Foundation (Weeks 1-4)
**Goal**: A developer can create a new app in 15 minutes and have it running with multi-tenancy, navigation, permissions, and a basic AI tool — without reading any infrastructure code.

#### 1.1 App Scaffolding CLI
Create `php artisan dooz:make:app` command that generates a complete package skeleton:

```bash
php artisan dooz:make:app app-invoicer \
  --display-name="Invoicer" \
  --category=billing \
  --author="Dooz Team"
```

Generates:
```
packages/dooz/invoicer/
├── composer.json              # Auto-wired: "dooz/app-invoicer", ServiceProvider
├── dooz.yaml                  # Manifest: permissions, navigation, AI tools, dependencies
├── src/
│   ├── InvoicerServiceProvider.php   # Routes, views, migrations, AI tools registered
│   ├── Models/
│   │   └── Invoice.php              # Extends BaseTenantModel
│   ├── Http/
│   │   └── Controllers/
│   │       ├── InvoiceController.php
│   │       └── InvoiceApiController.php
│   ├── AI/
│   │   └── Tools/
│   │       ├── CreateInvoiceTool.php   # Implements AgentToolInterface
│   │       └── ListInvoicesTool.php
│   ├── Policies/
│   │   └── InvoicePolicy.php
│   └── Events/
│       ├── InvoiceCreated.php
│       └── InvoicePaid.php
├── database/
│   ├── migrations/
│   │   └── 2026_04_14_000001_create_invoices_table.php
│   └── seeders/
│       └── InvoicerSeeder.php
├── routes/
│   ├── web.php
│   └── api.php
├── resources/
│   └── views/
│       └── index.blade.php
└── tests/
    ├── Unit/
    │   └── InvoiceTest.php
    └── Feature/
        └── InvoiceApiTest.php
```

**Implementation**:
- New command: `App\Console\Commands\MakeAppCommand.php`
- Reads from stub templates in `stubs/app/`
- Auto-registers in `composer.json` autoload and `.gitmodules`
- Runs `composer dump-autoload` after generation

#### 1.2 Standardized App Manifest (`dooz.yaml`)

Replace the ad-hoc JSON manifest with a structured YAML file that every app MUST contain:

```yaml
name: app-invoicer
display_name: Invoicer
description: Create and manage invoices for your clients
version: 1.0.0
min_core_version: 1.0.0
category: billing
author: Dooz Team
pricing_type: freemium

dependencies:
  required: []
  optional:
    - name: app-activity-tracker
      version: ">=1.0.0"

permissions:
  - name: invoices.view
    display_name: View Invoices
    description: View list and details of invoices
    default_roles: [admin, manager]
  - name: invoices.create
    display_name: Create Invoices
    description: Create new invoices
    default_roles: [admin, manager]
  - name: invoices.manage
    display_name: Manage Invoices
    description: Edit, delete, and send invoices
    default_roles: [admin]

navigation:
  - label: Invoices
    route: dooz-invoicer.index
    icon: document-text
    sort: 100
    permissions: [invoices.view]
    children:
      - label: All Invoices
        route: dooz-invoicer.index
        sort: 10
      - label: Create Invoice
        route: dooz-invoicer.create
        permissions: [invoices.create]
        sort: 20

ai_tools:
  - class: Dooz\Invoicer\AI\Tools\CreateInvoiceTool
    name: create_invoice
    description: Create a new invoice for a client
  - class: Dooz\Invoicer\AI\Tools\ListInvoicesTool
    name: list_invoices
    description: List and search invoices with filters

events:
  emitted:
    - invoice.created
    - invoice.paid
    - invoice.overdue
  listened:
    - app-worklog.time_logged

widgets:
  - name: recent_invoices
    title: Recent Invoices
    component: InvoicerRecentWidget
    sort: 50

pricing_plans:
  - name: free
    price: 0
    currency: USD
    billing_cycle: monthly
    seats: 3
    features: [invoices.view, invoices.create]
  - name: pro
    price: 9.99
    currency: USD
    billing_cycle: monthly
    seats: 10
    features: [invoices.view, invoices.create, invoices.manage]
```

**Implementation**:
- `AppManifestService` updated to read from `dooz.yaml` (using `symfony/yaml` — already in dependencies)
- `AppInstaller` reads the manifest during install to auto-create permissions, navigation, AI tools
- Remove hardcoded `$appRoutes` array from `NavigationRegistry`

#### 1.3 Enhanced BaseTenantModel

Add convenience traits so developers never write `tenant_id` or `user_id` logic:

```php
// Current (what developers write today):
class TodoItem extends BaseTenantModel
{
    protected $fillable = ['tenant_id', 'user_id', 'title', ...];
}

// Target (what developers should write):
class Invoice extends DoozTenantModel  // New base class
{
    protected $fillable = ['client_name', 'amount', 'status', ...];
    // tenant_id auto-appended by DoozTenantModel
    // user_id auto-appended if trait BelongsToCurrentUser is used
}
```

**New classes**:
- `DoozTenantModel` — extends `BaseTenantModel`, auto-appends `tenant_id` to fillable, auto-scopes queries to current tenant
- `BelongsToCurrentUser` trait — auto-sets `user_id` on create, auto-scopes to `auth()->id()`
- `HasDoozPolicy` trait — auto-registers policy from convention `Dooz\{App}\Policies\{Model}Policy`

---

### Phase 2: AI Copilot Engine (Weeks 5-8)
**Goal**: The Dooz Copilot is a fully functional AI assistant that understands tenant context, can invoke app tools, and proposes actions with human-in-the-loop confirmation.

#### 2.1 Real LLM Integration

Replace the mocked `AgentService` with a production-grade implementation:

```php
class DoozCopilot
{
    public function __construct(
        protected ToolRegistry $tools,
        protected ContextResolver $context,
        protected ActionVerifier $verifier,
        protected AuditLogger $audit,
        protected AiRouterIntegrationService $llm,
    ) {}

    public function converse(string $message, User $user, ?Tenant $tenant = null): CopilotResponse
    {
        // 1. Build context (tenant, installed apps, user permissions, recent activity)
        $systemPrompt = $this->context->buildSystemPrompt($user, $tenant);

        // 2. Get available tools for this user in this tenant
        $availableTools = $this->tools->getToolsForUser($user, $tenant);

        // 3. Call LLM with tool definitions
        $llmResponse = $this->llm->completeWithTools(
            prompt: $message,
            systemPrompt: $systemPrompt,
            tools: $availableTools->toOpenAiSchema(),
            context: [
                'tenant_id' => $tenant?->id,
                'tenant_name' => $tenant?->name,
                'user_role' => $user->getRoleInTenant($tenant),
                'installed_apps' => $tenant ? $this->getInstalledAppNames($tenant) : [],
            ]
        );

        // 4. If LLM wants to call a tool, stage the action
        if ($llmResponse->hasToolCall()) {
            $tool = $availableTools->findByName($llmResponse->toolName());
            $payload = $llmResponse->toolArguments();

            // Verify the user has permission for this action
            $verification = $this->verifier->verify($tool, $payload, $user, $tenant);
            
            if ($verification->isAllowed()) {
                // Stage the action for user confirmation
                $proposal = AiActionProposal::create([
                    'user_id' => $user->id,
                    'tenant_id' => $tenant?->id,
                    'intent_summary' => "Copilot intends to use `{$tool->getName()}`",
                    'tool_class' => get_class($tool),
                    'payload' => $payload,
                    'status' => 'pending_approval',
                ]);

                return CopilotResponse::actionProposed(
                    message: $llmResponse->text(),
                    proposal: $proposal,
                    confirmationUrl: route('copilot.confirm', $proposal->id),
                );
            }

            return CopilotResponse::denied(
                message: "I can't perform that action because: " . $verification->reason(),
            );
        }

        // 5. Plain text response
        return CopilotResponse::text($llmResponse->text());
    }
}
```

#### 2.2 Tool Registry with Auto-Discovery

```php
class ToolRegistry
{
    protected array $tools = [];

    // Auto-populated from app manifests during AppInstaller::install()
    // Each app's dooz.yaml declares ai_tools → they get registered here

    public function registerTool(AgentToolInterface $tool, string $appName): void
    {
        $this->tools[$appName][] = $tool;
    }

    public function getToolsForUser(User $user, ?Tenant $tenant = null): ToolCollection
    {
        if (!$tenant) {
            return new ToolCollection([]);
        }

        // Only return tools from apps the user has access to
        $installedApps = $this->getInstalledAppsForUser($user, $tenant);
        
        return new ToolCollection(
            collect($this->tools)
                ->filter(fn($_, $appName) => in_array($appName, $installedApps))
                ->flatten(1)
                ->filter(fn($tool) => $this->userCanUseTool($user, $tool))
                ->values()
                ->all()
        );
    }
}
```

#### 2.3 Context Resolver

Builds the system prompt with tenant context so the LLM knows where it is:

```php
class ContextResolver
{
    public function buildSystemPrompt(User $user, ?Tenant $tenant): string
    {
        $prompt = "You are Dooz Copilot, an AI assistant for the Dooz platform.\n";

        if ($tenant) {
            $prompt .= "\n## Tenant Context\n";
            $prompt .= "- Organization: {$tenant->name}\n";
            $prompt .= "- Status: {$tenant->status}\n";
            $prompt .= "- Plan: " . ($tenant->latestSubscription?->stripe_price ?? 'free') . "\n";
            
            $installedApps = $this->getInstalledAppNames($tenant);
            $prompt .= "- Installed Apps: " . implode(', ', $installedApps) . "\n";
        }

        $role = $tenant ? $user->getRoleInTenant($tenant) : 'platform_admin';
        $prompt .= "\n## User Context\n";
        $prompt .= "- Role: {$role}\n";
        $prompt .= "- Permissions: " . implode(', ', $user->getAllPermissions()->pluck('name')->take(20)) . "\n";

        $prompt .= "\n## Rules\n";
        $prompt .= "- You can only perform actions the user has permission for\n";
        $prompt .= "- Always confirm before making changes (you propose, user approves)\n";
        $prompt .= "- Never access data from other tenants\n";
        $prompt .= "- If you're unsure, ask for clarification\n";

        return $prompt;
    }
}
```

#### 2.4 Action Verification Gate

Before any AI tool executes, verify:
1. User has the required permission for the tool
2. Tool is from an app the tenant has an active license for
3. Tool payload doesn't contain cross-tenant references
4. Action is within tenant's seat/license limits

```php
class ActionVerifier
{
    public function verify(
        AgentToolInterface $tool,
        array $payload,
        User $user,
        ?Tenant $tenant
    ): VerificationResult {
        // 1. Check app license is active
        // 2. Check user has tool's required permission
        // 3. Validate payload doesn't reference other tenants
        // 4. Check seat limits
        // 5. Rate limit AI actions per tenant
    }
}
```

#### 2.5 Streaming + WebSocket

- Copilot responses stream via Laravel Echo + Pusher/Soketi
- `DoozCopilot::converse()` returns a stream ID
- Frontend subscribes to `copilot.stream.{id}` channel
- Each token/chunk is broadcast as it arrives
- Tool calls are sent as structured events within the stream

---

### Phase 3: App Ecosystem Marketplace (Weeks 9-12)
**Goal**: A self-service marketplace where tenants discover, install, and manage apps — powered by the Copilot.

#### 3.1 Marketplace 2.0

- Rich app cards with screenshots, ratings, reviews
- "Ask Copilot" button on each app: "What can this app do for me?"
- One-click install (Copilot handles prerequisites, dependencies, permissions)
- Usage analytics per app per tenant

#### 3.2 Developer Portal

- `developers.dooz.app` — Submit apps to the marketplace
- App review pipeline: manifest validation → automated tests → security scan → human review → published
- Revenue sharing dashboard for third-party developers
- Webhook for CI/CD: push to `app-*` repo → automated test → publish to marketplace

#### 3.3 Cross-App Event Bus

```php
// In app-invoicer's dooz.yaml:
events:
  emitted:
    - invoice.created
    - invoice.paid

// In app-worklog's dooz.yaml:
events:
  listened:
    - invoice.paid  # Auto-create a worklog entry when an invoice is paid
```

**Implementation**:
- `EventBusService` already exists but is unused — activate it
- Apps declare events in `dooz.yaml`
- On install, `AppInstaller` registers listeners
- Events are dispatched via Laravel's event system with tenant context
- All events are audit-logged for compliance

---

### Phase 4: Autonomous Agent Workflows (Weeks 13-16)
**Goal**: Beyond single-turn copilot — multi-step agentic workflows that plan, execute, and report.

#### 4.1 Agent Workflow Engine

```php
// Example: "Set up project billing"
// Copilot plans:
//   1. Install app-invoicer
//   2. Create default invoice template
//   3. Set up recurring billing schedule
//   4. Notify team members

class AgentWorkflow
{
    public function __construct(
        protected array $steps,
        protected User $user,
        protected ?Tenant $tenant,
    ) {}

    public function execute(): WorkflowResult
    {
        foreach ($this->steps as $step) {
            $verification = $this->verifier->verify($step->tool, $step->payload, $this->user, $this->tenant);
            
            if (!$verification->isAllowed()) {
                return WorkflowResult::blocked($step, $verification->reason());
            }

            $result = $step->execute($this->user);
            $this->audit->log($step, $result, $this->user, $this->tenant);
            
            // Feed result back to LLM for next step planning
            $this->updateContext($step, $result);
        }

        return WorkflowResult::completed();
    }
}
```

#### 4.2 Scheduled Agent Tasks

- Tenants can schedule recurring AI tasks: "Every Monday, summarize last week's activity"
- Uses Laravel's scheduler + queue system
- Results delivered via notification or email
- All scheduled tasks are visible and manageable in tenant settings

#### 4.3 Agent Memory

- Per-tenant vector store (SQLite-vss or pgvector) for semantic memory
- Copilot remembers: "Last time you asked about invoices, you preferred the monthly view"
- Memory is tenant-isolated — one tenant's context never leaks to another
- Users can view, edit, delete Copilot memories in settings

---

## 4. Technology Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| Platform | Laravel 12 + PHP 8.3 | ✅ Active |
| Multi-tenancy | `stancl/tenancy` v3 (database-per-tenant) | ✅ Active |
| Auth | Laravel Passport (OAuth2) | ✅ Active |
| Permissions | `spatie/laravel-permission` | ✅ Active |
| Billing | Laravel Cashier (Stripe) + Razorpay | ✅ Active |
| AI Router | `lib-ai-router` (Node.js) | 🔧 Needs integration |
| LLM Provider | OpenAI GPT-4o / Anthropic via `lib-ai-router` | 🔧 Mocked |
| Vector Store | SQLite-vss / pgvector | ❌ Not started |
| WebSocket | Laravel Echo + Soketi/Pusher | 🔧 Partial |
| Desktop | Tauri (Rust) | 📦 `desktop-hub` |
| Mobile | Flutter | 📦 `mobile-quicky` |
| CI/CD | GitHub Actions | ✅ Active |
| Registry | `infra-registry` | ✅ Active |

---

## 5. App Package Naming Convention

| Prefix | Type | Example | Description |
|--------|------|---------|-------------|
| `app-` | Marketplace Laravel package | `app-todo`, `app-invoicer` | Tenant-installable app, lives in `packages/dooz/*` |
| `desktop-` | Tauri desktop app | `desktop-hub`, `desktop-brain` | Native desktop application |
| `mobile-` | Flutter mobile app | `mobile-quicky` | Mobile application |
| `cloud-` | Cloud service | `cloud-ai-platform`, `cloud-pm-suite` | Server-side cloud service |
| `lib-` | Shared library | `lib-ai-router`, `lib-bun-sdk` | Reusable library (any language) |
| `infra-` | Infrastructure tool | `infra-registry`, `infra-app-template` | DevOps, CI/CD, templates |
| `dooz-*` | Core platform | `dooz-core`, `dooz-atlas` | Platform-critical repos |

---

## 6. Success Metrics

| Metric | Phase 1 Target | Phase 2 Target | Phase 3 Target |
|--------|---------------|---------------|---------------|
| Time to create a new app | < 15 min | < 10 min | < 5 min |
| Lines of boilerplate code | 0 | 0 | 0 |
| Multi-tenancy bugs from app devs | 0 | 0 | 0 |
| AI tool integration time | N/A | < 30 min | < 10 min |
| Apps in marketplace | 5 | 10 | 20+ |
| Copilot accuracy (tool selection) | N/A | 85% | 95% |
| Developer satisfaction (NPS) | > 50 | > 70 | > 80 |

---

## 7. Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| AI hallucination causes data corruption | Action staging (propose → approve → execute) + audit log |
| Cross-tenant data leakage | `ActionVerifier` validates tenant context; `DoozTenantModel` auto-scopes; middleware stack enforced |
| LLM cost explosion | Tier-based routing via `lib-ai-router` (cheap/fast/smart); per-tenant rate limits; token budgets |
| Developer onboarding friction | `dooz:make:app` CLI + comprehensive developer guide + video tutorials |
| Package version conflicts | Semantic versioning enforced in manifest; dependency resolution during install |
| Middleware complexity (51 middleware) | Route groups auto-configured by `dooz.yaml`; developers never touch middleware directly |

---

## 8. Immediate Next Steps (This Week)

1. Create `dooz:make:app` Artisan command with stub templates
2. Define the `dooz.yaml` schema and update `AppManifestService` to parse it
3. Build `DoozTenantModel` base class with auto-tenant scoping
4. Create the `ToolRegistry` service for AI tool auto-discovery
5. Write the Developer Guide (`docs/PACKAGE_DEVELOPMENT_GUIDE_V2.md`)
6. Replace hardcoded `$appRoutes` in `NavigationRegistry` with manifest-based routing
7. Activate `EventBusService` with manifest-declared events
