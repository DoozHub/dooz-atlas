# Dooz Data Model

> Core database schema and relationships.

---

## Core Database (Central)

Manages platform-wide entities.

### Tenants

```sql
tenants
├── id (uuid, PK)
├── name (string)
├── slug (string, unique)
├── domain (string, nullable)
├── database (string)           -- Tenant database name
├── plan (string)               -- Subscription plan
├── is_active (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Users (Core)

```sql
users
├── id (uuid, PK)
├── name (string)
├── email (string, unique)
├── password (string)
├── is_superadmin (boolean)
├── email_verified_at (timestamp)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Applications

```sql
applications
├── id (uuid, PK)
├── name (string)
├── slug (string, unique)
├── description (text)
├── version (string)
├── is_active (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Subscriptions

```sql
subscriptions
├── id (uuid, PK)
├── tenant_id (FK → tenants)
├── application_id (FK → applications)
├── plan (string)
├── seats (integer)
├── starts_at (timestamp)
├── ends_at (timestamp)
├── created_at (timestamp)
└── updated_at (timestamp)
```

---

## Tenant Database (Per-Tenant)

Each tenant has an isolated database.

### Tenant Users

```sql
tenant_users
├── id (uuid, PK)
├── user_id (FK → core.users)
├── department_id (FK → departments)
├── role (string)
├── is_active (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Departments

```sql
departments
├── id (uuid, PK)
├── name (string)
├── code (string, unique)
├── parent_id (FK → departments, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Locations

```sql
locations
├── id (uuid, PK)
├── name (string)
├── code (string, unique)
├── address (text)
├── is_active (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)
```

---

## App-Specific Tables

### Calibration-Ops

```sql
calibration_ops_devices
├── id (uuid, PK)
├── device_code (string, unique)
├── model (string)
├── serial_number (string)
├── category_id (FK)
├── location_id (FK → locations)
├── calibration_frequency (integer)     -- Days
├── last_calibration_date (date)
├── next_due_date (date)
├── status (enum: ACTIVE, SENT, OVERDUE, DECOMMISSIONED)
├── created_at (timestamp)
└── updated_at (timestamp)

calibration_ops_certificates
├── id (uuid, PK)
├── device_id (FK → devices)
├── vendor_id (FK → vendors)
├── certificate_number (string)
├── calibration_date (date)
├── valid_until (date)
├── file_path (string)
├── status (enum: PENDING, APPROVED, REJECTED)
├── approved_by (FK → tenant_users)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Worklog

```sql
worklog_entries
├── id (uuid, PK)
├── user_id (FK → tenant_users)
├── project_id (FK → projects)
├── description (text)
├── duration_minutes (integer)
├── logged_date (date)
├── billable (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)
```

---

## Relationships

```
Tenant ─┬─ 1:N ─── Subscription ─── N:1 ─── Application
        │
        └─ 1:N ─── TenantUser ─── N:1 ─── User (Core)
                       │
                       └─ N:1 ─── Department
```

---

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Table name | `{app}_{plural_noun}` | `calibration_ops_devices` |
| Primary key | `id` (UUID) | — |
| Foreign key | `{related_table}_id` | `device_id` |
| Timestamps | `created_at`, `updated_at` | — |
| Soft deletes | `deleted_at` | — |
| Boolean | `is_{adjective}` or `has_{noun}` | `is_active` |
| Enum | Stored as string | `status` |

---

## Indexing Strategy

- Always index foreign keys
- Index columns used in WHERE clauses
- Composite indexes for multi-column queries
- Avoid over-indexing (per DOOZ_CORE_DOCTRINE)
