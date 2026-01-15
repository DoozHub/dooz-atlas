# Webhook Patterns

> Event-driven integration patterns for Dooz.

---

## Overview

Dooz uses webhooks for:
- External service notifications
- Cross-app event propagation
- Third-party integrations

---

## Webhook Architecture

```
Event Source → Event Bus → Webhook Dispatcher → External URL
                              ↓
                        Retry Queue (on failure)
```

---

## Sending Webhooks

### Event Trigger

```php
use App\Events\DeviceCalibrated;

// Dispatch event (triggers webhook if configured)
event(new DeviceCalibrated($device, $certificate));
```

### Webhook Configuration

Stored per-tenant in database:

```php
WebhookEndpoint::create([
    'url' => 'https://example.com/webhook',
    'events' => ['device.calibrated', 'device.overdue'],
    'secret' => Str::random(32),
    'is_active' => true,
]);
```

---

## Webhook Payload Format

### Standard Envelope

```json
{
    "event": "device.calibrated",
    "timestamp": "2025-01-01T10:00:00Z",
    "tenant_id": "acme",
    "payload": {
        "device": {
            "id": "uuid",
            "device_code": "DEV-001",
            "model": "Caliper X100"
        },
        "certificate": {
            "id": "uuid",
            "certificate_number": "CAL-2025-001",
            "valid_until": "2025-04-01"
        }
    }
}
```

### Signature Header

```http
X-Dooz-Signature: sha256=abc123...
X-Dooz-Timestamp: 1704067200
X-Dooz-Event: device.calibrated
```

---

## Available Events

### Device Events

| Event | Trigger |
|-------|---------|
| `device.created` | New device added |
| `device.updated` | Device modified |
| `device.deleted` | Device removed |
| `device.calibrated` | Calibration completed |
| `device.overdue` | Past due date |
| `device.sent` | Sent for calibration |

### Certificate Events

| Event | Trigger |
|-------|---------|
| `certificate.uploaded` | Certificate file uploaded |
| `certificate.approved` | Certificate approved |
| `certificate.rejected` | Certificate rejected |

### User Events

| Event | Trigger |
|-------|---------|
| `user.created` | User registered |
| `user.invited` | User invited to tenant |

---

## Receiving Webhooks

### Endpoint Implementation

```php
Route::post('/webhook/dooz', function (Request $request) {
    // Verify signature
    $signature = $request->header('X-Dooz-Signature');
    $timestamp = $request->header('X-Dooz-Timestamp');
    $payload = $request->getContent();
    
    $expected = 'sha256=' . hash_hmac('sha256', $timestamp . $payload, $secret);
    
    if (!hash_equals($expected, $signature)) {
        abort(401, 'Invalid signature');
    }
    
    // Check timestamp freshness (prevent replay)
    if (abs(time() - (int)$timestamp) > 300) {
        abort(401, 'Timestamp too old');
    }
    
    // Process event
    $event = $request->input('event');
    $data = $request->input('payload');
    
    match($event) {
        'device.calibrated' => $this->handleCalibration($data),
        'device.overdue' => $this->handleOverdue($data),
        default => null,
    };
    
    return response()->json(['status' => 'ok']);
});
```

---

## Retry Policy

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 30 minutes |
| 5 | 2 hours |
| 6 | 12 hours |
| 7+ | Disabled |

After 7 failures, endpoint is marked inactive.

---

## Testing Webhooks

### Local Testing

Use ngrok to expose local server:

```bash
ngrok http 8000
```

Configure webhook with ngrok URL.

### Webhook Logs

Available in tenant dashboard:
- Delivery status
- Request/response bodies
- Retry history
- Latency metrics

---

## Best Practices

### Sending

1. **Idempotent payloads** — Include unique event ID
2. **Minimal data** — Include IDs, not full objects
3. **Sign requests** — Always sign with secret
4. **Respect timeouts** — 30 second max response time

### Receiving

1. **Verify signatures** — Never skip verification
2. **Respond quickly** — Return 200 immediately, process async
3. **Handle duplicates** — Events may be sent multiple times
4. **Log everything** — Keep webhook logs for debugging

---

## Error Responses

| Status | Meaning | Dooz Action |
|--------|---------|-------------|
| 2xx | Success | Mark delivered |
| 4xx | Client error | Retry (may disable) |
| 5xx | Server error | Retry |
| Timeout | No response | Retry |
