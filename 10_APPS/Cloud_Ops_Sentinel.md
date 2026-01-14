# Cloud Ops Sentinel

> MCP-based Cloud Operations Assistant for hackathon MVP - minimal, boring, reliable Python code.

---

## Overview

AI-powered cloud operations assistant that detects idle instances, forecasts costs, detects anomalies, and provides automated remediation through MCP tools.

```
┌──────────────────────────────────────────────────────────────┐
│                   CLOUD OPS SENTINEL                         │
├──────────────────────────────────────────────────────────────┤
│  ☁️ Idle Detection      │  💰 Cost Forecasting               │
│  📊 Anomaly Detection   │  🔄 Automated Remediation          │
│  🤖 MCP Tools           │  🎨 Gradio UI                      │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **list_idle_instances()** | Detect idle VMs/containers from simulated metrics |
| **get_billing_forecast()** | Simple cost forecast based on synthetic metric history |
| **get_metrics(service_id)** | Return metrics for a given service |
| **detect_anomaly(service_id)** | Run anomaly detection on metrics/logs |
| **restart_service(id)** | Simulate service restart via Modal or Blaxel |
| **summarize_infra()** | LLM-generated Ops report |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | Python 3.8+ |
| **UI** | Gradio 6 (Hugging Face Spaces) |
| **Protocol** | Model Context Protocol (MCP) |
| **LLM** | SambaNova, Hugging Face |
| **Compute** | Modal, Hyperbolic, Blaxel |
| **Orchestration** | LangChain (optional) |

---

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Gradio 6 UI   │────│   MCP Server     │────│ Simulation      │
│ (Hugging Face)  │    │ (6 Core Tools)   │    │ Engine          │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                               │
                     ┌─────────┼─────────┐
                     │         │         │
             ┌───────▼───┐ ┌───▼───┐ ┌───▼────┐
             │  Modal    │ │Hyper- │ │ Blaxel │
             │(Compute)  │ │bolic  │ │(Alt)   │
             └───────────┘ │(Vector)│ └────────┘
                          └────────┘
```

---

## Project Structure

```
cloud_ops_sentinel/
├── app/
│   ├── config.py               # Environment variables
│   ├── models.py               # Data classes
│   ├── infra_simulation.py     # Synthetic data generation
│   ├── modal_client.py         # Modal compute wrapper
│   ├── hyperbolic_client.py    # Hyperbolic integration
│   ├── blaxel_client.py        # Blaxel integration
│   ├── llm_client.py           # LLM integration
│   ├── mcp_server.py           # MCP tools implementation
│   ├── orchestrator.py         # LangChain workflows
│   └── ui_gradio.py            # Gradio UI
├── app.py                      # Main entry point
├── data_generator.py           # Test data generation
├── requirements.txt            # Python dependencies
└── sponsor_config.py           # Integration configuration
```

---

## Quick Start

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run
python app.py

# Or use MCP directly
python mcp_server.py
```

---

*Repository: cloud_ops_sentinel*
