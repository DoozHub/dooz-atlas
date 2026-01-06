# Dooz Atlas - AI Development Knowledge System

The **Dooz Atlas** is DoozieSoft's central knowledge base for Agentic AI Development, containing SOPs, guides, frameworks, prompt libraries, and implementation references.

## 📚 Documentation Structure

| Section | Description |
|---------|-------------|
| [01_SOP](01_SOP/) | Standard Operating Procedures |
| [02_GUIDES](02_GUIDES/) | How-to guides and tutorials |
| [03_FRAMEWORKS](03_FRAMEWORKS/) | Decision frameworks |
| [04_PROMPT_LIBRARY](04_PROMPT_LIBRARY/) | Reusable prompts |
| [05_KNOWLEDGE_BASE](05_KNOWLEDGE_BASE/) | Lessons and case studies |
| [06_UI_AGENTIC_AI](06_UI_AGENTIC_AI/) | UI/UX for agentic systems |
| [07_IMPLEMENTATION](07_IMPLEMENTATION/) | Technical implementations |
| [08_APPENDIX](08_APPENDIX/) | Reference materials |

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
