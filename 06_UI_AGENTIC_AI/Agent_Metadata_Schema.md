# Agent Metadata Schema

## Purpose

Define data structures for tracking and displaying agent operations.

---

## Core Schema

### Session

```typescript
interface AgentSession {
  id: string;
  userId: string;
  startedAt: Date;
  endedAt?: Date;
  status: 'active' | 'paused' | 'completed' | 'failed' | 'cancelled';
  
  // Configuration
  model: string;
  modelTier: 1 | 2 | 3 | 4;
  temperature: number;
  
  // Context
  workspace: string;
  initialPrompt: string;
  
  // Metrics
  totalTokens: number;
  totalCost: number;
  operationCount: number;
}
```

### Operation

```typescript
interface AgentOperation {
  id: string;
  sessionId: string;
  timestamp: Date;
  
  // Operation details
  type: 'read' | 'write' | 'execute' | 'query';
  target: string;  // file path, command, etc.
  
  // AI interaction
  inputTokens: number;
  outputTokens: number;
  cost: number;
  
  // Outcome
  status: 'success' | 'failed' | 'blocked' | 'pending';
  result?: string;
  error?: string;
  
  // Audit
  approved: boolean;
  approvedBy?: string;
}
```

### Change Record

```typescript
interface ChangeRecord {
  id: string;
  operationId: string;
  
  // What changed
  path: string;
  changeType: 'create' | 'modify' | 'delete';
  
  // Diff
  before?: string;
  after?: string;
  diffLines: number;
  
  // Reversibility
  canUndo: boolean;
  undoOperationId?: string;
}
```

---

## Aggregation Views

### Daily Summary

```typescript
interface DailySummary {
  date: string;
  userId: string;
  
  sessionCount: number;
  operationCount: number;
  
  totalTokens: number;
  totalCost: number;
  
  successRate: number;
  blockedOperations: number;
}
```

### Project Summary

```typescript
interface ProjectSummary {
  projectId: string;
  period: 'day' | 'week' | 'month';
  
  activeUsers: number;
  totalCost: number;
  
  topModels: { model: string; cost: number }[];
  topOperations: { type: string; count: number }[];
}
```

---

## Related Documents

- [Token Tracking Design](Token_Tracking_Design.md)
- [Logging and Observability](../07_IMPLEMENTATION/Logging_and_Observability.md)
