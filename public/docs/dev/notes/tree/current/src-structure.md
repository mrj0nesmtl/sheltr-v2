# 🌳 SHELTR Source Structure
*Generated: 2024-12-26 11:37:51*
\n## Directory Structure
./src
├── auth
│   ├── components
│   │   ├── AuthProvider.tsx
│   │   └── ProtectedRoute.tsx
│   ├── forms
│   ├── guards
│   │   └── RoleGuard.tsx
│   ├── hooks
│   ├── schemas
│   │   ├── index.ts
│   │   └── validation.ts
│   ├── services
│   ├── stores
│   │   └── authStore.ts
│   ├── types
│   │   └── auth.types.ts
│   ├── validation
│   └── types.ts
├── backup
│   ├── dashboard_cleanup
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
│   │   ├── Analytics
│   │   └── Shelters
│   ├── Auth
│   │   ├── forms
│   │   ├── AuthLayout.tsx
│   │   ├── LoginButton.tsx
│   │   ├── LoginForm.tsx
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
│   ├── Dashboard
│   │   ├── Analytics
│   │   ├── common
│   │   └── widgets
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
│   ├── Hero
│   │   └── Hero.tsx
│   ├── HowItWorks
│   │   └── index.ts
│   ├── Layout
│   │   └── index.tsx
│   ├── Legal
│   │   ├── PrivacyPolicy.tsx
│   │   └── TermsOfService.tsx
│   ├── Map
│   │   └── DonationMap.tsx
│   ├── Meta
│   │   └── PageMeta.tsx
│   ├── Navigation
│   │   ├── MobileMenu.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Navigation.tsx
│   │   ├── UserNav.tsx
│   │   └── types.ts
│   ├── Participant
│   ├── Podcast
│   │   └── PodcastPreview.tsx
│   ├── Profile
│   │   ├── ActivityLog.tsx
│   │   ├── AddFriend.tsx
│   │   ├── AdminFeatures.tsx
│   │   ├── DonorFeatures.tsx
│   │   ├── FriendActivity.tsx
│   │   ├── ImageCropModal.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── RoleSpecificInfo.tsx
│   │   └── SocialLinks.tsx
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
│   │   ├── NavLink.tsx
│   │   ├── ProfileMenu.tsx
│   │   ├── QRCode.tsx
│   │   ├── Select.tsx
│   │   ├── SignOutButton.tsx
│   │   ├── Textarea.tsx
│   │   ├── Toast.tsx
│   │   ├── Toaster.tsx
│   │   └── index.ts
│   ├── ErrorBoundary.tsx
│   ├── Hero.tsx
│   ├── Logo.tsx
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
│   └── whitepaper
│       ├── en.md
│       └── fr.md
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
│   │   ├── components
│   │   ├── hooks
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
│   ├── specialized
│   │   └── dashboard
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
│   └── index.ts
├── routes
│   ├── blockchain
│   │   ├── WhitepaperPage.tsx
│   │   └── index.tsx
│   ├── AppRoutes.tsx
│   └── index.tsx
├── services
│   └── docs.service.ts
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

150 directories, 257 files
