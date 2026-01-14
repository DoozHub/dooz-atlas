# dooz-cartridges

> Pluggable feature modules for Dooz Brain

## Overview

Cartridges are modular plugins that extend Dooz Brain with specialized knowledge and capabilities. Each cartridge can provide real-time data, AI-enhanced insights, and interactive commands.

## Available Cartridges

| Cartridge | Description | AI Enhanced |
|-----------|-------------|-------------|
| weather | Weather forecasts and conditions | ✅ |
| crypto | Cryptocurrency prices and trends | ✅ |
| news | News headlines and summaries | ✅ |
| calculator | Mathematical computations | ✅ |
| unit-converter | Unit conversions | ❌ |
| translator | Language translation | ✅ |

## Cartridge Structure

```
cartridges/
├── weather/
│   ├── manifest.json
│   ├── index.ts
│   └── ai-prompts.json
├── crypto/
│   └── ...
└── template/
    └── ...
```

## Manifest Format

```json
{
  "name": "weather",
  "version": "1.0.0",
  "description": "Weather forecasts and conditions",
  "author": "DoozHub",
  "commands": ["weather", "forecast"],
  "aiEnhanced": true,
  "permissions": ["network"],
  "config": {
    "apiKey": { "type": "secret", "required": true }
  }
}
```

## Creating a Cartridge

1. Copy the `template/` folder
2. Update `manifest.json`
3. Implement `index.ts` with required exports
4. Add AI prompts if enhanced
5. Submit PR to the public repo

## Status

This is a **public repository** - community contributions welcome!

---

*Repository: DoozHub/dooz-cartridges (Public)*
