# Dooz Intent Language (DIL)

> 🚀 DIL (Dooz Intent Language) Transpiler — Transform business logic into clean, maintainable code

---

## Overview

DIL (Dooz Intent Language) is a powerful transpiler that converts human-readable business intent declarations into production-ready PHP/Laravel code.

```
┌──────────────────────────────────────────────────────────────┐
│                   DOOZ INTENT LANGUAGE                       │
├──────────────────────────────────────────────────────────────┤
│  🎯 Intent-Driven        │  🔒 Security First                │
│  🏗️ Laravel Native       │  ⚡ Developer Friendly             │
│  🧪 Test Ready           │  📦 Multi-Platform Emitters       │
└──────────────────────────────────────────────────────────────┘
```

---

## Why DIL?

- **🎯 Intent-Driven**: Express business logic in clear, readable intents
- **🔒 Security First**: Built-in authorization gates and validation
- **🏗️ Laravel Native**: Generates PSR-12 compliant Laravel services
- **⚡ Developer Friendly**: Reduce boilerplate, focus on business value
- **🧪 Test Ready**: Comprehensive property-based testing included

---

## Quick Start (5 minutes)

### 1. Install via Composer

```bash
composer require doozie/dil-transpiler
```

### 2. Create your first DIL intent

Create `intents/user-auth.dil`:

```dil
intent AuthenticateUser(email: string, password: string) {
    # Validate input
    gate ValidateCredentials(email, password)
    
    # Find user
    bridge user = UserService.findByEmail(email)
    
    # Verify password
    bridge isValid = AuthService.verifyPassword(user, password)
    
    if (isValid) {
        bridge token = TokenService.generate(user)
        return token
    }
    
    return error("Invalid credentials")
}
```

### 3. Compile to Laravel code

```bash
php artisan dil:compile intents/user-auth.dil
```

---

## DIL Language Features

### Intent Declarations

```dil
intent ProcessPayment(userId: int, amount: int) {
    # Your business logic here
}
```

### Security Gates

```dil
gate AuthorizeUser(userId)
gate CheckPermissions(userId, "payment_process")
```

### Service Bridges

```dil
bridge user = UserService.findById(userId)
bridge result = PaymentService.process(user, amount)
```

### Conditional Logic

```dil
if (user.isActive()) {
    bridge payment = PaymentService.charge(user, amount)
    return payment
}
return error("User not active")
```

### Error Handling

```dil
return error("Payment failed")
return success
```

---

## Architecture

DIL follows a clean, extensible compiler architecture:

```
DIL Source → Lexer → Parser → Validator → Emitter → Target Code
```

- **Lexer**: Tokenizes DIL syntax using robust patterns
- **Parser**: Builds immutable AST with recursive descent parsing
- **Validator**: Performs semantic analysis and type checking
- **Emitter**: Generates clean, PSR-12 compliant target code

---

## Roadmap

| Version | Status | Features |
|---------|--------|----------|
| v0.1 | ✅ | Core DIL transpiler with Laravel support |
| v0.2 | 🔄 | JavaScript/TypeScript emitter |
| v0.3 | 📋 | Go emitter and advanced patterns |
| v1.0 | 📋 | Production-ready with full ecosystem |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | PHP 8.3+ |
| **Framework** | Laravel 11+ |
| **Testing** | PHPUnit, Pest |
| **Static Analysis** | PHPStan |

---

## Documentation

- **[Language Reference](docs/language-reference.md)** - Complete DIL syntax guide
- **[Laravel Integration](docs/laravel-integration.md)** - Setup and usage in Laravel projects
- **[CLI Usage](docs/cli-usage.md)** - Command-line tools and options
- **[Advanced Usage](docs/advanced-usage.md)** - Custom emitters and advanced patterns
- **[Examples](examples/)** - Practical DIL examples and patterns

---

## Try DIL Online

**[🌐 DIL Playground](https://dil-playground.doozie.dev)** - Test DIL code in your browser with real-time compilation and examples.

---

## Related Documentation

- [Intent Language](../09_ECOSYSTEM/Intent_Language.md)
- [Dooz Core Integration](../09_ECOSYSTEM/Architecture.md)

---

*Repository: DoozHub/dil-transpiler*
