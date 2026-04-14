# PLAN-06: API Documentation Generation

> **Priority:** LOW  
> **Est. Time:** 4 hours  
> **Prerequisites:** PLAN-04 (Architecture)  
> **Next Plan:** PLAN-07 (Environment Config)

---

## Objective

Generate comprehensive API documentation for all backend services. Currently API documentation is scattered or missing. Need automated generation from code with OpenAPI specs.

**Success Criteria:**
- OpenAPI specs for all API modules
- Auto-generated documentation hosted
- API explorer (Swagger UI or similar)
- Code examples for common operations

---

## Current State

### API Documentation Status

| Module | API Type | Documentation | Status |
|--------|----------|---------------|--------|
| dooz-core | REST (Laravel) | Scribe/Postman | ⚠️ Partial |
| dooz-pm-suite | REST (Hono) | None | ❌ Missing |
| dooz-bridge | REST (Hono) | None | ❌ Missing |
| dooz-brain | REST + MCP | Manual | ⚠️ Partial |
| dooz-ai-router | Library | README | ⚠️ Partial |

### Issues

1. **No OpenAPI specs** — Can't generate interactive docs
2. **Manual documentation** — Out of sync with code
3. **No code examples** — Hard for developers to use
4. **Scattered docs** — Each module documents differently

---

## Target State

### OpenAPI Specifications

Each API module has:

```yaml
# openapi.yaml
openapi: 3.0.0
info:
  title: DOOZ PM Suite API
  version: 1.0.0
paths:
  /api/intents:
    get:
      summary: List intents
      responses:
        200:
          description: List of intents
```

### Documentation Hosting

- Static site with Swagger UI
- Integrated with Atlas
- Auto-deployed on API changes

---

## Execution Checklist

### Step 1: dooz-core API Docs

**Location:** `/dooz-core/docs/api/`

- [ ] Install Scribe
  ```bash
  composer require knuckleswtf/scribe
  ```

- [ ] Configure Scribe
  ```bash
  php artisan vendor:publish --tag=scribe-config
  ```

- [ ] Add docblocks to controllers
  ```php
  /**
   * Get all tenants
   * 
   * @group Tenant Management
   * @response {
   *   "data": [
   *     {"id": 1, "name": "Acme Corp"}
   *   ]
   * }
   */
  public function index() { }
  ```

- [ ] Generate documentation
  ```bash
  php artisan scribe:generate
  ```

- [ ] Host in Atlas
  - Copy generated docs to `/dooz-atlas/09_ECOSYSTEM/APIs/dooz-core/`

### Step 2: dooz-pm-suite API Docs

**Location:** `/dooz-pm-suite/`

- [ ] Install Hono OpenAPI middleware
  ```bash
  bun add @hono/zod-openapi
  ```

- [ ] Add OpenAPI to routes
  ```typescript
  import { OpenAPIHono } from '@hono/zod-openapi';
  
  const app = new OpenAPIHono();
  
  app.openapi(
    createRoute({
      method: 'get',
      path: '/api/intents',
      responses: {
        200: {
          description: 'List of intents',
        },
      },
    }),
    (c) => {
      return c.json({ intents: [] });
    }
  );
  ```

- [ ] Generate OpenAPI spec
  ```typescript
  // scripts/generate-openapi.ts
  import { app } from '../src/app';
  import { writeFileSync } from 'fs';
  
  const spec = app.getOpenAPIDocument({
    openapi: '3.0.0',
    info: {
      title: 'PM Suite API',
      version: '1.0.0',
    },
  });
  
  writeFileSync('openapi.json', JSON.stringify(spec, null, 2));
  ```

- [ ] Add doc generation script
  ```json
  {
    "scripts": {
      "docs:generate": "bun run scripts/generate-openapi.ts"
    }
  }
  ```

### Step 3: dooz-bridge API Docs

**Location:** `/dooz-bridge/`

- [ ] Install OpenAPI middleware
  ```bash
  bun add @hono/zod-openapi
  ```

- [ ] Document endpoints:
  - POST /api/events/publish
  - GET /api/subscriptions
  - POST /api/subscriptions
  - GET /api/health

- [ ] Generate OpenAPI spec

### Step 4: dooz-brain API Docs

**Location:** `/dooz-brain/`

- [ ] Document REST API endpoints:
  - GET /api/v1/memories
  - POST /api/v1/memories
  - POST /api/v1/context
  - GET /api/health

- [ ] Document MCP protocol
  - Tools available
  - Request/response formats
  - Examples

### Step 5: Create API Hub

**Location:** `/dooz-atlas/09_ECOSYSTEM/APIs/`

- [ ] Create API index page
  ```markdown
  # DOOZ API Documentation
  
  | API | Description | Documentation |
  |-----|-------------|---------------|
  | Core API | Multi-tenant platform | [View](./dooz-core/) |
  | PM Suite API | Project management | [View](./dooz-pm-suite/) |
  | Bridge API | Event bus | [View](./dooz-bridge/) |
  | Brain API | Knowledge system | [View](./dooz-brain/) |
  ```

- [ ] Setup Swagger UI
  - Create page with Swagger UI embedded
  - Load OpenAPI specs dynamically

### Step 6: Code Examples

**Location:** `/dooz-atlas/09_ECOSYSTEM/APIs/examples/`

Create examples for:

- [ ] **Authentication**
  ```typescript
  // Get API token
  const token = await fetch('/oauth/token', {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: '...',
      client_secret: '...',
    }),
  });
  ```

- [ ] **Creating an Intent**
  ```typescript
  const intent = await fetch('/api/intents', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      title: 'Build feature X',
      description: '...',
      priority: 'high',
    }),
  });
  ```

- [ ] **Publishing Events**
  ```typescript
  await fetch('/api/events/publish', {
    method: 'POST',
    body: JSON.stringify({
      topic: 'intent.created',
      payload: { intentId: '...' },
    }),
  });
  ```

- [ ] **Querying Brain**
  ```typescript
  const context = await fetch('/api/v1/context', {
    method: 'POST',
    body: JSON.stringify({
      query: 'What are the project requirements?',
      filters: { source: 'documentation' },
    }),
  });
  ```

---

## Verification Steps

1. **Generate All Docs:**
   ```bash
   cd dooz-core && php artisan scribe:generate
   cd dooz-pm-suite && bun run docs:generate
   cd dooz-bridge && bun run docs:generate
   ```

2. **Validate OpenAPI:**
   ```bash
   # Use swagger-cli to validate
   swagger-cli validate openapi.json
   ```

3. **Test Examples:**
   - Run each code example
   - Verify it works as documented

4. **Visual Check:**
   - Open Swagger UI
   - Verify all endpoints documented
   - Test interactive features

---

## Dependencies

- **PLAN-04** — Architecture docs provide context
- **PLAN-02** — CI/CD to auto-generate docs
- **Scribe** — Laravel API documentation
- **Hono OpenAPI** — TypeScript API specs

---

**Definition of Done:**
- [ ] OpenAPI specs for 4+ APIs
- [ ] Swagger UI hosted in Atlas
- [ ] Code examples for common operations
- [ ] API documentation linked from main docs
- [ ] Git commit: "docs: Generate comprehensive API documentation"

**Estimated Completion:** 4 hours  
**Priority:** LOW — Nice to have for developer experience
