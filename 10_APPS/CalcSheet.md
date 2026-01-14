# CalcSheet (excel-to-form)

> Transform Excel Spreadsheets into Smart Web Calculators

---

## Overview

Upload Excel files with formulas, get instant interactive web calculators. No coding required. Share with anyone.

```
┌──────────────────────────────────────────────────────────────┐
│                       CALCSHEET                             │
├──────────────────────────────────────────────────────────────┤
│  📤 Excel Upload         │  🧮 Formula Support               │
│  🔗 Share Anywhere       │  🎯 Goal Seek                     │
│  📊 Scenario Compare     │  🤖 AI Insights                   │
│  🌙 Dark Mode           │  👥 User Management               │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Upload & Convert** | Drop Excel files, get interactive calculators |
| **Formula Support** | SUM, IF, MIN, MAX, ROUND, arithmetic |
| **Share Anywhere** | Generate links, embed, QR codes |
| **Goal Seek** | Find input values for target outputs |
| **Scenario Compare** | Compare multiple scenarios side-by-side |
| **AI Insights** | Natural language explanations (Gemini/OpenRouter) |
| **Dark Mode** | Neo-Analog design with light/dark themes |
| **User Management** | Authentication, roles, permissions |
| **Audit Trail** | Track all actions and executions |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite |
| **Backend** | Node.js, TypeScript |
| **Database** | SQLite (dev), PostgreSQL (prod) |
| **AI** | Gemini, OpenRouter |
| **Deployment** | Docker, Docker Compose |

---

## Architecture

```
excel-to-form/
├── client/              # React frontend
├── src/                 # Backend code
├── storage/            # File storage
├── dist/               # Built output
├── docs/               # Documentation
├── docker-compose.yml  # Docker configuration
└── Dockerfile          # Container definition
```

---

## Quick Start

```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Create environment file
cp .env.example .env

# Seed superadmin user
npx tsx src/server/seed.ts

# Start development
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- API: http://localhost:3001

**Default Login:**
- Email: `admin@calcsheet.local`
- Password: `admin123`

---

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

---

*Repository: experiments/excel-to-form*
