export interface Organization {
  id: string;
  name: string;
  registrationNumber: string;
  status: 'pending' | 'active' | 'suspended';
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Organization Details
  address?: string;
  city?: string;
  postalCode?: string;
  country: string;
  phone?: string;
  email: string;
  website?: string;
  
  // Capacity Management
  totalCapacity: number;
  currentCapacity: number;
  
  // Compliance
  taxId?: string;
  verificationDate?: string;
  verifiedBy?: string;
  lastAuditDate?: string;
  
  // Services
  services: string[];
  metadata: Record<string, any>;
  logoUrl?: string;
}

export interface OrganizationStaff {
  id: string;
  organizationId: string;
  userId: string;
  role: 'admin' | 'staff' | 'volunteer';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  permissions: Record<string, boolean>;
}

export interface ExtendedParticipant {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  total_received?: number;
  last_activity?: string;
} 