# SHELTR Technical Stack Documentation
Last Updated: December 3, 2024

## Recent Updates

### Internationalization
```typescript
// Enhanced i18n Configuration
const i18nConfig = {
  languages: ['en', 'fr'],
  namespaces: ['common', 'auth', 'qrScanner'],
  fallbackLng: 'en',
  defaultNS: 'common'
};
```

### Icon System
```typescript
// Centralized Icon Management
import { Icons } from '@/lib/icons';
interface IconProps {
  name: IconName;
  className?: string;
}
```

### Component Architecture
```typescript
// Enhanced Component Types
interface TranslatedComponent {
  t: TFunction;
  i18n: i18n;
}

// Standardized Props Interface
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
```

## Core Technologies

### Frontend
- **React 18.3.1** - Latest stable version with concurrent features
- **TypeScript 5.5.3** - For type safety and better developer experience
- **Vite 5.4.2** - Build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Router DOM 6.22.3** - Client-side routing

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Authentication
  - Storage for profile images
  - Edge Functions

### State Management
- **Zustand 4.5.2** - Lightweight state management
- **Zod 3.22.4** - Runtime type validation

### UI/UX Components
- **Lucide React** - Icon system
- **Recharts 2.12.2** - Data visualization
- **React Leaflet 4.2.1** - Interactive maps
- **HTML5-QRCode 2.3.8** - QR code scanning

### Internationalization
- **i18next 23.10.1** - Translations and localization
- **i18next-browser-languagedetector 7.2.1** - Language detection

## Payment Processing Standards

### Stripe Integration Guidelines
```typescript
// Payment processing configuration
const STRIPE_CONFIG = {
  // Test mode configuration
  test: {
    minimumAmount: 100, // $1.00
    currency: 'usd',
    paymentMethods: ['card', 'apple_pay', 'google_pay'],
    metadata: {
      source: 'sheltr_test'
    }
  },
  // Production mode configuration
  production: {
    minimumAmount: 100,
    currency: 'usd',
    paymentMethods: ['card', 'apple_pay', 'google_pay'],
    metadata: {
      source: 'sheltr_prod'
    }
  }
};

// Payment security requirements
const SECURITY_REQUIREMENTS = {
  pci_compliance: 'PCI DSS v4.0',
  encryption: 'TLS 1.2+',
  authentication: '3D Secure 2.0',
  fraud_prevention: true
};
```

## Testing Standards

### Unit Testing
- **Test Framework**: Vitest
- **Coverage Requirements**: Minimum 80% coverage
- **Critical Paths**: 100% coverage required for:
  - Payment processing
  - Authentication
  - User data handling
  - Financial calculations

### Integration Testing
```typescript
// Example test structure
describe('Donation Flow', () => {
  test('Successfully processes donation', async () => {
    // Setup
    const donation = {
      amount: 100,
      participantId: 'test-id',
      email: 'donor@example.com'
    };

    // Process
    const result = await processDonation(donation);

    // Verify
    expect(result.status).toBe('completed');
    expect(result.allocation).toEqual({
      directSupport: 80,  // 80%
      housingFund: 15,    // 15%
      operations: 5       // 5%
    });
  });
});
```

### E2E Testing
- **Framework**: Playwright
- **Critical Flows**:
  1. User registration
  2. Authentication
  3. Donation process
  4. QR code scanning
  5. Payment processing

## Security Standards

### Data Protection
```typescript
const SECURITY_POLICIES = {
  data_encryption: {
    at_rest: 'AES-256',
    in_transit: 'TLS 1.3'
  },
  authentication: {
    mfa_required: true,
    session_timeout: 3600, // 1 hour
    max_attempts: 5
  },
  authorization: {
    rbac_enabled: true,
    roles: ['super_admin', 'admin', 'user', 'participant']
  }
};
```

### Supabase Security Configuration
```sql
-- Row Level Security Policies
create policy "Users can only view their own data"
  on user_profiles for select
  using (auth.uid() = id);

create policy "Admins can view all data"
  on user_profiles for select
  using (
    exists (
      select 1 from user_profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );
```

## Performance Standards

### Frontend Metrics
```typescript
const PERFORMANCE_TARGETS = {
  first_contentful_paint: '1.5s',
  largest_contentful_paint: '2.5s',
  first_input_delay: '100ms',
  cumulative_layout_shift: '0.1',
  time_to_interactive: '3.5s'
};
```

### API Response Times
```typescript
const API_PERFORMANCE = {
  read_operations: '100ms',
  write_operations: '200ms',
  payment_processing: '3s',
  authentication: '500ms'
};
```

## Deployment Configuration

### Environment Variables
```typescript
interface EnvironmentConfig {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  VITE_STRIPE_PUBLIC_KEY: string;
  VITE_API_URL: string;
  VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
}
```

### Build Configuration
```typescript
const BUILD_CONFIG = {
  minify: true,
  sourcemap: process.env.VITE_ENVIRONMENT !== 'production',
  chunks: true,
  cssMinify: true,
  assetsInlineLimit: 4096
};
```

## Monitoring and Logging

### Error Tracking
```typescript
const ERROR_HANDLING = {
  payment_errors: {
    retry_attempts: 3,
    backoff_strategy: 'exponential',
    alert_threshold: 5
  },
  api_errors: {
    log_level: 'error',
    alert_threshold: 10,
    retention_period: '30d'
  }
};
```

### Performance Monitoring
```typescript
const MONITORING_CONFIG = {
  metrics: [
    'api_response_time',
    'payment_processing_time',
    'database_query_time',
    'authentication_time'
  ],
  alerts: {
    response_time_threshold: 1000,
    error_rate_threshold: 0.01,
    payment_failure_threshold: 0.001
  }
};
```

## Blockchain Integration

### Chain Selection
```typescript
interface ChainConfig {
  mainnet: {
    primary: 'polygon',    // Low fees, high throughput
    fallback: 'arbitrum'   // L2 with Ethereum security
  },
  testnet: {
    primary: 'mumbai',     // Polygon testnet
    fallback: 'sepolia'    // Ethereum testnet
  },
  requirements: {
    tps: '> 500/second',
    fees: '< $0.01/tx',
    finality: '< 5 seconds',
    security: 'Ethereum L2'
  }
}
```

### Smart Contract Architecture
```solidity
// Core Contracts
contract SHELTRToken is ERC20, ERC20Permit, Ownable2Step {
    // Token Configuration
    string public constant NAME = "SHELTR Impact Token";
    string public constant SYMBOL = "SHELTR";
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10**18;

    // Access Control
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    
    // Vesting & Distribution
    uint256 public constant VESTING_DURATION = 720 days;
    uint256 public constant CLIFF_PERIOD = 180 days;
}

// Donation Management
contract SHELTRDonations is ReentrancyGuard, Pausable {
    // Allocation Percentages
    uint8 public constant DIRECT_SUPPORT = 80;
    uint8 public constant HOUSING_FUND = 15;
    uint8 public constant OPERATIONS = 5;

    // Minimum Donation
    uint256 public constant MIN_DONATION = 1e16; // 0.01 ETH

    // Reward Mechanism
    uint256 public constant REWARD_RATE = 100; // 100 SHELTR per 1 ETH
}

// Governance
contract SHELTRGovernance is IGovernor, GovernorCompatibilityBravo {
    // Voting Configuration
    uint256 public constant VOTING_DELAY = 1 days;
    uint256 public constant VOTING_PERIOD = 5 days;
    uint256 public constant PROPOSAL_THRESHOLD = 100_000 * 10**18;
    
    // Quorum
    function quorum() public pure returns (uint256) {
        return TOTAL_SUPPLY * 4 / 100; // 4% quorum
    }
}
```

### Token Economics
```typescript
interface TokenEconomics {
  distribution: {
    participants: '30%',  // Direct aid recipients
    donors: '25%',       // Contribution rewards
    operations: '20%',   // Platform maintenance
    treasury: '15%',     // DAO governance
    team: '10%'          // Development team
  },
  vesting: {
    team: {
      cliff: '6 months',
      duration: '24 months',
      schedule: 'linear'
    },
    treasury: {
      cliff: '12 months',
      duration: '48 months',
      schedule: 'linear'
    }
  },
  mechanics: {
    staking: {
      enabled: true,
      rewards: '12% APY',
      lockPeriods: ['3m', '6m', '12m']
    },
    burning: {
      enabled: true,
      rate: '2% of fees',
      frequency: 'monthly'
    }
  }
}
```

### Web3 Integration
```typescript
// Chain Configuration
const CHAIN_CONFIG = {
  polygon: {
    chainId: '0x89',
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  arbitrum: {
    chainId: '0xa4b1',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorer: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    }
  }
};

// Contract Interfaces
interface Web3Config {
  contracts: {
    token: `0x${string}`,
    donations: `0x${string}`,
    governance: `0x${string}`
  },
  providers: {
    default: 'polygon',
    fallback: 'arbitrum',
    rpc: {
      polygon: string[],
      arbitrum: string[]
    }
  }
}
```