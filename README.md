# MiniApp Admin Kit

A professional, full-stack admin panel template for managing mini-apps, built with Next.js, TypeScript, and Tailwind CSS. Ready for Farcaster integration, wallet connect, and rapid mini-app development.

**Created by Adrijan Petek**

## ✨ Features

### 🎛️ Admin Panel
- **Dashboard**: Overview of treasury, announcements, rewards, and mini-apps with live stats
- **Announcements Manager**: Scrolling announcements with live preview, add/edit/delete, character limits
- **Level Rewards Manager**: Configure TOKEN rewards for levels 1-1000, visual grid, pending changes
- **Mini Apps Manager**: Manage your mini-app ecosystem with status toggles
- **Treasury Management**: ETH/ERC20 balances, withdrawals, admin controls, multi-token support
- **Leaderboard**: Sync with Farcaster profiles, credit rewards to top players
- **Settings**: Full theme customization (colors, fonts, logos), game parameters, access control

### 🎮 Game Management
- **Match-3 Game**: Play fees, booster prices (single/packs)
- **Card Game**: Play fees, win rewards
- **Daily Claim**: Base rewards, streak bonuses

### 🔗 Integrations Ready
- **Farcaster**: Profile sync, token metadata, auth kit
- **Wallet Connect**: Web3Modal integration
- **Ethereum**: Wagmi hooks for blockchain interactions
- **Smart Contracts**: Pre-configured contract addresses

### 🎨 Professional UI
- Dark theme with customizable colors and fonts
- Responsive design with dropdowns and smooth transitions
- Emoji icons and professional layout
- Frontend edit mode for direct page customization

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adrijan-Petek/miniapp-admin-kit.git
   cd miniapp-admin-kit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   Create `.env.local`:
   ```bash
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="your-secure-password"
   ADMIN_JWT_SECRET="your-long-random-jwt-secret"
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Access the app**
   - Public page: `http://localhost:3000`
   - Admin login: Click "Admin Login" or go to `/login`
   - Default credentials: `admin` / `password`

## Configuration

### Auth Settings
- Single admin user authentication via JWT
- Environment-based credentials

### Theme Customization
- Color picker for theme color
- Font family selection
- Logo and background image URLs
- Admin access mode (owner/admins)
- Frontend edit mode toggle

### Game Settings
- Match-3: Play fees, booster prices
- Card Game: Play fees, win rewards
- Daily Claim: Base rewards, streak bonuses

## Hooks

The project includes reusable hooks for all data management:

- `useTreasury()`: Treasury balances and withdrawals
- `useAnnouncements()`: Announcement management
- `useLevelRewards()`: Level reward configuration
- `useLeaderboard()`: Leaderboard and rewards
- `useTokenManagement()`: Multi-token support
- `useAdminManagement()`: Admin controls
- `useSettings()`: Theme and app settings
- `useGameSettings()`: Game parameters

## API Integration

Wire the hooks to your backend APIs:

- Announcements: Connect to Upstash KV or database
- Rewards: Integrate with Treasury smart contracts
- Leaderboard: Sync with Farcaster profiles
- Tokens: ERC20 contract interactions

## Deployment

Deploy as a private admin panel:

- Vercel (recommended)
- Private URL access
- Restrict by IP/VPN/SSO

## License

Created by Adrijan Petek - Professional mini-app admin template

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
