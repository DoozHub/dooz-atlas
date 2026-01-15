# Dooz Hub - Roadmap

> Development phases for media management platform

---

## Overview

Dooz Hub focuses on organizing and managing media. Roadmap prioritizes core library features, then AI enrichment.

---

## Phase 1: Core Library 🔄

**Status:** In Progress

### Features
- [x] Tauri application scaffold
- [x] SQLite database schema
- [ ] File system scanner
- [ ] Import workflow
- [ ] Thumbnail generation
- [ ] Basic grid view
- [ ] Virtual scrolling

### Outcomes
- Users can import photos
- Thumbnails display in grid
- Smooth scrolling with 10k+ items

---

## Phase 2: Metadata & Organization

**Status:** Planned

### Features
- [ ] EXIF extraction
- [ ] GPS location parsing
- [ ] Timeline view (by date)
- [ ] Album creation
- [ ] Folder hierarchy
- [ ] Drag-and-drop organization
- [ ] Bulk operations

### Data
- Camera info
- Dates and times
- Locations

---

## Phase 3: Viewing & Display

**Status:** Planned

### Features
- [ ] Lightbox viewer
- [ ] Full-resolution streaming
- [ ] Video playback
- [ ] RAW file preview
- [ ] Zoom and pan
- [ ] Filmstrip navigation
- [ ] Keyboard shortcuts

### Performance
- Preload adjacent images
- Progressive loading
- Hardware acceleration

---

## Phase 4: Search & Filter

**Status:** Planned

### Features
- [ ] Full-text search
- [ ] Filter by date range
- [ ] Filter by location
- [ ] Filter by camera
- [ ] Smart albums (saved filters)
- [ ] Recent/favorites/trash

### Advanced
- Boolean operators
- Saved searches
- Quick filters

---

## Phase 5: AI Features

**Status:** Planned

### Features
- [ ] Auto-tagging (scene detection)
- [ ] Object detection
- [ ] Face detection
- [ ] Face clustering
- [ ] Person tagging
- [ ] Similar image search
- [ ] Duplicate detection

### Models
- Scene classification
- Face recognition
- Embedding generation

---

## Phase 6: Map View

**Status:** Planned

### Features
- [ ] Map with photo clusters
- [ ] Click to view photos by location
- [ ] Location filtering
- [ ] Heat map visualization
- [ ] Trip detection
- [ ] Place naming

### Integration
- OpenStreetMap
- Mapbox (optional)

---

## Phase 7: Sync & Backup

**Status:** Planned

### Features
- [ ] Dooz Sync integration
- [ ] Selective sync (thumbnails vs full)
- [ ] Cloud backup status
- [ ] Storage optimization
- [ ] Sync queue management

### Options
- Sync database only
- Include thumbnails
- On-demand original download

---

## Phase 8: Editing Integration

**Status:** Planned

### Features
- [ ] Non-destructive edit metadata
- [ ] Open in external editor
- [ ] Lightroom catalog import
- [ ] XMP sidecar support
- [ ] Preset management
- [ ] Before/after comparison

### Editors
- Adobe Lightroom
- Capture One
- Darktable

---

## Phase 9: Sharing & Publishing

**Status:** Planned

### Features
- [ ] Client galleries
- [ ] Proofing workflow
- [ ] Download permissions
- [ ] Watermarking
- [ ] Social media export
- [ ] Website gallery generation

### Delivery
- Shareable links
- Password protection
- Expiring links

---

## Phase 10: Mobile Companion

**Status:** Planned

### Features
- [ ] Flutter mobile app
- [ ] Camera roll import
- [ ] Quick viewing
- [ ] Remote browsing
- [ ] Favorites sync
- [ ] Upload to desktop

---

## Technical Debt Backlog

### Priority 1 (High)
- [ ] Optimize thumbnail generation
- [ ] Improve scroll performance
- [ ] Better error handling
- [ ] Memory management for large libraries

### Priority 2 (Medium)
- [ ] Video thumbnail extraction
- [ ] RAW format support expansion
- [ ] Export functionality
- [ ] Batch processing

### Priority 3 (Low)
- [ ] Plugin system
- [ ] Custom metadata fields
- [ ] Print ordering
- [ ] Analytics dashboard

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Library Open (100k items) | < 5s |
| Grid Scroll (FPS) | 60 |
| Thumbnail Generation | 50/sec |
| Face Detection | 2/sec |
| Search (100k items) | < 1s |

---

## Notes

- Original files are never modified
- Local-first, works fully offline
- AI features are optional enhancements
- Scale target: 500,000+ media items
