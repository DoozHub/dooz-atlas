# PennyWise

> Python CLI finance tracker using Textual (TUI), SQLite, MVC pattern.

## Overview

PennyWise is a terminal-based personal finance tracking application built with Python. It provides a rich TUI (Text User Interface) for managing transactions, categories, and viewing financial summaries. The project follows the MVC architecture pattern and emphasizes test-driven development with 80% code coverage goals.

## Key Features

| Feature | Description |
|---------|-------------|
| TUI Interface | Rich terminal UI using Textual framework |
| Transaction Management | Add, edit, delete transactions with categories |
| Dashboard | Monthly summary with visual tables |
| Category Management | Create and organize transaction categories |
| Data Persistence | SQLite database for local storage |
| Input Validation | Robust validation for all user inputs |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Python 3.10+ |
| TUI Framework | Textual |
| Database | SQLite |
| Testing | pytest, pytest-cov |
| Project Management | pyproject.toml |

## Architecture

```
pennywise/
├── src/                  # Source code
├── tests/                # Test suite (80% coverage goal)
├── docs/                 # Documentation
└── AGENCY_STATE.md       # Project task tracking
```

### MVC Pattern

| Component | Responsibility |
|-----------|---------------|
| Model (src/models/) | Database schemas, CRUD operations |
| View (src/screens/) | TUI screens, dashboard, forms |
| Controller (src/controllers/) | Business logic, validation |

## Current Status

- **Phase**: 1 - Project Structure & Setup
- **Progress**: Project directory created, awaiting full implementation
- **Goals**: 80% test coverage, SQLite persistence, complete TUI

## Planned Screens

1. **Dashboard Screen** - Monthly summary table with totals
2. **Add Transaction Screen** - Form for new transactions
3. **Category Management Screen** - CRUD for categories
4. **Navigation** - Menu/sidebar for screen switching

## Development Phases

1. **Phase 1**: Project Structure & Setup
2. **Phase 2**: Database Layer (Model)
3. **Phase 3**: Business Logic (Controller)
4. **Phase 4**: TUI Components (View)
5. **Phase 5**: Integration & Polish

## Documentation Links

- Agency State: `AGENCY_STATE.md`
