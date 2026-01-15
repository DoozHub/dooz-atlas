# Brain Integration

> How to integrate with Dooz Brain MCP.

---

## Overview

Dooz Brain provides institutional memory for AI agents via the Model Context Protocol (MCP). It allows agents to query knowledge, record decisions, and access ecosystem topology.

---

## MCP Endpoints

### Memory Query

```typescript
// Query memories within a scope
const result = await invoke('mcp_query', {
  scope_id: 'project-alpha',
  query: 'device calibration process',
  mode: 'semantic',  // or 'keyword'
  limit: 10,
});
```

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "memory": {
        "id": "uuid",
        "title": "Calibration SOP",
        "content": "...",
        "confidence": 0.92
      },
      "score": 0.87,
      "ranking_reason": "High confidence + Active state"
    }
  ]
}
```

### Ecosystem Topology

```typescript
// Get ecosystem structure
const topology = await invoke('mcp_ecosystem_topology');

// Get specific repo info
const brain = await invoke('mcp_repo_brain', { repoName: 'dooz-core' });

// Query by layer
const coreRepos = await invoke('mcp_ecosystem_query', { layer: 'core' });
```

---

## Using the useEcosystem Hook

```typescript
import { useEcosystem } from '@/hooks/useEcosystem';

function EcosystemViewer() {
  const { getTopology, getRepoBrain, queryByLayer } = useEcosystem();
  
  const [topology, setTopology] = useState(null);
  
  useEffect(() => {
    getTopology().then(setTopology);
  }, []);
  
  return (
    <div>
      {topology && (
        <pre>{JSON.stringify(topology, null, 2)}</pre>
      )}
    </div>
  );
}
```

---

## Scopes

All queries require a scope. Scopes isolate memory domains:

| Scope Type | Example | Usage |
|------------|---------|-------|
| `project` | `project-xyz` | Project-specific knowledge |
| `domain` | `calibration` | Domain expertise |
| `personal` | `user-123` | Personal notes |
| `organization` | `acme-corp` | Company-wide knowledge |

### Creating a Scope

```typescript
await invoke('create_scope', {
  scope_type: 'project',
  name: 'Project Alpha',
  parent_scope_id: null,  // Optional parent
});
```

---

## Ingesting Content

### From Files

```typescript
await invoke('ingest_files', {
  paths: ['/path/to/document.md', '/path/to/notes.txt'],
  scope_id: 'project-alpha',
  auto_approve: false,  // Requires human review
});
```

### From Text

```typescript
await invoke('ingest_text', {
  scope_id: 'project-alpha',
  title: 'Meeting Notes',
  content: 'Discussion about calibration schedule...',
  source_type: 'meeting',
  bucket_id: 'meetings',
});
```

---

## AI-Assisted Ingestion

```typescript
await invoke('ingest_with_ai', {
  scope_id: 'project-alpha',
  content: longDocumentText,
  source_type: 'document',
  // AI will generate:
  // - Title (if not provided)
  // - Summary
  // - Classification
  // - Keywords
});
```

---

## Decision Recording

Brain maintains a decision ledger:

```typescript
await invoke('add_decision', {
  scope_id: 'project-alpha',
  title: 'Adopted quarterly calibration schedule',
  description: 'All devices will be calibrated every 90 days',
  rationale: 'Balances cost with accuracy requirements',
  wiki_page_id: 'calibration-policy',
});
```

---

## For AI Agents

When building AI agents that use Brain:

### 1. Request Stop Conditions First

```
Before querying Brain, define:
- What specific information you need
- Maximum results to process
- When to stop searching
```

### 2. Query with Context

```typescript
// Include context in query for better results
const context = 'I am looking for device calibration procedures';
const query = 'calibration steps checklist';

await invoke('mcp_query', {
  scope_id: scopeId,
  query: `${context} ${query}`,
  mode: 'semantic',
});
```

### 3. Respect Confidence Scores

| Score | Action |
|-------|--------|
| > 0.8 | Use directly |
| 0.5 - 0.8 | Use with caveat |
| < 0.5 | Verify with user |

### 4. Record Decisions

When AI makes decisions based on Brain data, record them:

```typescript
await invoke('add_decision', {
  scope_id: scopeId,
  title: 'AI recommendation: Increase calibration frequency',
  rationale: 'Based on historical failure data from Brain',
  // Links to source memories
});
```

---

## Rate Limits

| Operation | Limit |
|-----------|-------|
| Query | 100/minute |
| Ingest | 50/minute |
| Bulk operations | 10/minute |

---

## Error Handling

```typescript
const result = await invoke('mcp_query', params);

if (!result.success) {
  if (result.refusal_reason) {
    // Brain refused (e.g., no scope selected)
    console.warn('Refused:', result.refusal_reason);
  } else if (result.error) {
    // Technical error
    console.error('Error:', result.error);
  }
}
```
