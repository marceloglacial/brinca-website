# Brinca Website - Project Guidelines

This document provides architectural context, development workflows, and coding standards for the Brinca Website project.

## Project Overview
Brinca is a CMS-driven website built with **Next.js 16** and **Payload CMS 3.80** (Next.js App Router version). It is designed to be a bilingual platform supporting English (`en`) and Brazilian Portuguese (`pt-BR`).

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **CMS:** Payload CMS 3.80
- **Database:** MongoDB (via `@payloadcms/db-mongodb` / Mongoose)
- **Editor:** Lexical Rich Text Editor
- **Styling:** Standard CSS (see `src/app/(frontend)/[locale]/styles.css`)
- **Package Manager:** `pnpm`
- **Testing:** Vitest (Integration) and Playwright (E2E)

## Project Structure
- `src/app/`: Next.js App Router pages and layouts.
  - `(frontend)/[locale]/`: Public-facing website pages.
  - `(payload)/`: Payload CMS admin panel and API routes.
- `src/collections/`: Payload CMS collection schemas (`Users`, `Media`, `Pages`, `Events`).
- `src/components/`: Reusable React components.
  - `SlugProvider.tsx`: Context provider for managing localized slug mappings between languages.
  - `SiteHeader.tsx`: Contains the language switcher that uses `SlugProvider` to handle translated slugs.
- `src/lib/`: Core utility functions and third-party integrations (Cloudinary, Lexical, YouTube).
- `src/constants/`: Shared constants like `locales.ts`.
- `.agents/rules/`: **Critical Architecture Guidelines.** Detailed markdown files covering best practices for Payload collections, fields, hooks, access control, and more. Always consult these when modifying CMS logic.

## Commands & Workflows

### Development
- `pnpm dev`: Start the development server (Next.js + Payload).
- `pnpm devsafe`: Clean `.next` cache and start the dev server.
- `pnpm generate:types`: Generate TypeScript definitions from Payload collections into `src/payload-types.ts`. **Run this after any collection schema change.**
- `pnpm generate:importmap`: Regenerate the Payload import map for the admin panel.

### Testing
- `pnpm test`: Run all tests (Integration + E2E).
- `pnpm test:int`: Run Vitest integration tests (`tests/int/`).
- `pnpm test:e2e`: Run Playwright E2E tests (`tests/e2e/`).

### Building
- `pnpm build`: Create a production-ready Next.js build.
- `pnpm start`: Start the production server.

## Development Conventions

### Payload CMS
- **Collections:** Defined in `src/collections/`. Follow the patterns in `.agents/rules/collections.md`.
- **Access Control:** Implement granular permissions as described in `.agents/rules/access-control.md`.
- **Localization:** Use the `locale` parameter in Next.js routes and Payload's built-in localization features.
- **Rich Text:** Prefer the Lexical editor for content fields.

### Frontend
- **React 19:** Use modern React patterns, including Server Components where appropriate.
- **Localization:** Routes are prefixed with `[locale]`. Use the `LOCALES` constant for consistency.
- **Translated Slugs:** The `PageRoute` and `EventPageRoute` fetch all localized versions of a slug and pass them to `SiteHeader` via `SlugProvider` (using the `SetSlug` helper component). The values in `slugMap` should be the full path after the locale (e.g., `events/translated-slug` or just `translated-slug` for root pages). This ensures the language switcher correctly maps to the translated URL (e.g., `/en/about-us` to `/pt-BR/quem-somos` or `/en/events/gathering` to `/pt-BR/events/encontro`).
- **Components:** Place shared UI components in `src/components/` and follow the guidelines in `.agents/rules/components.md`.

### Code Quality
- **Type Safety:** Strictly use the generated `payload-types.ts`. Avoid `any`.
- **Environment Variables:** Document new variables in `.env.example`.
- **Testing:** New features or bug fixes should be accompanied by relevant tests in `tests/`.

## Important Rules
- **NEVER** commit secrets or API keys.
- **ALWAYS** check the specific guidelines in `.agents/rules/` before implementing new collections, hooks, or complex fields.
- **CONSISTENCY:** Adhere to the existing file structure and naming conventions (PascalCase for components/collections, camelCase for fields).
