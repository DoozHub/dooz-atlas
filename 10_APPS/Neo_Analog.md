# Neo-Analog

> Design System for AI-Native Applications

---

## Overview

Neo-Analog is a specialized design system crafted for AI-native applications, bridging the gap between traditional UI patterns and the unique requirements of intelligent interfaces.

```
┌──────────────────────────────────────────────────────────────┐
│                       NEO-ANALOG                            │
├──────────────────────────────────────────────────────────────┤
│  🧠 AI-Aware Components   │  🎨 Analog Aesthetics            │
│  🔄 Agentic UI Patterns    │  📊 Token Tracking UI            │
│  🎯 Confidence Display     │  🌙 Dark Mode Native             │
└──────────────────────────────────────────────────────────────┘
```

---

## Core Philosophy

Neo-Analog embraces **analog warmth** in digital interfaces while providing sophisticated patterns for AI interaction:

- **Progressive Disclosure**: Show AI reasoning step-by-step
- **Confidence Visualization**: Make uncertainty visible
- **Human-in-the-Loop**: Design for collaboration, not automation
- **Trust Signals**: Build confidence through transparency

---

## Key Features

### AI-Aware Components

| Component | Purpose |
|-----------|---------|
| **ConfidenceIndicator** | Display confidence scores visually |
| **ReasoningSteps** | Show AI thought process |
| **TokenCounter** | Track and display token usage |
| **ModelSelector** | Choose between AI models |
| **SuggestionChips** | Present AI recommendations |

### Design Tokens

```css
/* AI-specific tokens */
--ai-confidence-high: #22c55e;
--ai-confidence-medium: #f59e0b;
--ai-confidence-low: #ef4444;

--ai-reasoning-bg: #f8fafc;
--ai-reasoning-border: #e2e8f0;

--token-warning: #f59e0b;
--token-limit: #ef4444;
```

### Analog Aesthetics

- Soft shadows and rounded corners
- Warm color palette with natural tones
- Tactile feedback on interactions
- Paper-like textures for critical content

---

## Project Structure

```
neo-analog/
├── design-system/     # Core CSS and tokens
├── docs/             # Documentation
├── samples/          # Example implementations
├── subagents/        # Design agent prompts
├── playground/       # Interactive playground
└── assets/           # UI assets and icons
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [agent.md](agent.md) | Design agent prompts and workflows |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [docs.html](docs.html) | Full documentation |

---

## Quick Start

```bash
npm install neo-analog
```

---

## Usage

### Import Design System

```css
@import 'neo-analog/design-system';
```

### Use Components

```tsx
import { ConfidenceIndicator, ReasoningSteps } from 'neo-analog';

function AIResponse({ confidence, reasoning, children }) {
  return (
    <div className="ai-response">
      <ConfidenceIndicator score={confidence} />
      <ReasoningSteps steps={reasoning} />
      {children}
    </div>
  );
}
```

---

## Design Principles

1. **Trust through Transparency**
   - Show reasoning paths
   - Display confidence levels
   - Explain AI limitations

2. **Human Agency**
   - Easy override of AI suggestions
   - Clear accept/reject actions
   - Undo/redo support

3. **Calibrated Expectation**
   - Set realistic expectations
   - Show uncertainty ranges
   - Provide context for responses

4. **Progressive Complexity**
   - Simple by default
   - Expandable details
   - Expert modes available

---

## Related Documentation

- [UI Agentic AI Principles](../06_UI_AGENTIC_AI/README.md)
- [Token Tracking Design](../06_UI_AGENTIC_AI/Token_Tracking_Design.md)
- [Agent Metadata Schema](../06_UI_AGENTIC_AI/Agent_Metadata_Schema.md)

---

*Repository: DoozHub/neo-analog*
