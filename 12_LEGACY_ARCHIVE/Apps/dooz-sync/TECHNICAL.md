# Dooz Sync - Technical Specification

> Architecture and implementation details for E2E encrypted sync

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT DEVICE                                  │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    @dooz/sync-sdk                                │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │   │
│  │  │Encryption│──│ Chunking │──│ DzFile   │──│  Client  │        │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └────┬─────┘        │   │
│  └──────────────────────────────────────────────────┼──────────────┘   │
└──────────────────────────────────────────────────────┼──────────────────┘
                                                       │
                                               HTTPS (TLS 1.3)
                                                       │
┌──────────────────────────────────────────────────────┼──────────────────┐
│                           DOOZ CORE                   │                  │
│  ┌────────────────────────────────────────────────────┼──────────────┐  │
│  │                    dooz-sync package               │               │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────▼─────┐        │  │
│  │  │ Devices  │  │ Chunks   │  │ Manifest │  │  Storage   │        │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────┬─────┘        │  │
│  └───────────────────────────────────────────────────┼───────────────┘  │
└──────────────────────────────────────────────────────┼──────────────────┘
                                                       │
                      ┌────────────────────────────────┼────────────────┐
                      │                                │                │
                      ▼                                ▼                ▼
             ┌──────────────┐                ┌──────────────┐  ┌──────────────┐
             │  Dooz Cloud  │                │    User S3   │  │   User GCS   │
             │     (S3)     │                │   (BYOS)     │  │    (BYOS)    │
             └──────────────┘                └──────────────┘  └──────────────┘
```

---

## .dz File Format

### Binary Structure

```
Offset    Size    Description
──────────────────────────────────────────
0x00      4       Magic: "DOOZ" (0x444F4F5A)
0x04      2       Format Version (uint16 LE)
0x06      2       Flags (uint16 LE)
0x08      1       Encryption Algorithm
0x09      1       Compression Algorithm
0x0A      8       Created Timestamp (uint64 LE)
0x12      8       Modified Timestamp (uint64 LE)
0x1A      32      Content Hash (SHA-256)
0x3A      6       Reserved (zeros)
──────────────────────────────────────────
0x40      4       Manifest Length (uint32 LE)
0x44      12      Manifest IV
0x50      16      Manifest Auth Tag
0x60      var     Encrypted Manifest
──────────────────────────────────────────
var       var     Encrypted Data Chunks
──────────────────────────────────────────
EOF-32    4       CRC-32 Checksum
EOF-28    8       Total File Size (uint64 LE)
EOF-20    4       Magic: "ZOOD" (0x5A4F4F44)
EOF-16    16      Reserved (zeros)
```

### Flags

| Bit | Name | Description |
|-----|------|-------------|
| 0 | ENCRYPTED | Content is encrypted |
| 1 | COMPRESSED | Content is compressed |
| 2 | CHUNKED | Uses CDC chunking |
| 3 | MULTI_FILE | Contains multiple files |

### Encryption Algorithms

| Byte | Algorithm |
|------|-----------|
| 0x01 | AES-256-GCM |
| 0x02 | ChaCha20-Poly1305 |

### Compression Algorithms

| Byte | Algorithm |
|------|-----------|
| 0x00 | None |
| 0x01 | ZSTD |
| 0x02 | LZ4 |
| 0x03 | Brotli |

---

## Encryption

### Key Hierarchy

```
User Password
     │
     ▼ PBKDF2 (100k iterations, SHA-256)
┌────────────┐
│ Master Key │ (256 bits, never leaves device)
└─────┬──────┘
      │ HMAC-SHA256(appName)
      ▼
┌────────────┐     ┌────────────┐     ┌────────────┐
│  App Key   │     │  App Key   │     │  App Key   │
│  (brain)   │     │   (hub)    │     │  (pilot)   │
└─────┬──────┘     └────────────┘     └────────────┘
      │ Per-chunk IV
      ▼
┌────────────┐
│ Chunk Key  │ (Derived per encryption)
└────────────┘
```

### AES-256-GCM Parameters

| Parameter | Value |
|-----------|-------|
| Key Size | 256 bits |
| IV Size | 96 bits (12 bytes) |
| Tag Size | 128 bits (16 bytes) |
| AAD | Empty (no additional data) |

---

## Chunking Algorithm

### Rabin Fingerprinting

```
Parameters:
  - Prime: 31
  - Modulus: 2^24
  - Window Size: 48 bytes
  - Min Chunk: 4 KB
  - Target Chunk: 64 KB (mask: 0xFFFF)
  - Max Chunk: 1 MB

Algorithm:
  1. Initialize rolling hash
  2. Slide window over content
  3. At each position, check: (hash & mask) == 0
  4. If match and >= min_size: create boundary
  5. If >= max_size: force boundary
```

### Deduplication

Chunks are identified by SHA-256 hash:
- Same content = same hash = stored once
- Server deduplicates across user's data
- Cross-user dedup possible (same encrypted chunk = same content + key)

---

## API Endpoints

### Device Management

```http
POST /api/sync/v1/devices
Content-Type: application/json

{
  "device_name": "MacBook Pro",
  "device_type": "desktop",
  "app_name": "dooz-brain",
  "app_version": "1.0.0",
  "public_key": "base64...",
  "platform": "macos"
}

Response: 201 Created
{
  "device_id": "uuid",
  "registered_at": "2025-01-01T00:00:00Z"
}
```

### Sync Operations

```http
GET /api/sync/v1/sync/status?app=dooz-brain

Response: 200 OK
{
  "last_sync": "2025-01-01T12:00:00Z",
  "server_version": 42,
  "pending_changes": 3,
  "storage_used_bytes": 1073741824,
  "storage_limit_bytes": 5368709120
}
```

### Chunk Operations

```http
POST /api/sync/v1/chunks?app=dooz-brain
Content-Type: application/octet-stream
X-Chunk-ID: chk_abc123
X-Chunk-Hash: sha256hex...

[binary chunk data]

Response: 201 Created
{
  "chunk_id": "chk_abc123",
  "version": 43,
  "stored_at": "2025-01-01T12:01:00Z"
}
```

---

## Database Schema

```sql
-- Registered devices
CREATE TABLE sync_devices (
    id CHAR(36) PRIMARY KEY,
    tenant_id CHAR(36),
    user_id BIGINT UNSIGNED,
    device_name VARCHAR(255),
    device_type ENUM('desktop', 'mobile', 'tablet', 'web'),
    app_name VARCHAR(100),
    app_version VARCHAR(20),
    public_key TEXT,
    last_sync_at TIMESTAMP,
    last_sync_version BIGINT UNSIGNED,
    is_active BOOLEAN,
    INDEX (tenant_id, user_id, app_name)
);

-- Encrypted chunks
CREATE TABLE sync_chunks (
    id CHAR(36) PRIMARY KEY,
    tenant_id CHAR(36),
    user_id BIGINT UNSIGNED,
    app_name VARCHAR(100),
    hash CHAR(64),
    size BIGINT UNSIGNED,
    storage_provider VARCHAR(50),
    storage_path VARCHAR(255),
    version BIGINT UNSIGNED,
    UNIQUE (tenant_id, user_id, app_name, hash),
    INDEX (tenant_id, app_name, version)
);
```

---

## Storage Backends

### Dooz Cloud

- Managed S3-compatible storage
- Automatic scaling
- Geographic redundancy
- Included in paid tiers

### User-Provided (BYOS)

| Provider | Endpoint Pattern |
|----------|------------------|
| AWS S3 | `s3.{region}.amazonaws.com` |
| GCS | `storage.googleapis.com` |
| Azure Blob | `{account}.blob.core.windows.net` |
| Backblaze B2 | `s3.{region}.backblazeb2.com` |
| MinIO | Custom |
| Cloudflare R2 | `{account}.r2.cloudflarestorage.com` |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Chunk upload | < 500ms (64KB chunk) |
| Chunk download | < 200ms (64KB chunk) |
| Status check | < 50ms |
| Changes query | < 100ms |

---

## Related Files

- [Sync PRD](../DOOZ_SYNC_PRD.md)
- [Integration Guide](../DOOZ_SYNC_INTEGRATION.md)
- [Client SDK](../../dooz-core/packages/dooz-sync-sdk/)
