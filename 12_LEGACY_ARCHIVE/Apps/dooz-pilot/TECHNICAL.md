# Dooz Pilot - Technical Specification

> Architecture for AI-powered workflow automation

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DOOZ PILOT (Desktop)                            │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Tauri Application                           │   │
│  │  ┌─────────────────┐         ┌─────────────────────────────────┐│   │
│  │  │   Rust Backend  │◄───────►│     TypeScript Frontend         ││   │
│  │  │                 │         │                                 ││   │
│  │  │ - Workflow Eng  │         │ - Visual Builder                ││   │
│  │  │ - Scheduler     │         │ - Flow Editor (React Flow)      ││   │
│  │  │ - Connectors    │         │ - Execution Monitor             ││   │
│  │  │ - AI Engine     │         │ - Log Viewer                    ││   │
│  │  └────────┬────────┘         └─────────────────────────────────┘│   │
│  └───────────┼──────────────────────────────────────────────────────┘   │
│              │                                                          │
│              ▼                                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │   pilot.db      │  │  /workflows/    │  │  /credentials/  │         │
│  │   (SQLite)      │  │  (YAML/JSON)    │  │  (Encrypted)    │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Tauri 2.0 |
| Backend | Rust |
| Frontend | React + TypeScript |
| Flow Editor | React Flow |
| Database | SQLite |
| Scheduler | tokio-cron |
| HTTP Client | reqwest |
| AI | OpenAI / Anthropic / Ollama |

---

## Workflow Definition

### YAML Format

```yaml
name: daily-backup
description: Backup important files daily
version: 1.0.0

triggers:
  - type: schedule
    cron: "0 2 * * *"  # 2 AM daily
  - type: webhook
    path: /trigger/backup

variables:
  source_folder: "${HOME}/Documents"
  backup_folder: "${HOME}/Backups"

steps:
  - id: list_files
    action: fs/list
    input:
      path: "${source_folder}"
      pattern: "*.docx"
    output: files

  - id: filter_recent
    action: filter
    input:
      items: "${list_files.files}"
      condition: "modified_at > now() - 1d"
    output: recent_files

  - id: copy_files
    action: fs/copy
    loop: "${recent_files}"
    input:
      source: "${item.path}"
      destination: "${backup_folder}/${item.name}"

  - id: notify
    action: notification/desktop
    input:
      title: "Backup Complete"
      body: "Backed up ${len(recent_files)} files"
```

---

## Database Schema

```sql
-- Workflows
CREATE TABLE workflows (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    definition TEXT NOT NULL,  -- YAML/JSON
    version INTEGER DEFAULT 1,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at INTEGER,
    updated_at INTEGER
);

-- Triggers
CREATE TABLE triggers (
    id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    trigger_type TEXT NOT NULL,  -- 'schedule', 'webhook', 'file_watch', 'manual'
    config TEXT,  -- JSON
    is_enabled BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id)
);

-- Executions
CREATE TABLE executions (
    id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    trigger_id TEXT,
    status TEXT NOT NULL,  -- 'pending', 'running', 'success', 'failed', 'cancelled'
    started_at INTEGER,
    completed_at INTEGER,
    error TEXT,
    context TEXT,  -- JSON (variables, outputs)
    FOREIGN KEY (workflow_id) REFERENCES workflows(id)
);

-- Execution steps
CREATE TABLE execution_steps (
    id TEXT PRIMARY KEY,
    execution_id TEXT NOT NULL,
    step_id TEXT NOT NULL,
    status TEXT NOT NULL,
    started_at INTEGER,
    completed_at INTEGER,
    input TEXT,    -- JSON
    output TEXT,   -- JSON
    error TEXT,
    FOREIGN KEY (execution_id) REFERENCES executions(id)
);

-- Credentials (encrypted)
CREATE TABLE credentials (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    provider TEXT NOT NULL,  -- 'oauth2', 'api_key', 'basic'
    data TEXT NOT NULL,      -- Encrypted JSON
    created_at INTEGER,
    updated_at INTEGER
);

-- Connectors
CREATE TABLE connectors (
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    manifest TEXT NOT NULL,  -- JSON
    is_enabled BOOLEAN DEFAULT TRUE,
    installed_at INTEGER,
    PRIMARY KEY (id, version)
);
```

---

## Core Modules

### Workflow Engine

```rust
pub struct WorkflowEngine {
    db: SqlitePool,
    runtime: Runtime,
    connectors: ConnectorRegistry,
}

impl WorkflowEngine {
    pub async fn execute(&self, workflow_id: &str, context: Context) -> Result<Execution>;
    pub async fn cancel(&self, execution_id: &str) -> Result<()>;
    pub async fn get_status(&self, execution_id: &str) -> Result<ExecutionStatus>;
}

pub struct Context {
    pub variables: HashMap<String, Value>,
    pub credentials: HashMap<String, Credential>,
    pub trigger: TriggerInfo,
}
```

### Step Executor

```rust
pub struct StepExecutor {
    step: WorkflowStep,
    context: Context,
    connector: Box<dyn Connector>,
}

impl StepExecutor {
    pub async fn execute(&self) -> Result<StepResult>;
    pub fn resolve_inputs(&self) -> Result<Value>;
}

pub trait Connector: Send + Sync {
    fn id(&self) -> &str;
    fn actions(&self) -> Vec<ActionDefinition>;
    async fn execute(&self, action: &str, input: Value) -> Result<Value>;
}
```

### Scheduler

```rust
pub struct Scheduler {
    engine: Arc<WorkflowEngine>,
    jobs: RwLock<HashMap<String, JobHandle>>,
}

impl Scheduler {
    pub fn schedule(&self, workflow_id: &str, cron: &str) -> Result<()>;
    pub fn unschedule(&self, workflow_id: &str) -> Result<()>;
    pub fn list_scheduled(&self) -> Vec<ScheduledJob>;
}
```

---

## Built-in Connectors

### File System

| Action | Description |
|--------|-------------|
| `fs/read` | Read file contents |
| `fs/write` | Write to file |
| `fs/copy` | Copy file/folder |
| `fs/move` | Move file/folder |
| `fs/delete` | Delete file/folder |
| `fs/list` | List directory |
| `fs/watch` | Watch for changes |

### HTTP

| Action | Description |
|--------|-------------|
| `http/get` | GET request |
| `http/post` | POST request |
| `http/put` | PUT request |
| `http/delete` | DELETE request |
| `http/download` | Download file |

### AI

| Action | Description |
|--------|-------------|
| `ai/complete` | Text completion |
| `ai/chat` | Chat completion |
| `ai/embed` | Generate embeddings |
| `ai/summarize` | Summarize text |
| `ai/classify` | Classify text |

### Notifications

| Action | Description |
|--------|-------------|
| `notify/desktop` | Desktop notification |
| `notify/email` | Send email |
| `notify/slack` | Slack message |
| `notify/webhook` | Call webhook |

---

## Expression Language

```javascript
// Variable access
"${workflow.name}"
"${steps.step1.output.data}"

// Functions
"${len(items)}"
"${format(date, 'YYYY-MM-DD')}"
"${env('HOME')}"
"${now()}"

// Conditionals
"${if(count > 10, 'many', 'few')}"

// JSON path
"${data.users[0].name}"
"${data.users[*].email}"
```

---

## UI Components

### Visual Builder

```typescript
interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'loop';
  data: {
    action: string;
    connector: string;
    inputs: Record<string, any>;
    outputs: string[];
  };
  position: { x: number; y: number };
}

interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  condition?: string;
}
```

### Execution Monitor

- Real-time step progress
- Variable inspector
- Log streaming
- Error details
- Retry controls

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Workflow start | < 100ms |
| Step execution overhead | < 10ms |
| Concurrent workflows | 50+ |
| UI responsiveness | 60fps |

---

## File Structure

```
~/.dooz/pilot/
├── pilot.db            # SQLite database
├── workflows/          # Workflow definitions
│   ├── backup.yaml
│   └── sync.yaml
├── connectors/         # Custom connectors
├── credentials/        # Encrypted secrets
├── logs/               # Execution logs
├── .sync/              # Sync metadata
└── settings.json
```

---

## Related Files

- [Webhook Patterns](../WEBHOOK_PATTERNS.md)
- [API Contracts](../API_CONTRACTS.md)
