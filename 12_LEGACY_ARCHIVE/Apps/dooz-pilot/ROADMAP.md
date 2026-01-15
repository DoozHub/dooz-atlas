# Dooz Pilot - Roadmap

> Development phases for workflow automation platform

---

## Overview

Dooz Pilot enables local workflow automation with AI. Roadmap prioritizes core engine, then integrations, then AI.

---

## Phase 1: Core Engine ✅

**Status:** Complete

### Completed Features
- [x] Workflow definition format (YAML)
- [x] Step execution engine
- [x] Basic control flow (sequence)
- [x] Variable system
- [x] Expression evaluation
- [x] Execution logging

### Outcomes
- Workflows can be defined in YAML
- Steps execute in sequence
- Variables pass between steps

---

## Phase 2: Visual Builder 🔄

**Status:** In Progress

### Features
- [ ] React Flow integration
- [ ] Drag-and-drop nodes
- [ ] Connection drawing
- [ ] Node configuration panel
- [ ] YAML ↔ Visual sync
- [ ] Undo/redo

### UX
- Intuitive node layout
- Input/output ports
- Validation indicators

---

## Phase 3: Triggers

**Status:** Planned

### Features
- [ ] Cron scheduler
- [ ] Webhook endpoints
- [ ] File system watcher
- [ ] Manual trigger button
- [ ] Event-based triggers
- [ ] Webhook signature verification

### Scheduler
- Tokio-based cron
- Next run preview
- Execution history

---

## Phase 4: Control Flow

**Status:** Planned

### Features
- [ ] Conditional branching (if/else)
- [ ] Loops (foreach, while)
- [ ] Parallel execution
- [ ] Error handling (try/catch)
- [ ] Retry policies
- [ ] Timeouts
- [ ] Sub-workflows

### Logic
- Boolean conditions
- Complex expressions
- Break/continue

---

## Phase 5: Connectors

**Status:** Planned

### Built-in Connectors
- [ ] File system operations
- [ ] HTTP requests
- [ ] Email sending
- [ ] Desktop notifications
- [ ] Database queries
- [ ] Shell commands

### Third-party Connectors
- [ ] Google Workspace
- [ ] Slack
- [ ] Discord
- [ ] GitHub
- [ ] Notion
- [ ] Airtable

---

## Phase 6: Credential Management

**Status:** Planned

### Features
- [ ] OAuth 2.0 flow support
- [ ] API key storage (encrypted)
- [ ] Credential testing
- [ ] Token refresh handling
- [ ] Secret rotation
- [ ] Access audit

### Security
- OS keychain integration
- Encryption at rest
- Secure memory handling

---

## Phase 7: AI Actions

**Status:** Planned

### Features
- [ ] Text completion action
- [ ] Chat action (conversational)
- [ ] Summarization action
- [ ] Classification action
- [ ] Data extraction action
- [ ] Natural language to workflow

### Providers
- OpenAI
- Anthropic
- Ollama (local)
- Custom endpoints

---

## Phase 8: Monitoring

**Status:** Planned

### Features
- [ ] Execution dashboard
- [ ] Real-time log viewer
- [ ] Performance metrics
- [ ] Error tracking
- [ ] Alert configuration
- [ ] Execution replay

### Analytics
- Success/failure rates
- Execution duration trends
- Trigger statistics

---

## Phase 9: Advanced Features

**Status:** Planned

### Features
- [ ] Workflow templates
- [ ] Import/export
- [ ] Version control
- [ ] Rollback
- [ ] Testing mode
- [ ] Debugging tools
- [ ] Breakpoints

---

## Phase 10: Team Features

**Status:** Planned

### Features
- [ ] Shared workflow library
- [ ] Team credentials
- [ ] Access control
- [ ] Audit logging
- [ ] Collaboration
- [ ] Change approval

---

## Technical Debt Backlog

### Priority 1 (High)
- [ ] Improve execution reliability
- [ ] Better error messages
- [ ] Memory management
- [ ] Concurrent execution limits

### Priority 2 (Medium)
- [ ] Execution resume after crash
- [ ] Large data handling
- [ ] Streaming outputs
- [ ] Connector SDK

### Priority 3 (Low)
- [ ] Custom UI actions
- [ ] Marketplace for connectors
- [ ] Analytics export
- [ ] API access

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Workflow Execution Start | < 100ms |
| Step Overhead | < 10ms |
| Concurrent Workflows | 100+ |
| Scheduler Accuracy | < 1s drift |
| UI Response | 60fps |

---

## Notes

- Local execution is the default
- No cloud required for core functionality
- Security-first credential handling
- AI features enhance but don't require connectivity
