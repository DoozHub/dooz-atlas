# Cartridge Guide

> Creating cartridges for Dooz Pilot/Bridge.

---

## Overview

A cartridge is a declarative wrapper that transforms a CLI tool into a graphical interface in Dooz Pilot (Bridge). Cartridges define:

- How to spawn the CLI tool
- How to parse its output
- What UI elements to display
- How to send input

**Repository:** `dooz-cartridges`

---

## Cartridge Structure

```
cartridges/
└── aider/
    ├── manifest.yaml       # Cartridge definition
    ├── grammar.txt         # Output parsing rules
    ├── icon.svg            # Display icon
    └── README.md           # Documentation
```

---

## Manifest Format

```yaml
name: aider
version: 1.0.0
description: AI pair programming with Aider
author: Dooz

# CLI configuration
cli:
  command: aider
  args:
    - --no-auto-commits
    - --dark-mode
  env:
    AIDER_DARK_MODE: "true"

# UI configuration
ui:
  theme: dark
  features:
    - file_tree
    - diff_view
    - token_counter

# Grammar reference
grammar: grammar.txt

# Input handlers
inputs:
  - type: text
    placeholder: "Enter your request..."
    submit_key: enter
  - type: file_drop
    action: add_file

# Output parsers
outputs:
  - pattern: "^Tokens:"
    type: status
    display: token_counter
  - pattern: "^>>> "
    type: prompt
    display: input_focus
```

---

## Grammar Definition

Grammars use a simple pattern language to recognize CLI output:

```
# grammar.txt

# File operations
ADDING_FILE: "Added .+ to the chat"
DROPPING_FILE: "Dropped .+ from the chat"

# Status indicators
THINKING: "Thinking..."
SEARCHING: "Searching for"
EDITING: "Editing .+"

# Output sections
CODE_BLOCK_START: "```"
CODE_BLOCK_END: "```"
DIFF_START: "<<<<<<<<"
DIFF_END: ">>>>>>>>"

# Prompts
USER_PROMPT: "^> "
AI_PROMPT: "^>>>"
```

---

## Creating a New Cartridge

### 1. Create Directory

```bash
cd dooz-cartridges/cartridges
mkdir my-tool
cd my-tool
```

### 2. Create manifest.yaml

```yaml
name: my-tool
version: 1.0.0
description: Description of the tool

cli:
  command: my-tool
  args: []

ui:
  theme: auto

inputs:
  - type: text
    submit_key: enter

outputs:
  - pattern: "^Error:"
    type: error
    display: notification
```

### 3. Create grammar.txt

```
# Basic patterns
PROMPT: "^> "
ERROR: "^Error:"
SUCCESS: "^Success:"
```

### 4. Add icon.svg

Standard 24x24 SVG icon.

### 5. Document in README.md

```markdown
# My Tool Cartridge

## Requirements
- my-tool CLI installed

## Features
- Feature 1
- Feature 2

## Usage
Describe how to use this cartridge.
```

---

## UI Features

### Available Components

| Feature | Description |
|---------|-------------|
| `file_tree` | Show file browser |
| `diff_view` | Display diffs |
| `token_counter` | Show token usage |
| `history` | Command history |
| `output_panel` | Formatted output |
| `status_bar` | Status indicators |

### Input Types

| Type | Description |
|------|-------------|
| `text` | Single line input |
| `multiline` | Multi-line input |
| `file_drop` | Drag and drop files |
| `button` | Action button |

### Output Types

| Type | Behavior |
|------|----------|
| `status` | Update status display |
| `prompt` | Move focus to input |
| `notification` | Show notification |
| `error` | Display error state |
| `code` | Syntax highlight |

---

## Testing Cartridges

### Local Testing

```bash
cd dooz-bridge
bun run dev

# Load cartridge from local path
# Settings → Cartridges → Add Local → path/to/cartridge
```

### Validation

```bash
cd dooz-cartridges
./scripts/validate.sh cartridges/my-tool
```

Checks:
- Manifest is valid YAML
- Required fields present
- Grammar syntax correct
- Icon exists and is valid SVG

---

## Publishing

1. Submit PR to `dooz-cartridges`
2. Include screenshot/demo
3. Pass validation checks
4. Get review approval

Cartridges are bundled with Dooz Pilot releases.

---

## Best Practices

1. **Minimal grammar** — Only parse what you need to display
2. **Sensible defaults** — Work out of the box
3. **Document requirements** — State CLI prerequisites
4. **Test edge cases** — Handle errors gracefully
5. **Match CLI version** — Specify compatible versions
