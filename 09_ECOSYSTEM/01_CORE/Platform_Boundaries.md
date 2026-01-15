# Platform vs. Ecosystem Boundaries

To maintain a scalable and manageable architecture, the Dooz system distinguishes between "Ecosystem" responsibilities (domain-specific logic) and "Platform" responsibilities (shared infrastructure).

## Platform Responsibilities

The Platform layer (conceptual infra) is responsible for the commodity services that all ecosystem components require but should not implement themselves.

- **Identity & Authentication**: Managing user credentials, OAuth2 flows, and session persistence.
- **Tenant Isolation**: Ensuring strict data segregation at the database or storage level.
- **Billing & Licensing**: handling subscriptions, seat management, and payment processing.
- **Connectivity**: Providing the underlying network, API gateway, and message bus foundations.
- **Resource Management**: Dynamic scaling, logging aggregation, and infrastructure monitoring.

---

## Ecosystem Responsibilities

Ecosystem components are the "first-class citizens" of the Dooz world. They focus on providing value within a specific domain.

- **Domain Logic**: The primary "reason for being" for each component (e.g., project management, document verification).
- **Intelligence Synthesis**: Orchestrating LLM interactions for specialized tasks.
- **Organizational Memory**: Capturing and surfacing context through local memory systems.
- **User Interface**: Providing modern, high-quality frontends using the Neo-Analog design system.
- **Integration**: Adhering to the standard interaction patterns defined in the [Architecture Guide](./Architecture.md).

## Comparison Summary

| Responsibility | Platform Layer | Ecosystem Component |
|----------------|----------------|---------------------|
| **Data Storage** | Multi-tenant isolation logic | Domain-specific schemas |
| **Security** | Auth providers, JWT validation | Role-based logic, permission checks |
| **AI Integration** | GPU/Inference infrastructure | Prompt engineering, agents, synthesis |
| **Scaling** | Infrastructure autoscaling | Component-level performance optimization |
| **Standards** | Base protocols (OAuth2, MCP) | Domain-specific intent implementation |

---

> [!CAUTION]
> Ecosystem components must never attempt to bypass the Platform isolation layer or implement their own identity providers. Doing so violates the "Orbit Pattern" and introduces security risks.

*Last updated: 2026-01-15*
