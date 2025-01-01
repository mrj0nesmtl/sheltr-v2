# 🚀 SHELTR Deployment Configuration
*Last Updated: January 1, 2025*
*Version: 0.5.3*
*Status: STABLE* 🟢

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
VITE_SUPABASE_URL=<supabase_project_url>
VITE_SUPABASE_ANON_KEY=<supabase_anon_key>
VITE_AUTH_REDIRECT_URL=<auth_redirect_url>

# Feature Flags
VITE_ENABLE_QR_SCANNER=true
VITE_ENABLE_OFFLINE_MODE=false

# API Configuration
VITE_API_URL=https://sheltr.replit.app
VITE_API_VERSION=v1
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
1. Build Command:
```bash
npm install && npm run build
```

2. Run Command:
```bash
npm run start
```

3. Environment Variables:
```env
NODE_ENV=production
VITE_APP_ENV=production
```

## Performance Optimization
- Bundle size optimization
- Code splitting enabled
- Tree shaking implemented
- Lazy loading configured
- Cache policies set

## Security Implementation
- Environment variable protection
- API request validation
- CORS configuration
- Rate limiting enabled
- Error handling standardized

## Monitoring Setup
- Error tracking configured
- Performance monitoring enabled
- Usage analytics implemented
- Log management setup
- Health checks configured

*For detailed implementation logs, see /docs/dev/notes/*