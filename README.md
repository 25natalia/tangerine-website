# Tangerine Website

The official marketing website for **Tangerine Studio**.

This repository contains the public-facing experience of the studio: brand, philosophy, capabilities, portfolio, and contact experience. It is built with **Next.js 16** and consumes the **Tangerine Design System** through a disciplined synchronization workflow.

---

## About Tangerine Studio

Tangerine Studio is a multidisciplinary creative studio focused on building thoughtful digital products, visual identities, and meaningful experiences.

This website is the primary digital expression of the studio and serves as the canonical place for:

- Studio manifesto
- Capabilities
- Portfolio / Case Studies
- Contact
- Brand experience

---

# Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Base UI
- Framer Motion
- next-themes
- Lucide React

---

# Repository Structure

```text
app/
components/
content/
lib/
public/
styles/

DESIGN_SYSTEM_SYNC.md
README.md
```

The project follows the App Router architecture.

---

# Relationship with the Design System

This repository **does not own UI components**.

The single source of truth is:

> **tangerine-design-system**

This website consumes the Design System through controlled synchronization.

There is intentionally **no monorepo**, **no shared package**, and **no npm dependency** between both repositories.

Instead, components are explicitly ported.

---

# Synchronization Workflow

Every reusable component follows this process:

```
Need detected
        ↓
Search in Design System
        ↓
Exists?
        ↓
YES ----------------------→ Port to Website
        │
        │
NO
        ↓
Build inside Design System
        ↓
Review
        ↓
Merge
        ↓
Port to Website
```

---

# Golden Rules

## 1. The Design System is always the source of truth.

Never create reusable UI directly inside this repository.

---

## 2. Improvements happen in the Design System first.

If a component needs new behavior:

- update it in the Design System
- review it
- merge it
- port the updated version here

Never patch the local copy.

---

## 3. Ported components are vendorized.

Every synchronized file starts with:

```ts
// Ported from tangerine-design-system
// Commit: <sha>
// Date: <yyyy-mm-dd>
// Do not edit directly.
```

---

## 4. Synchronization is tracked.

Every imported artifact is documented in:

```
DESIGN_SYSTEM_SYNC.md
```

---

## 5. Local edits are limited.

Inside this repository you may change:

- component composition
- props
- page content
- layouts

You should **not** modify:

- internal component logic
- design tokens
- primitives
- accessibility behavior

Those belong to the Design System.

---

# Development

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

# Design Tokens

The website uses exactly the same design tokens as the Design System.

They are synchronized instead of recreated.

This includes:

- Colors
- Typography
- Radius
- Shadows
- Motion
- Spacing
- CSS Variables
- Dark Theme

---

# Content

Application content lives inside the repository.

Examples:

- Studio
- Capabilities
- Case Studies
- Portfolio
- Contact

The UI comes from the Design System.

The content belongs to this repository.

---

# Future Roadmap

The project is being built in incremental phases.

Current roadmap:

- Foundation
- Layout
- Home
- Studio
- Capabilities
- Work
- Contact
- SEO
- Performance
- Launch

---

# Contributing

Before implementing any reusable interface:

1. Check the Design System.
2. If it exists, port it.
3. If it doesn't exist, build it there first.
4. Synchronize it into this repository.
5. Update `DESIGN_SYSTEM_SYNC.md`.

---

# Related Repository

This project depends on the companion repository:

**Tangerine Design System**

The Design System owns:

- UI primitives
- Components
- Templates
- Tokens
- Motion
- Brand assets

The Website owns:

- Pages
- Routing
- Content
- Metadata
- Portfolio
- Business logic
- SEO

Both repositories evolve independently while remaining synchronized through the defined workflow.

---

Made with ❤️ by Tangerine Studio.
