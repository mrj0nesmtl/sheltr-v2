# 🌳 SHELTR Layouts Structure
*Generated: 2024-12-26 14:27:09*

## Core Layouts
- `base/Layout.tsx`: Main application layout with navigation handling
- `base/PageLayout.tsx`: Base page structure

## Dashboard Layout
- `specialized/dashboard/DashboardLayout.tsx`: Enhanced dashboard layout with:
  - Responsive sidebar
  - Mobile navigation
  - Role-based content rendering
  - Improved scroll handling

## Navigation Components
- Removed: `MobileMenu.tsx`
- Added: `MobileNav.tsx` with improved mobile responsiveness
- Updated: Integration with dashboard layouts

\n## Directory Structure
./src/layouts
├── base
│   ├── Layout.tsx
│   └── PageLayout.tsx
├── components
│   └── Header.tsx
├── specialized
│   └── dashboard
│       ├── Sidebar
│       ├── components
│       └── index.ts
├── PageLayout.tsx
├── index.ts
└── types.ts

7 directories, 7 files
