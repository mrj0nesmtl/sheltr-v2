# 🌳 SHELTR Components Structure
*Last Updated: January 1, 2024 15:45 UTC*
*Version: 0.5.3*
*Status: STABLE* 🟢

## Recent Changes
| Category | Update | Status |
|----------|---------|---------|
| Analytics | Consolidated to shared library | ✅ Complete |
| Charts | Standardized on recharts | ✅ Complete |
| Metrics | Migration in progress | 🟡 In Progress |
| Maps | Implemented in shared | ✅ Complete |

## New Analytics Structure
```typescript
/src/features/shared/analytics/
├── charts/
│   ├── AreaChart.tsx
│   ├── BarChart.tsx
│   ├── LineChart.tsx
│   └── index.ts
├── metrics/
│   ├── MetricCard.tsx
│   └── index.ts
├── maps/
│   ├── DonationMap.tsx
│   └── index.ts
├── types/
│   └── index.ts
├── utils/
│   └── theme.ts
└── index.ts
```

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
├── Meta
│   └── PageMeta.tsx
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
│   ├── DonorFeatures.tsx
│   ├── FriendActivity.tsx
│   ├── ImageCropModal.tsx
│   ├── ImageUpload.tsx
│   ├── RoleSpecificInfo.tsx
│   └── SocialLinks.tsx
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
│   │   └── index.ts
│   └── ui
│       └── index.ts
├── ui
│   ├── Charts
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
│   ├── NavLink.tsx
│   ├── PageBackground.tsx
│   ├── ProfileMenu.tsx
│   ├── QRCode.tsx
│   ├── Select.tsx
│   ├── SignOutButton.tsx
│   ├── Textarea.tsx
│   ├── Toast.tsx
│   ├── Toaster.tsx
│   └── index.ts
├── ErrorBoundary.tsx
├── Hero.tsx
├── Logo.tsx
├── ScrollToTop.tsx
└── ThemeToggle.tsx

42 directories, 112 files

## Migration Notes
- Old chart components marked for deprecation
- Dashboard components being updated to use new shared analytics
- Documentation being updated to reflect new structure
- Testing implementation in progress
