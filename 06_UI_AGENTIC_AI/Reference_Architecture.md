# Reference Architecture

## Purpose

System architecture for building agent UI applications.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client Layer                       │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐  │
│  │ Web UI  │  │ IDE Ext  │  │ CLI Tool │  │ API     │  │
│  └────┬────┘  └────┬─────┘  └────┬─────┘  └────┬────┘  │
└───────┼────────────┼─────────────┼─────────────┼────────┘
        │            │             │             │
        └────────────┴──────┬──────┴─────────────┘
                            │
┌───────────────────────────┼─────────────────────────────┐
│                    Gateway Layer                        │
│  ┌────────────┐  ┌───────┴──────┐  ┌────────────────┐  │
│  │ Auth/AuthZ │  │ Rate Limiter │  │ Cost Tracker  │   │
│  └────────────┘  └──────────────┘  └────────────────┘  │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────┼─────────────────────────────┐
│                   Agent Orchestrator                    │
│  ┌────────────┐  ┌───────┴──────┐  ┌────────────────┐  │
│  │ Guardrails │  │ Model Router │  │ Session Manager│  │
│  └────────────┘  └──────────────┘  └────────────────┘  │
└───────────────────────────┬─────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────┴───────┐  ┌────────┴────────┐  ┌──────┴──────┐
│  LLM Providers│  │  Tool Executor  │  │  Storage    │
│  ┌─────────┐  │  │  ┌──────────┐   │  │  ┌───────┐  │
│  │ OpenAI  │  │  │  │ File Ops │   │  │  │ Logs  │  │
│  │ Anthropic│  │  │  │ Commands │   │  │  │ State │  │
│  │ Local   │  │  │  │ Browser  │   │  │  │ Audit │  │
│  └─────────┘  │  │  └──────────┘   │  │  └───────┘  │
└───────────────┘  └─────────────────┘  └─────────────┘
```

---

## Component Responsibilities

### Gateway Layer
- Authentication and authorization
- Rate limiting by user/project
- Request/response logging
- Cost attribution

### Agent Orchestrator
- Session management
- Model selection/routing
- Guardrail enforcement
- Operation sequencing

### Tool Executor
- Sandboxed execution
- Permission checking
- Result validation
- Rollback capability

---

## Data Flow

1. **Request arrives** at gateway
2. **Auth check** validates user/permissions
3. **Rate limiter** checks quotas
4. **Orchestrator** plans execution
5. **Guardrails** validate operations
6. **Router** selects appropriate model
7. **Tool executor** performs actions
8. **Results** logged and returned

---

## Related Documents

- [AG-Guard Plugin](../07_IMPLEMENTATION/AG_Guard_Plugin.md)
- [Logging and Observability](../07_IMPLEMENTATION/Logging_and_Observability.md)
