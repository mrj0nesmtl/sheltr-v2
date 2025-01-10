# 📱 SHELTR QR System
*Version: 0.5.8 - January 12, 2025*
*Status: STABLE* 🟢

## System Overview
The SHELTR QR system enables direct participant-to-donor connections through secure, trackable QR codes. Each code is uniquely linked to a participant and their associated shelter, enabling immediate donations upon scanning.

## QR Code Structure
```typescript
interface QRCode {
  id: string;              // Unique identifier
  participantId: string;   // Linked participant
  shelterId: string;      // Associated shelter
  status: QRStatus;       // Current code status
  metadata: QRMetadata;   // Additional information
  createdAt: Date;        // Generation timestamp
  expiresAt?: Date;       // Optional expiration
}

type QRStatus = 
  | 'active'      // Code is valid and usable
  | 'suspended'   // Temporarily disabled
  | 'expired'     // Past expiration date
  | 'revoked';    // Permanently disabled

interface QRMetadata {
  location?: GeolocationData;  // Generation location
  device: string;             // Creating device
  scanCount: number;          // Times scanned
  lastScan?: Date;           // Last scan timestamp
  participantInfo: {         // Embedded participant data
    id: string;             // Anonymized ID
    shelterId: string;      // Associated shelter
    programIds: string[];   // Active programs
  }
}
```

## QR Generation System
```typescript
interface QRGenerator {
  generateForParticipant: (
    participantId: string,
    options?: GenerationOptions
  ) => Promise<QRCode>;
  
  generateForShelter: (
    shelterId: string,
    participantIds: string[],
    options?: BatchOptions
  ) => Promise<QRCode[]>;
}

interface GenerationOptions {
  expiration?: Date;
  metadata?: Record<string, unknown>;
  format?: QRFormat;
  security?: SecurityOptions;
}

interface BatchOptions extends GenerationOptions {
  batchSize: number;
  prefix?: string;
  customization?: BatchCustomization;
}
```

## Scanner Implementation
```typescript
interface QRScanner {
  onScan: (result: ScanResult) => Promise<void>;
  onError: (error: ScanError) => void;
  config: ScannerConfig;
}

interface ScanResult {
  qrData: string;           // Raw QR data
  participantId: string;    // Decoded participant ID
  shelterId: string;       // Associated shelter
  timestamp: Date;         // Scan timestamp
  location?: GeolocationData; // Scan location
  scannerInfo: {
    deviceId: string;
    platform: string;
    app_version: string;
  }
}

interface ScannerConfig {
  enabled: boolean;
  facing: 'environment' | 'user';
  constraints: MediaTrackConstraints;
  validation: ValidationOptions;
}
```

## Donation Flow
```typescript
interface QRDonationFlow {
  initiateDonation: (
    scanResult: ScanResult,
    donorId: string
  ) => Promise<DonationSession>;
  
  validateParticipant: (
    participantId: string
  ) => Promise<ValidationResult>;
  
  processDonation: (
    sessionId: string,
    amount: number
  ) => Promise<TransactionResult>;
}

interface DonationSession {
  id: string;
  participantId: string;
  shelterId: string;
  donorId: string;
  status: SessionStatus;
  expiresAt: Date;
}
```

## Security Features
```typescript
interface SecurityMeasures {
  encryption: {
    algorithm: 'AES-256-GCM';
    keyRotation: boolean;
    saltRounds: number;
  };
  validation: {
    checksums: boolean;
    timeBasedTokens: boolean;
    geoFencing?: boolean;
  };
  rateLimit: {
    scanLimit: number;
    timeWindow: number;
    cooldown: number;
  }
}
```

## Database Schema
```typescript
interface QRDatabase {
  tables: {
    qr_codes: {
      id: string;
      participant_id: string;
      shelter_id: string;
      status: QRStatus;
      metadata: JsonB;
      created_at: Timestamp;
      expires_at?: Timestamp;
    };
    qr_scans: {
      id: string;
      qr_code_id: string;
      donor_id?: string;
      timestamp: Timestamp;
      location?: GeolocationData;
      resulted_in_donation: boolean;
    };
    donations: {
      id: string;
      scan_id: string;
      donor_id: string;
      participant_id: string;
      amount: number;
      status: TransactionStatus;
    }
  };
  
  indexes: [
    'qr_codes_participant_id_idx',
    'qr_codes_shelter_id_idx',
    'qr_scans_qr_code_id_idx',
    'donations_scan_id_idx'
  ];
}
```

## Implementation Status
1. QR Generation (✅ IMPLEMENTED)
   - Participant code generation
   - Shelter batch generation
   - Metadata embedding
   - Security features

2. Scanner System (✅ IMPLEMENTED)
   - Camera integration
   - Code recognition
   - Validation system
   - Error handling

3. Donation Flow (🟡 IN PROGRESS)
   - Scan-to-donate pipeline
   - Participant validation
   - Transaction processing
   - Receipt generation

4. Database Integration (🟡 IN PROGRESS)
   - Schema implementation
   - Index optimization
   - Query performance
   - Data consistency

## Next Steps
1. Complete database integration
2. Optimize scan performance
3. Enhance error handling
4. Add analytics tracking
5. Implement batch operations
6. Add monitoring system

---
*For implementation details, see [implementation-guide.md](../guides/implementation-guide.md)*
