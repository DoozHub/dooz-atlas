# Dooz IoT

> Industrial IoT platform components for the Doozie ecosystem

---

## Overview

Dooz IoT provides infrastructure for connecting, managing, and processing data from industrial IoT devices within the Dooz ecosystem.

```
┌──────────────────────────────────────────────────────────────┐
│                        DOOZ IOT                              │
├──────────────────────────────────────────────────────────────┤
│  📡 Device Management    │  🔌 Edge SDK                      │
│  🏭 Device Simulator     │  📊 Data Processing               │
│  🔒 Secure Communication │  ☁️ Cloud Integration             │
└──────────────────────────────────────────────────────────────┘
```

---

## Packages

| Package | Description |
|---------|-------------|
| **device-simulator/** | Mock IoT device for testing and development |
| **edge-sdk/** | Client SDK for edge devices and gateways |
| **docs/** | Architecture and integration documentation |

---

## Key Features

### Device Simulator

- Simulate IoT device behavior for testing
- Generate realistic sensor data
- Test device communication protocols

### Edge SDK

- Lightweight SDK for edge devices
- Support for common IoT protocols
- Integration with Dooz Sync for data backup

### Cloud Integration

- Real-time data streaming
- Device management dashboard
- Alert and notification system

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **SDK** | TypeScript, Node.js |
| **Protocols** | MQTT, HTTP, WebSocket |
| **Data Format** | JSON, Protocol Buffers |

---

## Getting Started

```bash
# Install dependencies
cd device-simulator && npm install
cd edge-sdk && npm install

# Run simulator
cd device-simulator && npm start
```

---

## Documentation

See the `docs/` folder for:
- Architecture overview
- Protocol specifications
- Integration guides

---

## Integration Points

- **dooz-sync**: Data backup and sync
- **dooz-core**: Authentication and authorization
- **dooz-bridge**: Real-time event distribution

---

## Related Documentation

- [Sync Integration](../09_ECOSYSTEM/Dooz_Sync_Integration.md)
- [Bridge Integration](../09_ECOSYSTEM/Brain_Integration.md)

---

*Repository: DoozHub/dooz-iot*
