# Dooz Atlas

> **Single source of truth** for DoozieSoft's AI/Agentic Development, Ecosystem Architecture, and Application Documentation.

Dooz Atlas is DoozieSoft's central knowledge base containing:
- **AI/Agentic Development** — SOPs, frameworks, prompts, and best practices
- **Ecosystem Documentation** — Architecture, APIs, and integration guides
- **Application Docs** — Individual app specifications and guides

## 📚 Documentation Structure

| Section | Description |
|---------|-------------|
| [01_SOP](01_SOP/) | Standard Operating Procedures (mandatory rules) |
| [02_GUIDES](02_GUIDES/) | How-to guides and tutorials |
| [03_FRAMEWORKS](03_FRAMEWORKS/) | Decision frameworks and mental models |
| [04_PROMPT_LIBRARY](04_PROMPT_LIBRARY/) | Approved, versioned prompts |
| [05_KNOWLEDGE_BASE](05_KNOWLEDGE_BASE/) | Lessons, failures, and case studies |
| [06_UI_AGENTIC_AI](06_UI_AGENTIC_AI/) | UI/UX patterns for agentic systems |
| [07_IMPLEMENTATION](07_IMPLEMENTATION/) | Technical implementation guides |
| [08_APPENDIX](08_APPENDIX/) | Reference materials, catalogs, glossary |
| [09_ECOSYSTEM](09_ECOSYSTEM/) | Ecosystem architecture & development |
| [10_APPS](10_APPS/) | Application documentation |

## 🖥️ Docs Viewer

This repository includes a React-based documentation viewer.

### Features

- 📚 **Sidebar Navigation** - Browse all documentation sections
- 🌙 **Neo-Analog Dark Theme** - Easy on the eyes
- 📝 **Markdown Rendering** - Full GFM support with syntax highlighting
- 📱 **Responsive** - Works on desktop and mobile

### Running Locally

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The viewer serves markdown files via symlinks in the `public/` folder.

### Building for Production

```bash
bun run build
bun run preview
```

## 📖 Quick Start

Start with [INDEX.md](INDEX.md) for a complete overview of all available documentation.

## 🔗 Related

- See [AI Usage SOP](01_SOP/AI_Usage_SOP.md) for how to use AI in development
- See [Model Routing Policy](01_SOP/Model_Routing_Policy.md) for which models to use
