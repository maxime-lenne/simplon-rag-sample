# Frontend

SvelteKit + Tailwind v4 chat UI for the RAG sample. Built as a static SPA via `@sveltejs/adapter-static`.

## Prerequisites

- [Bun](https://bun.sh) >= 1.1
- The API running locally (see `../api/README.md`)

## Setup

````bash
cd frontend
cp .env.example .env   # adjust PUBLIC_API_URL if your API is not on :8000
bun install
````

## Commands

| Command | Description |
|---|---|
| `bun run dev` | Start the dev server on `http://localhost:5173` |
| `bun run build` | Produce a static build in `build/` |
| `bun run preview` | Preview the production build on `http://localhost:4173` |
| `bun run test` | Run Vitest unit/component tests |
| `bun run lint` | Run Prettier + ESLint |
| `bun run format` | Apply Prettier formatting |
| `bun run check` | Type-check with `svelte-check` |

## Configuration

| Env var | Default | Purpose |
|---|---|---|
| `PUBLIC_API_URL` | `http://localhost:8000` | Base URL of the FastAPI backend |

The browser calls the API directly. The API must enable CORS for `http://localhost:5173`
(already configured in `api/src/rag/api/app.py`).

## Stack

- SvelteKit 2 / Svelte 5 (runes)
- Tailwind CSS v4 (CSS-first theme in `src/app.css`)
- TypeScript (strict)
- Vitest + `@testing-library/svelte` + jsdom
- ESLint + Prettier
- `marked` + `DOMPurify` for Markdown rendering
