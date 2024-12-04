export const DONATION_ALLOCATION = {
  DIRECT_SUPPORT: 0.8,  // 80%
  HOUSING_FUND: 0.15,   // 15%
  OPERATIONS: 0.05      // 5%
} as const;

export const QR_SCANNER_CONFIG = {
  fps: 10,
  qrbox: {
    width: 250,
    height: 250
  }
} as const;