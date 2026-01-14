# Echo Tile

> A deterministic puzzle game with temporal debt mechanics

---

## Overview

Echo Tile is a TypeScript-based deterministic puzzle game featuring unique temporal debt mechanics. The game focuses on strategic puzzle-solving with time-based challenges.

```
┌──────────────────────────────────────────────────────────────┐
│                        ECHO TILE                             │
├──────────────────────────────────────────────────────────────┤
│  🧩 Deterministic Puzzles │  ⏰ Temporal Debt Mechanics      │
│  🎮 Strategy-Based        │  📦 TypeScript Implementation    │
│  🧪 Property-Based Testing│  ⚡ Fast-Check Integration       │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Deterministic Gameplay** | Same input = same output every time |
| **Temporal Debt** | Time-based mechanics and challenges |
| **Property Testing** | Uses fast-check for game logic verification |
| **TypeScript** | Fully typed implementation |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | TypeScript |
| **Build** | esbuild |
| **Testing** | Vitest, fast-check |
| **Bundle** | ESM modules |

---

## Commands

```bash
# Build
npm run build

# Test
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Serve
npm run serve
```

---

## Project Structure

```
echo_tile/
├── src/              # Game logic
├── web/              # Web bundle output
├── dist/             # Compiled output
├── vitest.config.ts  # Test configuration
└── tsconfig.json     # TypeScript config
```

---

*Repository: echo_tile*
