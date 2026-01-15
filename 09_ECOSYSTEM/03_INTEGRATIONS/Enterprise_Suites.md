# Dooz Enterprise Solutions Architecture

> Strategy for building industry-specific ERP suites on the Dooz platform

---

## The Challenge

You have:
- **Existing legacy apps**: CA ERP, SME ERP, Fasteners ERP (custom-built)
- **Common functionality**: Invoicing, inventory, contacts, reports
- **Industry-specific needs**: Each vertical has unique workflows
- **Goal**: Consolidate under one umbrella, reuse code, maintain customization

---

## Proposed Architecture: Dooz Industry Suites

```
┌─────────────────────────────────────────────────────────────────────┐
│                      DOOZ INDUSTRY SUITES                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│   │  CA Suite    │  │  SME Suite   │  │Fasteners Pro │  ...more    │
│   │  (Chartered  │  │  (Small Biz  │  │ (Industrial  │             │
│   │  Accountant) │  │   ERP)       │  │  Trading)    │             │
│   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │
│          │                 │                 │                      │
├──────────┼─────────────────┼─────────────────┼──────────────────────┤
│          │    INDUSTRY LAYER (Customization)                       │
│          │                                                          │
│   ┌──────▼───────────────────────────────────────────────────────┐ │
│   │  Industry Modules (PHP Packages)                              │ │
│   │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │ │
│   │  │ CA Module  │ │SME Module  │ │Fastener Mod│ │  Custom    │ │ │
│   │  │- GST/ITR   │ │- Pos/Sales │ │- BOM/Parts │ │  Module    │ │ │
│   │  │- Filing    │ │- Payroll   │ │- Costing   │ │            │ │ │
│   │  │- Clients   │ │- HR Lite   │ │- Standards │ │            │ │ │
│   │  └────────────┘ └────────────┘ └────────────┘ └────────────┘ │ │
│   └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│          SHARED APP LAYER (Dooz Apps from Marketplace)             │
│                                                                     │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│   │ Invoicing│ │Inventory │ │ Contacts │ │ Worklog  │ │ Reports  ││
│   │  (dooz)  │ │  (dooz)  │ │  (dooz)  │ │  (dooz)  │ │  (dooz)  ││
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘│
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                    DOOZ-CORE PLATFORM                               │
│   Multi-tenancy │ Auth │ Billing │ API │ Events │ Storage          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Strategy

### 1. Suite = Tenant Profile + App Bundle + Industry Module

Each "Suite" (CA ERP, SME ERP) is defined as:

```php
// config/suites/ca-suite.php
return [
    'name' => 'CA Professional Suite',
    'slug' => 'ca-suite',
    
    // Apps included from marketplace
    'apps' => [
        'invoicing',
        'worklog',
        'contacts',
        'documents',
        'calendar',
    ],
    
    // Industry-specific module
    'industry_module' => 'ca-professional',
    
    // Default configurations
    'config' => [
        'currency' => 'INR',
        'gst_enabled' => true,
        'fiscal_year_start' => 'April',
    ],
    
    // UI customization
    'branding' => [
        'primary_color' => '#2563eb',
        'icon' => 'briefcase',
        'tagline' => 'Complete CA Practice Management',
    ],
];
```

### 2. Industry Modules as Composer Packages

Each industry-specific functionality is a separate Laravel package:

```
doozhub/
├── ca-professional/           # CA specific features
│   ├── src/
│   │   ├── Models/
│   │   │   ├── Client.php         # CA Client (extends Contact)
│   │   │   ├── Filing.php         # GST/ITR filings
│   │   │   └── Compliance.php
│   │   ├── Services/
│   │   │   ├── GstService.php
│   │   │   └── ItrService.php
│   │   └── Http/Controllers/
│   ├── resources/views/
│   ├── routes/
│   └── composer.json
│
├── sme-erp/                   # SME specific features
│   ├── src/
│   │   ├── Models/
│   │   │   ├── Product.php
│   │   │   ├── PurchaseOrder.php
│   │   │   └── SalesOrder.php
│   │   └── ...
│
└── fasteners-pro/             # Fasteners industry
    ├── src/
    │   ├── Models/
    │   │   ├── Part.php
    │   │   ├── BillOfMaterials.php
    │   │   └── Standard.php       # Industry standards
    │   └── ...
```

### 3. Suite Provisioning Flow

When a new enterprise client signs up:

```
1. Client selects Suite (e.g., "CA Professional")
   │
2. System creates Tenant with suite config
   │
3. Auto-installs bundled apps from marketplace
   │
4. Enables industry module for that tenant
   │
5. Applies default configurations
   │
6. Routes to suite-specific onboarding
```

### 4. Shared vs Custom Components

| Component | Shared (Dooz App) | Custom (Industry Module) |
|-----------|-------------------|--------------------------|
| Invoicing | ✅ Invoice creation, PDF | Industry templates, tax rules |
| Inventory | ✅ Stock tracking | Part numbering, BOM |
| Contacts | ✅ Contact management | Client types, compliance info |
| Reports | ✅ Report engine | Industry-specific reports |
| Workflows | ✅ Workflow engine | Pre-built industry workflows |

---

## Database Strategy

### Option A: Shared Tables + Metadata (Recommended)

```sql
-- Shared contacts table with extensible metadata
CREATE TABLE contacts (
    id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    type VARCHAR,                    -- 'customer', 'vendor', 'ca_client'
    metadata JSONB,                  -- Industry-specific fields
    created_at TIMESTAMP
);

-- Industry module adds its interpretation
-- CA Module: metadata contains { pan, gstin, filing_status, client_type }
-- SME Module: metadata contains { credit_limit, payment_terms }
```

### Option B: Extension Tables

```sql
-- Base contact
CREATE TABLE contacts (...);

-- CA-specific extension
CREATE TABLE ca_clients (
    contact_id UUID PRIMARY KEY REFERENCES contacts(id),
    pan VARCHAR,
    gstin VARCHAR,
    client_category VARCHAR,        -- Individual, Company, LLP
    aop_due_date DATE
);
```

---

## Suite Registry

Central registry of available suites:

```php
// app/Suites/SuiteRegistry.php

class SuiteRegistry
{
    protected array $suites = [
        'ca-suite' => CaSuite::class,
        'sme-suite' => SmeSuite::class,
        'fasteners-pro' => FastenersSuite::class,
        'manufacturing-erp' => ManufacturingSuite::class,
        'retail-pos' => RetailSuite::class,
    ];
    
    public function provision(string $suiteKey, Tenant $tenant): void
    {
        $suite = $this->suites[$suiteKey];
        
        // Install apps
        foreach ($suite->getApps() as $appSlug) {
            $this->appInstaller->install($tenant, $appSlug);
        }
        
        // Enable industry module
        $this->moduleManager->enable($tenant, $suite->getIndustryModule());
        
        // Apply configurations
        $tenant->settings()->merge($suite->getDefaultConfig());
    }
}
```

---

## Migration Path for Legacy Apps

For existing CA ERP / Fasteners ERP:

### Phase 1: Analysis
- Identify shared functionality (invoicing, inventory, contacts)
- Identify industry-specific logic (GST filing, BOM calculations)
- Map to Dooz apps + custom module

### Phase 2: Data Migration
```
Legacy App Database
        │
        ▼
    ETL Scripts
        │
    ┌───┴───┐
    ▼       ▼
Dooz Apps  Industry Module
(shared)    (custom tables)
```

### Phase 3: UI Transition
- Replace legacy UI with Dooz Hub + custom views
- Keep industry-specific dashboards in module

### Phase 4: Deprecation
- Run parallel for validation
- Sunset legacy app

---

## Example Suite Definitions

### CA Professional Suite
```yaml
name: CA Professional Suite
slug: ca-suite
target: Chartered Accountants

apps:
  - invoicing (with GST templates)
  - contacts (as clients)
  - documents (for filings)
  - calendar (due dates)
  - worklog (time tracking)

industry_module: ca-professional
features:
  - GST return preparation
  - ITR filing workflow
  - Client compliance dashboard
  - Due date reminders
  - TDS calculations

integrations:
  - GST Portal API
  - Income Tax Portal API
```

### SME ERP Suite
```yaml
name: SME Business Suite
slug: sme-erp
target: Small & Medium Enterprises

apps:
  - invoicing
  - inventory
  - contacts
  - quicky (task management)
  - worklog

industry_module: sme-business
features:
  - Purchase & Sales orders
  - Simple payroll
  - Expense tracking
  - Bank reconciliation
  - GST compliance

integrations:
  - Razorpay/PayU
  - Bank APIs
```

### Fasteners Pro Suite
```yaml
name: Fasteners Industry ERP
slug: fasteners-pro
target: Industrial fastener traders

apps:
  - inventory (advanced)
  - invoicing
  - contacts

industry_module: fasteners-industry
features:
  - Part master with standards (ISO, DIN, ASTM)
  - Bill of Materials
  - Quantity breaks pricing
  - Technical specs database
  - Import/Export documentation
```

---

## Benefits of This Architecture

| Benefit | Description |
|---------|-------------|
| **Code Reuse** | 70-80% shared via Dooz apps |
| **Faster Development** | New suite = config + small module |
| **Unified Platform** | One codebase, one deployment |
| **White-label Ready** | Easy custom branding per suite |
| **Marketplace Revenue** | Sell suites on Dooz marketplace |
| **Client Migration** | Clear path from legacy apps |

---

## Next Steps

1. **Create `dooz-suites` package** - Suite provisioning and management
2. **Define Suite Schema** - YAML/JSON config format
3. **Build first Industry Module** - Start with CA Suite
4. **Create Suite Admin UI** - In dooz-hub for suite management
5. **Migration tools** - ETL scripts for legacy apps

---

*Document: Enterprise Solutions Architecture*
*Version: 1.0*
*Date: 2025-12-28*
