# 🚀 SHELTR Deployment Configuration
*Last Updated: January 20, 2024 22:45 EST*
*Version: 0.6.4*
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
VITE_ENABLE_MONITORING=true
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
VITE_ENABLE_MONITORING=true
VITE_ENABLE_ANALYTICS=true

# API Configuration
VITE_API_URL=https://sheltr.replit.app
VITE_API_VERSION=v1

# Security Configuration
VITE_SECURITY_MONITORING=true
VITE_THREAT_DETECTION=true
VITE_PERFORMANCE_TRACKING=true
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
| Security Monitoring | enabled | enabled |
| Performance Tracking | enabled | enabled |
| Real-time Analytics | optional | enabled |

## Deployment Configurations

### 1. Replit Configuration
```bash
# Build Command
npm install && npm run build

# Run Command
npm run start

# Environment Variables
NODE_ENV=production
VITE_APP_ENV=production
VITE_ENABLE_MONITORING=true
VITE_SECURITY_MONITORING=true
```

### 2. Production Build
```bash
# Build Optimization
npm run build:prod

# Performance Analysis
npm run analyze

# Security Checks
npm run security-check
```

## Performance Optimization
- Bundle size optimization (< 500KB initial)
- Code splitting enabled
- Tree shaking implemented
- Lazy loading configured
- Cache policies set
- Performance monitoring active
- Real-time metrics tracking
- Automated optimization

## Security Implementation
- Environment variable protection
- API request validation
- CORS configuration
- Rate limiting enabled
- Error handling standardized
- Real-time monitoring
- Threat detection
- Automated alerts
- Security metrics tracking
- Performance monitoring

## Monitoring Setup
- Error tracking configured
- Performance monitoring enabled
- Usage analytics implemented
- Log management setup
- Health checks configured
- Real-time metrics
- Security monitoring
- Threat detection
- Performance tracking
- Automated alerts

## Deployment Checklist
1. Security Verification
   - Environment variables
   - API endpoints
   - Authentication flow
   - Authorization checks

2. Performance Validation
   - Bundle size
   - Load times
   - API response
   - Navigation speed

3. Monitoring Configuration
   - Error tracking
   - Performance metrics
   - Security monitoring
   - Usage analytics

4. Environment Setup
   - Production variables
   - Feature flags
   - Security settings
   - Monitoring config

---
*For detailed implementation logs, see [implementation.md](./implementation.md)*
*For security guidelines, see [security.md](./security.md)*
*For monitoring setup, see [monitoring.md](./monitoring.md)*

# SHELTR Replit Deployment Guide

## Pre-Deployment Checklist
1. Sync with GitHub
   ```bash
   git pull origin main
   ```

2. Clear Caches
   ```bash
   cd ~/workspace
   rm -rf .config/npm .npm node_modules/.vite node_modules
   npm cache clean --force
   ```

3. Fresh Install
   ```bash
   npm install --legacy-peer-deps
   ```

## Deployment Steps
1. Verify Environment
   - Check .replit configuration
   - Verify environment variables
   - Confirm Node version (>=18.16.0)

2. Build Process
   ```bash
   npm run build
   ```

3. Start Production Server
   ```bash
   npm run start:prod
   ```

## Troubleshooting
1. Dependency Issues
   ```bash
   npm ls # Check for errors
   npm install --force # If needed
   ```

2. Build Failures
   ```bash
   npm run clean:all
   npm install
   npm run build:force
   ```

3. Cache Issues
   ```bash
   rm -rf .config/npm .npm
   npm cache clean --force
   ```

## Monitoring
1. Check Logs
   - View Console output
   - Check Network tab
   - Monitor Error reporting

2. Performance
   - Verify build size
   - Check load times
   - Monitor memory usage

## Best Practices
1. Always pull from GitHub first
2. Clear caches before major updates
3. Use --legacy-peer-deps for installations
4. Document any environment changes
5. Monitor deployment logs

Key updates include:
1. Version bump to 0.6.4
2. Added security monitoring
3. Enhanced environment variables
4. Added deployment checklist
5. Updated performance metrics
6. Enhanced security implementation
7. Added monitoring configuration
8. Updated build process
9. Added security checks
10. Enhanced documentation references

Would you like me to:
1. Add more deployment configurations?
2. Enhance security settings?
3. Add more implementation details?
4. Update any specific section?