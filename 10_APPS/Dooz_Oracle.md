# Dooz Oracle

> The Uncertainty Quantifier for AI Systems

---

## Overview

Dooz Oracle is the **Confidence & Uncertainty Engine** that wraps all AI outputs with explicit confidence scoring. Instead of pretending AI knows everything, Oracle quantifies what it knows, what it's uncertain about, and what needs verification.

```
┌──────────────────────────────────────────────────────────────┐
│                      DOOZ ORACLE                              │
├──────────────────────────────────────────────────────────────┤
│  🎯 Confidence Scoring   │  📚 Source Tracking               │
│  ✅ Verification Suggestions │  📊 Calibration Metrics        │
│  🔗 Evidence Chains      │  🧠 Uncertainty Heatmaps          │
└──────────────────────────────────────────────────────────────┘
```

---

## Core Philosophy

**AI systems should be honest about uncertainty.**

Every AI response has varying degrees of confidence across different parts. Oracle makes this visible:
- A contract date might be 95% confident
- But the specific year might only be 72% confident (OCR issue?)
- And the party names might be 88% confident

---

## Key Features

### 1. Confidence Scoring

- **Overall confidence** (0-100%) for any AI response
- **Segment-level confidence** with reasons
- **Visual heatmaps** showing uncertainty distribution

### 2. Source Tracking

- **Links claims** to source documents (via Omo IDs)
- **Tracks evidence chains** through the knowledge graph
- **Shows provenance** for every assertion

### 3. Verification Suggestions

- **Automatic suggestions** for what to verify
- **Priority-ranked** by uncertainty level
- **Actionable steps** users can take

### 4. Calibration Metrics

- **Tracks prediction accuracy** over time
- **Measures** if confidence scores are well-calibrated
- **Improves** confidence estimation through feedback

---

## Integration

Oracle works as middleware for all Dooz AI apps:

```typescript
import { useOracle } from 'dooz-oracle';

function MyComponent() {
  const { wrapResponse, confidence } = useOracle();
  
  const result = await wrapResponse(aiResponse, {
    sources: [{ omo_id: 'doc-123', title: 'Contract' }],
    context: 'contract_extraction'
  });
  
  // result.confidence.overall = 0.85
  // result.confidence.segments = [...]
  // result.verification_suggestions = [...]
}
```

---

## Output Structure

```typescript
{
  result: "The contract expires on March 15, 2025",
  confidence: {
    overall: 0.85,
    segments: [
      { text: "The contract expires", confidence: 0.95, reason: "high_match" },
      { text: "on March 15, 2025", confidence: 0.72, reason: "partial_match" }
    ]
  },
  sources: [{ omo_id: "doc-abc", title: "Acme Contract", page: 3 }],
  caveats: ["Date extracted from OCR, verify original"],
  verification_suggestions: [
    { action: "Check contract PDF page 3", priority: "high" }
  ]
}
```

---

## Part of the Dooz AI Ecosystem

Oracle integrates with:
- **Omo** - Knowledge graph (provides source references)
- **Kasper** - Chat interface (displays confidence in responses)
- **Scry** - Semantic search (confidence in search results)
- **Sage** - Embeddings (semantic similarity confidence)
- **Perspective** - Multi-LLM verification

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | TypeScript |
| **Frontend** | React, DoozieSoft Design System |
| **AI** | OpenRouter (Claude, GPT-4) |

---

## Related Documentation

- [UI Agentic AI Principles](../06_UI_AGENTIC_AI/README.md)
- [Agent Metadata Schema](../06_UI_AGENTIC_AI/Agent_Metadata_Schema.md)
- [Multi-LLM Verification (Perspective)](Dooz_Perspective.md)

---

*Repository: DoozHub/dooz-oracle*
