# Dooz Brain - Technical Specification

> Architecture for AI-powered personal knowledge base

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DOOZ BRAIN (Desktop)                            │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Tauri Application                           │   │
│  │  ┌─────────────────┐         ┌─────────────────────────────────┐│   │
│  │  │   Rust Backend  │◄───────►│     TypeScript Frontend         ││   │
│  │  │                 │         │                                 ││   │
│  │  │ - SQLite DB     │         │ - React UI                      ││   │
│  │  │ - File System   │         │ - Monaco Editor                 ││   │
│  │  │ - Encryption    │         │ - Graph Visualization           ││   │
│  │  │ - AI Bridge     │         │ - Markdown Renderer             ││   │
│  │  └────────┬────────┘         └─────────────────────────────────┘│   │
│  └───────────┼──────────────────────────────────────────────────────┘   │
│              │                                                          │
│              ▼                                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │   brain.db      │  │   /notes/       │  │  /attachments/  │         │
│  │   (SQLite)      │  │  (Markdown)     │  │   (Files)       │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
└─────────────────────────────────────────────────────────────────────────┘
           │                                           │
           │ Dooz Sync SDK                            │ API Calls
           ▼                                           ▼
   ┌──────────────┐                           ┌──────────────┐
   │  Dooz Core   │                           │  AI Providers│
   │  (Sync)      │                           │  (OpenAI,    │
   └──────────────┘                           │   Anthropic) │
                                              └──────────────┘
```

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Tauri 2.0 |
| Backend | Rust |
| Frontend | React + TypeScript |
| Database | SQLite + FTS5 |
| Editor | Monaco / TipTap |
| Graph | D3.js / React Flow |
| Sync | @dooz/sync-sdk |
| AI | OpenAI / Anthropic APIs |

---

## Database Schema

```sql
-- Notes table
CREATE TABLE notes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    content_html TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    archived_at INTEGER,
    is_daily BOOLEAN DEFAULT FALSE,
    daily_date TEXT,
    parent_id TEXT,
    FOREIGN KEY (parent_id) REFERENCES notes(id)
);

-- Full-text search
CREATE VIRTUAL TABLE notes_fts USING fts5(
    title, content,
    content='notes',
    content_rowid='rowid'
);

-- Tags
CREATE TABLE tags (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    color TEXT,
    created_at INTEGER
);

CREATE TABLE note_tags (
    note_id TEXT NOT NULL,
    tag_id TEXT NOT NULL,
    PRIMARY KEY (note_id, tag_id)
);

-- Links between notes (backlinks)
CREATE TABLE links (
    source_id TEXT NOT NULL,
    target_id TEXT NOT NULL,
    context TEXT,
    created_at INTEGER,
    PRIMARY KEY (source_id, target_id)
);

-- Attachments
CREATE TABLE attachments (
    id TEXT PRIMARY KEY,
    note_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    mime_type TEXT,
    size INTEGER,
    path TEXT NOT NULL,
    created_at INTEGER
);

-- AI embeddings for semantic search
CREATE TABLE embeddings (
    note_id TEXT PRIMARY KEY,
    embedding BLOB,
    model TEXT,
    updated_at INTEGER
);
```

---

## Core Modules

### Note Manager

```rust
pub struct NoteManager {
    db: SqlitePool,
    vault_path: PathBuf,
}

impl NoteManager {
    pub async fn create(&self, note: CreateNote) -> Result<Note>;
    pub async fn update(&self, id: &str, update: UpdateNote) -> Result<Note>;
    pub async fn delete(&self, id: &str) -> Result<()>;
    pub async fn get(&self, id: &str) -> Result<Option<Note>>;
    pub async fn search(&self, query: &str) -> Result<Vec<Note>>;
    pub async fn get_backlinks(&self, id: &str) -> Result<Vec<Link>>;
}
```

### Link Parser

```rust
pub fn extract_links(content: &str) -> Vec<ParsedLink> {
    // Parse [[wiki-links]] and extract references
    // Supports: [[Note Title]], [[note-id|Display Text]]
}

pub fn update_links(note_id: &str, content: &str, db: &SqlitePool);
```

### AI Bridge

```rust
pub struct AIBridge {
    provider: Box<dyn AIProvider>,
    embedding_model: String,
}

impl AIBridge {
    pub async fn complete(&self, prompt: &str) -> Result<String>;
    pub async fn embed(&self, text: &str) -> Result<Vec<f32>>;
    pub async fn semantic_search(&self, query: &str, k: usize) -> Result<Vec<Note>>;
}
```

---

## Frontend Architecture

### State Management

```typescript
// Zustand store
interface BrainStore {
  notes: Map<string, Note>;
  activeNoteId: string | null;
  sidebar: {
    open: boolean;
    width: number;
  };
  
  // Actions
  loadNote: (id: string) => Promise<void>;
  saveNote: (id: string, content: string) => Promise<void>;
  createNote: (title: string) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
}
```

### IPC Commands

```typescript
// Rust <-> TypeScript communication
const commands = {
  'note:create': (params: CreateNote) => Note,
  'note:update': (id: string, update: UpdateNote) => Note,
  'note:delete': (id: string) => void,
  'note:search': (query: string) => Note[],
  'ai:complete': (prompt: string) => string,
  'ai:embed': (text: string) => number[],
  'sync:push': () => SyncResult,
  'sync:pull': () => SyncResult,
};
```

---

## Sync Integration

### What Gets Synced

| Category | Sync Mode | Priority |
|----------|-----------|----------|
| Database (brain.db) | Always | 1 |
| Markdown files | Always | 2 |
| Attachments | On-demand | 3 |
| Embeddings cache | Never | - |
| Settings | Always | 1 |

### Sync Configuration

```json
{
  "app_name": "dooz-brain",
  "categories": [
    {
      "id": "database",
      "paths": ["brain.db"],
      "sync_mode": "always"
    },
    {
      "id": "notes",
      "paths": ["notes/**/*.md"],
      "sync_mode": "always"
    },
    {
      "id": "attachments",
      "paths": ["attachments/**/*"],
      "sync_mode": "on_demand"
    }
  ]
}
```

---

## AI Features

### Embedding Strategy

- Model: text-embedding-3-small (OpenAI) or equivalent
- Dimension: 1536
- Chunking: Per note (max 8000 tokens)
- Update: On note save, debounced

### Query Flow

```
User Query
    │
    ▼
┌──────────────┐
│ Embed Query  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Vector      │ Top-K similar notes
│  Search      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Context     │ Build prompt with relevant notes
│  Assembly    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  LLM Call    │ Generate response
└──────┬───────┘
       │
       ▼
   Response
```

---

## Performance Targets

| Operation | Target |
|-----------|--------|
| Note open | < 50ms |
| Search (FTS) | < 100ms |
| Graph render (100 nodes) | < 200ms |
| AI response (start) | < 2s |
| Sync (10MB vault) | < 30s |

---

## File Structure

```
~/.dooz/brain/
├── brain.db           # SQLite database
├── brain.db-wal       # Write-ahead log
├── notes/             # Markdown files
│   ├── inbox/
│   ├── daily/
│   └── projects/
├── attachments/       # Binary files
├── .sync/             # Sync metadata
└── settings.json      # User preferences
```

---

## Related Files

- [Brain Integration](../BRAIN_INTEGRATION.md)
- [Cartridge Guide](../CARTRIDGE_GUIDE.md)
