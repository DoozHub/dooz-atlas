# Dooz Ecosystem Overview

The Dooz Ecosystem is a collection of canonical, purpose-built components designed for the AI era. It prioritizes human-in-the-loop workflows, organizational memory, and multi-tenant isolation. This document provides a high-level map of the ecosystem and its governing principles.

## The Role of Dooz Atlas

**Dooz Atlas** (this system) is the unified knowledge system for the entire ecosystem. It serves as:
- **Source of Truth**: The definitive guide for ecosystem architecture, component responsibilities, and integration patterns.
- **Institutional Memory**: A shared repo for SOPs, prompt libraries, and development frameworks.
- **Navigator**: A map for developers and operators to understand how components interact and where responsibilities lie.

## Ecosystem Philosophy

1. **Canonical Components**: Every repository in the `dooz-ecosystem` represents a long-lived, first-class citizen with a strictly defined intent.
2. **Human-in-the-Loop**: Systems are designed to augment human intelligence, not replace it. Responsibility and final decision ownership always remain with the user.
3. **Intent-Centric**: Work is organized around purpose and outcomes rather than just tasks or tickets.
4. **Platform Isolation**: Leveraging a shared platform layer for infrastructure concerns while maintaining strict tenant data isolation.

## Core Component Groups

The ecosystem is organized into four functional groups:

### 1. Platform Foundation
Foundational infrastructure and design standards that support all other services.
- **dooz-core**: The multi-tenant SaaS backbone.
- **neo-analog**: The universal design system.

### 2. Cognitive & Memory
Systems responsible for organizational intelligence, routing, and memory retention.
- **dooz-brain**: Local-first institutional memory and MCP provider.
- **dooz-ai-router**: Multi-provider LLM mediation and routing library.

### 3. Intelligence Orchestration
Tools that facilitate complex AI-driven workflows and document analysis.
- **dooz-perspective**: Multi-agent document verification pipeline.
- **dooz-copilot**: Contextual assistive chat interface.

### 4. Operational & Builder Tools
Applications for work management, dashboarding, and tool adaptation.
- **dooz-pm-suite**: Intent-centric project management backend.
- **dooz-hub**: Integrated app launcher and personal dashboard.
- **dooz-pilot**: CLI-to-GUI bridge for AI tools.
- **dooz-hindsight**: Decision tracking and calibration dashboard.

---

> [!NOTE]
> For a detailed list of every component and its specific responsibility, see the [Component Catalog](./Component_Catalog.md).

*Last updated: 2026-01-15*
