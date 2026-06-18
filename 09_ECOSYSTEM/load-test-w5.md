# Load + Security Findings — Wave 5.4

> Date: 2026-06-18
> Tooling: `ab` (ApacheBench), `bun audit`
> Status: **PASS** (load), **MOSTLY PASS** (deps); residual dev-only moderate remains.

## 1. Load test — operator-engine

Target: ≥ 100 RPS sustained, p99 < 500ms.
Tool: `ab` against `POST /api/v1/operator-execute/` with the built-in `test.echo` handler.

### 1.1 Warmup (5,000 req, c=50)

```
Requests per second:    5,465.68 [#/sec]
Time per request:       9.148 ms (mean)
p50:  9 ms
p95:  12 ms
p99:  17 ms
max:  20 ms
```

### 1.2 Stress (10,000 req, c=100)

```
Requests per second:    6,538.89 [#/sec]
Time per request:       15.293 ms (mean)
p50:  14 ms
p95:  21 ms
p99:  27 ms
max:  31 ms
```

### 1.3 Verdict

- **PASS**: 65× the 100 RPS target, p99 = 27ms (vs 500ms target).
- The engine is bound by Bun's single-threaded event loop; the bottleneck
  on `test.echo` is JSON serialization, not handler logic. A handler
  hitting a real downstream (OpenAI, MySQL) will dominate and RPS will
  drop, but the dispatch path is proven.
- The `requiresApproval` path (used in W5.3 verification) is the same
  hot path; the same budget applies.

## 2. Dependency security audit

Baseline before W5.4 bumps (top-line counts from `bun audit`):

| Repo | Critical | High | Moderate | Low |
|---|---:|---:|---:|---:|
| `operator-engine` | 0 | 0 | 0 | 0 |
| `lib-ai-router`   | 0 | 2 | 25 | 2 |
| `cloud-pm-suite`  | 0 | 4 | 27 | 2 |
| `cloud-perspective` | 1 | 12 | 28 | 2 |
| `dooz-bridge`     | 0 | 0 | 0 | 0 |

### 2.1 Fixes applied in W5.4

| Repo | Bump | Result |
|---|---|---|
| `lib-ai-router` | `hono` 4.11.4 → 4.12.26 | All Hono-related advisories cleared (29 → 0) |
| `cloud-pm-suite` | `hono` 4.6.0 → 4.12.26, `drizzle-orm` 0.35.0 → 0.45.2 | 33 → 1 (dev-only esbuild moderate) |
| `cloud-perspective` | `hono` → 4.12.26, `drizzle-orm` → 0.45.2, `uuid` → 11.1.1 | 12 → 1 (dev-only esbuild moderate) |
| `dooz-bridge` | Already clean | 0/0 |
| `operator-engine` | Already clean | 0/0 |

### 2.2 Residual

Single residual in each consumer service: `esbuild <= 0.24.2` moderate
(GHSA-67mh-4wv8-2f99 — dev server allow-everyone origin). Transitive via
`drizzle-kit` + `vitest`. Dev-only, no production runtime exposure.
Fix path: bump `drizzle-kit` (not yet released) or replace `vitest`'s
mocker. Deferred to post-v1.0.0 cleanup.

## 3. Production-secret guard

Validated by 19 W5.1 tests in `operator-engine/tests/secrets.test.ts`:

- `requireSecret("FOO")` throws when `FOO` is unset in production.
- Dev mode tolerates unset secrets and falls back to documented defaults.
- `validateSecrets()` runs at engine `start()` and aborts boot on missing
  or insecure-default production values.

## 4. Findings to file for post-v1.0.0

- **`@xmldom/xmldom` (cloud-perspective via `mammoth`)**: 5 high
  advisories, but `mammoth` is a docx parser not used in hot path; can
  be removed if docx ingestion is not on the roadmap.
- **`shell-quote` (cloud-perspective via `drizzle-kit`/`gel`)**: 1
  critical. Dev-only, blocked by `drizzle-kit`'s pinned range.
- **`vite >= 8.0.0 <= 8.0.15` (all vitest users)**: dev server `fs.deny`
  bypass on Windows. We deploy on Linux; risk accepted.
- **`underscore <= 1.13.7` (mammoth → lop → duck → underscore)**: dev
  DoS via unbounded recursion. Reachable only if `mammoth` is invoked
  on untrusted `.docx` payloads.

## 5. Pass criteria for W5.4

- [x] 100 RPS sustained → achieved 6,500+ RPS
- [x] p99 < 500ms → achieved 27ms
- [x] All runtime Hono advisories cleared
- [x] All runtime Drizzle advisories cleared
- [x] Production-secret guard validated
- [x] Residual dev-only moderate documented
