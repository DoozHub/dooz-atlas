# Dooz Client App Development Guide

> Build desktop and mobile apps that integrate with Dooz

---

## Overview

Dooz provides a REST API that enables you to build:
- **Desktop apps** using Tauri, Electron, or native frameworks
- **Mobile apps** using Flutter, React Native, or native iOS/Android
- **Web apps** that run independently of the Dooz web UI

---

## Authentication Flow

All client apps must authenticate to access the Dooz API.

### 1. Login Flow

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│  Client  │──────>│   POST   │──────>│  Dooz    │
│   App    │       │  /login  │       │  Server  │
└──────────┘       └──────────┘       └──────────┘
     │                                      │
     │         access_token                 │
     │<─────────────────────────────────────│
     │                                      │
     │         Bearer Token                 │
     │─────────────────────────────────────>│
```

### 2. Token Storage

Store tokens securely:
- **Desktop:** OS keychain (Keychain on macOS, Credential Manager on Windows)
- **Mobile:** Secure storage (Keychain on iOS, Keystore on Android)
- **Web:** HttpOnly cookies or memory (never localStorage)

### 3. Token Refresh

```http
POST /api/auth/refresh
Authorization: Bearer {access_token}

Response:
{
    "access_token": "new_token...",
    "expires_in": 3600
}
```

---

## API Basics

### Base URL

```
Production: https://your-instance.dooz.app/api
Local Dev:  http://localhost:8000/api
```

### Headers

```http
Authorization: Bearer {access_token}
Accept: application/json
Content-Type: application/json
X-Tenant-ID: {tenant_id}  # Optional: switch tenant context
```

### Response Format

```json
// Success
{
    "data": { ... },
    "meta": { "page": 1, "total": 100 }
}

// Error
{
    "error": "error_code",
    "message": "Human readable message",
    "errors": { "field": ["validation error"] }
}
```

---

## Implementation Examples

### Tauri (Rust + TypeScript)

```typescript
// src/lib/dooz-client.ts
interface LoginResponse {
    access_token: string;
    expires_in: number;
    user: { id: number; name: string; email: string };
}

class DoozClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const res = await fetch(`${this.baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Login failed');
        }

        const data: LoginResponse = await res.json();
        this.token = data.access_token;
        
        // Store in OS keychain via Tauri
        await invoke('store_token', { token: this.token });
        
        return data;
    }

    async request<T>(method: string, path: string, body?: any): Promise<T> {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
        });

        if (!res.ok) {
            if (res.status === 401) {
                await this.refreshToken();
                return this.request(method, path, body);
            }
            throw new Error(`API error: ${res.status}`);
        }

        return res.json();
    }

    async refreshToken(): Promise<void> {
        const res = await fetch(`${this.baseUrl}/api/auth/refresh`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        
        const data = await res.json();
        this.token = data.access_token;
    }

    // App-specific methods
    async getItems(): Promise<any[]> {
        const response = await this.request<{ data: any[] }>('GET', '/api/quicky/items');
        return response.data;
    }

    async createItem(data: any): Promise<any> {
        return this.request('POST', '/api/quicky/items', data);
    }
}

export const dooz = new DoozClient('https://your-dooz.app');
```

### Flutter (Dart)

```dart
// lib/services/dooz_client.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class DoozClient {
  final String baseUrl;
  final _storage = const FlutterSecureStorage();
  String? _token;

  DoozClient(this.baseUrl);

  Future<void> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode != 200) {
      throw Exception('Login failed: ${response.body}');
    }

    final data = jsonDecode(response.body);
    _token = data['access_token'];
    
    // Store securely
    await _storage.write(key: 'dooz_token', value: _token);
  }

  Future<void> loadToken() async {
    _token = await _storage.read(key: 'dooz_token');
  }

  Future<void> logout() async {
    await http.post(
      Uri.parse('$baseUrl/api/auth/logout'),
      headers: _headers(),
    );
    _token = null;
    await _storage.delete(key: 'dooz_token');
  }

  Map<String, String> _headers() => {
    'Authorization': 'Bearer $_token',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  Future<T> get<T>(String path) async {
    final response = await http.get(
      Uri.parse('$baseUrl$path'),
      headers: _headers(),
    );
    
    if (response.statusCode == 401) {
      await _refreshToken();
      return get(path);
    }
    
    return jsonDecode(response.body);
  }

  Future<T> post<T>(String path, Map<String, dynamic> body) async {
    final response = await http.post(
      Uri.parse('$baseUrl$path'),
      headers: _headers(),
      body: jsonEncode(body),
    );
    return jsonDecode(response.body);
  }

  Future<void> _refreshToken() async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/refresh'),
      headers: _headers(),
    );
    final data = jsonDecode(response.body);
    _token = data['access_token'];
    await _storage.write(key: 'dooz_token', value: _token);
  }
}

// Usage
final dooz = DoozClient('https://your-dooz.app');
await dooz.login('user@example.com', 'password');
final items = await dooz.get('/api/quicky/items');
```

### React Native (TypeScript)

```typescript
// src/services/doozClient.ts
import * as SecureStore from 'expo-secure-store';

class DoozClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async initialize(): Promise<boolean> {
        this.token = await SecureStore.getItemAsync('dooz_token');
        return this.token !== null;
    }

    async login(email: string, password: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        this.token = data.access_token;
        await SecureStore.setItemAsync('dooz_token', this.token);
        
        return data.user;
    }

    async logout(): Promise<void> {
        await fetch(`${this.baseUrl}/api/auth/logout`, {
            method: 'POST',
            headers: this.getHeaders(),
        });
        
        this.token = null;
        await SecureStore.deleteItemAsync('dooz_token');
    }

    private getHeaders(): Record<string, string> {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }

    async get<T>(path: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            headers: this.getHeaders(),
        });
        return response.json();
    }

    async post<T>(path: string, body: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });
        return response.json();
    }
}

export const dooz = new DoozClient('https://your-dooz.app');
```

---

## Offline Support

### Caching Strategy

```typescript
// Cache API responses for offline use
class CachedDoozClient extends DoozClient {
    private cache = new Map<string, { data: any; timestamp: number }>();
    private cacheDuration = 5 * 60 * 1000; // 5 minutes

    async get<T>(path: string): Promise<T> {
        const cached = this.cache.get(path);
        
        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            return cached.data;
        }

        try {
            const data = await super.get<T>(path);
            this.cache.set(path, { data, timestamp: Date.now() });
            return data;
        } catch (e) {
            // Return cached data if network fails
            if (cached) return cached.data;
            throw e;
        }
    }
}
```

### Sync Queue

```typescript
// Queue mutations for later sync
class SyncQueue {
    private queue: Array<{ method: string; path: string; body: any }> = [];

    add(method: string, path: string, body: any): void {
        this.queue.push({ method, path, body });
        this.persist();
    }

    async sync(client: DoozClient): Promise<void> {
        while (this.queue.length > 0) {
            const item = this.queue[0];
            try {
                await client.request(item.method, item.path, item.body);
                this.queue.shift();
                this.persist();
            } catch (e) {
                break; // Stop on first failure
            }
        }
    }

    private persist(): void {
        localStorage.setItem('sync_queue', JSON.stringify(this.queue));
    }
}
```

---

## Error Handling

### Common Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| 401 | Unauthorized | Refresh token or re-login |
| 403 | Forbidden | User lacks permission |
| 404 | Not Found | Resource doesn't exist |
| 422 | Validation Error | Check `errors` field |
| 429 | Rate Limited | Wait and retry |
| 500 | Server Error | Retry with backoff |

### Retry Strategy

```typescript
async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (e: any) {
            if (i === maxRetries - 1) throw e;
            if (e.status >= 500 || e.status === 429) {
                await new Promise(r => setTimeout(r, baseDelay * Math.pow(2, i)));
            } else {
                throw e;
            }
        }
    }
    throw new Error('Max retries exceeded');
}
```

---

## WebSocket / Real-time

### Connecting to Broadcasts

```typescript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const echo = new Echo({
    broadcaster: 'pusher',
    key: 'your-pusher-key',
    cluster: 'mt1',
    encrypted: true,
    authEndpoint: `${baseUrl}/broadcasting/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
});

// Listen for notifications
echo.private(`user.${userId}`)
    .listen('NotificationReceived', (e: any) => {
        console.log('New notification:', e.notification);
    });

// Listen for messages
echo.private(`conversation.${conversationId}`)
    .listen('message.received', (e: any) => {
        console.log('New message:', e.message);
    });
```

---

## Best Practices

### DO ✅

- Store tokens securely (OS keychain/keystore)
- Handle token refresh gracefully
- Cache data for offline use
- Implement retry with exponential backoff
- Show loading states during API calls
- Validate input before sending

### DON'T ❌

- Store tokens in localStorage (web)
- Hardcode API URLs
- Ignore error responses
- Make unnecessary API calls
- Block the UI during sync

---

## Debugging

### Enable Request Logging

```typescript
// Add interceptor for debugging
async request<T>(...args): Promise<T> {
    console.log('API Request:', args);
    const start = Date.now();
    
    try {
        const result = await this._request(...args);
        console.log('API Response:', Date.now() - start, 'ms');
        return result;
    } catch (e) {
        console.error('API Error:', e);
        throw e;
    }
}
```

### Test with cURL

```bash
# Test authentication
curl -X POST https://your-dooz.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test authenticated endpoint
curl https://your-dooz.app/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Resources

- [REST API Reference](../dooz-core/docs/api/openapi.yaml)
- [Postman Collection](../dooz-core/docs/api/Dooz-Core-API.postman_collection.json)
- [Developer Guide](./DEVELOPER_GUIDE.md)

---

*Build amazing client apps!* 📱
