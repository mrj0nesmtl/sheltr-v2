# 🚀 SHELTR Deployment Configuration
*Last Updated: December 18, 2024*

## Development Environment
```bash
# Build Command
npm run build:dev

# Run Command
npm run dev

# Environment Settings
NODE_ENV=development
VITE_APP_ENV=development
```

## Environment Variables Structure
```bash
# Authentication
GITHUB_TOKEN=<github_pat_token>
VITE_SUPABASE_URL=<supabase_project_url>
VITE_SUPABASE_ANON_KEY=<supabase_anon_key>
VITE_AUTH_REDIRECT_URL=<auth_redirect_url>

# Feature Flags
VITE_ENABLE_QR_SCANNER=true
VITE_ENABLE_OFFLINE_MODE=false
```

## Development vs Production
| Setting | Development | Production |
|---------|-------------|------------|
| NODE_ENV | development | production |
| VITE_APP_ENV | development | production |
| Source Maps | enabled | disabled |
| Error Details | verbose | minimal |
| Hot Reload | enabled | disabled |
| Build Optimization | minimal | full |

## Replit Configuration
1. Update Build Command:
```bash
npm install && npm run build:dev
```

2. Update Run Command:
```bash
npm run dev
```

3. Update Environment Variables:
```env
NODE_ENV=development
VITE_APP_ENV=development
```

## Benefits of Development Mode
- Enhanced debugging capabilities
- Detailed error messages
- Hot module replacement
- Faster build times
- Source map support
- Development tools enabled 