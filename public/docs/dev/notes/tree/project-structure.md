# 🌳 SHELTR Project Structure
*Generated: 2025-01-04 19:52:53*
*Version: 0.4.9*

## Table of Contents
1. [Main Structure](#main-structure)
2. [Source Structure](#source-structure)
3. [Documentation Structure](#documentation-structure)
4. [Components Structure](#components-structure)
5. [Features Structure](#features-structure)
6. [Technical Structures](#technical-structures)

\n---\n
*Generated: 2025-01-04 19:52:53*
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
*Generated: 2025-01-04 19:52:53*
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
│   │   ├── ShelterSignUpForm.tsx
│   │   └── index.ts
│   ├── AuthLayout.tsx
│   ├── LoginButton.tsx
│   ├── LoginForm.tsx
│   ├── RequireAuth.tsx
│   ├── ShelterRegistrationForm.tsx
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
│   └── TokenPage.tsx
├── Transactions
│   └── TransactionList.tsx
├── UserBadge
│   └── UserBadge.tsx
├── Verify
│   └── VerifyPage.tsx
├── layouts
│   └── index.ts
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

41 directories, 121 files
\n---\n
*Generated: 2025-01-04 19:52:53*
\n## Directory Structure
./public/docs
├── about
│   ├── roadmap.md
│   └── whitepaper_final.md
├── archives
│   ├── builds
│   │   └── 2024-12
│   │       └── build-0.4.8.md
│   ├── changelogs
│   │   └── 2024-12
│   │       ├── changelog-0.4.8.md
│   │       ├── changelog-2024-12-15.md
│   │       ├── changelog-2024-12-22.md
│   │       └── index.md
│   ├── checkpoints
│   │   ├── 2024-12
│   │   │   └── checkpoint-2024-12-20.md
│   │   └── README.md
│   ├── project_backup
│   │   ├── SHELTR Page Organization Refactor Plan.ini
│   │   ├── SHELTR Refactor Progress Assessment.ini
│   │   ├── build_tract.md
│   │   ├── buildout_implementation.md
│   │   ├── changelog.md
│   │   ├── checkpoint.md
│   │   ├── dashboard.md
│   │   ├── dashboard_arch.md
│   │   ├── dec15-restructure.md
│   │   ├── pages.md
│   │   ├── prompt_1.md
│   │   ├── prompt_2.md
│   │   ├── prompt_3.md
│   │   ├── roadmap.md
│   │   ├── status_report.md
│   │   ├── tech_stack.md
│   │   ├── typescript_errors.md
│   │   ├── user_flow_testing.md
│   │   └── user_flows.md
│   ├── roadmap
│   │   └── README.md
│   ├── status
│   │   └── 2024-12
│   │       └── status-dec21-0.4.8.md
│   └── README.md
├── core
│   ├── README.md
│   ├── api.md
│   ├── architecture.md
│   ├── rbac.md
│   ├── security.md
│   └── technical.md
├── dev
│   ├── notes
│   │   ├── 2024-12
│   │   │   └── prompt.md
│   │   └── tree
│   │       ├── archive
│   │       ├── current
│   │       ├── commands.md
│   │       └── project-structure.md
│   └── debugging.md
├── guides
│   ├── best-practices.md
│   └── deployment.md
├── project
│   ├── checkpoint.md
│   └── status_report.md
├── reference
│   ├── components.md
│   ├── constants.md
│   └── types.md
└── technical
    ├── authentication.md
    ├── blockchain.md
    ├── build_tract.md
    ├── database.md
    └── qr-system.md

24 directories, 53 files
\n---\n
*Generated: 2025-01-04 19:52:53*
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
│   │   ├── participant
│   │   ├── shelter-admin
│   │   └── super-admin
│   ├── shared
│   │   ├── analytics
│   │   ├── components
│   │   ├── navigation
│   │   ├── profile
│   │   ├── widgets
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
    │   ├── hooks
    │   ├── maps
    │   ├── metrics
    │   ├── tables
    │   ├── types
    │   ├── utils
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

45 directories, 16 files
\n---\n
*Generated: 2025-01-04 19:52:53*
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
│   │   ├── components
│   │   └── RoleRouter.tsx
│   └── shared
│       ├── analytics
│       └── DashboardShell.tsx
├── PageLayout.tsx
├── index.ts
└── types.ts

10 directories, 10 files
\n---\n
*Generated: 2025-01-04 19:52:53*
\n## Directory Structure
.
├── analytics
├── components
├── docs
│   └── dev
├── management
├── public
│   ├── content
│   ├── docs
│   ├── images
│   ├── index.html
│   └── manifest.json
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
│   ├── backup
│   ├── components
│   ├── config
│   ├── constants
│   ├── content
│   ├── contexts
│   ├── features
│   ├── hooks
│   ├── layouts
│   ├── lib
│   ├── pages
│   ├── routes
│   ├── services
│   ├── src
│   ├── stores
│   ├── styles
│   ├── types
│   ├── utils
│   ├── App.tsx
│   ├── i18n.ts
│   ├── index.css
│   ├── main.tsx
│   ├── types.d.ts
│   └── vite-env.d.ts
├── supabase
│   ├── migrations
│   └── config.toml
├── README.md
├── analyze.html
├── eslint.config.js
├── index.html
├── layout_files.txt
├── package-lock.json
├── package.json
├── postcss.config.js
├── replit.dev.nix
├── replit.nix
├── server.js
├── stats.html
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.tsbuildinfo
├── vercel.json
└── vite.config.ts

33 directories, 40 files
\n---\n
*Generated: 2025-01-04 19:52:53*
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
│   └── Wiki.tsx
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

14 directories, 48 files
\n---\n
*Generated: 2025-01-04 19:52:53*
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
├── backup
│   ├── dashboard_cleanup
│   │   └── shelter-admin
│   ├── sidebars
│   │   └── 20241224
│   └── super-admin
│       ├── QuickStatCard.tsx
│       ├── ShelterPerformanceChart.tsx
│       └── SuperAdminDashboard.tsx
├── components
│   ├── About
│   │   ├── sections
│   │   ├── CallToAction.tsx
│   │   ├── Features.tsx
│   │   ├── MarkdownContent.tsx
│   │   ├── ProjectStatus.tsx
│   │   └── StatusCard.tsx
│   ├── Admin
│   │   └── Shelters
│   ├── Auth
│   │   ├── forms
│   │   ├── AuthLayout.tsx
│   │   ├── LoginButton.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RequireAuth.tsx
│   │   ├── ShelterRegistrationForm.tsx
│   │   ├── SignUpForm.tsx
│   │   └── SignUpSelector.tsx
│   ├── Blockchain
│   │   ├── Whitepaper
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
│   │   ├── pages
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
│   │   └── TokenPage.tsx
│   ├── Transactions
│   │   └── TransactionList.tsx
│   ├── UserBadge
│   │   └── UserBadge.tsx
│   ├── Verify
│   │   └── VerifyPage.tsx
│   ├── layouts
│   │   └── index.ts
│   ├── shared
│   │   ├── analytics
│   │   └── ui
│   ├── ui
│   │   ├── Charts
│   │   ├── Accordion.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Checkbox.tsx
│   │   ├── CustomIcons.tsx
│   │   ├── FeatureCard.tsx
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
│   │   ├── hooks
│   │   ├── store
│   │   ├── utils
│   │   └── index.ts
│   ├── dashboard
│   │   ├── layouts
│   │   ├── roles
│   │   ├── shared
│   │   ├── store
│   │   ├── utils
│   │   └── index.ts
│   ├── donor
│   │   ├── types
│   │   └── validation
│   ├── profile
│   │   ├── components
│   │   ├── hooks
│   │   ├── store
│   │   ├── utils
│   │   └── index.ts
│   └── shared
│       ├── analytics
│       ├── components
│       ├── hooks
│       ├── store
│       ├── utils
│       └── index.ts
├── hooks
│   ├── useAlerts.ts
│   ├── useAuth.ts
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
│   │   ├── navigation
│   │   ├── roles
│   │   └── shared
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
│   ├── email
│   │   ├── templates
│   │   └── templates.ts
│   ├── i18n
│   │   ├── locales
│   │   ├── config.ts
│   │   ├── index.ts
│   │   ├── migration.ts
│   │   └── types.ts
│   ├── navigation
│   │   ├── config.ts
│   │   └── roleNavigation.ts
│   ├── scripts
│   │   ├── reset-auth
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
│   │   ├── content
│   │   ├── sections
│   │   └── index.tsx
│   ├── Admin
│   │   └── CreatePost.tsx
│   ├── Donor
│   │   ├── DonorSignUp.tsx
│   │   └── Settings.tsx
│   ├── ShelterAdmin
│   │   └── types
│   ├── SuperAdmin
│   │   ├── components
│   │   ├── donors
│   │   ├── Analytics.tsx
│   │   ├── Settings.tsx
│   │   └── index.ts
│   ├── Wiki
│   │   └── Wiki.tsx
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
│   └── docs.service.ts
├── src
│   └── backup
│       └── dashboard_cleanup
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
│   │   ├── dashboard
│   │   ├── profile
│   │   ├── shared
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

148 directories, 269 files
