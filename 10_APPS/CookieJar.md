# CookieJar

> Chrome Extension for Browser Session State Management

---

## Overview

A Chrome extension for developers and QA engineers to save, manage, and hot-swap browser session states. Instantly switch between user accounts without re-authenticating.

```
┌──────────────────────────────────────────────────────────────┐
│                        COOKIE JAR                           │
├──────────────────────────────────────────────────────────────┤
│  🍪 Session Capture       │  🔐 AES-256 Encryption            │
│  ⚡ One-Click Switch     │  👤 Domain Scoping               │
│  📤 Export/Import        │  🧹 Selective Clearing           │
│  🌙 Dark Mode            │  🔑 Master Password              │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Session Capture** | Save cookies, localStorage, sessionStorage |
| **One-Click Context Switching** | Load profiles to switch accounts instantly |
| **Domain Scoping** | Profiles isolated per domain |
| **Encrypted Storage** | AES-256 encryption for all data |
| **Master Password** | Optional additional security layer |
| **Export/Import** | Share session profiles with team |
| **Sanitization** | Exclude sensitive keys when exporting |
| **Selective Clearing** | Nuke specific storage types |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | TypeScript |
| **UI** | React 19 |
| **Build** | Vite + CRXJS |
| **Testing** | Vitest, fast-check |
| **Platform** | Chrome Extension MV3 |

---

## Architecture

```
cookie-jar/
├── src/
│   ├── background/     # Service worker (Chrome APIs)
│   ├── content/        # Content script (DOM storage access)
│   ├── popup/          # React UI
│   └── shared/         # Shared utilities, types, crypto
├── icons/              # Extension icons
├── manifest.json       # Chrome extension manifest (MV3)
└── vite.config.ts      # Build configuration
```

---

## Security

- All profiles encrypted at rest with AES-256-GCM
- Installation-specific encryption key
- Optional master password with PBKDF2 key derivation
- No Chrome Sync (data stays local)
- Domain-scoped profiles prevent cross-domain access

---

## Quick Start

```bash
# Install dependencies
npm install

# Build extension
npm run build

# Load in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Load unpacked -> select dist folder
```

---

*Repository: experiments/cookie-jar*
