export const deploymentConfig = {
  api: {
    baseUrl: process.env.VITE_API_URL || 'https://api.sheltr.org',
    timeout: 30000,
  },
  features: {
    analytics: true,
    qrScanner: true,
    blockchain: true,
    i18n: true,
  },
  cache: {
    ttl: 3600,
    version: '1.0.0',
  }
}; 