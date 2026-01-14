# Organizational Memory Patterns

> The Dooz Memory Contract - Standardizing how memory flows through the ecosystem

*Version: 1.0 | Status: Active*

---

## Overview

The **Dooz Memory Contract** defines how organizational knowledge is captured, stored, linked, and retrieved across the entire Dooz ecosystem. Every app, agent, and service that interacts with dooz-brain must conform to this contract.

---

## Core Principles

### 1. Memory as First-Class Citizen
Every significant event, decision, or artifact in Dooz should become a queryable memory (OMO).

### 2. Tenant Isolation
All memories are strictly scoped to a tenant. Cross-tenant access is never permitted.

### 3. Provenance Tracking
Every memory records its origin, transformations, and access patterns.

### 4. Graceful Decay
Memories naturally decay based on relevance, with explicit lifecycle states.

### 5. Linked Knowledge
Memories can link to other memories and to external entities (Core, Apps).

---

## The OMO Specification

### OMO (Organizational Memory Object)

The fundamental unit of memory in the Dooz ecosystem.

```typescript
interface DoozOMO {
  // ========== IDENTITY ==========
  id: string;                    // UUID v7 (time-sortable)
  version: number;               // Monotonic version counter
  
  // ========== MULTI-TENANCY ==========
  tenant_id: string;             // Required: Tenant isolation
  user_id: string;               // User who created/owns this memory
  scope_id: string;              // Scope within tenant (org, project, client)
  scope_type: ScopeType;         // 'ORG' | 'CLIENT' | 'PROJECT' | 'EMPLOYEE' | 'DOMAIN'
  
  // ========== CLASSIFICATION ==========
  type: OMOType;                 // Memory archetype (see OMO Types below)
  bucket: string;                // Organizational bucket/category
  tags: string[];                // AI-generated and user tags
  
  // ========== CONTENT ==========
  title: string;                 // Human-readable title (max 200 chars)
  content: string;               // Main content body (max 100KB)
  summary?: string;              // AI-generated summary
  metadata: Record<string, unknown>;  // Type-specific structured data
  
  // ========== PROVENANCE ==========
  source_app: string;            // App that created this memory
  source_adapter?: string;       // Ingestion adapter (if from external source)
  external_ref?: ExternalRef;    // Link to external entity
  correlation_id?: string;       // Trace ID for debugging
  
  // ========== CONFIDENCE ==========
  confidence: number;            // 0-1 confidence score
  confidence_level: ConfidenceLevel;  // 'HIGH' | 'MEDIUM' | 'LOW'
  
  // ========== LIFECYCLE ==========
  decay_state: DecayState;       // 'ACTIVE' | 'WARM' | 'COLD' | 'ARCHIVED'
  decay_config: DecayConfig;     // Decay rules
  is_frozen: boolean;            // Prevent decay if true
  frozen_at?: Date;
  frozen_by?: string;
  
  // ========== REVIEW ==========
  review_status: ReviewStatus;   // 'PENDING' | 'APPROVED' | 'REJECTED' | 'QUARANTINED'
  reviewed_at?: Date;
  reviewed_by?: string;
  
  // ========== TIMESTAMPS ==========
  created_at: Date;
  updated_at: Date;
  last_accessed_at?: Date;
  access_count: number;
  
  // ========== SEARCH ==========
  embeddings?: number[];         // Vector embeddings for semantic search
  search_text?: string;          // Denormalized searchable text
}

// Type definitions
type OMOType = 
  | 'meeting'           // Meeting transcripts and summaries
  | 'decision'          // Recorded decisions with rationale
  | 'action_item'       // Tasks extracted from meetings/discussions
  | 'contract'          // Contract documents and clauses
  | 'ticket'            // Support/issue tickets
  | 'worklog'           // Time entries and work logs
  | 'agent_run'         // AI agent execution records
  | 'knowledge'         // General knowledge articles
  | 'document'          // Ingested documents
  | 'email'             // Email threads
  | 'chat'              // Chat/messaging threads
  | 'note'              // Manual notes
  | 'event'             // System events
  | 'error'             // Error/incident records
  | 'feedback'          // User feedback
  | 'calibration'       // Prediction calibration data
  | 'entropy_signal'    // Organizational health signals
  | 'custom';           // App-defined types

type ScopeType = 'ORG' | 'CLIENT' | 'PROJECT' | 'EMPLOYEE' | 'DOMAIN';

type DecayState = 'ACTIVE' | 'WARM' | 'COLD' | 'ARCHIVED';

type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'QUARANTINED';

interface ExternalRef {
  entity_type: string;   // 'task' | 'contract' | 'ticket' | 'user' | etc.
  entity_id: string;     // ID in the external system
  app: string;           // Source app (e.g., 'quicky', 'dooz-core')
  url?: string;          // Direct link if available
}

interface DecayConfig {
  active_days: number;   // Days before transitioning from ACTIVE
  warm_days: number;     // Days in WARM before COLD
  cold_days: number;     // Days in COLD before ARCHIVED
  never_decay: boolean;  // Override decay for critical memories
  summarize_on_archive: boolean;  // Create summary before archiving
}
```

---

## OMO Archetypes

### meeting

Created by: `dooz-meet`, manual entry

```typescript
interface MeetingMetadata {
  attendees: string[];
  duration_minutes: number;
  transcript?: string;
  recording_url?: string;
  topics: string[];
  sentiment: 'positive' | 'neutral' | 'tense';
  decisions_count: number;
  action_items_count: number;
}
```

**Decay Policy:**
- ACTIVE: 30 days
- WARM: 90 days  
- COLD: 365 days
- Summarize on archive: Yes

**Links to:** `decision`, `action_item`

---

### decision

Created by: `dooz-meet`, `dooz-hindsight`, manual entry

```typescript
interface DecisionMetadata {
  meeting_id?: string;           // Source meeting if applicable
  what: string;                  // The decision made
  why: string;                   // Rationale
  alternatives_considered: {
    option: string;
    reason_rejected: string;
  }[];
  predicted_outcome: string;
  confidence: number;
  owner: string;
  stakeholders: string[];
  review_date?: Date;            // When to review this decision
  actual_outcome?: string;       // Filled by dooz-hindsight
  calibration_score?: number;    // -1 (pessimistic) to 1 (optimistic)
}
```

**Decay Policy:**
- Never decay (historical record)
- Review dates trigger dooz-hindsight checks

**Links to:** `meeting`, `action_item`, `project`

---

### action_item

Created by: `dooz-meet`, `dooz-copilot`, apps

```typescript
interface ActionItemMetadata {
  meeting_id?: string;
  description: string;
  owner: string;
  due_date?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  synced_to?: {
    app: string;           // 'quicky', 'worklog', etc.
    entity_id: string;
    synced_at: Date;
  };
  completed_at?: Date;
}
```

**Decay Policy:**
- ACTIVE: Until completed + 30 days
- WARM: 60 days
- COLD: 180 days
- Archive after completion + 1 year

**Links to:** `meeting`, `decision`, external task

---

### contract

Created by: `dooz-contracts`

```typescript
interface ContractMetadata {
  parties: {
    name: string;
    role: 'us' | 'counterparty' | 'third_party';
  }[];
  contract_type: 'nda' | 'msa' | 'sow' | 'employment' | 'vendor' | 'lease' | 'other';
  effective_date: Date;
  expiration_date: Date;
  value?: {
    amount: number;
    currency: string;
    payment_terms: string;
  };
  status: 'draft' | 'active' | 'expired' | 'terminated' | 'renewed';
  clauses: string[];          // IDs of clause OMOs
  risks: string[];            // IDs of risk OMOs
  renewal_notice_days?: number;
  file_ref: string;           // Storage reference
}
```

**Decay Policy:**
- Never decay during active + 7 years
- Legal hold capability

**Links to:** `clause`, `contract_risk`, `decision`

---

### ticket

Created by: `dooz-support`

```typescript
interface TicketMetadata {
  ticket_id: string;           // External ticket ID
  channel: 'email' | 'chat' | 'phone' | 'web' | 'api';
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'resolved' | 'closed';
  customer: {
    id: string;
    name: string;
    email?: string;
  };
  assigned_to?: string;
  resolution?: string;
  resolution_time_minutes?: number;
  satisfaction_score?: number;  // 1-5
  ai_handled: boolean;
  similar_tickets: string[];    // OMO IDs
  knowledge_articles_used: string[];
}
```

**Decay Policy:**
- ACTIVE: 30 days after resolution
- WARM: 90 days
- COLD: 365 days
- Summarize on archive: Yes (for knowledge extraction)

**Links to:** `knowledge`, `contract`, previous tickets

---

### agent_run

Created by: `dooz-yantra`, `dooz-copilot`

```typescript
interface AgentRunMetadata {
  agent_id: string;
  agent_persona: string;        // 'copilot', 'support', 'recruit', etc.
  session_id: string;
  trigger: 'user_request' | 'scheduled' | 'event' | 'webhook';
  tools_called: {
    tool: string;
    inputs: Record<string, unknown>;
    outputs: Record<string, unknown>;
    duration_ms: number;
    success: boolean;
    error?: string;
  }[];
  decisions_made: string[];     // Decision OMO IDs
  memories_accessed: string[];  // OMO IDs read
  memories_created: string[];   // OMO IDs created
  human_intervention_required: boolean;
  intervention_reason?: string;
  total_duration_ms: number;
  tokens_used: {
    input: number;
    output: number;
    model: string;
  };
  cost_usd: number;
  confidence: number;
  outcome: 'success' | 'partial' | 'failed' | 'cancelled';
}
```

**Decay Policy:**
- ACTIVE: 7 days
- WARM: 30 days
- COLD: 90 days
- Archive after 1 year (keep for audit)

**Links to:** memories accessed/created, user session

---

### calibration

Created by: `dooz-hindsight`

```typescript
interface CalibrationMetadata {
  decision_id: string;
  prediction_date: Date;
  review_date: Date;
  predicted_outcome: string;
  actual_outcome: string;
  match_score: number;          // 0-1 how well prediction matched
  calibration_error: number;    // Signed error (-1 to 1)
  analysis: string;             // AI analysis of mismatch
  lessons_learned: string[];
  pattern_detected?: string;    // e.g., "Overconfident on timelines"
}
```

**Decay Policy:**
- Never decay (feeds organizational learning)

**Links to:** `decision`

---

### entropy_signal

Created by: `dooz-entropy`

```typescript
interface EntropySignalMetadata {
  signal_type: 'code_complexity' | 'meeting_bloat' | 'doc_staleness' | 
               'decision_velocity' | 'knowledge_concentration' | 'process_overhead';
  metric_value: number;
  metric_unit: string;
  trend: 'improving' | 'stable' | 'degrading';
  trend_percentage: number;
  period: {
    start: Date;
    end: Date;
  };
  affected_areas: string[];
  recommendations: string[];
  severity: 'info' | 'warning' | 'critical';
}
```

**Decay Policy:**
- ACTIVE: 30 days
- WARM: 90 days
- Keep historical for trend analysis

**Links to:** affected entities

---

## Event-to-Memory Mapping

### Dooz Event Envelope

All events in the ecosystem follow this envelope format:

```typescript
interface DoozEvent {
  // ========== IDENTITY ==========
  event_id: string;              // UUID v7
  version: string;               // Event schema version (e.g., "1.0")
  
  // ========== ROUTING ==========
  type: string;                  // Event type (e.g., "meeting.ended", "task.created")
  source_app: string;            // Origin app
  target_apps?: string[];        // Specific targets (broadcast if empty)
  
  // ========== MULTI-TENANCY ==========
  tenant_id: string;
  user_id: string;
  
  // ========== TRACING ==========
  correlation_id: string;        // Request trace ID
  causation_id?: string;         // Parent event ID
  
  // ========== PAYLOAD ==========
  payload: Record<string, unknown>;
  
  // ========== TIMING ==========
  timestamp: Date;
  expires_at?: Date;             // TTL for event processing
}
```

### Standard Event Types

| Event Type | Payload | OMO Created |
|------------|---------|-------------|
| `meeting.started` | `{ meeting_id, title, attendees }` | - |
| `meeting.ended` | `{ meeting_id, duration, transcript }` | `meeting` |
| `decision.made` | `{ what, why, owner }` | `decision` |
| `task.created` | `{ title, owner, due_date }` | `action_item` |
| `task.completed` | `{ task_id, completed_at }` | Update `action_item` |
| `contract.uploaded` | `{ file_ref, parties }` | `contract` |
| `ticket.opened` | `{ subject, customer }` | `ticket` |
| `ticket.resolved` | `{ ticket_id, resolution }` | Update `ticket` |
| `agent.run.completed` | `{ agent_id, tools, outcome }` | `agent_run` |

### Pulse Mapper Configuration

```yaml
# pulse-mappers.yaml

mappers:
  - event_type: "meeting.ended"
    omo_type: "meeting"
    field_mapping:
      title: "payload.title"
      content: "payload.transcript"
      metadata.attendees: "payload.attendees"
      metadata.duration_minutes: "payload.duration"
    scope_from: "payload.project_id"
    auto_tag: true
    
  - event_type: "decision.made"
    omo_type: "decision"
    field_mapping:
      title: "payload.what"
      content: "payload.why"
      metadata.owner: "payload.owner"
      metadata.alternatives_considered: "payload.alternatives"
    scope_from: "payload.scope_id"
    link_to:
      - field: "payload.meeting_id"
        as: "source_meeting"
```

---

## MCP Tool Contract

### Required Brain MCP Tools

Every MCP client interacting with dooz-brain MUST use these standardized tools:

#### search_memory

```typescript
interface SearchMemoryParams {
  query: string;                 // Natural language or keyword query
  filters?: {
    types?: OMOType[];          // Filter by OMO types
    scope_id?: string;          // Filter by scope
    date_range?: {
      start: Date;
      end: Date;
    };
    tags?: string[];
    decay_states?: DecayState[];
    confidence_min?: number;
  };
  mode: 'keyword' | 'semantic' | 'hybrid';
  limit?: number;                // Default: 10, Max: 100
  offset?: number;
  include_embeddings?: boolean;
}

interface SearchMemoryResult {
  memories: OMO[];
  total_count: number;
  search_metadata: {
    query_processed: string;
    mode_used: string;
    duration_ms: number;
  };
}
```

#### write_memory

```typescript
interface WriteMemoryParams {
  type: OMOType;
  title: string;
  content: string;
  scope_id: string;
  metadata?: Record<string, unknown>;
  tags?: string[];
  external_ref?: ExternalRef;
  confidence?: number;
  decay_config?: Partial<DecayConfig>;
  skip_review?: boolean;        // Requires elevated permissions
}

interface WriteMemoryResult {
  memory: OMO;
  requires_review: boolean;
  suggested_links: string[];    // Related OMO IDs
}
```

#### link_memory

```typescript
interface LinkMemoryParams {
  source_omo_id: string;
  target: ExternalRef | string;  // ExternalRef or OMO ID
  link_type: 'related' | 'derived_from' | 'supersedes' | 'references';
  bidirectional?: boolean;
}

interface LinkMemoryResult {
  success: boolean;
  link_id: string;
}
```

#### get_context

```typescript
interface GetContextParams {
  scope_id?: string;
  context_type: 'recent' | 'relevant' | 'summary';
  query?: string;               // For 'relevant' type
  max_tokens?: number;          // Limit context size
}

interface GetContextResult {
  context: string;              // Formatted context string
  memories_included: string[];  // OMO IDs
  token_count: number;
}
```

---

## Validation Rules

### Required Fields

| Field | Requirement |
|-------|-------------|
| `id` | Auto-generated UUID v7 |
| `tenant_id` | Required, validated against DIT |
| `user_id` | Required, validated against DIT |
| `scope_id` | Required, must exist |
| `type` | Required, must be valid OMOType |
| `title` | Required, max 200 chars |
| `content` | Required, max 100KB |
| `source_app` | Required, registered app |

### Content Validation

```typescript
const VALIDATION_RULES = {
  title: {
    maxLength: 200,
    minLength: 1,
    pattern: /^[^\x00-\x1f]*$/,  // No control characters
  },
  content: {
    maxLength: 102400,  // 100KB
    minLength: 1,
  },
  tags: {
    maxCount: 50,
    maxLength: 100,  // Per tag
    pattern: /^[a-z0-9-_]+$/i,
  },
  metadata: {
    maxDepth: 5,
    maxSize: 65536,  // 64KB serialized
  },
};
```

### Sanitization

- Strip HTML/scripts from content unless explicitly allowed
- Normalize Unicode
- Trim whitespace
- Validate URLs in external_ref

---

## Access Patterns

### Read Access

1. User requests memory via MCP or API
2. Validate DIT (tenant_id, user_id, scopes)
3. Check memory scope against user's accessible scopes
4. Return memory if authorized
5. Update `last_accessed_at` and `access_count`

### Write Access

1. User submits new memory
2. Validate DIT
3. Validate content against rules
4. Run auto-tagging (AI)
5. Calculate initial confidence
6. Queue for review if `confidence < 0.7` or sensitive content
7. Generate embeddings asynchronously
8. Emit `memory.created` event to Bridge

### Cross-App Access

Apps can only access memories:
- Created by themselves
- Explicitly shared to them via `external_ref`
- Within their registered scope permissions

---

## Decay Lifecycle

```
┌─────────┐     30 days      ┌─────────┐     90 days      ┌─────────┐
│ ACTIVE  │─────────────────▶│  WARM   │─────────────────▶│  COLD   │
│         │                  │         │                  │         │
│ Full    │                  │ Reduced │                  │ Summary │
│ Content │                  │ Priority│                  │ Only    │
└─────────┘                  └─────────┘                  └────┬────┘
                                                               │
                              365 days                         │
                     ┌─────────────────────────────────────────┘
                     │
                     ▼
              ┌──────────┐
              │ ARCHIVED │
              │          │
              │ Offline  │
              │ Storage  │
              └──────────┘
```

### Decay Triggers

| Trigger | Action |
|---------|--------|
| Time elapsed | State transition |
| Access | Reset decay timer, boost priority |
| Link created | Boost related memories |
| Explicit freeze | Prevent decay |
| Review rejection | Immediate archive |

---

## Implementation Checklist

For any Dooz app to be "Memory-Ready":

- [ ] Emit events via dooz-bridge with standard envelope
- [ ] Define event-to-OMO mappings in Pulse config
- [ ] Use MCP tools for all Brain interactions
- [ ] Include DIT in all requests
- [ ] Handle memory creation failures gracefully
- [ ] Respect confidence thresholds for auto-actions
- [ ] Log memory access for audit
- [ ] Document custom OMO types in Atlas

---

## References

- [Dooz Brain Roadmap](../../dooz-brain/ROADMAP.md)
- [Dooz Event Bridge](../../dooz_bridge/)
- [Agentic Control Framework](Agentic_Control_Framework.md)
- [Cost Governance](../01_SOP/Cost_Governance.md)

---

*Document: Organizational Memory Patterns*
*Version: 1.0*
*Last Updated: 2025-01-10*
