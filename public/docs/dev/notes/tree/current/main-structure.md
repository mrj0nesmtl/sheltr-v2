# 🌳 SHELTR Main Structure
*Generated: 2025-01-15 17:39:18*
\n## Directory Structure
.
├── public
│   ├── content
│   │   └── whitepaper
│   ├── docs
│   │   ├── about
│   │   ├── archives
│   │   ├── core
│   │   ├── dev
│   │   ├── guides
│   │   ├── project
│   │   ├── reference
│   │   └── technical
│   ├── images
│   │   ├── backgrounds
│   │   ├── apple-touch-icon.png
│   │   ├── favicon.ico
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   ├── icon-blk.svg
│   │   ├── icon.svg
│   │   ├── logo.svg
│   │   └── og-image.jpg
│   ├── analyze.html
│   ├── index.html
│   ├── manifest.json
│   └── stats.html
├── scripts
│   ├── analyze-errors.js
│   ├── archive-docs.ts
│   ├── backup.js
│   ├── cleanup.js
│   ├── detailed-error-analysis.js
│   ├── export-structure.sh
│   ├── increment-version.js
│   ├── migrate-docs.sh
│   ├── optimize-build.js
│   ├── type-check.js
│   ├── update-docs.ts
│   └── update-types.js
├── src
│   ├── auth
│   │   ├── components
│   │   ├── guards
│   │   ├── schemas
│   │   ├── stores
│   │   ├── types
│   │   └── types.ts
│   ├── components
│   │   ├── About
│   │   ├── Admin
│   │   ├── Auth
│   │   ├── Blockchain
│   │   ├── Blog
│   │   ├── Contact
│   │   ├── CustomerSupport
│   │   ├── Dashboard
│   │   ├── Documentation
│   │   ├── DonationForm
│   │   ├── ErrorBoundary
│   │   ├── Footer
│   │   ├── Header
│   │   ├── Hero
│   │   ├── HowItWorks
│   │   ├── Layout
│   │   ├── Legal
│   │   ├── Navigation
│   │   ├── Podcast
│   │   ├── Profile
│   │   ├── QRScanner
│   │   ├── SEO
│   │   ├── Settings
│   │   ├── Sidebar
│   │   ├── ThankYou
│   │   ├── Token
│   │   ├── Transactions
│   │   ├── UserBadge
│   │   ├── Verify
│   │   ├── charts
│   │   ├── layouts
│   │   ├── metrics
│   │   ├── shared
│   │   ├── ui
│   │   ├── ErrorBoundary.tsx
│   │   ├── Hero.tsx
│   │   ├── Logo.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── ThemeToggle.tsx
│   ├── config
│   │   ├── deployment.ts
│   │   ├── docs.ts
│   │   └── environment.ts
│   ├── constants
│   │   └── podcast.ts
│   ├── content
│   │   ├── intro
│   │   ├── project
│   │   ├── technical
│   │   └── whitepaper
│   ├── contexts
│   │   └── ThemeContext.tsx
│   ├── features
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── donor
│   │   ├── profile
│   │   └── shared
│   ├── hooks
│   │   ├── useAlerts.ts
│   │   ├── useAuth.ts
│   │   ├── useGeolocation.ts
│   │   ├── useMarkdownContent.ts
│   │   ├── useNavigation.ts
│   │   └── useWhitepaper.ts
│   ├── layouts
│   │   ├── base
│   │   ├── components
│   │   ├── dashboard
│   │   ├── PageLayout.tsx
│   │   ├── index.ts
│   │   └── types.ts
│   ├── lib
│   │   ├── api
│   │   ├── auth
│   │   ├── config
│   │   ├── content
│   │   ├── email
│   │   ├── i18n
│   │   ├── navigation
│   │   ├── scripts
│   │   ├── sentry
│   │   ├── services
│   │   ├── storage
│   │   ├── supabase
│   │   ├── types
│   │   ├── utils
│   │   ├── validation
│   │   ├── validations
│   │   ├── auth-schema.sql
│   │   ├── complete-schema.sql
│   │   ├── database.types.ts
│   │   ├── docs-parser.ts
│   │   ├── icons.ts
│   │   ├── schema.sql
│   │   ├── theme.ts
│   │   └── utils.ts
│   ├── pages
│   │   ├── About
│   │   ├── Admin
│   │   ├── Donor
│   │   ├── ShelterAdmin
│   │   ├── SuperAdmin
│   │   ├── Wiki
│   │   ├── blockchain
│   │   ├── shelter
│   │   ├── HomePage.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Impact.tsx
│   │   ├── LoginPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── RegistrationConfirmation.tsx
│   │   ├── ScanDonatePage.tsx
│   │   ├── ShelterSignUp.tsx
│   │   ├── SignUpPage.tsx
│   │   ├── Solutions.tsx
│   │   ├── debug.tsx
│   │   └── index.ts
│   ├── routes
│   │   ├── blockchain
│   │   ├── AppRoutes.tsx
│   │   └── index.tsx
│   ├── services
│   │   ├── docs.service.ts
│   │   └── platformStatus.ts
│   ├── src
│   ├── stores
│   │   ├── donationStore.ts
│   │   ├── profileStore.ts
│   │   └── shelterStore.ts
│   ├── styles
│   │   ├── global.css
│   │   ├── globals.css
│   │   ├── reset.css
│   │   └── themes.css
│   ├── types
│   │   ├── auth
│   │   ├── core
│   │   ├── analytics.ts
│   │   ├── auth.ts
│   │   ├── docs.d.ts
│   │   ├── i18next.d.ts
│   │   ├── index.ts
│   │   ├── markdown.d.ts
│   │   └── ui.types.ts
│   ├── utils
│   │   └── markdown.ts
│   ├── App.tsx
│   ├── i18n.ts
│   ├── index.css
│   ├── main.tsx
│   ├── types.d.ts
│   └── vite-env.d.ts
├── supabase
│   ├── exports
│   │   ├── User and Organization Metadata Check.csv
│   │   ├── organizations_rows (1).csv
│   │   ├── organizations_rows.csv
│   │   └── profiles_rows.csv
│   ├── migrations
│   │   ├── 20240304_create_tables.sql
│   │   ├── 20240304_fix_search_path.sql
│   │   ├── 20240304_fix_super_admin.sql
│   │   └── 20240307_fix_super_admin_verification.sql
│   └── config.toml
├── README.md
├── eslint.config.js
├── index.html
├── layout_files.txt
├── package-lock.json
├── package.json
├── postcss.config.js
├── replit.dev.nix
├── replit.nix
├── server.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.tsbuildinfo
├── vercel.json
└── vite.config.ts

116 directories, 115 files
