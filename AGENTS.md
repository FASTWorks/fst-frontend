# FAST Frontend

**Stack**: React 19 + Vite 8 + React Router v7 + Tailwind CSS v4 + shadcn/ui (Radix)

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run lint` | ESLint (flat config, JS only) |
| `npm run preview` | Preview production build |

No test, typecheck, or CI infrastructure.

## Key conventions

- **No TypeScript** — all source is `.jsx`. `jsconfig.json` only provides `@/` path alias.
- **`@` alias** maps to `./src`. Always use `@/lib/utils`, `@/components/ui/button`, etc.
- **Tailwind v4 CSS-first** — no `tailwind.config.js`. Theme CSS variables live in `src/index.css` via `@theme inline`. Classes are applied directly.
- **`cn()` utility** in `@/lib/utils` (wraps `clsx` + `tailwind-merge`). Use it for conditional className merging.
- **shadcn/ui components** in `src/components/ui/`. They use Radix UI primitives + `cn()`. Add new ones with `npx shadcn@latest add <component>`.
- **Pages** are standalone `.jsx` files in `src/pages/`, re-exported from `src/pages/index.js`. Routes defined in `src/App.jsx`.
- **No test framework** installed. Do not add tests without confirmation.
- **axios** is a dependency but not wired into any page yet. All forms currently use `onSubmit={(e) => e.preventDefault()}`.
- **`src/components/layouts/index.js`** is an empty placeholder.

## Conventions
- Setiap Jawaban tolong kasih emote yang membara