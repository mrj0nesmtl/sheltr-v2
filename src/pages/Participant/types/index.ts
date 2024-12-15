export interface ParticipantStats {
  totalDonations: number;
  programProgress: number;
  milestones: string[];
  // ... other participant-specific types
}

export interface ParticipantProfile {
  id: string;
  firstName: string;
  lastName: string;
  qrCode: string;
  // ... other profile fields
} 