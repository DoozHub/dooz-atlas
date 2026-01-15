# Dooz Hub - Technical Specification

> Architecture for unified media management

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          DOOZ HUB (Desktop)                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Tauri Application                           │   │
│  │  ┌─────────────────┐         ┌─────────────────────────────────┐│   │
│  │  │   Rust Backend  │◄───────►│     TypeScript Frontend         ││   │
│  │  │                 │         │                                 ││   │
│  │  │ - SQLite DB     │         │ - React UI                      ││   │
│  │  │ - File Watcher  │         │ - Virtual Scrolling             ││   │
│  │  │ - Thumbnail Gen │         │ - Lightbox Viewer               ││   │
│  │  │ - EXIF Parser   │         │ - Map View                      ││   │
│  │  │ - AI Bridge     │         │ - Timeline View                 ││   │
│  │  └────────┬────────┘         └─────────────────────────────────┘│   │
│  └───────────┼──────────────────────────────────────────────────────┘   │
│              │                                                          │
│              ▼                                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │    hub.db       │  │  /thumbnails/   │  │   /media/       │         │
│  │   (SQLite)      │  │   (Cache)       │  │  (User Files)   │         │
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
| Database | SQLite |
| Image Processing | libvips / image crate |
| Video | FFmpeg |
| EXIF | exif-rs |
| Thumbnails | Sharp (via Worker) |

---

## Database Schema

```sql
-- Media items
CREATE TABLE media (
    id TEXT PRIMARY KEY,
    hash TEXT UNIQUE,
    filename TEXT NOT NULL,
    path TEXT NOT NULL,
    media_type TEXT NOT NULL,  -- 'image', 'video', 'raw'
    mime_type TEXT,
    size INTEGER,
    width INTEGER,
    height INTEGER,
    duration REAL,  -- for video
    created_at INTEGER,
    modified_at INTEGER,
    imported_at INTEGER,
    INDEX (media_type),
    INDEX (created_at)
);

-- EXIF metadata
CREATE TABLE exif (
    media_id TEXT PRIMARY KEY,
    camera_make TEXT,
    camera_model TEXT,
    lens TEXT,
    focal_length REAL,
    aperture REAL,
    shutter_speed TEXT,
    iso INTEGER,
    taken_at INTEGER,
    latitude REAL,
    longitude REAL,
    altitude REAL,
    raw_json TEXT
);

-- Albums
CREATE TABLE albums (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    cover_id TEXT,
    is_smart BOOLEAN DEFAULT FALSE,
    smart_query TEXT,
    created_at INTEGER,
    updated_at INTEGER
);

CREATE TABLE album_media (
    album_id TEXT NOT NULL,
    media_id TEXT NOT NULL,
    position INTEGER,
    PRIMARY KEY (album_id, media_id)
);

-- Tags
CREATE TABLE tags (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    color TEXT,
    created_at INTEGER
);

CREATE TABLE media_tags (
    media_id TEXT NOT NULL,
    tag_id TEXT NOT NULL,
    confidence REAL,  -- for AI-generated tags
    source TEXT,      -- 'user' or 'ai'
    PRIMARY KEY (media_id, tag_id)
);

-- Face recognition
CREATE TABLE faces (
    id TEXT PRIMARY KEY,
    media_id TEXT NOT NULL,
    person_id TEXT,
    box_x INTEGER,
    box_y INTEGER,
    box_w INTEGER,
    box_h INTEGER,
    embedding BLOB,
    confirmed BOOLEAN DEFAULT FALSE
);

CREATE TABLE people (
    id TEXT PRIMARY KEY,
    name TEXT,
    avatar_face_id TEXT,
    created_at INTEGER
);

-- Thumbnails cache
CREATE TABLE thumbnails (
    media_id TEXT NOT NULL,
    size TEXT NOT NULL,  -- 'small', 'medium', 'large'
    path TEXT NOT NULL,
    created_at INTEGER,
    PRIMARY KEY (media_id, size)
);
```

---

## Core Modules

### File Scanner

```rust
pub struct FileScanner {
    watch_paths: Vec<PathBuf>,
    watcher: RecommendedWatcher,
    db: SqlitePool,
}

impl FileScanner {
    pub async fn scan_folder(&self, path: &Path) -> Result<ScanResult>;
    pub async fn handle_file_event(&self, event: FileEvent) -> Result<()>;
    pub fn get_supported_extensions() -> &'static [&'static str];
}

// Supported formats
const IMAGE_EXTENSIONS: &[&str] = &[
    "jpg", "jpeg", "png", "gif", "webp", "heic", "heif", "tiff", "bmp"
];

const RAW_EXTENSIONS: &[&str] = &[
    "cr2", "cr3", "nef", "arw", "dng", "raf", "orf", "rw2", "pef"
];

const VIDEO_EXTENSIONS: &[&str] = &[
    "mp4", "mov", "avi", "mkv", "webm", "m4v", "3gp"
];
```

### EXIF Extractor

```rust
pub struct ExifExtractor;

impl ExifExtractor {
    pub fn extract(path: &Path) -> Result<ExifData>;
    pub fn extract_gps(path: &Path) -> Result<Option<GpsCoordinates>>;
    pub fn extract_thumbnail(path: &Path) -> Result<Option<Vec<u8>>>;
}
```

### Thumbnail Generator

```rust
pub struct ThumbnailGenerator {
    cache_path: PathBuf,
    sizes: HashMap<ThumbnailSize, (u32, u32)>,
}

impl ThumbnailGenerator {
    pub async fn generate(&self, media: &Media) -> Result<ThumbnailSet>;
    pub fn get_or_generate(&self, media_id: &str, size: ThumbnailSize) -> Result<PathBuf>;
}

pub enum ThumbnailSize {
    Small,   // 150x150
    Medium,  // 400x400
    Large,   // 800x800
}
```

---

## View Modes

### Grid View
- Virtual scrolling for 100k+ items
- Lazy loading thumbnails
- Grouped by date/album

### Timeline View
- Year/month/day hierarchy
- Scrollable timeline scrubber
- Date range selection

### Map View
- Cluster markers for locations
- Click to filter by area
- Heat map visualization

### Face View
- Grouped by detected person
- Unconfirmed face suggestions
- Easy tagging workflow

---

## AI Features

### Auto-Tagging

```
Image → Feature Extraction → Classification → Tag Suggestions
         (ResNet/CLIP)       (Categories)     (confidence)
```

Categories: landscape, portrait, food, animal, architecture, etc.

### Face Recognition

```
Image → Face Detection → Embedding → Clustering → Person Assignment
        (MTCNN)         (FaceNet)   (DBSCAN)
```

### Scene Detection

```
Image → Scene Classification → Location Type
        (Places365)           (beach, mountain, city, etc.)
```

---

## Sync Strategy

| Category | Sync Mode |
|----------|-----------|
| Database | Always |
| Thumbnails (small) | Optional |
| Thumbnails (large) | Never |
| Original files | On-demand |

### Sync Configuration

```json
{
  "app_name": "dooz-hub",
  "categories": [
    {
      "id": "database",
      "paths": ["hub.db"],
      "sync_mode": "always"
    },
    {
      "id": "thumbnails_small",
      "paths": ["thumbnails/small/**"],
      "sync_mode": "optional"
    }
  ]
}
```

---

## Performance Targets

| Operation | Target |
|-----------|--------|
| Grid scroll (60fps) | < 16ms/frame |
| Thumbnail load | < 50ms |
| EXIF extraction | < 100ms |
| Search (100k items) | < 500ms |
| Initial scan (10k files) | < 60s |

---

## File Structure

```
~/.dooz/hub/
├── hub.db              # SQLite database
├── thumbnails/
│   ├── small/          # 150px
│   ├── medium/         # 400px
│   └── large/          # 800px
├── cache/
│   └── previews/       # Video previews
├── .sync/              # Sync metadata
└── settings.json
```

---

## Related Files

- [Client App Guide](../CLIENT_APP_GUIDE.md)
- [Sync Integration](../DOOZ_SYNC_INTEGRATION.md)
