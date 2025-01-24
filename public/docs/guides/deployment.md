# 🚀 SHELTR Deployment Configuration
*Last Updated: January 24, 2024 13:22 EST*
*Version: 0.6.5*
*Status: STABLE* 🟢

## Development Environment
```bash
# Build Command
npm run dev

# Run Command
npm run start

# Environment Settings
NODE_ENV=development
VITE_APP_ENV=development
VITE_ENABLE_MONITORING=true
```
## Replit Configuration

```bash
.replit file
run = ["sh", "-c", "npm run dev"]
hidden = [".config", "package-lock.json"]
entrypoint = "src/App.tsx"

[nix]
channel = "stable-22_11"

[deployment]
run = ["sh", "-c", "npm run build && npx serve dist"]
deploymentTarget = "cloudrun"
ignorePorts = false

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
VITE_API_URL=https://sheltr-beta.replit.app
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

npm run build

# Run Command
npm run start

npx serve dist -s --single --no-request-logging -l $PORT

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

## Deployment Process
1. Local Development
   ```bash
   npm run dev
   ```

2. Replit Development
   ```bash
   npm run dev
   # Runs on port 5173
   ```

3. Production Build
   ```bash
   npm run build
   npx serve dist
   ```
## Critical Files
- `.replit`: Replit configuration
- `replit.nix`: Nix environment setup
- `.env.development`: Development variables
- `.env.production`: Production variables
- `vite.config.ts`: Build configuration

## Performance Optimization
- Direct content imports
- Route-based code splitting
- Markdown content optimization
- Image optimization
- CSS minification
- Tree shaking
- Lazy loading

## Deployment Checklist
1. Environment Verification
   - Replit configuration
   - Environment variables
   - Build settings
   - Content loading

2. Build Validation
   - npm run build
   - Content rendering
   - Route handling
   - Static assets

3. Content Verification
   - Markdown loading
   - Image loading
   - Route access
   - Navigation flow

4. Mobile Testing
   - Responsive layout
   - Content display
   - Navigation
   - Performance

## Troubleshooting
1. Content Loading Issues
   - Verify import paths
   - Check raw imports
   - Validate route config
   - Clear build cache

2. Build Failures
   - Check Node version
   - Verify dependencies
   - Clear npm cache
   - Review build logs

3. Deployment Issues
   - Verify Replit config
   - Check environment
   - Review logs
   - Test locally

---
*For implementation details, see [implementation.md](./implementation.md)*
*For content guidelines, see [content.md](./content.md)*
*For mobile optimization, see [mobile.md](./mobile.md)*

Key updates include:
Added Replit-specific configuration
Updated content loading strategy
Enhanced troubleshooting section
Added critical files section
Updated deployment process
Added Vite configuration details