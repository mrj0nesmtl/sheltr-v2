# 🌳 SHELTR Project Structure
*Generated: 2025-01-09 18:15:44*
*Version: 0.4.9*

## Table of Contents
1. [Main Structure](#main-structure)
2. [Source Structure](#source-structure)
3. [Documentation Structure](#documentation-structure)
4. [Components Structure](#components-structure)
5. [Features Structure](#features-structure)
6. [Technical Structures](#technical-structures)

\n---\n
*Generated: 2025-01-09 18:15:44*
\n## Directory Structure
./src/auth
├── components
│   ├── AuthProvider.tsx
│   └── ProtectedRoute.tsx
├── guards
│   └── RoleGuard.tsx
├── schemas
│   ├── index.ts
│   └── validation.ts
├── stores
│   └── authStore.ts
├── types
│   └── auth.types.ts
└── types.ts

6 directories, 8 files
\n---\n
*Generated: 2025-01-09 18:15:43*
\n## Directory Structure
./src/components
├── About
│   ├── sections
│   │   ├── Checkpoint.tsx
│   │   ├── Introduction.tsx
│   │   ├── Roadmap.tsx
│   │   ├── TechStack.tsx
│   │   ├── Whitepaper.tsx
│   │   └── index.ts
│   ├── CallToAction.tsx
│   ├── Features.tsx
│   ├── MarkdownContent.tsx
│   ├── ProjectStatus.tsx
│   └── StatusCard.tsx
├── Admin
│   └── Shelters
│       └── ShelterList.tsx
├── Auth
│   ├── forms
│   │   ├── DonorSignUpForm.tsx
│   │   ├── ShelterRegistrationForm.tsx
│   │   └── index.ts
│   ├── AuthLayout.tsx
│   ├── LoginButton.tsx
│   ├── LoginForm.tsx
│   ├── RequireAuth.tsx
│   ├── SignUpForm.tsx
│   └── SignUpSelector.tsx
├── Blockchain
│   ├── Whitepaper
│   │   └── WhitepaperLayout.tsx
│   ├── BlockchainStats.tsx
│   ├── TransactionList.tsx
│   ├── WhitepaperPage.tsx
│   └── index.ts
├── Blog
│   ├── BlogEditor.tsx
│   ├── BlogList.tsx
│   └── BlogPost.tsx
├── Contact
│   └── ContactForm.tsx
├── CustomerSupport
│   ├── CustomerSupport.tsx
│   └── index.ts
├── Documentation
│   ├── components
│   │   ├── DocViewer.tsx
│   │   ├── DocumentHub.tsx
│   │   ├── DocumentViewer.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── WhitepaperView.tsx
│   │   └── index.ts
│   ├── pages
│   │   └── WhitepaperPage.tsx
│   ├── MarkdownViewer.tsx
│   └── index.ts
├── DonationForm
│   └── DonationForm.tsx
├── ErrorBoundary
│   ├── BaseErrorBoundary.tsx
│   ├── ShelterAdminErrorBoundary.tsx
│   └── index.ts
├── Footer
│   ├── Footer.tsx
│   └── index.ts
├── Header
│   └── Navigation.tsx
├── Hero
│   └── Hero.tsx
├── HowItWorks
│   └── index.ts
├── Layout
│   └── index.tsx
├── Legal
│   ├── PrivacyPolicy.tsx
│   └── TermsOfService.tsx
├── Navigation
│   ├── MobileNav.tsx
│   ├── Navigation.tsx
│   ├── UserNav.tsx
│   └── types.ts
├── Podcast
│   └── PodcastPreview.tsx
├── Profile
│   ├── ActivityLog.tsx
│   ├── AddFriend.tsx
│   ├── AdminFeatures.tsx
│   ├── BaseProfile.tsx
│   ├── DonorFeatures.tsx
│   ├── FriendActivity.tsx
│   ├── ImageCropModal.tsx
│   ├── ImageUpload.tsx
│   ├── RoleSpecificInfo.tsx
│   ├── SocialLinks.tsx
│   └── index.ts
├── QRScanner
│   ├── QRScanner.tsx
│   └── QRScannerLoading.tsx
├── SEO
│   └── MetaTags.tsx
├── Settings
│   └── BaseSettings.tsx
├── Sidebar
├── ThankYou
│   └── ThankYou.tsx
├── Token
│   ├── TokenCard.tsx
│   └── TokenPage.tsx
├── Transactions
│   ├── TransactionList.tsx
│   └── TransactionRow.tsx
├── UserBadge
│   └── UserBadge.tsx
├── Verify
│   └── VerifyPage.tsx
├── charts
│   └── LineChart.tsx
├── layouts
│   └── index.ts
├── metrics
│   └── SystemStatus.tsx
├── shared
│   ├── analytics
│   │   ├── DetailedAnalytics.tsx
│   │   ├── SystemHealthMonitor.tsx
│   │   └── index.ts
│   └── ui
│       └── index.ts
├── ui
│   ├── Charts
│   │   ├── DonationAllocationPieChart.tsx
│   │   ├── MapComponent.tsx
│   │   ├── NetworkActivityChart.tsx
│   │   └── index.ts
│   ├── Accordion.tsx
│   ├── Avatar.tsx
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Checkbox.tsx
│   ├── CustomIcons.tsx
│   ├── FeatureCard.tsx
│   ├── FileUpload.tsx
│   ├── FullContentModal.tsx
│   ├── Icon.tsx
│   ├── ImageUpload.tsx
│   ├── Input.tsx
│   ├── LanguageToggle.tsx
│   ├── LoadingOverlay.tsx
│   ├── LoadingSpinner.tsx
│   ├── Logo.tsx
│   ├── MetricCard.tsx
│   ├── NavLink.tsx
│   ├── PageBackground.tsx
│   ├── ProfileMenu.tsx
│   ├── QRCode.tsx
│   ├── Select.tsx
│   ├── SignOutButton.tsx
│   ├── Table.tsx
│   ├── Textarea.tsx
│   ├── Toast.tsx
│   ├── Toaster.tsx
│   └── index.ts
├── ErrorBoundary.tsx
├── Hero.tsx
├── Logo.tsx
├── ScrollToTop.tsx
└── ThemeToggle.tsx

43 directories, 125 files
\n---\n
*Generated: 2025-01-09 18:15:43*
\n## Directory Structure
./public/docs
├── about
│   └── whitepaper_final.md
├── archives
│   ├── changelogs
│   └── project_backup
│       ├── dec15-restructure.md
│       └── status_report.md
├── core
│   ├── README.md
│   ├── api.md
│   ├── architecture.md
│   ├── rbac.md
│   ├── security.md
│   └── technical.md
├── dev
│   ├── notes
│   │   └── tree
│   │       ├── archive
│   │       └── current
│   └── prompt.md
├── guides
│   ├── best-practices.md
│   ├── buildout_implementation.md
│   ├── debugging.md
│   └── deployment.md
├── project
│   ├── changelog.md
│   ├── checkpoint.md
│   ├── roadmap.md
│   └── status_report.md
├── reference
│   ├── analytics-components.md
│   ├── analytics-inventory.md
│   ├── components.md
│   ├── constants.md
│   └── types.md
└── technical
    ├── authentication.md
    ├── blockchain.md
    ├── build_track.md
    ├── database.md
    └── qr-system.md

15 directories, 28 files
\n---\n
*Generated: 2025-01-09 18:15:44*
\n## Directory Structure
./src/features
├── auth
│   ├── components
│   │   └── index.ts
│   ├── hooks
│   ├── store
│   ├── utils
│   └── index.ts
├── dashboard
│   ├── layouts
│   │   ├── participant
│   │   ├── shelter
│   │   ├── super-admin
│   │   ├── DashboardLayout.tsx
│   │   └── index.ts
│   ├── roles
│   │   ├── donor
│   │   │   ├── analytics
│   │   │   ├── components
│   │   │   ├── profile
│   │   │   ├── DonorDashboard.tsx
│   │   │   └── index.ts
│   │   ├── participant
│   │   │   ├── analytics
│   │   │   ├── components
│   │   │   ├── profile
│   │   │   ├── ParticipantDashboard.tsx
│   │   │   ├── ParticipantDetailAnalytics.tsx
│   │   │   └── index.ts
│   │   ├── shelter-admin
│   │   │   ├── analytics
│   │   │   ├── components
│   │   │   ├── management
│   │   │   ├── profile
│   │   │   ├── src
│   │   │   ├── ShelterAdminDashboard.tsx
│   │   │   └── index.ts
│   │   └── super-admin
│   │       ├── analytics
│   │       ├── components
│   │       ├── profile
│   │       ├── settings
│   │       ├── AlertsAndIncidents.tsx
│   │       ├── DonationAnalytics.tsx
│   │       ├── QuickStatCard.tsx
│   │       ├── ShelterPerformanceChart.tsx
│   │       ├── SuperAdminDashboard.tsx
│   │       ├── SystemHealthMonitor.tsx
│   │       └── index.ts
│   ├── shared
│   │   ├── analytics
│   │   │   ├── charts
│   │   │   ├── maps
│   │   │   ├── metrics
│   │   │   ├── DonationHistory.tsx
│   │   │   ├── DonorStats.tsx
│   │   │   ├── PlatformStatusSection.tsx
│   │   │   ├── clear
│   │   │   └── index.ts
│   │   ├── components
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── ParticipantLeaderboard.tsx
│   │   │   ├── ParticipantRegistrationModal.tsx
│   │   │   └── index.ts
│   │   ├── navigation
│   │   │   ├── sidebar
│   │   │   ├── DashboardNav.tsx
│   │   │   └── index.ts
│   │   ├── profile
│   │   │   ├── BaseProfile.tsx
│   │   │   ├── EditProfileModal.tsx
│   │   │   ├── ProfileLayout.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   └── index.ts
│   │   ├── widgets
│   │   │   ├── charts
│   │   │   ├── DonorLeaderboard.tsx
│   │   │   ├── ImpactMetrics.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── index.ts
│   │   └── types.ts
│   ├── store
│   ├── utils
│   └── index.ts
├── donor
│   ├── types
│   │   └── donor.ts
│   └── validation
│       └── donorValidation.ts
├── profile
│   ├── components
│   │   └── index.ts
│   ├── hooks
│   ├── store
│   ├── utils
│   └── index.ts
└── shared
    ├── analytics
    │   ├── charts
    │   │   ├── AreaChart.tsx
    │   │   ├── BarChart.tsx
    │   │   ├── LineChart.tsx
    │   │   ├── ProgressMetrics.tsx
    │   │   ├── ResourceUtilization.tsx
    │   │   └── index.ts
    │   ├── hooks
    │   │   └── useAnalytics.ts
    │   ├── maps
    │   │   └── DonationMap.tsx
    │   ├── metrics
    │   │   └── MetricCard.tsx
    │   ├── tables
    │   │   ├── ServiceHistory.tsx
    │   │   └── index.ts
    │   ├── types
    │   │   └── index.ts
    │   ├── utils
    │   │   └── theme.ts
    │   ├── DonationHistory.tsx
    │   ├── DonorStats.tsx
    │   ├── index.ts
    │   └── theme.ts
    ├── components
    │   └── index.ts
    ├── hooks
    ├── store
    ├── utils
    └── index.ts

65 directories, 63 files
\n---\n
*Generated: 2025-01-09 18:15:44*
\n## Directory Structure
./src/layouts
├── base
│   ├── Layout.tsx
│   └── PageLayout.tsx
├── components
│   └── Header.tsx
├── dashboard
│   ├── base
│   │   └── UnifiedDashboard.tsx
│   ├── navigation
│   │   └── DashboardNavigation.tsx
│   ├── roles
│   │   └── RoleRouter.tsx
│   └── shared
│       ├── analytics
│       └── DashboardShell.tsx
├── PageLayout.tsx
├── index.ts
└── types.ts

9 directories, 10 files
\n---\n
*Generated: 2025-01-09 18:15:43*
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
│   │   ├── HomePage.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Impact.tsx
│   │   ├── LoginPage.tsx
│   │   ├── NotFoundPage.tsx
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

113 directories, 110 files
\n---\n
*Generated: 2025-01-09 18:15:44*
\n## Directory Structure
./src/pages
├── About
│   ├── components
│   │   ├── MetricCard.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── SectionDivider.tsx
│   │   ├── TechCard.tsx
│   │   └── index.ts
│   ├── content
│   │   ├── shelter_intro_fr.md
│   │   └── sheltr_intro_eng.md
│   ├── sections
│   │   ├── BuildProgress.tsx
│   │   ├── Contact.tsx
│   │   ├── Documentation.tsx
│   │   ├── Hero.tsx
│   │   ├── Introduction.tsx
│   │   ├── Metrics.tsx
│   │   ├── Overview.tsx
│   │   ├── Technology.tsx
│   │   └── index.ts
│   └── index.tsx
├── Admin
│   └── CreatePost.tsx
├── Donor
│   ├── DonorSignUp.tsx
│   └── Settings.tsx
├── ShelterAdmin
│   └── types
│       └── index.ts
├── SuperAdmin
│   ├── components
│   │   ├── GlobalAnalytics.tsx
│   │   ├── GlobalDonationMap.tsx
│   │   ├── NotificationCenter.tsx
│   │   ├── RealTimeAlerts.tsx
│   │   ├── ShelterManagementTable.tsx
│   │   ├── SystemAlerts.tsx
│   │   ├── SystemMonitoring.tsx
│   │   └── index.ts
│   ├── donors
│   │   ├── DonorDetailAnalytics.tsx
│   │   └── DonorManagement.tsx
│   ├── Analytics.tsx
│   ├── Settings.tsx
│   └── index.ts
├── Wiki
│   ├── components
│   │   ├── PlatformStatusSection.tsx
│   │   └── WikiMobileNav.tsx
│   ├── Wiki.tsx
│   └── WikiSidebar.tsx
├── blockchain
│   ├── transactions.tsx
│   └── whitepaper.tsx
├── HomePage.tsx
├── HowItWorks.tsx
├── Impact.tsx
├── LoginPage.tsx
├── NotFoundPage.tsx
├── ScanDonatePage.tsx
├── ShelterSignUp.tsx
├── SignUpPage.tsx
├── Solutions.tsx
├── debug.tsx
└── index.ts

15 directories, 51 files
\n---\n
*Generated: 2025-01-09 18:15:43*
\n## Directory Structure
./src
├── auth
│   ├── components
│   │   ├── AuthProvider.tsx
│   │   └── ProtectedRoute.tsx
│   ├── guards
│   │   └── RoleGuard.tsx
│   ├── schemas
│   │   ├── index.ts
│   │   └── validation.ts
│   ├── stores
│   │   └── authStore.ts
│   ├── types
│   │   └── auth.types.ts
│   └── types.ts
├── components
│   ├── About
│   │   ├── sections
│   │   │   ├── Checkpoint.tsx
│   │   │   ├── Introduction.tsx
│   │   │   ├── Roadmap.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── Whitepaper.tsx
│   │   │   └── index.ts
│   │   ├── CallToAction.tsx
│   │   ├── Features.tsx
│   │   ├── MarkdownContent.tsx
│   │   ├── ProjectStatus.tsx
│   │   └── StatusCard.tsx
│   ├── Admin
│   │   └── Shelters
│   │       └── ShelterList.tsx
│   ├── Auth
│   │   ├── forms
│   │   │   ├── DonorSignUpForm.tsx
│   │   │   ├── ShelterRegistrationForm.tsx
│   │   │   └── index.ts
│   │   ├── AuthLayout.tsx
│   │   ├── LoginButton.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RequireAuth.tsx
│   │   ├── SignUpForm.tsx
│   │   └── SignUpSelector.tsx
│   ├── Blockchain
│   │   ├── Whitepaper
│   │   │   └── WhitepaperLayout.tsx
│   │   ├── BlockchainStats.tsx
│   │   ├── TransactionList.tsx
│   │   ├── WhitepaperPage.tsx
│   │   └── index.ts
│   ├── Blog
│   │   ├── BlogEditor.tsx
│   │   ├── BlogList.tsx
│   │   └── BlogPost.tsx
│   ├── Contact
│   │   └── ContactForm.tsx
│   ├── CustomerSupport
│   │   ├── CustomerSupport.tsx
│   │   └── index.ts
│   ├── Documentation
│   │   ├── components
│   │   │   ├── DocViewer.tsx
│   │   │   ├── DocumentHub.tsx
│   │   │   ├── DocumentViewer.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── WhitepaperView.tsx
│   │   │   └── index.ts
│   │   ├── pages
│   │   │   └── WhitepaperPage.tsx
│   │   ├── MarkdownViewer.tsx
│   │   └── index.ts
│   ├── DonationForm
│   │   └── DonationForm.tsx
│   ├── ErrorBoundary
│   │   ├── BaseErrorBoundary.tsx
│   │   ├── ShelterAdminErrorBoundary.tsx
│   │   └── index.ts
│   ├── Footer
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── Header
│   │   └── Navigation.tsx
│   ├── Hero
│   │   └── Hero.tsx
│   ├── HowItWorks
│   │   └── index.ts
│   ├── Layout
│   │   └── index.tsx
│   ├── Legal
│   │   ├── PrivacyPolicy.tsx
│   │   └── TermsOfService.tsx
│   ├── Navigation
│   │   ├── MobileNav.tsx
│   │   ├── Navigation.tsx
│   │   ├── UserNav.tsx
│   │   └── types.ts
│   ├── Podcast
│   │   └── PodcastPreview.tsx
│   ├── Profile
│   │   ├── ActivityLog.tsx
│   │   ├── AddFriend.tsx
│   │   ├── AdminFeatures.tsx
│   │   ├── BaseProfile.tsx
│   │   ├── DonorFeatures.tsx
│   │   ├── FriendActivity.tsx
│   │   ├── ImageCropModal.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── RoleSpecificInfo.tsx
│   │   ├── SocialLinks.tsx
│   │   └── index.ts
│   ├── QRScanner
│   │   ├── QRScanner.tsx
│   │   └── QRScannerLoading.tsx
│   ├── SEO
│   │   └── MetaTags.tsx
│   ├── Settings
│   │   └── BaseSettings.tsx
│   ├── Sidebar
│   ├── ThankYou
│   │   └── ThankYou.tsx
│   ├── Token
│   │   ├── TokenCard.tsx
│   │   └── TokenPage.tsx
│   ├── Transactions
│   │   ├── TransactionList.tsx
│   │   └── TransactionRow.tsx
│   ├── UserBadge
│   │   └── UserBadge.tsx
│   ├── Verify
│   │   └── VerifyPage.tsx
│   ├── charts
│   │   └── LineChart.tsx
│   ├── layouts
│   │   └── index.ts
│   ├── metrics
│   │   └── SystemStatus.tsx
│   ├── shared
│   │   ├── analytics
│   │   │   ├── DetailedAnalytics.tsx
│   │   │   ├── SystemHealthMonitor.tsx
│   │   │   └── index.ts
│   │   └── ui
│   │       └── index.ts
│   ├── ui
│   │   ├── Charts
│   │   │   ├── DonationAllocationPieChart.tsx
│   │   │   ├── MapComponent.tsx
│   │   │   ├── NetworkActivityChart.tsx
│   │   │   └── index.ts
│   │   ├── Accordion.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Checkbox.tsx
│   │   ├── CustomIcons.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── FileUpload.tsx
│   │   ├── FullContentModal.tsx
│   │   ├── Icon.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── Input.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── LoadingOverlay.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Logo.tsx
│   │   ├── MetricCard.tsx
│   │   ├── NavLink.tsx
│   │   ├── PageBackground.tsx
│   │   ├── ProfileMenu.tsx
│   │   ├── QRCode.tsx
│   │   ├── Select.tsx
│   │   ├── SignOutButton.tsx
│   │   ├── Table.tsx
│   │   ├── Textarea.tsx
│   │   ├── Toast.tsx
│   │   ├── Toaster.tsx
│   │   └── index.ts
│   ├── ErrorBoundary.tsx
│   ├── Hero.tsx
│   ├── Logo.tsx
│   ├── ScrollToTop.tsx
│   └── ThemeToggle.tsx
├── config
│   ├── deployment.ts
│   ├── docs.ts
│   └── environment.ts
├── constants
│   └── podcast.ts
├── content
│   ├── intro
│   │   └── en.md
│   ├── project
│   ├── technical
│   └── whitepaper
│       ├── en.md
│       ├── fr.md
│       ├── whitepaper_en.md
│       └── whitepaper_fr.md
├── contexts
│   └── ThemeContext.tsx
├── features
│   ├── auth
│   │   ├── components
│   │   │   └── index.ts
│   │   ├── hooks
│   │   ├── store
│   │   ├── utils
│   │   └── index.ts
│   ├── dashboard
│   │   ├── layouts
│   │   │   ├── participant
│   │   │   ├── shelter
│   │   │   ├── super-admin
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── index.ts
│   │   ├── roles
│   │   │   ├── donor
│   │   │   ├── participant
│   │   │   ├── shelter-admin
│   │   │   └── super-admin
│   │   ├── shared
│   │   │   ├── analytics
│   │   │   ├── components
│   │   │   ├── navigation
│   │   │   ├── profile
│   │   │   ├── widgets
│   │   │   └── types.ts
│   │   ├── store
│   │   ├── utils
│   │   └── index.ts
│   ├── donor
│   │   ├── types
│   │   │   └── donor.ts
│   │   └── validation
│   │       └── donorValidation.ts
│   ├── profile
│   │   ├── components
│   │   │   └── index.ts
│   │   ├── hooks
│   │   ├── store
│   │   ├── utils
│   │   └── index.ts
│   └── shared
│       ├── analytics
│       │   ├── charts
│       │   ├── hooks
│       │   ├── maps
│       │   ├── metrics
│       │   ├── tables
│       │   ├── types
│       │   ├── utils
│       │   ├── DonationHistory.tsx
│       │   ├── DonorStats.tsx
│       │   ├── index.ts
│       │   └── theme.ts
│       ├── components
│       │   └── index.ts
│       ├── hooks
│       ├── store
│       ├── utils
│       └── index.ts
├── hooks
│   ├── useAlerts.ts
│   ├── useAuth.ts
│   ├── useGeolocation.ts
│   ├── useMarkdownContent.ts
│   ├── useNavigation.ts
│   └── useWhitepaper.ts
├── layouts
│   ├── base
│   │   ├── Layout.tsx
│   │   └── PageLayout.tsx
│   ├── components
│   │   └── Header.tsx
│   ├── dashboard
│   │   ├── base
│   │   │   └── UnifiedDashboard.tsx
│   │   ├── navigation
│   │   │   └── DashboardNavigation.tsx
│   │   ├── roles
│   │   │   └── RoleRouter.tsx
│   │   └── shared
│   │       ├── analytics
│   │       └── DashboardShell.tsx
│   ├── PageLayout.tsx
│   ├── index.ts
│   └── types.ts
├── lib
│   ├── api
│   │   ├── activityLogApi.ts
│   │   ├── blogApi.ts
│   │   ├── donations.ts
│   │   ├── donorRankingsApi.ts
│   │   ├── participantApi.ts
│   │   ├── participants.ts
│   │   ├── profileApi.ts
│   │   ├── shelterApi.ts
│   │   └── transactions.ts
│   ├── auth
│   │   ├── AuthProvider.tsx
│   │   ├── authService.ts
│   │   ├── full_schema.md
│   │   ├── profileService.ts
│   │   ├── sessionService.ts
│   │   └── types.ts
│   ├── config
│   │   └── constants.ts
│   ├── content
│   │   └── blog
│   │       └── posts.ts
│   ├── email
│   │   ├── templates
│   │   │   ├── donationReceipt.ts
│   │   │   ├── donorWelcome.ts
│   │   │   ├── serviceNotification.ts
│   │   │   └── welcome.ts
│   │   └── templates.ts
│   ├── i18n
│   │   ├── locales
│   │   │   ├── en.json
│   │   │   ├── en.ts
│   │   │   └── fr.ts
│   │   ├── config.ts
│   │   ├── index.ts
│   │   ├── migration.ts
│   │   └── types.ts
│   ├── navigation
│   │   ├── config.ts
│   │   └── roleNavigation.ts
│   ├── scripts
│   │   ├── reset-auth
│   │   │   ├── 01-backup.sql
│   │   │   ├── 02-disable-triggers.sql
│   │   │   ├── 03-clear-tables.sql
│   │   │   ├── 04-enable-triggers.sql
│   │   │   ├── 05-create-admin.sql
│   │   │   └── README.md
│   │   ├── add-activity-log.sql
│   │   ├── add-sample-shelters.sql
│   │   ├── auth-setup.sql
│   │   ├── create-blog-tables.sql
│   │   ├── create-donor-stats-table.sql
│   │   ├── create-super-admins.sql
│   │   ├── create-test-accounts.sql
│   │   ├── export-auth-schema.sql
│   │   ├── export-schema-simple.sql
│   │   ├── export-schema.sql
│   │   ├── fix-admin-password.sql
│   │   ├── fix-auth-system.sql
│   │   ├── fix-database-relationships.sql
│   │   ├── fix-user-profiles.sql
│   │   ├── reset-auth-safe.sql
│   │   ├── reset-auth-system.sql
│   │   ├── setup-user-profiles.sql
│   │   ├── update-participants-schema.sql
│   │   ├── update-shelter-schema.sql
│   │   ├── update-user-role.sql
│   │   ├── verify-schema.sql
│   │   └── verify-user-roles.ts
│   ├── sentry
│   │   └── index.ts
│   ├── services
│   │   ├── analyticsService.ts
│   │   ├── donationService.ts
│   │   ├── imageService.ts
│   │   ├── monitoring.ts
│   │   ├── organizationService.ts
│   │   ├── participantService.ts
│   │   ├── profileService.ts
│   │   └── qrService.ts
│   ├── storage
│   │   ├── imageUtils.ts
│   │   └── storageService.ts
│   ├── supabase
│   │   ├── client.ts
│   │   ├── index.ts
│   │   ├── migration.ts
│   │   └── security.ts
│   ├── types
│   │   ├── auth.ts
│   │   ├── blog.ts
│   │   ├── database.ts
│   │   ├── icon.ts
│   │   ├── icons.ts
│   │   ├── organization.ts
│   │   └── shelter.ts
│   ├── utils
│   │   ├── docs-parser.ts
│   │   ├── format.ts
│   │   ├── iconMapping.ts
│   │   ├── navigation.ts
│   │   ├── qrCode.ts
│   │   ├── token.ts
│   │   └── version.ts
│   ├── validation
│   │   └── authValidation.ts
│   ├── validations
│   │   ├── participant.ts
│   │   └── profile.ts
│   ├── auth-schema.sql
│   ├── complete-schema.sql
│   ├── database.types.ts
│   ├── docs-parser.ts
│   ├── icons.ts
│   ├── schema.sql
│   ├── theme.ts
│   └── utils.ts
├── pages
│   ├── About
│   │   ├── components
│   │   │   ├── MetricCard.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   ├── SectionDivider.tsx
│   │   │   ├── TechCard.tsx
│   │   │   └── index.ts
│   │   ├── content
│   │   │   ├── shelter_intro_fr.md
│   │   │   └── sheltr_intro_eng.md
│   │   ├── sections
│   │   │   ├── BuildProgress.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Documentation.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Introduction.tsx
│   │   │   ├── Metrics.tsx
│   │   │   ├── Overview.tsx
│   │   │   ├── Technology.tsx
│   │   │   └── index.ts
│   │   └── index.tsx
│   ├── Admin
│   │   └── CreatePost.tsx
│   ├── Donor
│   │   ├── DonorSignUp.tsx
│   │   └── Settings.tsx
│   ├── ShelterAdmin
│   │   └── types
│   │       └── index.ts
│   ├── SuperAdmin
│   │   ├── components
│   │   │   ├── GlobalAnalytics.tsx
│   │   │   ├── GlobalDonationMap.tsx
│   │   │   ├── NotificationCenter.tsx
│   │   │   ├── RealTimeAlerts.tsx
│   │   │   ├── ShelterManagementTable.tsx
│   │   │   ├── SystemAlerts.tsx
│   │   │   ├── SystemMonitoring.tsx
│   │   │   └── index.ts
│   │   ├── donors
│   │   │   ├── DonorDetailAnalytics.tsx
│   │   │   └── DonorManagement.tsx
│   │   ├── Analytics.tsx
│   │   ├── Settings.tsx
│   │   └── index.ts
│   ├── Wiki
│   │   ├── components
│   │   │   ├── PlatformStatusSection.tsx
│   │   │   └── WikiMobileNav.tsx
│   │   ├── Wiki.tsx
│   │   └── WikiSidebar.tsx
│   ├── blockchain
│   │   ├── transactions.tsx
│   │   └── whitepaper.tsx
│   ├── HomePage.tsx
│   ├── HowItWorks.tsx
│   ├── Impact.tsx
│   ├── LoginPage.tsx
│   ├── NotFoundPage.tsx
│   ├── ScanDonatePage.tsx
│   ├── ShelterSignUp.tsx
│   ├── SignUpPage.tsx
│   ├── Solutions.tsx
│   ├── debug.tsx
│   └── index.ts
├── routes
│   ├── blockchain
│   │   ├── WhitepaperPage.tsx
│   │   └── index.tsx
│   ├── AppRoutes.tsx
│   └── index.tsx
├── services
│   ├── docs.service.ts
│   └── platformStatus.ts
├── src
├── stores
│   ├── donationStore.ts
│   ├── profileStore.ts
│   └── shelterStore.ts
├── styles
│   ├── global.css
│   ├── globals.css
│   ├── reset.css
│   └── themes.css
├── types
│   ├── auth
│   │   ├── index.ts
│   │   └── schemas.ts
│   ├── core
│   │   ├── auth
│   │   │   └── index.ts
│   │   ├── dashboard
│   │   │   └── index.ts
│   │   ├── profile
│   │   │   └── index.ts
│   │   ├── shared
│   │   │   └── index.ts
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   ├── shelter.types.ts
│   │   └── ui.types.ts
│   ├── analytics.ts
│   ├── auth.ts
│   ├── docs.d.ts
│   ├── i18next.d.ts
│   ├── index.ts
│   ├── markdown.d.ts
│   └── ui.types.ts
├── utils
│   └── markdown.ts
├── App.tsx
├── i18n.ts
├── index.css
├── main.tsx
├── types.d.ts
└── vite-env.d.ts

163 directories, 362 files
