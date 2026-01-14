# Task Loom

> Lightweight Task Management Specification

---

## Overview

Task Loom is a lightweight task management system for small teams, showcasing how ThinkLoom can handle structured items (tasks) with fields, updates, and exports.

```
┌──────────────────────────────────────────────────────────────┐
│                        TASK LOOM                             │
├──────────────────────────────────────────────────────────────┤
│  📝 Create Looms         │  ✅ Task Status Tracking           │
│  👤 Assignee Management  │  📊 Export Summaries              │
│  🏷️ Tags & Priority      │  💬 Natural Language Entry        │
│  📋 Kanban View          │  🔄 Status Transitions            │
└──────────────────────────────────────────────────────────────┘
```

---

## Core Features (MVP)

| Feature | Description |
|---------|-------------|
| **Create Loom** | Create task collections (e.g., "Sprint Backlog") |
| **Add Tasks** | Add tasks with title, status, assignee, notes |
| **Update Status** | Move tasks between statuses (To Do → In Progress → Done) |
| **View Tasks** | Display tasks grouped by status (mini Kanban) |
| **Export Summary** | Generate status summary documents |

---

## Stretch Features

| Feature | Description |
|---------|-------------|
| **Natural Language Entry** | "Add task for Tarique to set up database by Friday" |
| **Tags & Priority** | Lightweight metadata fields |

---

## Task Structure

```typescript
interface Task {
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignee: string;
  notes: string;
  tags?: string[];
  priority?: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
}
```

---

## Documentation

| Document | Description |
|----------|-------------|
| `spec.md` | Feature specification |
| `data-model.md` | Data model design |
| `plan.md` | Implementation plan |
| `research.md` | Research notes |
| `tasks.md` | Task breakdown |
| `quickstart.md` | Quick start guide |

---

## Project Structure

```
task_loom/
└── specs/
    └── 001-taskloom-lightweight-task/
        ├── spec.md
        ├── data-model.md
        ├── plan.md
        ├── research.md
        ├── tasks.md
        ├── quickstart.md
        └── contracts/
```

---

*Repository: task_loom*
