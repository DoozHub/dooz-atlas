# Dooz Sync - Roadmap

> Development phases for E2E encrypted sync platform

---

## Overview

Dooz Sync enables secure, offline-first synchronization. This roadmap prioritizes security, reliability, then features.

---

## Phase 1: Foundation ✅

**Status:** Complete

### Completed Features
- [x] .dz file format specification
- [x] Encryption service (AES-256-GCM, ChaCha20)
- [x] Content-defined chunking (Rabin fingerprinting)
- [x] Core database schema
- [x] REST API endpoints
- [x] TypeScript client SDK

### Outcomes
- Files can be encrypted and chunked
- SDK can create/parse .dz files
- API accepts device registration and chunk uploads

---

## Phase 2: Storage Backends 🔄

**Status:** In Progress

### Features
- [ ] Dooz Cloud S3 integration
- [ ] Presigned URL support for direct upload
- [ ] User-provided S3 configuration
- [ ] S3 credential validation
- [ ] GCS backend support
- [ ] Azure Blob Storage (basic)
- [ ] Storage health monitoring

### Technical Requirements
- AWS SDK integration
- Credential encryption at rest
- Connection pooling
- Retry logic with backoff

---

## Phase 3: Sync Protocol

**Status:** Planned

### Features
- [ ] Version vector implementation
- [ ] Delta calculation optimization
- [ ] Manifest persistence
- [ ] Chunk reference counting
- [ ] Garbage collection
- [ ] Bandwidth throttling
- [ ] Resume interrupted syncs

### Protocol Details
- Last-write-wins conflict resolution
- Tombstone markers for deletes
- Compaction for old versions

---

## Phase 4: Client SDKs

**Status:** Planned

### TypeScript SDK Enhancements
- [ ] Background sync worker
- [ ] Progress events
- [ ] Retry logic
- [ ] Connection pooling
- [ ] Offline queue

### Additional SDKs
- [ ] Flutter/Dart SDK
- [ ] Swift SDK (iOS/macOS native)
- [ ] Kotlin SDK (Android native)
- [ ] Python SDK (for automation)
- [ ] CLI tool

---

## Phase 5: Advanced Features

**Status:** Planned

### Features
- [ ] Selective sync (path patterns)
- [ ] Sync priorities
- [ ] Version history retention
- [ ] Point-in-time recovery
- [ ] Conflict archive browser
- [ ] Sync analytics dashboard

### Configuration
- Per-app sync policies
- User-configurable exclusions
- Sync schedules

---

## Phase 6: Team Features

**Status:** Planned

### Features
- [ ] Shared encryption keys
- [ ] Team key rotation
- [ ] Access control lists
- [ ] Team audit logs
- [ ] Admin override capabilities
- [ ] Member invitation flow

### Security
- Key escrow options
- Emergency access procedures
- Separation of duties

---

## Phase 7: Enterprise

**Status:** Planned

### Features
- [ ] On-premise deployment option
- [ ] Customer-managed keys (BYOK)
- [ ] Compliance exports
- [ ] S3 lifecycle policies
- [ ] Cross-region replication
- [ ] SLA monitoring

### Compliance
- SOC 2 documentation
- GDPR data handling
- HIPAA considerations

---

## Technical Debt Backlog

### Priority 1 (High)
- [ ] Improve chunk deduplication
- [ ] Optimize manifest size
- [ ] Add compression benchmarks
- [ ] Memory usage optimization

### Priority 2 (Medium)
- [ ] Streaming chunk upload
- [ ] Parallel chunk downloads
- [ ] Better error messages
- [ ] SDK bundle size reduction

### Priority 3 (Low)
- [ ] Alternative chunking algorithms
- [ ] Compression ratio analysis
- [ ] Network condition simulation
- [ ] Chaos testing

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Sync Latency (100KB) | < 2s |
| Chunk Dedup Rate | > 40% |
| SDK Bundle Size | < 50KB |
| API Uptime | 99.9% |
| Zero Data Loss | 100% |

---

## Security Milestones

- [ ] Third-party security audit
- [ ] Penetration testing
- [ ] Encryption review by cryptographer
- [ ] Bug bounty program
- [ ] Security documentation

---

## Notes

- Security and data integrity are non-negotiable
- Performance optimizations follow correctness
- Cross-platform parity is a priority
- Customer data privacy is paramount
