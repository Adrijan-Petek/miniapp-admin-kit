# MiniApp Admin Kit

A professional, full-stack admin panel template for managing mini-apps, built with Next.js, TypeScript, and Tailwind CSS. Features a stunning splash screen, comprehensive animation system, and complete customization options. Ready for Farcaster integration, wallet connect, and rapid mini-app development.

**Created by Adrijan Petek**

## ✨ Features

### 🎛️ Admin Panel
- **Dashboard**: Overview of treasury, announcements, rewards, and mini-apps with live stats
- **Announcements Manager**: Scrolling announcements with live preview, add/edit/delete, character limits
- **Level Rewards Manager**: Configure TOKEN rewards for levels 1-1000, visual grid, pending changes
- **Mini Apps Manager**: Manage your mini-app ecosystem with status toggles
- **Treasury Management**: ETH/ERC20 balances, withdrawals, admin controls, multi-token support
- **Leaderboard**: Sync with Farcaster profiles, credit rewards to top players
- **Menu Management**: Create admin-only menu items, custom navigation with icons
- **Settings**: Full theme customization (colors, fonts, logos), game parameters, access control, **splash screen configuration**, and **10 animation options**

### 🎨 Splash Screen System
- **Custom Logo Support**: Upload custom logo URLs with size options (Small/Medium/Large)
- **10 Professional Animations**: Choose from Bounce, Fade, Slide, Zoom, Rotate, Pulse, Shake, Flip, Glow, and Wave animations
- **Dynamic Branding**: App name, tagline, and version pulled from settings
- **Animation Speed Control**: Slow, Normal, and Fast animation speeds
- **Fallback System**: Graceful fallback to default emoji if custom logo fails to load

### 🎮 Game Management
- **Match-3 Game**: Play fees, booster prices (single/packs)
- **Card Game**: Play fees, win rewards
- **Daily Claim**: Base rewards, streak bonuses

### 🔗 Integrations Ready
- **Farcaster**: Profile sync, token metadata, auth kit
- **Wallet Connect**: Web3Modal integration
- **Ethereum**: Wagmi hooks for blockchain interactions
- **Smart Contracts**: Pre-configured mockup contract addresses for development

### 🎨 Professional UI
- Dark theme with customizable colors and fonts
- Responsive design with dropdowns and smooth transitions
- Emoji icons and professional layout
- Frontend edit mode for direct page customization
- **Hidden Admin Access**: Secret 5-click logo trigger for admin panel
- Advanced settings panel with custom CSS/JS injection

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

3. **Set up Supabase Database**
   ```bash
   # Create a new Supabase project at https://supabase.com

   # Copy the database schema
   # Go to your Supabase dashboard > SQL Editor
   # Run the contents of database-schema.sql
   ```

4. **Set environment variables**
   Create `.env.local`:
   ```bash
   # Admin Authentication
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="your-secure-password"
   ADMIN_JWT_SECRET="your-long-random-jwt-secret"

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Access the app**
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

### Splash Screen Configuration
- **Logo Settings**: Custom logo URL and size selection (Small/Medium/Large)
- **Animation Selection**: Choose from 10 professional animations (Bounce, Fade, Slide, Zoom, Rotate, Pulse, Shake, Flip, Glow, Wave)
- **Animation Speed**: Control animation timing (Slow/Normal/Fast)
- **Branding**: Dynamic app name, tagline, and version display

### Game Settings
- Match-3: Play fees, booster prices
- Card Game: Play fees, win rewards
- Daily Claim: Base rewards, streak bonuses

### Advanced Settings
- Custom CSS injection for theme customization
- Custom JavaScript for extended functionality
- Animation enable/disable toggle
- Mockup contract addresses for development

## Hooks

The project includes reusable hooks for all data management:

- `useTreasury()`: Treasury balances and withdrawals
- `useAnnouncements()`: Announcement management
- `useLevelRewards()`: Level reward configuration
- `useLeaderboard()`: Leaderboard and rewards
- `useTokenManagement()`: Multi-token support
- `useAdminManagement()`: Admin controls
- `useSettings()`: **Enhanced theme and app settings including splash screen configuration**
- `useGameSettings()`: Game parameters
- `useMiniApps()`: Mini-app ecosystem management

### New Settings Properties

The `useSettings()` hook now includes comprehensive customization options:

```typescript
// Splash Screen
splashLogoUrl: string          // Custom logo URL
splashLogoSize: 'small' | 'medium' | 'large'  // Logo display size
splashAnimation: string        // Selected animation type

// Animations
enableAnimations: boolean      // Global animation toggle
animationSpeed: 'slow' | 'normal' | 'fast'  // Animation timing

// Advanced
customCSS: string             // Custom CSS injection
customJS: string              // Custom JavaScript injection
```

## 🎭 Splash Screen & Animation Guide

### Setting Up Your Splash Screen

1. **Access Admin Settings**: Navigate to `/admin/settings` and scroll to the "Advanced Settings" section

2. **Configure Logo**:
   - Enter your logo URL in the "Logo URL" field
   - Choose logo size: Small (64px), Medium (96px), or Large (128px)
   - The system automatically falls back to a default emoji if the logo fails to load

3. **Choose Animation**:
   - Select from 10 professional animations:
     - 🎈 **Bounce**: Playful bouncing effect
     - 🌟 **Fade**: Smooth fade transitions
     - 📱 **Slide**: Elements slide from sides
     - 🔍 **Zoom**: Scale in/out effect
     - 🔄 **Rotate**: Spinning entrance
     - 💓 **Pulse**: Heartbeat pulsing
     - 🌊 **Shake**: Gentle shaking motion
     - 🎭 **Flip**: 3D flip animation
     - ✨ **Glow**: Glowing border effect
     - 🌊 **Wave**: Waving motion

4. **Animation Speed**: Choose Slow, Normal, or Fast timing

5. **Preview**: Changes apply immediately - refresh your main page to see the splash screen

### Animation System Details

- **Logo Animation**: Your custom logo uses the selected animation style
- **Loading Indicators**: Loading dots adapt to your animation choice
- **Progress Bar**: Respects your speed settings
- **Global Toggle**: Disable all animations if needed for accessibility

### Menu Management
- **Dynamic Menu Items**: Add/edit/delete custom menu items with titles, descriptions, and URLs
- **Admin-Only Visibility**: Create menu items that only appear for logged-in administrators
- **Icon Customization**: Use emoji icons for visual menu representation
- **Flexible Routing**: Support for internal paths and external URLs
- **Enable/Disable Toggle**: Control menu item visibility without deletion
- **Responsive Navigation**: Optimized display on desktop and mobile devices

### Advanced Menu Features
```typescript
// Menu items can be configured as admin-only
const adminMenuItem = {
  id: 'admin-panel',
  title: '⚙️ Admin Panel',
  description: 'Administrative controls',
  icon: '⚙️',
  url: '/admin',
  enabled: true,
  adminOnly: true  // Only visible to logged-in admins
}
```

### Branding Integration

The splash screen automatically pulls branding from your settings:
- **App Name**: From general app settings
- **Tagline**: From app description/tagline field
- **Version**: From app version setting
- **Colors**: Uses your theme colors for consistency

## API Integration

Wire the hooks to your backend APIs:

- Announcements: Connect to Upstash KV or database
- Rewards: Integrate with Treasury smart contracts
- Leaderboard: Sync with Farcaster profiles
- Tokens: ERC20 contract interactions

## Deployment

Deploy as a private admin panel with enhanced branding:

- **Vercel** (recommended) - Automatic deployments with preview URLs
- **Netlify** - CDN distribution with form handling
- **Railway** - Docker-based deployment with database support
- **Private URL access** - Restrict by IP/VPN/SSO
- **Custom domain** - White-label your admin panel

### Environment Setup

For production deployment, configure these environment variables:

```bash
# Authentication
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-secure-password"
ADMIN_JWT_SECRET="your-long-random-jwt-secret"

# Optional: Database connections (future feature)
DATABASE_URL="your-database-connection-string"

# Optional: External services
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Splash Screen in Production

- Logo images should be hosted on a CDN for optimal loading
- Test animations across different devices and browsers
- Consider animation duration based on your target audience
- Use WebP format for logos when possible for better compression

## 📄 License

MIT – Professional mini-app admin template with advanced splash screen and animation system. Perfect for building branded admin panels for gaming ecosystems, DeFi platforms, and Web3 applications.

**Created by Adrijan Petek**

---

## 🎯 Quick Feature Reference

| Feature | Location | Description |
|---------|----------|-------------|
| Splash Screen | `/` | Customizable loading screen with animations |
| Logo Config | `/admin/settings` | Upload custom logos with size options |
| Animations | `/admin/settings` | 10 animation types with speed control |
| Theme Settings | `/admin/settings` | Complete UI customization |
| Game Management | `/admin/*` | Match-3, Card Game, Daily Claim configs |
| Treasury | `/admin/treasury` | Multi-token balance management |
| Announcements | `/admin/announcements` | Live scrolling announcements |
| Leaderboard | `/admin/leaderboard` | Player rankings and rewards |
| Mini Apps | `/admin/miniapps` | Ecosystem management |

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 🌟 What's New in v2.1.0

- ✨ **Splash Screen System**: Professional loading screen with custom logos
- 🎭 **10 Animation Types**: Comprehensive animation library
- 🎨 **Advanced Settings**: Enhanced admin configuration panel
- 🔧 **Custom CSS/JS**: Developer injection capabilities
- 📱 **Mobile Optimization**: Responsive animation system
- 🎯 **Branding Integration**: Dynamic app branding from settings
- ⚡ **Performance**: Optimized animations with 60fps performance
- 🛡️ **Error Handling**: Graceful fallbacks for failed resources

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

- **Hidden Admin Access**: Admin panel is completely hidden from regular users
- **Secret Login Trigger**: Click the main logo 5 times to reveal admin login modal
- **No Public Admin Links**: All visible admin access points removed for security
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

### Security Features
- **Stealth Mode**: Admin interface only accessible through secret trigger
- **Click Counter**: 5-click sequence required to access admin login
- **Modal Authentication**: Login happens in popup without page redirect
- **Automatic Reset**: Click counter resets after successful access or modal close

You can extend this to:

- Multiple admins
- Roles/permissions
- External OAuth/SSO
- IP allowlisting
- Time-based access restrictions

---

## 📂 Structure

```text
miniapp-admin-kit/
├─ app/
│  ├─ layout.tsx                 # Root layout
│  ├─ page.tsx                   # Redirects to /login or /admin
│  ├─ globals.css                # Tailwind + base styles
│  ├─ components/
│  │  ├─ HomePage.tsx            # Main page with splash screen
│  │  └─ SplashScreen.tsx        # Customizable splash screen component
│  ├─ lib/
│  │  ├─ auth.ts                 # JWT helpers (create/verify session token)
│  │  └─ hooks/                  # All data management hooks
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
│     ├─ miniapps/
│     │  └─ page.tsx             # Mini-app ecosystem manager
│     ├─ settings/
│     │  └─ page.tsx             # Enhanced settings with splash screen config
│     ├─ leaderboard/
│     │  └─ page.tsx             # Leaderboard management
│     ├─ treasury/
│     │  └─ page.tsx             # Treasury management
│     └─ pages/
│        └─ page.tsx             # Custom pages manager
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

The enhanced settings page now includes:

### Basic Settings
- Auth configuration and environment variables
- Theme customization (colors, fonts, logos)
- Game parameters and access controls

### Advanced Settings (New)
- **Splash Screen Configuration**:
  - Custom logo URL and size selection
  - Animation type selection (10 options)
  - Animation speed control
- **Animation Controls**:
  - Global animation enable/disable
  - Animation speed settings
- **Developer Options**:
  - Custom CSS injection
  - Custom JavaScript injection
- **Contract Addresses**: Mockup addresses for development

## 📋 Contracts Page

`/admin/contracts`

The dedicated contracts management page provides secure administration of blockchain contract addresses:

### Contract Categories
- **Core Contracts**: Treasury and Token contract addresses
- **Game Contracts**: Match-3, Card Game, and Daily Claim contracts
- **Status Monitoring**: Real-time contract status indicators
- **Validation Tools**: Contract address validation and testing

### Security Features
- **Admin-Only Access**: Only authenticated administrators can view/modify contracts
- **Input Validation**: Ethereum address format validation
- **Audit Trail**: Contract changes are logged for security
- **Backup Management**: Contract address backup and recovery options

### Integration Ready
- **API Endpoints**: Contract addresses exposed via secure admin APIs
- **Environment Variables**: Support for different network configurations
- **Multi-Network**: Support for mainnet, testnet, and custom networks

## 🚀 New Features Guide

### Splash Screen Customization

**First-Time User Experience:**
1. Visit your main page (`/`)
2. The splash screen appears for 3 seconds with your chosen animation
3. Main content loads with smooth transitions

**Admin Configuration:**
1. Go to `/admin/settings`
2. Scroll to "Advanced Settings" section
3. Configure logo, animation, and branding
4. Changes apply immediately

**Animation Types Explained:**
- **Bounce**: Energetic, playful entrance perfect for gaming apps
- **Fade**: Elegant, professional transition for business applications
- **Slide**: Modern, directional movement for dynamic brands
- **Zoom**: Dramatic scale effects for impactful presentations
- **Rotate**: Fun, spinning animation for creative projects
- **Pulse**: Subtle, breathing effect for calm, trustworthy feel
- **Shake**: Attention-grabbing motion for important announcements
- **Flip**: 3D perspective effect for innovative, tech-forward brands
- **Glow**: Magical, illuminated appearance for premium products
- **Wave**: Fluid, organic motion for nature or wellness apps

### Performance Considerations

- Animations are optimized for 60fps performance
- Custom logos are lazy-loaded with error fallbacks
- Settings are cached in localStorage for instant loading
- Build size remains optimized with tree-shaking

### Browser Compatibility

- Modern browsers with CSS animation support
- Graceful degradation for older browsers
- Mobile-optimized animations and touch interactions

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
