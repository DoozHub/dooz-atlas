# De-Hype

> AI-Powered Clickbait Detection and Neutralization

---

## Overview

A Chrome extension that uses AI to detect and neutralize clickbait headlines in real-time. De-Hype scans web pages for sensationalized headlines and replaces them with factual, neutral alternatives.

```
┌──────────────────────────────────────────────────────────────┐
│                        DE-HYPE                              │
├──────────────────────────────────────────────────────────────┤
│  🤖 AI Detection         │  📊 Hype Score (0-100)           │
│  💬 Hover Preview        │  🔄 One-Click Scan               │
│  🎚️ Sensitivity Control  │  📝 Domain Whitelist             │
│  🌙 Dark Mode            │  ⚡ Batch Processing              │
└──────────────────────────────────────────────────────────────┘
```

---

## Example

**Before:** "You Won't BELIEVE What This Celebrity Did Next!"  
**After:** "Celebrity makes public appearance" [85]

---

## Key Features

| Feature | Description |
|---------|-------------|
| **AI-Powered Detection** | Uses Gemini API for clickbait identification |
| **Hype Score** | 0-100 score for each headline |
| **One-Click Scan** | Scan entire page with single click |
| **Hover Preview** | See original clickbait on hover |
| **Batch Processing** | Single API call per page |
| **Sensitivity Control** | Low/Medium/High adjustment |
| **Domain Whitelist** | Exclude specific sites |
| **Activity Log** | Track all modifications |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | TypeScript |
| **Platform** | Chrome Extension MV3 |
| **AI** | Gemini 3 Flash API |
| **Build** | esbuild |

---

## Architecture

```
de-hype/
├── src/
│   ├── background/      # Service worker
│   ├── content/         # Content script
│   ├── popup/           # React popup UI
│   └── types/           # TypeScript types
├── demo/                # Demo files
├── dist/                # Built extension
└── manifest.json        # MV3 manifest
```

---

## Installation

```bash
# Clone and install
git clone <repo>
npm install

# Build
npm run build

# Load in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Load unpacked -> select dist folder
```

---

## Setup

1. Get a [Gemini API key](https://aistudio.google.com/apikey)
2. Click the De-Hype extension icon
3. Paste your API key
4. Browse any news site and click "Scan Page"

---

*Repository: experiments/de-hype*
