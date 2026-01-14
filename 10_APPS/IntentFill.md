# IntentFill

> Intent-aware, validation-safe form filling for QA engineers and developers.

## Overview

IntentFill is a Chrome extension that fills web forms with intelligent, contextually appropriate test data. Unlike traditional autofill tools, it understands what each field means and generates human-plausible values that pass validation.

## Key Features

| Feature | Description |
|---------|-------------|
| Smart Intent Detection | Recognizes 50+ field types (names, emails, phones, addresses, IDs) |
| AI-Powered Generation | Optional Gemini AI for context-aware values |
| Cross-Field Consistency | Related fields get coherent data (email matches name) |
| Validation-Safe | Generated values respect field constraints (min/max, patterns) |
| Personas | 4 built-in personas (Indian Professional, US Consumer, SME Owner, Student) |
| Localization | Country formats for PAN, Aadhaar, SSN, phone numbers, postal codes |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | TypeScript, React, Vite |
| UI Framework | Custom popup UI |
| AI Integration | Google Gemini API |
| Browser API | Chrome Extension APIs |
| Testing | Vitest, fast-check (property-based) |

## Architecture

```
intent-fill/
├── src/
│   ├── modules/
│   │   ├── dom-scanner/        # Field metadata extraction
│   │   ├── heuristic-engine/   # Intent detection
│   │   ├── gemini-resolver/    # AI integration
│   │   ├── value-generator/    # Value generation
│   │   ├── persona-engine/     # Persona management
│   │   ├── form-filler/        # DOM manipulation
│   │   ├── fill-history/       # Undo support
│   │   └── smart-validation/   # Cross-field constraints
│   ├── popup/                  # Extension UI
│   ├── content.ts              # Content script
│   └── background.ts           # Service worker
├── dist/                       # Built extension
└── tests/                      # 247 automated tests
```

## Quick Start

```bash
# Install dependencies
npm install

# Build extension
npm run build

# Development mode (watch)
npm run dev

# Run tests
npm test
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt+F` | Fill form |
| `Alt+R` | Refill with new values |
| `Alt+C` | Clear filled fields |

## Privacy

- No data collection or analytics
- No form submission
- No persistent storage of form data
- AI only receives field metadata, never values
- All processing happens locally (except optional AI)

## Documentation Links

- README: `README.md`
- Privacy: `PRIVACY.md`
- Roadmap: `ROADMAP.md`
- Gap Analysis: `GAP_ANALYSIS.md`
