# Brinca Website

Brinca is a multilingual website powered by **Payload CMS 3** and **Next.js 16**.

It includes a public frontend and a Payload admin for managing pages, events, calendars, and media.

## Stack

- Next.js 16 + React 19
- Payload CMS 3
- MongoDB (`@payloadcms/db-mongodb`)
- Lexical rich text (`@payloadcms/richtext-lexical`)
- Playwright + Vitest for testing

## Core Features

- Multilingual content (`en`, `pt-BR`) with localized fields
- Dynamic content collections:
  - `pages` (rich content, optional YouTube embed, CTA buttons, list toggles)
  - `events` (date, localized description, optional Cloudinary gallery + Instagram embed)
  - `calendars` (date, localized description, optional Cloudinary gallery + Instagram embed)
  - `media` (uploads with localized alt text)
  - `users` (Payload auth)
- Locale-aware routing and slug switching
- Public API endpoint for navbar pages (`/api/public/pages?locale=<locale>`)

## Local Development

### 1) Prerequisites

- Node.js `^18.20.2 || >=20.9.0`
- pnpm `^9 || ^10`
- MongoDB

### 2) Environment Variables

Create a `.env` file in the project root:

```bash
PAYLOAD_SECRET=replace-with-a-long-random-secret
DATABASE_URL=mongodb://127.0.0.1/brinca

# Required only if you use Cloudinary gallery fields
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3) Install and run

```bash
pnpm install
pnpm dev
```

Open:

- Frontend: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

On first run, create your initial admin user in the Payload admin UI.

## Scripts

- `pnpm dev` – start development server
- `pnpm build` – production build
- `pnpm start` – run production server
- `pnpm lint` – run ESLint
- `pnpm generate:types` – regenerate Payload TypeScript types
- `pnpm generate:importmap` – regenerate Payload admin import map
- `pnpm test:int` – integration tests (Vitest)
- `pnpm test:e2e` – end-to-end tests (Playwright)
- `pnpm test` – run integration + e2e tests

## Docker (Optional)

Use Docker Compose for local development:

```bash
docker-compose up
```

The compose setup starts:

- `payload` service on port `3000`
- `mongo` service on port `27017`

Make sure `DATABASE_URL` in `.env` points to MongoDB in the compose network when using containers (for example `mongodb://mongo/brinca`).

## Project Notes

- Payload config lives in `src/payload.config.ts`
- Generated types are in `src/payload-types.ts`
- Frontend routes are under `src/app/(frontend)/[locale]`
- Payload admin and API routes are under `src/app/(payload)`
