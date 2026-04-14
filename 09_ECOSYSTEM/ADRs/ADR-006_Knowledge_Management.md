# ADR-006: Knowledge Management with RAG

## Status
**Accepted** — Implemented as dooz-brain

## Context

As DOOZ grew, institutional knowledge became scattered across code, documents, decisions, and conversations. We needed a system to capture, organize, and retrieve organizational memory.

### Requirements

- Semantic search (not just keyword)
- Natural language queries
- Document ingestion (PDF, MD, code)
- Context-aware responses
- Privacy and access control
- Integration with AI agents

### Options Considered

1. **Traditional Search (Elasticsearch)**
   - Keyword and fuzzy matching
   - Fast, mature
   - No semantic understanding

2. **Vector Database + LLM (RAG)** (Selected)
   - Semantic embeddings
   - Natural language queries
   - Context augmentation

3. **Fine-tuned Model**
   - Train model on company data
   - Expensive, slow to update
   - Risk of hallucination

4. **External Service (Pinecone + OpenAI)**
   - Managed vector DB
   - Vendor lock-in, data privacy concerns

## Decision

We built **dooz-brain** using Retrieval-Augmented Generation (RAG) with local vector storage.

### Rationale

- **Semantic Understanding**: Embeddings capture meaning, not just words
- **Up-to-Date**: Easy to add new documents
- **Privacy**: Data stays within DOOZ infrastructure
- **Cost-Effective**: Use smaller LLMs with retrieved context
- **Accuracy**: Grounded responses with source citations

## Consequences

### Positive

✅ **Semantic Search**: Find relevant content by meaning
✅ **Contextual Answers**: AI responses grounded in company knowledge
✅ **Source Attribution**: Know where information came from
✅ **Continuous Learning**: New documents immediately searchable
✅ **Privacy**: Full control over data

### Negative

❌ **Complexity**: Multiple components (embeddings, vectors, LLM)
❌ **Storage**: Vector databases require significant memory
❌ **Latency**: Retrieval + generation takes time
❌ **Maintenance**: Chunking strategies, embedding models

## Implementation

### RAG Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                     Ingestion Pipeline                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Documents ──> Chunker ──> Embedder ──> Vector Store      │
│     ↓            ↓            ↓            ↓               │
│   PDF/MD    Segments    Vectors(1536d)   ChromaDB          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Query Pipeline                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User Query ──> Embed ──> Retrieve ──> Augment ──> LLM  │
│      ↓          ↓           ↓           ↓          ↓       │
│   "How do    Vector    Top 5       Context      Answer    │
│    we...?"   Search    chunks      + Prompt              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Chunker** | Rust | Text segmentation |
| **Embedder** | OpenAI/Local | Vector generation (1536 dims) |
| **Vector Store** | ChromaDB | Similarity search |
| **RAG Engine** | Rust | Context assembly |
| **LLM** | dooz-ai-router | Response generation |

### Chunking Strategy

```rust
// Semantic chunking with overlap
struct Chunker {
    max_tokens: usize,      // 512 tokens
    overlap: usize,         // 50 tokens
    separator: String,      // "\n\n"
}

fn chunk_document(text: String) -> Vec<Chunk> {
    // Split by paragraphs
    // Ensure chunks don't exceed max_tokens
    // Add overlap for context continuity
}
```

### Retrieval Process

```typescript
// Query workflow
async function queryKnowledge(query: string) {
  // 1. Embed query
  const queryEmbedding = await embed(query);
  
  // 2. Retrieve similar chunks
  const chunks = await vectorStore.query({
    vector: queryEmbedding,
    nResults: 5,
    filter: { source: 'documentation' }
  });
  
  // 3. Build context
  const context = chunks.map(c => c.text).join('\n\n');
  
  // 4. Generate response
  const response = await llm.generate({
    prompt: `Based on this context:\n${context}\n\nAnswer: ${query}`,
  });
  
  return { answer: response, sources: chunks };
}
```

## Document Types

| Type | Ingestion | Use Case |
|------|-----------|----------|
| **Markdown** | Direct | Documentation, SOPs |
| **PDF** | Parser | Reports, specifications |
| **Code** | AST parsing | API docs, patterns |
| **Decisions** | Structured | ADRs, choices |
| **Conversations** | Transcription | Meeting notes |

## MCP Integration

```typescript
// Brain exposes tools via MCP
{
  name: 'query_knowledge',
  description: 'Search organizational knowledge',
  parameters: {
    query: 'string',
    filters: { source: 'string' }
  }
}
```

## Memory Types

1. **Short-term**: Conversation context (session-based)
2. **Long-term**: Organizational knowledge (persistent)
3. **Episodic**: Specific events and decisions
4. **Semantic**: General facts and concepts

## Performance

| Metric | Target | Current |
|--------|--------|---------|
| Ingestion Rate | 100 docs/min | 80 docs/min |
| Query Latency (p95) | 500ms | 650ms |
| Recall@5 | 90% | 85% |
| Storage / 1M docs | 5GB | 4.2GB |

## Related Decisions

- ADR-002: Desktop Technology (Tauri)
- ADR-005: LLM Routing Abstraction

## References

- [RAG Survey Paper](https://arxiv.org/abs/2312.10997)
- [ChromaDB Documentation](https://docs.trychroma.com/)
- dooz-brain: `src/rag.rs`

---

**Date:** 2025-01  
**Author:** AI Team  
**Review Date:** 2026-01
