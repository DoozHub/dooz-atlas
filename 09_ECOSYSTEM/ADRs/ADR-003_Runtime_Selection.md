# ADR-003: JavaScript Runtime Selection

## Status
**Accepted** — Bun used for new services, Node.js for existing

## Context

For new TypeScript-based microservices in the DOOZ ecosystem, we needed to select a JavaScript runtime that balances performance, developer experience, and ecosystem compatibility.

### Requirements

- Fast startup time for microservices
- TypeScript native support (no transpilation)
- Modern JavaScript APIs (fetch, WebSocket)
- Package manager with lock files
- Good testing framework
- Production stability

### Options Considered

1. **Node.js** (Status Quo)
   - Mature ecosystem
   - Large community
   - Slower startup, needs transpilation

2. **Bun** (Selected for new services)
   - TypeScript native
   - Fast startup and execution
   - All-in-one (runtime + bundler + test runner)

3. **Deno**
   - Secure by default
   - TypeScript native
   - Smaller ecosystem, npm compatibility issues

4. **Node.js + tsx**
   - TypeScript execution without build step
   - Still Node.js performance characteristics

## Decision

We chose **Bun** for new TypeScript services, keeping Node.js for existing applications.

### Rationale

- **Developer Experience** — TypeScript works out of the box
- **Performance** — 4x faster than Node.js for our workloads
- **All-in-One** — Runtime, bundler, test runner, package manager
- **Compatibility** — Works with npm packages
- **Modern** — Native fetch, WebSocket, top-level await

## Consequences

### Positive

✅ **Performance**: Fast cold starts (100ms vs 500ms)
✅ **Developer Velocity**: No build step for development
✅ **Type Safety**: Native TypeScript support
✅ **Tooling**: Built-in bundler, test runner, linter
✅ **Compatibility**: Works with existing npm packages

### Negative

❌ **Maturity**: Bun is newer than Node.js (v1.0 in 2023)
❌ **Ecosystem**: Some npm packages don't work perfectly
❌ **Debugging**: Less mature debugging tools
❌ **Team Learning**: New runtime to learn

## Implementation

### Services Using Bun

| Service | Runtime | Status |
|---------|---------|--------|
| dooz-bridge | Bun | Production |
| dooz-pm-suite | Bun | Production |
| dooz-ai-router | Bun | Production |

### Services Using Node.js

| Service | Runtime | Reason |
|---------|---------|--------|
| dooz-copilot | Node.js | Existing codebase |
| dooz-hindsight | Node.js | Existing codebase |
| dooz-atlas | Bun | Migrated |

### Example Package.json

```json
{
  "name": "@dooz/bridge",
  "type": "module",
  "scripts": {
    "dev": "bun run --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist",
    "start": "bun dist/index.js",
    "test": "bun test",
    "lint": "bunx eslint ."
  },
  "dependencies": {
    "hono": "^3.x",
    "zod": "^3.x"
  },
  "devDependencies": {
    "@types/bun": "latest"
  }
}
```

### Performance Metrics

| Metric | Node.js | Bun | Improvement |
|--------|---------|-----|-------------|
| Cold Start | 500ms | 100ms | 5x faster |
| Throughput | 10k req/s | 40k req/s | 4x faster |
| Memory | 150MB | 80MB | 47% less |
| Bundle Time | 5s | 1s | 5x faster |

## Migration Strategy

1. **New Services** — Use Bun by default
2. **Existing Services** — Migrate if performance-critical
3. **Mixed Environment** — Accept both runtimes
4. **Docker Images** — Use `oven/bun` base image

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Bun instability | Stay on stable releases, test thoroughly |
| Package incompatibility | Test all dependencies, have Node.js fallback |
| Team knowledge | Documentation, training, pair programming |
| Production issues | Gradual rollout, feature flags |

## Related Decisions

- ADR-002: Desktop Technology (Tauri)
- ADR-005: LLM Routing Abstraction

## References

- [Bun Documentation](https://bun.sh/)
- [Bun Performance Benchmarks](https://bun.sh/docs/api/performance)
- dooz-bridge: `package.json`

---

**Date:** 2025-01  
**Author:** Platform Team  
**Review Date:** 2026-01
