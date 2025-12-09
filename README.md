# MiniApp Admin Kit

A complete, minimal **admin panel starter** for mini apps / GameFi projects (like Joybit),
built with **Next.js 14 (App Router) + Tailwind CSS**.

This kit gives you:

- 🔐 Admin login (username + password from env)
- 📊 Protected `/admin` dashboard layout
- 📢 Announcements manager (for in-app/mini app messages)
- 🎁 Rewards batch editor (for Treasury / contract payouts)
- ⚙️ Settings page explaining how to wire into your own backend
- ✅ GitHub Actions workflow for build checks

It is intentionally backend-agnostic: you plug in your own APIs, DB, or smart
contract calls behind it.

> ⚠️ This is a starter kit. Auth is **simple** (single admin user, JWT cookie).
> For production, you should harden it (rate limiting, stronger secrets, SSO, etc.).

---

## 🛠 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [jose](https://github.com/panva/jose) for JWT signing / verification

---

## 🚀 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```bash
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="super-secure-password"
ADMIN_JWT_SECRET="change-this-to-a-long-random-string"
```

3. Run the dev server:

```bash
npm run dev
```

4. Open <http://localhost:3000> – you will be redirected to `/login`.

Log in with your `ADMIN_USERNAME` / `ADMIN_PASSWORD`.

---

## 🔐 Auth Model

- Single admin user (no registration)
- Credentials from environment:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
- On successful login, API `/api/login`:
  - Creates a signed JWT with `jose`
  - Stores it in an `HttpOnly` cookie `admin_session`
- Server components (e.g. `app/admin/layout.tsx`) verify the cookie:
  - If invalid or missing → redirect to `/login`
  - If valid → show admin UI with username in sidebar

You can extend this to:

- Multiple admins
- Roles/permissions
- External OAuth/SSO
- IP allowlisting

---

## 📂 Structure

```text
miniapp-admin-kit/
├─ app/
│  ├─ layout.tsx                 # Root layout
│  ├─ page.tsx                   # Redirects to /login or /admin
│  ├─ globals.css                # Tailwind + base styles
│  ├─ lib/
│  │  └─ auth.ts                 # JWT helpers (create/verify session token)
│  ├─ login/
│  │  └─ page.tsx                # Admin login screen
│  ├─ api/
│  │  ├─ login/route.ts          # POST /api/login
│  │  └─ me/route.ts             # GET /api/me (session status)
│  └─ admin/
│     ├─ layout.tsx              # Admin shell with sidebar
│     ├─ page.tsx                # Main dashboard
│     ├─ announcements/
│     │  └─ page.tsx             # Announcement manager UI (local state demo)
│     ├─ rewards/
│     │  └─ page.tsx             # Reward batch editor UI scaffold
│     └─ settings/
│        └─ page.tsx             # Auth/env + integration hints
├─ public/
├─ .github/
│  └─ workflows/
│     └─ ci.yml                  # Build workflow
├─ next.config.mjs
├─ package.json
├─ tsconfig.json
├─ tailwind.config.cjs
├─ postcss.config.cjs
└─ README.md
```

---

## 📢 Announcements Module

`/admin/announcements`

A simple UI that lets you:

- Create new announcement lines
- Toggle active/inactive
- Delete entries

In this starter, data is stored in **React state only**. To make it real:

- Connect it to:
  - Upstash KV
  - Redis
  - PostgreSQL
  - Any REST/GraphQL backend
- Then expose them to your mini app(s) via an API (e.g. `/api/announcements`).

---

## 🎁 Rewards Module

`/admin/rewards`

A visual editor for reward batches:

- Rows with:
  - Player address
  - Token symbol (e.g. JOYB, ADRIJAN)
  - Amount
- “Simulate submit” button that logs batch payload.

To wire into your actual system:

- POST the rows to your backend
- Backend calls:
  - Your Treasury contract (`batchDistributeRewards`)
  - Or `creditReward` for pending balances
- Optionally store history of reward batches in DB.

This is intentionally **off-chain** and **backend-agnostic**.

---

## ⚙️ Settings Page

`/admin/settings`

Documents:

- Which env vars are used for auth
- Ideas on how to integrate with:
  - Announcements storage
  - Reward distribution backend
  - Per-mini-app configs (Match-3, Card Game, Daily Claim)

You can extend this with switches, toggles, numeric fields tied to your backend.

---

## ✅ GitHub Actions

`.github/workflows/ci.yml` runs on push & PR:

- Install dependencies
- Run `npm run build`

You can extend it with:

- `npm run lint`
- E2E tests
- Deploy steps (e.g. to Vercel)

---

## 🛡️ Hardening Suggestions

For real production use:

- Use a long, random `ADMIN_JWT_SECRET`
- Never commit `.env.local` to Git
- Add rate limiting / brute-force protection for `/api/login`
- Restrict access via:
  - IP allowlist
  - VPN
  - Protected Vercel project / private URL
- Consider SSO (e.g. Okta, Auth0, custom OIDC provider)

---

## 📄 License

MIT – feel free to adapt this as the admin backbone for your Joybit / mini app ecosystem.
