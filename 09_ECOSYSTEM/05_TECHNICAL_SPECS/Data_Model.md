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

## Core v1.1.0 Tables (New)

### Notifications

```sql
notifications
├── id (uuid, PK)
├── user_id (FK → tenant_users)
├── tenant_id (FK → tenants)
├── title (string)
├── body (text)
├── category (enum: general, billing, security, app, marketing, system)
├── level (enum: info, success, warning, error)
├── channel (enum: email, push, sms, in_app, database)
├── is_read (boolean)
├── read_at (timestamp, nullable)
├── action_url (string, nullable)
├── metadata (json, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Notification Preferences

```sql
notification_preferences
├── id (uuid, PK)
├── user_id (FK → tenant_users)
├── category (enum: general, billing, security, app, marketing, system)
├── email_enabled (boolean)
├── push_enabled (boolean)
├── sms_enabled (boolean)
├── in_app_enabled (boolean)
├── digest_frequency (enum: realtime, daily, weekly)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### File Storage

```sql
tenant_files
├── id (uuid, PK)
├── tenant_id (FK → tenants)
├── user_id (FK → tenant_users)
├── folder_id (FK → tenant_folders, nullable)
├── name (string)
├── original_name (string)
├── path (string) -- S3 key or local path
├── disk (enum: local, s3)
├── mime_type (string)
├── size_bytes (bigint)
├── checksum (string) -- SHA256
├── version (integer) -- For versioning
├── is_public (boolean)
├── metadata (json, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)

tenant_folders
├── id (uuid, PK)
├── tenant_id (FK → tenants)
├── parent_id (FK → tenant_folders, nullable)
├── name (string)
├── path (string) -- Full path for quick lookups
├── created_at (timestamp)
└── updated_at (timestamp)

tenant_file_shares
├── id (uuid, PK)
├── file_id (FK → tenant_files)
├── token (string, unique) -- Share link token
├── expires_at (timestamp, nullable)
├── max_downloads (integer, nullable)
├── download_count (integer)
├── created_by (FK → tenant_users)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Audit Logging

```sql
audit_logs
├── id (uuid, PK)
├── tenant_id (FK → tenants, nullable) -- null for platform actions
├── user_id (FK → users, nullable) -- null for system actions
├── user_type (enum: user, api, system)
├── action (string) -- e.g., "user.created", "file.deleted"
├── entity_type (string) -- e.g., "App\Models\User"
├── entity_id (uuid) -- polymorphic reference
├── old_values (json, nullable)
├── new_values (json, nullable)
├── ip_address (string, nullable)
├── user_agent (text, nullable)
├── url (string, nullable)
├── metadata (json, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Search Index

```sql
search_index
├── id (uuid, PK)
├── tenant_id (FK → tenants)
├── searchable_type (string) -- Model class
├── searchable_id (uuid) -- Model ID
├── title (string) -- Searchable title
├── content (text) -- Searchable content
├── metadata (json, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)
```

**Note:** `search_index` is managed automatically via model observers for global search functionality.

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
