# Schema City

> SQL Schema Parser and Visualization Tool

---

## Overview

Schema City is a web-based tool for parsing SQL schemas, visualizing database structures, and understanding foreign key relationships.

```
┌──────────────────────────────────────────────────────────────┐
│                      SCHEMA CITY                             │
├──────────────────────────────────────────────────────────────┤
│  📝 SQL Parsing          │  🔗 Foreign Key Visualization     │
│  📊 Schema Graphs        │  🗄️ Database Structure Analysis  │
│  🔍 Relationship Mapping │  📈 Row Count Estimates           │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **SQL Parsing** | Extract CREATE TABLE statements |
| **Column Parsing** | Extract column names, types, constraints |
| **Primary Key Detection** | Identify PRIMARY KEY constraints |
| **Foreign Key Relationships** | Parse FOREIGN KEY with REFERENCES |
| **Comment Handling** | Remove SQL comments (-- and /* */) |
| **Graph Visualization** | Visualize schema relationships |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, TypeScript |
| **Build** | Vite |
| **Styling** | Tailwind CSS |
| **Testing** | Custom test suite |

---

## Core Interfaces

```typescript
interface Node {
  id: string;
  name: string;
  columns: Column[];
  rowCountEstimate?: number;
}

interface Link {
  source: string;
  target: string;
  sourceColumn: string;
  targetColumn: string;
}

interface Graph {
  nodes: Node[];
  links: Link[];
}
```

---

## Documentation

| Document | Description |
|----------|-------------|
| `PARSER_IMPLEMENTATION.md` | Parser implementation details |
| `dummy_sql_dump.sql` | Sample SQL data |

---

## Project Structure

```
schema-city/
└── schema-city/
    ├── src/              # React application
    ├── dist/             # Built output
    ├── public/           # Static assets
    └── test_*.js         # Test files
```

---

*Repository: schema-city*
