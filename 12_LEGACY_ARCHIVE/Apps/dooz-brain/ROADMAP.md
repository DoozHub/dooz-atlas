# Dooz Brain - Roadmap

> Development phases for AI-powered knowledge base

---

## Overview

Dooz Brain is a local-first PKM with AI capabilities. Roadmap prioritizes core editing, then knowledge features, then AI.

---

## Phase 1: Core Editor ✅

**Status:** Complete

### Completed Features
- [x] Tauri application scaffold
- [x] SQLite database integration
- [x] Basic note CRUD operations
- [x] Markdown rendering
- [x] File attachment support
- [x] Basic search (SQLite FTS5)
- [x] Settings management

### Outcomes
- Users can create, edit, delete notes
- Markdown is rendered correctly
- Notes are stored locally and persist

---

## Phase 2: Knowledge Graph 🔄

**Status:** In Progress

### Features
- [ ] Wiki-link parsing (`[[Note Title]]`)
- [ ] Bidirectional link tracking
- [ ] Backlinks panel
- [ ] Graph visualization (D3.js)
- [ ] Graph filtering and search
- [ ] Link suggestions while typing

### Data Model
- Links extracted on save
- Stored in links table
- Graph computed on demand

---

## Phase 3: Organization

**Status:** Planned

### Features
- [ ] Tag system
- [ ] Tag autocomplete
- [ ] Hierarchical folders
- [ ] Daily notes with calendar
- [ ] Templates
- [ ] Note properties/metadata
- [ ] Quick capture

### UX Improvements
- Keyboard shortcuts
- Command palette
- Quick switcher

---

## Phase 4: Sync & Multi-Device

**Status:** Planned

### Features
- [ ] Dooz Sync integration
- [ ] Conflict resolution UI
- [ ] Sync status indicator
- [ ] Selective sync for attachments
- [ ] Multi-device detection

### Technical Requirements
- @dooz/sync-sdk integration
- Encryption key management
- Merge strategy for concurrent edits

---

## Phase 5: AI Integration

**Status:** Planned

### Features
- [ ] AI chat interface
- [ ] Query your notes in natural language
- [ ] Note summarization
- [ ] Auto-tagging suggestions
- [ ] Writing assistance
- [ ] Translation

### AI Backend
- OpenAI API integration
- Anthropic API integration
- Ollama for local models
- Embedding generation
- Vector similarity search

---

## Phase 6: Semantic Search

**Status:** Planned

### Features
- [ ] Embedding generation for notes
- [ ] Vector storage (SQLite + vec extension)
- [ ] Semantic search UI
- [ ] Related notes suggestions
- [ ] Auto-linking suggestions

### Performance
- Background embedding updates
- Incremental updates on edit
- Embedding cache

---

## Phase 7: Advanced Editing

**Status:** Planned

### Features
- [ ] Block-based editor (Notion-style)
- [ ] Tables
- [ ] Code blocks with syntax highlighting
- [ ] Math equations (LaTeX)
- [ ] Diagrams (Mermaid)
- [ ] Image annotations

### Editor Improvements
- Slash commands
- Drag and drop blocks
- Embeds (YouTube, tweets)

---

## Phase 8: Mobile Companion

**Status:** Planned

### Features
- [ ] Flutter mobile app
- [ ] Quick capture
- [ ] Note viewing
- [ ] Basic editing
- [ ] Voice notes
- [ ] Photo notes

### Sync
- Real-time sync with desktop
- Offline support
- Background sync

---

## Phase 9: Collaboration

**Status:** Planned

### Features
- [ ] Shared workspaces
- [ ] Real-time co-editing
- [ ] Comments and annotations
- [ ] Change history
- [ ] Permission controls
- [ ] Publishing to web

### Technical
- CRDT for real-time sync
- Team key management
- Access control

---

## Phase 10: Advanced AI

**Status:** Planned

### Features
- [ ] Custom knowledge embeddings
- [ ] Research assistant workflows
- [ ] PDF ingestion
- [ ] Web clipper with summarization
- [ ] Spaced repetition integration
- [ ] Voice transcription

---

## Technical Debt Backlog

### Priority 1 (High)
- [ ] Improve editor performance
- [ ] Optimize graph rendering
- [ ] Better error handling
- [ ] Undo/redo system

### Priority 2 (Medium)
- [ ] Accessibility improvements
- [ ] Theme customization
- [ ] Export options (PDF, HTML)
- [ ] Import from other apps

### Priority 3 (Low)
- [ ] Plugin system
- [ ] Custom CSS
- [ ] Localization
- [ ] Keyboard customization

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Note Save | < 100ms |
| App Launch | < 2s |
| Search (1000 notes) | < 500ms |
| Graph (500 nodes) | < 1s |
| AI Response Start | < 2s |

---

## Notes

- Local-first is non-negotiable
- Privacy and encryption are priorities
- Performance must scale to 10,000+ notes
- AI features are additive, core works without internet
