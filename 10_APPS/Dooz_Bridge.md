# dooz-bridge

> Inter-app communication bridge for the Dooz ecosystem

## Overview

Dooz Bridge provides the event-driven communication layer that connects all Dooz applications and services.

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  dooz-core  │    │  dooz-hub   │    │  dooz-brain │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                   ┌──────▼──────┐
                   │ dooz-bridge │
                   │  (Events)   │
                   └──────┬──────┘
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
│   quicky    │    │   worklog   │    │ calibration │
└─────────────┘    └─────────────┘    └─────────────┘
```

## Features

### Event Bus
- Pub/sub messaging between apps
- Topic-based routing
- Message persistence
- Replay capabilities

### Cross-Tenant Messaging
- Secure tenant isolation
- Inter-organization events (with consent)
- Federated sync

### Webhook Management
- Outbound webhook delivery
- Retry with backoff
- Delivery status tracking
- Signature verification

### Real-time Sync
- WebSocket connections
- Presence awareness
- Conflict resolution

## Tech Stack

- **Language**: TypeScript
- **Transport**: WebSockets, HTTP/2
- **Queue**: Redis Streams / In-memory

## Status

| Feature | Status |
|---------|--------|
| Event Bus | ✅ Complete |
| Webhooks | ✅ Complete |
| Real-time | 🟡 In Progress |
| Federation | ⚪ Planned |

---

*Repository: DoozHub/dooz-bridge*
