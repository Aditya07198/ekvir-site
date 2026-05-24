# EKVIR — Precision Talent. Real Results.

EKVIR is a recruitment and staffing platform serving MSMEs, startups, and founder-led businesses across Gujarat and beyond. This repository is the full-stack monorepo that powers the public website, lead capture system, and admin dashboard.

> **Founded:** 2023 · **Location:** Karelibaug, Vadodara, Gujarat · **Contact:** contact@ekvir.in · +91 9904044439

---

## About EKVIR

Gujarat's growing businesses deserve more than a transactional recruiter. EKVIR was set up in Vadodara to serve the region's manufacturers, real estate developers, renewable energy companies, and ambitious startups with the same rigour that large enterprises expect from their talent partners.

**Mission:** To be Gujarat's most trusted recruitment partner for MSMEs and founder-led businesses — delivering talent that moves the needle, not just fills the seat.

**Values:**
- **Precision over volume** — fewer, better candidates, not a pile of profiles
- **Transparent process** — you always know where every mandate stands
- **Skin in the game** — our reputation rides on every placement
- **Long-term partnerships** — we measure success in years, not invoices

---

## Services

| Service | Description |
|---|---|
| **Permanent Staffing** | End-to-end hiring for long-term workforce needs, from sourcing to 90-day post-placement follow-up |
| **Contract Staffing** | Flexible workforce on our payroll — we handle PF, ESIC, compliance, and rapid mobilisation |
| **Executive Search** | Confidential search for CXO, leadership, and senior management roles |
| **Payroll & Compliance** | Managed payroll processing — salary, filings, Form 16, and audit-ready records |

## Industries Served

Manufacturing · Solar & Renewables · Real Estate · Finance & Accounts · Operations · Sales

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS v4 |
| Backend | Express 5, Node.js 22, TypeScript |
| Database | MongoDB Atlas, Mongoose 8 |
| Auth | JWT (admin + users), Google OAuth (SSO) |
| Monorepo | Turborepo, pnpm workspaces |
| Deployment | Vercel (web + api as separate projects) |

---

## Repository Structure

```
ekvir-site/
├── apps/
│   ├── web/          # Next.js 15 — public website + admin dashboard
│   └── api/          # Express 5 — REST API (port 5000)
├── packages/
│   ├── ui/           # Shared React component library (Button, Card, Badge, Input, Textarea)
│   ├── config/       # Site constants, design tokens, Tailwind preset
│   └── db/           # Mongoose models (Lead, User) + connectDB
├── assets/           # Brand assets (logo, etc.)
├── turbo.json        # Turborepo pipeline config
└── pnpm-workspace.yaml
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9

```bash
npm install -g pnpm
```

### Install dependencies

```bash
pnpm install
```

### Environment variables

Copy the example files and fill in your values:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

**`apps/api/.env`**

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ekvir
JWT_SECRET=<random-64-char-hex>
GOOGLE_CLIENT_ID=<your-google-client-id>.apps.googleusercontent.com
ALLOWED_ORIGINS=http://localhost:3000
```

**`apps/web/.env.local`**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WHATSAPP=9904044439
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-client-id>.apps.googleusercontent.com
```

---

## Running Locally

From the repo root (starts both apps via Turborepo):

```bash
pnpm dev
```

Or in separate terminals:

```bash
# Terminal 1 — API (http://localhost:5000)
cd apps/api && pnpm dev

# Terminal 2 — Web (http://localhost:3000)
cd apps/web && pnpm dev
```

---

## Scripts

Run from the **repo root**:

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps in parallel (Turborepo TUI) |
| `pnpm build` | Build all apps and packages |
| `pnpm typecheck` | TypeScript check across all workspaces |
| `pnpm lint` | Lint all packages |
| `pnpm clean` | Remove build artifacts |

Run from **`apps/api`**:

| Command | Description |
|---|---|
| `pnpm dev` | Start API with hot reload (`tsx watch`) |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm seed` | Seed initial admin users into MongoDB |

---

## Seeding Admin Users

After configuring your `.env`, run once to create the default admin accounts:

```bash
cd apps/api && pnpm seed
```

| Role | Email | Default Password |
|---|---|---|
| `superadmin` | superadmin@ekvir.in | SuperAdmin_Ekvir24 |
| `admin` | admin@ekvir.in | Admin_Ekvir24 |

> Change these passwords immediately after first login.

---

## Public Routes

| Route | Description |
|---|---|
| `/` | Homepage — hero, services snapshot |
| `/services` | All services overview |
| `/services/[slug]` | Service detail page |
| `/industries` | Industries overview |
| `/industries/[slug]` | Industry detail page |
| `/about` | About EKVIR — story, values, team |
| `/contact` | Contact form (captures leads) |
| `/blog` | Blog (coming soon) |
| `/login` | User login (email + Google SSO) |
| `/signup` | User registration |

## Admin Routes

| Route | Description |
|---|---|
| `/admin/login` | Admin sign-in |
| `/admin` | Lead dashboard — view, filter, update status |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | — | Health check |
| `POST` | `/api/auth/signup` | — | Register user |
| `POST` | `/api/auth/login` | — | Login (email/password) |
| `POST` | `/api/auth/google` | — | Login / register via Google ID token |
| `POST` | `/api/leads` | — | Submit contact form lead |
| `GET` | `/api/leads` | JWT | List leads (paginated, filterable by status) |
| `PATCH` | `/api/leads/:id/status` | JWT | Update lead status |

### Lead Status Flow

```
new → contacted → qualified → hired
                ↘ rejected
```

---

## Deployment (Vercel)

The repo deploys as **two separate Vercel projects** pointing to the same GitHub repository.

| Project | Root Directory | Framework |
|---|---|---|
| ekvir-api | `apps/api` | Other (uses `vercel.json`) |
| ekvir-web | `apps/web` | Next.js |

**Deploy order:** API first → copy its production URL → set as `NEXT_PUBLIC_API_URL` in the web project environment.

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Background | `#F7F5EF` | Page background (warm off-white) |
| Primary text | `#2B2B2B` | Body copy, headings |
| Accent gold | `#C2A96A` | CTAs, highlights, borders |
| Secondary text | `#8A8375` | Subtext, labels, captions |
| Dark | `#111111` | Dark sections, footer |
| Heading font | Cormorant Garamond | All headings (`font-heading`) |
| Body font | Manrope | All body copy (`font-body`) |

Tailwind v4 design tokens are defined via `@theme {}` in [apps/web/src/styles/globals.css](apps/web/src/styles/globals.css). There is no `tailwind.config.js`.

---

## Architecture Notes

- `packages/db` uses CommonJS (`Node16` module resolution). Do not import from `@ekvir/config` inside it — the circular dependency breaks the build.
- `apps/api` disables `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` to accommodate Mongoose 8 type overloads.
- CORS in development allows any `localhost` port dynamically. Production enforces the `ALLOWED_ORIGINS` env list.
- JWT auth uses `Bearer` tokens. The `requireAuth` middleware verifies the token and attaches `{ userId, role }` to `req.user`.
- The `packages/ui` component library is internal only — not published to npm.

---

## License

Private — All rights reserved. EKVIR © 2024.
