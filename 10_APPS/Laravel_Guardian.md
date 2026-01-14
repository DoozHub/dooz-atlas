# Laravel Guardian

> VS Code Extension for Laravel Code Quality Enforcement and Static Analysis

---

## Overview

A comprehensive Laravel code quality enforcement and static code analysis tool for Visual Studio Code. Provides real-time analysis with multi-layer checks.

```
┌──────────────────────────────────────────────────────────────┐
│                   LARAVEL GUARDIAN                           │
├──────────────────────────────────────────────────────────────┤
│  🔍 Real-Time Analysis    │  🛡️ Security Scanning            │
│  📝 Syntax Validation     │  ⚡ Performance Detection         │
│  🎯 Laravel Patterns      │  📊 Quality Reports               │
│  🔧 VS Code Extension     │  ⚙️ Configurable Rules            │
└──────────────────────────────────────────────────────────────┘
```

---

## Analysis Types

### 1. Syntax Analysis
- PHP syntax validation
- Missing semicolons detection
- Unclosed tags identification
- Basic parsing error detection

### 2. Pattern Verification

| Pattern | Checks |
|---------|--------|
| **Model** | HasFactory, $fillable/$guarded, timestamps |
| **Controller** | RESTful naming, FormRequest, public methods |
| **Middleware** | Interface implementation, handle method |
| **Service** | Interface injection, dependency injection |
| **Route** | Naming conventions, path validation |

### 3. Logic Analysis
- N+1 query detection
- Inefficient database queries
- Code logic flow validation
- Performance bottleneck detection

### 4. Security Analysis
- SQL injection vulnerabilities
- XSS vulnerabilities
- CSRF protection validation
- Input sanitization checks

### 5. Naming Conventions
- Class naming (PascalCase)
- Method naming (snake_case)
- Variable naming standards

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Extension** | TypeScript, VS Code API |
| **Build** | VS Code extension build tools |
| **Testing** | Custom PHP test samples |

---

## Features

| Feature | Description |
|---------|-------------|
| **Real-time Analysis** | Automatic analysis on file save |
| **Multi-layer Analysis** | Syntax, pattern, logic, security, performance |
| **Activity Bar Integration** | Dedicated panel for monitoring |
| **Configurable Settings** | Customizable rules and severity levels |
| **Export Capabilities** | Generate quality reports |

---

## Documentation

| Document | Description |
|----------|-------------|
| `README.md` | Installation and usage |
| `DEBUGGING_ANALYSIS.md` | Debug information |
| `DEBUG_SETUP.md` | Debug setup guide |
| `DEBUG_LARAVEL_PROJECT.md` | Laravel debugging |
| `TREE_PROVIDER_FIX.md` | Tree provider fixes |
| `DEVELOPMENT.md` | Development guide |
| `ALTERNATIVE_SETUP.md` | Alternative setup options |

---

## Project Structure

```
laravel-guardian/
├── src/              # TypeScript extension code
├── media/            # Extension assets
├── out/              # Compiled output
├── test-sample.php   # PHP test samples
├── package.json      # Extension config
└── laravel-guardian-*.vsix  # Built extension
```

---

*Repository: laravel-guardian*
