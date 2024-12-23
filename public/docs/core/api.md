# 🔌 SHELTR API Documentation
*Last Updated: December 22, 2024*
*Version: 0.4.9*

## API Overview
SHELTR's API provides secure endpoints for donation management, user authentication, and data analytics.

## Base URL
```typescript
const API_CONFIG = {
  production: 'https://sheltr.replit.app',
  development: 'http://localhost:5173'
}
```

## Authentication
```typescript
interface AuthHeaders {
  Authorization: `Bearer ${string}`;
  'Content-Type': 'application/json';
}
```

## Endpoints

### Authentication
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `GET /auth/session`

### Donations
- `POST /donations/create`
- `GET /donations/history`
- `GET /donations/analytics`

### Users
- `GET /users/profile`
- `PUT /users/update`
- `GET /users/statistics`

### QR Codes
- `POST /qr/generate`
- `GET /qr/validate`
- `GET /qr/statistics`

## Response Formats
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  metadata: {
    timestamp: string;
    version: string;
  };
}
```

## Error Handling
```typescript
interface APIError {
  status: number;
  code: string;
  message: string;
  details?: unknown;
}
```

## Rate Limiting
- 100 requests per minute
- Burst: 200 requests
- Cooldown: 60 seconds

## Versioning
Current version: v1
Format: application/vnd.sheltr.v1+json
