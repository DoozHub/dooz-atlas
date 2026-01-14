# Camera.py

> Simple RTSP camera stream URL tester.

## Overview

Camera.py is a lightweight Python utility script for discovering and testing RTSP (Real Time Streaming Protocol) camera streams. It attempts to connect to a camera at various common URL paths to find a valid stream endpoint.

## Key Features

| Feature | Description |
|---------|-------------|
| Multi-Path Testing | Tests 8 common RTSP URL paths |
| Credential Support | Includes username/password in URL |
| Error Handling | Graceful failure with timeout |
| Quick Discovery | Fast sequential URL testing |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Python 3 |
| HTTP Library | requests |
| Protocol | RTSP (Real Time Streaming Protocol) |

## Tested URL Patterns

The script tests these common camera stream paths:

| Path | Typical Use |
|------|-------------|
| `stream` | Generic stream |
| `live` | Live feed |
| `mainstream` | Main high-quality stream |
| `substream` | Secondary/sub stream |
| `h264` | H.264 codec stream |
| `video` | Generic video endpoint |
| `cam` | Camera feed |
| `axis-media/media.amp` | Axis camera format |

## Usage

```bash
# Edit credentials in script
camera_ip = "192.168.0.100"
username = "admin"
password = "123456"
port = 554

# Run the script
python camera.py
```

## Configuration

Edit these variables at the top of the script:

| Variable | Description |
|----------|-------------|
| `camera_ip` | IP address of the camera |
| `username` | Camera username |
| `password` | Camera password |
| `port` | RTSP port (default: 554) |
| `paths` | List of URL path patterns to test |

## Output Example

```
Testing: rtsp://admin:123456@192.168.0.100:554/stream
Failed: rtsp://admin:123456@192.168.0.100:554/stream, Error: ...
Testing: rtsp://admin:123456@192.168.0.100:554/live
Stream found: rtsp://admin:123456@192.168.0.100:554/live
```

## Limitations

- Simple sequential testing (no parallel requests)
- No authentication negotiation
- Basic error handling only
- No stream quality verification

## Use Cases

1. Initial camera discovery
2. Finding correct RTSP endpoint
3. Verifying camera connectivity
4. Quick connectivity testing
