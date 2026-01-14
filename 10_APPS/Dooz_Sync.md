# Dooz Sync

> End-to-end encrypted synchronization for local-first applications

---

## Overview

Dooz Sync enables local-first Dooz applications to seamlessly sync data across devices while maintaining end-to-end encryption. The server never sees unencrypted user data.

```
┌──────────────────────────────────────────────────────────────┐
│                       DOOZ SYNC                              │
├──────────────────────────────────────────────────────────────┤
│  🔐 E2E Encryption     │  📦 Delta Sync                      │
│  💾 Flexible Storage   │  📱 Multi-Device                    │
│  ⚡ Last-Write-Wins    │  🔄 Offline-First                   │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **E2E Encryption** | AES-256-GCM encryption, zero-knowledge architecture |
| **Delta Sync** | Content-defined chunking, only changes transmitted |
| **Multi-Device** | Sync across desktop, mobile, and web |
| **Flexible Storage** | Dooz Cloud or bring-your-own S3 |
| **Offline-First** | Full functionality without internet |
| **Conflict Resolution** | Last-write-wins with archive option |

---

## Pricing Model

### Storage Tiers

| Tier | Dooz Cloud Storage | Devices | Price |
|------|-------------------|---------|-------|
| **Free** | User-provided only | 1 | $0/mo |
| **Basic** | 5 GB | 3 | $4.99/mo |
| **Pro** | 50 GB | 10 | $9.99/mo |
| **Team** | 200 GB/user | Unlimited | $19.99/user/mo |
| **Enterprise** | Custom | Unlimited | Contact |

### Fair Use Limits

| Tier | Bandwidth/mo | Sync Operations |
|------|-------------|-----------------|
| Free | 5 GB | 100/day |
| Basic | 25 GB | 500/day |
| Pro | 100 GB | 2,000/day |
| Team | 500 GB | 10,000/day |

### Add-ons

| Add-on | Price |
|--------|-------|
| Extra Storage (10 GB) | $1.99/mo |
| Priority Sync | $2.99/mo |
| Extended Version History (90 days) | $3.99/mo |

---

## Licensing

### Server Package (dooz-sync)

**MIT License** - Free to use, modify, and distribute.

### Client SDK (@dooz/sync-sdk)

**MIT License** - Free for all commercial and personal use.

### Dooz Cloud Storage

Standard terms apply:
- Encrypted at rest and in transit
- GDPR compliant
- Data residency options
- 99.9% availability SLA (Pro+)

---

## Roadmap

### Phase 1: Foundation
- [x] .dz file format specification
- [x] Encryption service (AES-256-GCM)
- [x] Chunking service (Rabin CDC)
- [x] Core sync API endpoints
- [x] TypeScript client SDK

### Phase 2: Storage Backends
- [ ] Dooz Cloud (S3) integration
- [ ] User-provided S3 support
- [ ] Google Cloud Storage
- [ ] Azure Blob Storage
- [ ] Backblaze B2
- [ ] Cloudflare R2

### Phase 3: Advanced Features
- [ ] Selective sync (path patterns)
- [ ] Bandwidth throttling
- [ ] Background sync daemon
- [ ] Sync status notifications
- [ ] Conflict history viewer

### Phase 4: Platform SDKs
- [ ] Flutter/Dart SDK
- [ ] Swift SDK (iOS/macOS)
- [ ] Kotlin SDK (Android)
- [ ] Python SDK
- [ ] CLI tool

### Phase 5: Team Features
- [ ] Shared folders
- [ ] Team key management
- [ ] Access revocation
- [ ] Audit trails
- [ ] Admin dashboard

### Phase 6: Enterprise
- [ ] Key escrow options
- [ ] Compliance reports
- [ ] Custom retention policies
- [ ] SSO integration
- [ ] On-premise option

---

## Technical Specifications

### .dz File Format

```
┌─────────────────────┐
│ HEADER (64 bytes)   │  ← Magic, version, flags
├─────────────────────┤
│ MANIFEST (encrypted)│  ← File metadata
├─────────────────────┤
│ DATA (chunks)       │  ← Encrypted content
├─────────────────────┤
│ FOOTER (32 bytes)   │  ← Checksum, magic
└─────────────────────┘
```

### Encryption

| Component | Algorithm |
|-----------|-----------|
| Symmetric | AES-256-GCM |
| Key Derivation | PBKDF2 (100k iterations) |
| Hashing | SHA-256 |
| Alternative | ChaCha20-Poly1305 |

### Chunking

| Parameter | Value |
|-----------|-------|
| Algorithm | Rabin Fingerprinting |
| Min Chunk | 4 KB |
| Target Chunk | 64 KB |
| Max Chunk | 1 MB |

---

## Related Documentation

- [Sync PRD](../07_IMPLEMENTATION/DOOZ_SYNC_PRD.md)
- [Integration Guide](../07_IMPLEMENTATION/DOOZ_SYNC_INTEGRATION.md)
- [Client App Guide](../07_IMPLEMENTATION/CLIENT_APP_GUIDE.md)
