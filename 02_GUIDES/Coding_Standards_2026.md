# 2026 Coding Standards

> DoozieSoft coding standards updated for 2026

---

## Overview

This document outlines the coding standards, best practices, and conventions for DoozieSoft development in 2026.

---

## Core Principles

### 1. AI-Aware Code

Code must be **understandable by AI agents** for maintenance and generation.

```typescript
// GOOD: Self-documenting with clear intent
/**
 * Processes user authentication with rate limiting.
 * @param credentials - User email and password
 * @returns Authentication token or throws AuthError
 * @throws {AuthError} When credentials are invalid
 */
async function authenticateUser(credentials: UserCredentials): Promise<AuthToken> {
  // Implementation with explicit error handling
}

// BAD: No context for AI
async function login(d: any) {
  const r = await fetch('/api/auth', { body: JSON.stringify(d) });
  return r.json();
}
```

### 2. Confidence Documentation

Every AI interaction point must document expected confidence levels.

```typescript
interface AIEndpointConfig {
  /** Minimum confidence threshold for auto-approval */
  autoApproveThreshold: number;
  
  /** Whether to return confidence scores to caller */
  returnConfidence: boolean;
  
  /** Fallback model if primary fails */
  fallbackModel?: string;
  
  /** Maximum retries on low confidence */
  maxRetries: number;
}
```

### 3. Observable AI Behavior

AI system behavior must be traceable and debuggable.

```typescript
interface AITracingConfig {
  /** Log all prompts sent to LLM */
  logPrompts: boolean;
  
  /** Log responses with confidence */
  logResponses: boolean;
  
  /** Track token usage per request */
  trackTokens: boolean;
  
  /** Correlation ID for tracing */
  correlationId: string;
}
```

---

## Language-Specific Standards

### TypeScript

```typescript
// 1. Explicit Types
interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

// 2. Use Discriminated Unions for AI States
type AIResponse<T> =
  | { status: 'success'; data: T; confidence: number }
  | { status: 'low_confidence'; data: T; confidence: number; suggestion: string }
  | { status: 'error'; error: string; canRetry: boolean };

// 3. Error Handling
class DoozAIError extends Error {
  constructor(
    message: string,
    public code: string,
    public recoverable: boolean,
    public confidence?: number
  ) {
    super(message);
    this.name = 'DoozAIError';
  }
}

// 4. Async Patterns
async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxRetries: number; backoffMs: number }
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i <= options.maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < options.maxRetries) {
        await sleep(options.backoffMs * Math.pow(2, i));
      }
    }
  }
  
  throw lastError;
}
```

### PHP (Laravel)

```php
<?php

declare(strict_types=1);

namespace App\Services;

// 1. Strict Typing
// 2. Return Types
// 3. Named Arguments

class AIService
{
    public function __construct(
        private readonly LLMClient $client,
        private readonly ConfidenceScorer $scorer
    ) {}

    public function complete(CompletionRequest $request): AIResponse
    {
        // Implementation
    }
}

// 4. DTOs for AI Inputs
readonly class CompletionRequest
{
    public function __construct(
        public string $prompt,
        public array $context = [],
        public ?string $model = null,
        public float $temperature = 0.7,
        public int $maxTokens = 2000
    ) {}
}
```

### Rust

```rust
// 1. Error Types with Context
#[derive(Debug, thiserror::Error)]
pub enum AIError {
    #[error("Model error: {source}")]
    Model {
        source: Box<dyn std::error::Error + Send + Sync>,
        confidence: f64,
    },
    
    #[error("Rate limited, retry after {retry_after:?}")]
    RateLimited { retry_after: Duration },
    
    #[error("Invalid response format: {details}")]
    InvalidResponse { details: String },
}

// 2. Async Traits
#[async_trait::async_trait]
pub trait LLMClient: Send + Sync {
    async fn complete(&self, request: &CompletionRequest) 
        -> Result<AIResponse, AIError>;
}

// 3. Builder Pattern for Complex Configs
pub struct CompletionRequestBuilder {
    prompt: String,
    model: Option<String>,
    max_tokens: Option<u32>,
    temperature: Option<f64>,
    // ...
}

impl CompletionRequestBuilder {
    pub fn new(prompt: impl Into<String>) -> Self {
        Self {
            prompt: prompt.into(),
            model: None,
            max_tokens: Some(2000),
            temperature: Some(0.7),
        }
    }
    
    pub fn build(self) -> CompletionRequest {
        CompletionRequest {
            prompt: self.prompt,
            model: self.model.unwrap_or_else(|| default_model()),
            max_tokens: self.max_tokens.unwrap_or(2000),
            temperature: self.temperature.unwrap_or(0.7),
        }
    }
}
```

---

## File Organization

### TypeScript Project Structure

```
src/
├── api/              # External API integrations
├── components/       # React/Vue components
├── services/         # Business logic
├── types/            # TypeScript definitions
├── utils/            # Helper functions
├── hooks/            # Custom hooks
├── stores/           # State management
└── config/           # Configuration
```

### Documentation Requirements

Every AI-related function must have:

```typescript
/**
 * Brief description of what the function does.
 * 
 * ## AI Context
 * - **Confidence Impact**: How this affects confidence scores
 * - **Model Requirements**: Any specific model needs
 * - **Token Estimate**: Expected token usage
 * 
 * @param paramName - Description
 * @returns Description of return value
 * @throws {ErrorType} When this error occurs
 * 
 * @example
 * ```typescript
 * const result = await myFunction(input);
 * ```
 */
```

---

## Testing Standards

### AI Component Tests

```typescript
describe('AI Service', () => {
  it('should return confidence scores', async () => {
    const response = await aiService.complete({
      prompt: 'Summarize this document',
      returnConfidence: true,
    });
    
    expect(response.confidence).toBeDefined();
    expect(response.confidence.overall).toBeGreaterThanOrEqual(0);
    expect(response.confidence.overall).toBeLessThanOrEqual(100);
  });
  
  it('should fallback on low confidence', async () => {
    const response = await aiService.complete({
      prompt: 'Complex reasoning task',
      fallbackChain: ['claude', 'gpt-4o'],
    });
    
    expect(response.confidence.overall).toBeGreaterThanOrEqual(70);
  });
});
```

---

## Security Standards

### API Key Management

```typescript
// 1. Never log API keys
// 2. Use environment variables
// 3. Implement key rotation

const config = {
  apiKey: process.env.LLM_API_KEY,  // ✓ Good
  // apiKey: 'sk-...',              // ✗ Bad - hardcoded
};

// 4. Audit all AI API calls
await auditLog.log({
  action: 'ai.request',
  model: 'claude-sonnet',
  tokens: response.usage.total_tokens,
  cost: calculateCost(response),
});
```

---

## Performance Standards

### Token Budgeting

| Task Type | Expected Input Tokens | Expected Output Tokens |
|-----------|----------------------|------------------------|
| Simple QA | 500 | 200 |
| Code Review | 2000 | 500 |
| Document Analysis | 10000 | 1000 |
| Long Context | 50000 | 2000 |

### Caching Strategy

```typescript
// Cache semantically similar queries
const cache = new SemanticCache({
  similarityThreshold: 0.85,  // 85% similarity
  maxAge: 24 * 60 * 60,       // 24 hours
  maxSize: 10000,             // 10K entries
});
```

---

## Code Review Checklist

- [ ] AI confidence scores are documented
- [ ] Error handling includes confidence info
- [ ] No hardcoded API keys
- [ ] Documentation includes AI context
- [ ] Tests cover confidence scenarios
- [ ] Tracing is implemented
- [ ] Rate limits are respected
- [ ] Costs are tracked

---

## Related Documentation

- [AI Trends 2026](../01_SOP/AI_Trends_2026.md)
- [Model Routing Policy](../01_SOP/Model_Routing_Policy.md)
- [Cost Governance](../01_SOP/Cost_Governance.md)

---

*Last Updated: January 2026*
*Version: 2026.1*
