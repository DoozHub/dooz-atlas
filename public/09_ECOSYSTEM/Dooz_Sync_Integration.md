# Dooz Sync Integration Guide

> Complete guide for integrating Dooz Sync into local-first client applications

---

## Overview

Dooz Sync provides **end-to-end encrypted** synchronization for local-first applications. This guide covers:

1. Architecture overview
2. Server-side setup (dooz-sync package)
3. Client SDK integration (@dooz/sync-sdk)
4. Platform-specific implementations

---

## Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                         CLIENT APPLICATION                             │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                    @dooz/sync-sdk                                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │  │
│  │  │SyncClient│  │Encryption│  │ Chunking │  │  DzFile  │        │  │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │  │
│  └───────┼──────────────┼──────────────┼──────────────┼────────────┘  │
│          │              │              │              │               │
│  ┌───────▼──────────────▼──────────────▼──────────────▼────────────┐  │
│  │                      Local Storage                               │  │
│  │  - SQLite database   - Encryption keys   - Sync state           │  │
│  └─────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS (encrypted data)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           DOOZ CORE SERVER                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      dooz-sync package                           │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │   │
│  │  │SyncService│ │ Storage  │  │ Devices  │  │ Billing  │        │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │   │
│  └───────┼──────────────┼──────────────┼──────────────┼────────────┘   │
│          │              │              │              │                │
│  ┌───────▼──────────────▼──────────────▼──────────────▼────────────┐   │
│  │  Dooz Cloud S3        │        User-Provided S3                  │   │
│  │  (encrypted blobs)    │        (encrypted blobs)                 │   │
│  └───────────────────────┴──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key Principle:** All data is encrypted on the client before transmission. The server only stores and routes encrypted blobs.

---

## Server Setup (dooz-sync)

### Installation

```bash
cd dooz-core
composer require dooz/sync:*
php artisan migrate
php artisan vendor:publish --tag=dooz-sync-config
```

### Configuration

Edit `config/dooz-sync.php`:

```php
return [
    'encryption' => [
        'algorithm' => 'aes-256-gcm',
        'key_derivation_iterations' => 100000,
    ],
    
    'storage' => [
        'default' => env('DOOZ_SYNC_STORAGE', 'dooz_cloud'),
        'dooz_cloud' => [
            'bucket' => env('DOOZ_CLOUD_BUCKET', 'dooz-sync-storage'),
            'region' => env('DOOZ_CLOUD_AWS_REGION', 'ap-south-1'),
        ],
    ],
    
    'limits' => [
        'max_file_size' => 52428800, // 50 MB
    ],
];
```

### API Endpoints Available

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sync/v1/devices` | POST | Register device |
| `/api/sync/v1/devices` | GET | List devices |
| `/api/sync/v1/sync/status` | GET | Get sync status |
| `/api/sync/v1/sync/changes` | GET | Get changes since version |
| `/api/sync/v1/chunks` | POST | Upload chunk |
| `/api/sync/v1/chunks/{id}` | GET | Download chunk |
| `/api/sync/v1/sync/manifest` | POST | Submit manifest |
| `/api/sync/v1/storage/config` | GET/PUT | Storage config |

---

## Client SDK Integration

### Installation

```bash
npm install @dooz/sync-sdk
# or
bun add @dooz/sync-sdk
```

### Basic Setup

```typescript
import { SyncClient } from '@dooz/sync-sdk';

const sync = new SyncClient({
  baseUrl: 'https://your-dooz.app',
  appName: 'dooz-brain',      // Your app identifier
  appVersion: '1.0.0',
  deviceType: 'desktop',       // desktop | mobile | tablet | web
  onProgress: (p) => console.log(`${p.phase}: ${p.percent}%`),
});
```

### Authentication Flow

```typescript
// 1. User logs in to Dooz Core (get token)
const loginResponse = await fetch('https://your-dooz.app/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const { access_token } = await loginResponse.json();

// 2. Initialize sync client
await sync.initialize();
await sync.authenticate(access_token);

// 3. Setup encryption (first time or new device)
await sync.setupEncryption(password); // Derives key from password

// 4. Register device
const device = await sync.registerDevice();
console.log(`Device ID: ${device.device_id}`);
```

### Performing Sync

```typescript
// Simple sync
const result = await sync.sync(localData);
console.log(`Uploaded: ${result.uploaded}, Downloaded: ${result.downloaded}`);

// Or manual control:

// Get status first
const status = await sync.getStatus();
console.log(`Server version: ${status.server_version}`);

// Get remote changes
const changes = await sync.getChanges(localVersion);

// Download missing chunks
for (const change of changes.changes) {
  const data = await sync.downloadChunk(change.chunk_id);
  // Merge into local data...
}

// Upload local changes
const chunks = await sync.chunking.chunk(localData);
for (const chunk of newChunks) {
  await sync.uploadChunk(chunk);
}

// Submit manifest
await sync.submitManifest(localVersion, manifestEntries);
```

---

## Platform-Specific Implementations

### Tauri (Rust + TypeScript)

```typescript
// src/lib/storage-adapter.ts
import { invoke } from '@tauri-apps/api/tauri';
import type { StorageAdapter } from '@dooz/sync-sdk';

export class TauriStorageAdapter implements StorageAdapter {
  async getToken(): Promise<string | null> {
    return invoke('keychain_get', { key: 'dooz_sync_token' });
  }

  async setToken(token: string): Promise<void> {
    await invoke('keychain_set', { key: 'dooz_sync_token', value: token });
  }

  async removeToken(): Promise<void> {
    await invoke('keychain_delete', { key: 'dooz_sync_token' });
  }

  async getItem(key: string): Promise<string | null> {
    return invoke('storage_get', { key });
  }

  async setItem(key: string, value: string): Promise<void> {
    await invoke('storage_set', { key, value });
  }

  async removeItem(key: string): Promise<void> {
    await invoke('storage_delete', { key });
  }
}

// Usage
import { SyncClient } from '@dooz/sync-sdk';

const sync = new SyncClient({
  baseUrl: 'https://your-dooz.app',
  appName: 'dooz-brain',
  appVersion: '1.0.0',
  storageAdapter: new TauriStorageAdapter(),
});
```

### Flutter (Dart)

```dart
// lib/sync/sync_service.dart
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert';
import 'dart:typed_data';

class DoozSyncService {
  final String baseUrl;
  final String appName;
  final String appVersion;
  final _storage = const FlutterSecureStorage();
  
  String? _token;
  String? _deviceId;

  DoozSyncService({
    required this.baseUrl,
    required this.appName,
    required this.appVersion,
  });

  Future<void> initialize() async {
    _token = await _storage.read(key: 'dooz_sync_token');
    _deviceId = await _storage.read(key: 'dooz_sync_device_id');
  }

  Future<void> authenticate(String token) async {
    _token = token;
    await _storage.write(key: 'dooz_sync_token', value: token);
  }

  Future<void> registerDevice(String deviceName) async {
    final response = await _request('POST', '/devices', {
      'device_name': deviceName,
      'device_type': 'mobile',
      'app_name': appName,
      'app_version': appVersion,
      'public_key': await _getPublicKey(),
    });
    
    _deviceId = response['device_id'];
    await _storage.write(key: 'dooz_sync_device_id', value: _deviceId);
  }

  Future<Map<String, dynamic>> getStatus() async {
    return _request('GET', '/sync/status?app=$appName');
  }

  Future<Uint8List> downloadChunk(String chunkId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/sync/v1/chunks/$chunkId'),
      headers: _headers(),
    );
    return response.bodyBytes;
  }

  Map<String, String> _headers() => {
    'Authorization': 'Bearer $_token',
    'Accept': 'application/json',
    'X-Device-ID': _deviceId ?? '',
  };

  Future<Map<String, dynamic>> _request(
    String method,
    String path, [
    Map<String, dynamic>? body,
  ]) async {
    final uri = Uri.parse('$baseUrl/api/sync/v1$path');
    final response = method == 'GET'
        ? await http.get(uri, headers: _headers())
        : await http.post(uri, headers: _headers(), body: jsonEncode(body));
    return jsonDecode(response.body);
  }
  
  Future<String> _getPublicKey() async {
    // Generate or retrieve encryption public key
    return 'base64_public_key';
  }
}
```

### React Native

```typescript
// src/services/sync.ts
import * as SecureStore from 'expo-secure-store';
import { SyncClient, StorageAdapter } from '@dooz/sync-sdk';

class SecureStorageAdapter implements StorageAdapter {
  async getToken() {
    return SecureStore.getItemAsync('dooz_sync_token');
  }
  async setToken(token: string) {
    await SecureStore.setItemAsync('dooz_sync_token', token);
  }
  async removeToken() {
    await SecureStore.deleteItemAsync('dooz_sync_token');
  }
  async getItem(key: string) {
    return SecureStore.getItemAsync(key);
  }
  async setItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }
  async removeItem(key: string) {
    await SecureStore.deleteItemAsync(key);
  }
}

export const syncClient = new SyncClient({
  baseUrl: 'https://your-dooz.app',
  appName: 'dooz-hub',
  appVersion: '1.0.0',
  deviceType: 'mobile',
  storageAdapter: new SecureStorageAdapter(),
});

// Hook for React components
export function useSync() {
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);

  const performSync = useCallback(async (data: Uint8Array) => {
    setSyncing(true);
    try {
      const result = await syncClient.sync(data);
      return result;
    } finally {
      setSyncing(false);
    }
  }, []);

  return { syncing, progress, performSync };
}
```

---

## App Sync Configuration

Define what data to sync in your app with a `sync-config.json`:

```json
{
  "app_name": "dooz-hub",
  "sync_version": "1.0",
  "categories": [
    {
      "id": "database",
      "name": "Core Database",
      "paths": ["data/hub.db"],
      "sync_mode": "always",
      "priority": 1
    },
    {
      "id": "assets",
      "name": "Media Assets",
      "paths": ["assets/**/*"],
      "sync_mode": "on_demand",
      "priority": 2,
      "max_file_size": "50MB"
    },
    {
      "id": "thumbnails",
      "name": "Thumbnails",
      "paths": ["cache/thumbnails/**/*"],
      "sync_mode": "optional",
      "regeneratable": true
    }
  ],
  "exclusions": ["cache/temp/**", "*.log"],
  "settings": {
    "auto_sync_interval": 900,
    "conflict_strategy": "last_write_wins"
  }
}
```

### Sync Modes

| Mode | Description |
|------|-------------|
| `always` | Essential data, always synced |
| `on_demand` | Synced when accessed |
| `optional` | User can enable/disable |
| `never` | Never sync (temp files) |

---

## .dz File Format

The SDK can create/parse .dz encrypted archives:

```typescript
// Create .dz archive
const files = [
  { path: 'data.json', content: jsonBytes },
  { path: 'image.png', content: imageBytes },
];

const dzContent = await sync.dzFile.create(files, encryptionKey);

// Parse .dz archive
const { files: extracted } = await sync.dzFile.parse(dzContent, encryptionKey);

// Get info without decryption
const info = sync.dzFile.getInfo(dzContent);
console.log(`Files: ${info.multi_file}, Size: ${info.total_size}`);
```

---

## Best Practices

### DO ✅

- Store encryption keys in OS keychain (not localStorage)
- Show sync progress to users
- Handle offline gracefully
- Implement retry with exponential backoff
- Verify checksums after download

### DON'T ❌

- Store passwords in plaintext
- Sync on every keystroke (debounce!)
- Ignore sync errors
- Assume network is always available
- Skip encryption setup

---

## Pricing Integration

Sync tiers are enforced server-side:

| Tier | Storage | Devices | Features |
|------|---------|---------|----------|
| Free | User S3 only | 1 | Manual sync |
| Basic ($4.99/mo) | 5 GB | 3 | Auto sync |
| Pro ($9.99/mo) | 50 GB | 10 | Version history |
| Team ($19.99/user/mo) | 200 GB | ∞ | Team sharing |

Check limits client-side:

```typescript
const status = await sync.getStatus();
if (status.storage_used_bytes >= status.storage_limit_bytes) {
  showUpgradePrompt();
}
```

---

## Related Documentation

- [Dooz Sync PRD](./DOOZ_SYNC_PRD.md) - Full specification
- [Developer Guide](./DEVELOPER_GUIDE.md) - General development
- [Security](./SECURITY.md) - Security practices
- [API Contracts](./API_CONTRACTS.md) - API specifications

---

*Last updated: 2025-12-28*
