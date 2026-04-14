# DOOZ Ecosystem - Data Flow Documentation

> **System Interactions** — How data moves through the DOOZ ecosystem.

---

## Overview

This document describes the primary data flows within the DOOZ ecosystem, showing how information moves between modules during key operations.

---

## 1. User Authentication Flow

### Sequence

```mermaid
sequenceDiagram
    actor User
    participant Hub as dooz-hub
    participant Core as dooz-core
    participant DB as PostgreSQL
    participant Redis as Redis
    
    User->>Hub: Login Request
    Hub->>Core: POST /oauth/token
    Core->>DB: Validate credentials
    DB-->>Core: User data
    Core->>Redis: Store session
    Core-->>Hub: Access token + refresh token
    Hub->>Hub: Store tokens securely
    Hub-->>User: Login successful
```

### Description

1. **User initiates login** from dooz-hub (or web)
2. **dooz-core** validates credentials against PostgreSQL
3. **Session stored** in Redis for fast validation
4. **OAuth2 tokens issued** (access + refresh)
5. **Tokens distributed** to client applications

### Data Stores

- **PostgreSQL**: User credentials, tenant associations
- **Redis**: Active sessions, token metadata

---

## 2. Intent Creation Flow

### Sequence

```mermaid
sequenceDiagram
    actor PM as Project Manager
    participant PMUI as PM Suite UI
    participant PMAPI as PM Suite API
    participant DB as PostgreSQL
    participant Bridge as dooz-bridge
    participant Brain as dooz-brain
    participant Hub as dooz-hub
    
    PM->>PMUI: Create new intent
    PMUI->>PMAPI: POST /api/intents
    PMAPI->>DB: Insert intent record
    DB-->>PMAPI: Intent created
    PMAPI->>Bridge: Publish intent.created event
    Bridge->>Brain: Webhook delivery
    Brain->>Brain: Index for search
    Bridge->>Hub: Webhook delivery
    Hub->>Hub: Update dashboard
    PMAPI-->>PMUI: Intent details
    PMUI-->>PM: Show confirmation
```

### Description

1. **PM creates intent** via PM Suite interface
2. **Intent persisted** to PostgreSQL
3. **Event published** to dooz-bridge
4. **Brain ingests** intent for knowledge graph
5. **Hub notified** to update UI
6. **Related services** react to event

### Event Payload

```json
{
  "topic": "intent.created",
  "payload": {
    "intentId": "uuid",
    "title": "Build feature X",
    "state": "research",
    "tenantId": "tenant-uuid",
    "createdBy": "user-uuid",
    "timestamp": "2026-02-24T10:00:00Z"
  }
}
```

---

## 3. AI Query with Context Flow

### Sequence

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant Copilot as dooz-copilot
    participant Router as dooz-ai-router
    participant Brain as dooz-brain
    participant Chroma as ChromaDB
    participant LLM as LLM API
    
    Dev->>Copilot: Ask question
    Copilot->>Brain: Query context
    Brain->>Chroma: Semantic search
    Chroma-->>Brain: Relevant chunks
    Brain->>Brain: Build context window
    Brain-->>Copilot: Context + sources
    Copilot->>Router: Generate with context
    Router->>Router: Select provider
    Router->>LLM: POST /v1/chat/completions
    LLM-->>Router: Response
    Router-->>Copilot: Answer
    Copilot->>Brain: Store conversation
    Copilot-->>Dev: Display answer + sources
```

### Description

1. **Developer asks question** in dooz-copilot
2. **Brain retrieves** relevant context from ChromaDB
3. **Context assembled** with source attribution
4. **AI Router selects** best LLM provider
5. **Response generated** with grounded context
6. **Conversation stored** for future reference

### Context Assembly

```typescript
// Context window construction
const context = await brain.retrieveContext(query, {
  topK: 5,
  filters: { tenantId: currentTenant },
});

const prompt = `
Context from organizational knowledge:
${context.documents.map(d => `- ${d.content}`).join('\n')}

User question: ${query}

Provide a concise answer based on the context above.
Cite sources using [1], [2], etc.
`;
```

---

## 4. Decision Commit Flow

### Sequence

```mermaid
sequenceDiagram
    actor PM as Project Manager
    participant PMUI as PM Suite UI
    participant PMAPI as PM Suite API
    participant DB as PostgreSQL
    participant Bridge as dooz-bridge
    participant Brain as dooz-brain
    participant Hindsight as dooz-hindsight
    
    PM->>PMUI: Commit decision
    PMUI->>PMAPI: POST /api/decisions
    PMAPI->>DB: Append to ledger
    DB-->>PMAPI: Decision recorded
    PMAPI->>Bridge: Publish decision.committed
    Bridge->>Brain: Ingest for knowledge
    Brain->>Brain: Extract learnings
    Bridge->>Hindsight: Track for calibration
    Hindsight->>DB: Store prediction
    PMAPI-->>PMUI: Success
    PMUI-->>PM: Show confirmation
```

### Description

1. **PM commits decision** in PM Suite
2. **Decision appended** to immutable ledger
3. **Event published** to ecosystem
4. **Brain extracts** learnings and patterns
5. **Hindsight tracks** for calibration analytics

### Decision Schema

```json
{
  "decisionId": "uuid",
  "intentId": "uuid",
  "title": "Choose PostgreSQL over MySQL",
  "options": ["PostgreSQL", "MySQL", "SQLite"],
  "rationale": "Better JSON support",
  "confidence": 0.85,
  "predictedOutcome": "Faster development",
  "committedAt": "2026-02-24T10:00:00Z",
  "committedBy": "user-uuid"
}
```

---

## 5. Event Delivery Flow

### Sequence

```mermaid
sequenceDiagram
    participant Publisher as Service
    participant Bridge as dooz-bridge
    participant Matcher as Pattern Matcher
    participant SubMgr as Subscription Manager
    participant Dispatcher as Dispatcher
    participant Consumer1 as Consumer A
    participant Consumer2 as Consumer B
    participant DB as SQLite
    
    Publisher->>Bridge: POST /events/publish
    Bridge->>DB: Persist event
    Bridge->>Matcher: Match topic
    Matcher->>SubMgr: Find subscribers
    SubMgr-->>Matcher: Subscribers list
    Matcher->>Dispatcher: Deliver to subscribers
    par Deliver to Consumers
        Dispatcher->>Consumer1: POST webhook
        Consumer1-->>Dispatcher: 200 OK
        Dispatcher->>DB: Mark delivered
    and
        Dispatcher->>Consumer2: POST webhook
        Consumer2-->>Dispatcher: 200 OK
        Dispatcher->>DB: Mark delivered
    end
```

### Description

1. **Service publishes** event to bridge
2. **Event persisted** to SQLite
3. **Topic matching** finds subscribers
4. **Parallel delivery** to all consumers
5. **Delivery tracked** for reliability

### Retry Logic

```typescript
// Exponential backoff
async function deliverWithRetry(event, subscriber, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await deliverWebhook(event, subscriber);
      return { status: 'delivered' };
    } catch (error) {
      const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s...
      await sleep(delay);
    }
  }
  return { status: 'failed', moveToDLQ: true };
}
```

---

## 6. Document Ingestion Flow

### Sequence

```mermaid
sequenceDiagram
    actor User as User
    participant Brain as dooz-brain
    participant Ingest as Ingestion
    participant Chunker as Chunker
    participant Embedder as Embedder
    participant Chroma as ChromaDB
    
    User->>Brain: Upload document
    Brain->>Ingest: Queue for processing
    Ingest->>Ingest: Parse document
    Ingest->>Chunker: Extract text
    Chunker->>Chunker: Segment into chunks
    Chunker->>Embedder: Generate embeddings
    Embedder->>Chroma: Store vectors
    Chroma-->>Embedder: Confirm storage
    Embedder-->>Brain: Index complete
    Brain-->>User: Document ready
```

### Description

1. **User uploads** document to Brain
2. **Document parsed** (PDF, MD, etc.)
3. **Text chunked** into segments
4. **Embeddings generated** for each chunk
5. **Vectors stored** in ChromaDB
6. **Searchable** immediately

### Processing Pipeline

```
Document Upload
    ↓
Format Detection (PDF, MD, TXT)
    ↓
Text Extraction
    ↓
Semantic Chunking (512 tokens, 50 overlap)
    ↓
Metadata Extraction (title, author, date)
    ↓
Embedding Generation (text-embedding-3-small)
    ↓
Vector Storage (ChromaDB)
    ↓
Index Confirmation
```

---

## 7. Cross-Service Authentication Flow

### Sequence

```mermaid
sequenceDiagram
    participant ServiceA as Service A
    participant Core as dooz-core
    participant Redis as Redis
    participant ServiceB as Service B
    
    ServiceA->>ServiceA: Generate service token
    ServiceA->>ServiceB: Request with token
    ServiceB->>Core: Validate token
    Core->>Redis: Check cache
    Redis-->>Core: Token valid
    Core-->>ServiceB: Token metadata
    ServiceB->>ServiceB: Check permissions
    ServiceB-->>ServiceA: Response
```

### Description

1. **Service A generates** JWT service token
2. **Service B validates** token with dooz-core
3. **Redis cache** prevents repeated validations
4. **Permissions checked** for requested resource
5. **Response returned** if authorized

---

## Data Store Responsibilities

| Store | Primary Use | Data Types |
|-------|-------------|------------|
| **PostgreSQL** | Tenant data, relations | Users, tenants, billing, PM data |
| **SQLite** | Bridge events, desktop | Events, deliveries, local state |
| **Redis** | Cache, sessions, rate limits | Sessions, cache, counters |
| **ChromaDB** | Vector search | Document embeddings |

---

## Event Topics Reference

| Topic | Publisher | Subscribers | Trigger |
|-------|-----------|-------------|---------|
| `user.login` | Core | All | User authentication |
| `intent.created` | PM Suite | Brain, Hub | New work item |
| `intent.transitioned` | PM Suite | Hub | Status change |
| `decision.committed` | PM Suite | Brain, Hindsight | Decision logged |
| `memory.ingested` | Brain | Hub | Knowledge updated |
| `document.uploaded` | Brain | - | New document |
| `package.installed` | Core | Hub | App installation |

---

## Performance Considerations

### Latency Targets

| Flow | Target | Actual |
|------|--------|--------|
| Authentication | <100ms | ~80ms |
| Intent Creation | <200ms | ~150ms |
| AI Query | <2s | ~1.5s |
| Event Delivery | <500ms | ~300ms |
| Document Ingestion | <5s/page | ~3s/page |

### Throughput

- **Events**: 1,000/second
- **AI Queries**: 100/second
- **Auth Requests**: 500/second

---

**Maintainer:** Architecture Team  
**Last Updated:** 2026-02-24  
**Version:** 1.0
