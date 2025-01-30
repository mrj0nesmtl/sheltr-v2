import L from 'leaflet';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { AUTH_ROLES, UserRole } from '@/types/auth';

// Shared utility functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// Map configuration types
export interface MapConfig {
  center?: [number, number];
  zoom?: number;
  bounds?: L.LatLngBounds;
  scrollWheelZoom?: boolean;
  className?: string;
  height?: string;
}

// Default map configuration
export const DEFAULT_MAP_CONFIG: MapConfig = {
  center: [39.8283, -98.5795], // Center of US
  zoom: 4,
  scrollWheelZoom: false,
  className: cn('h-[400px]', 'rounded-lg', 'overflow-hidden', 'shadow-sm'),
};

// Default icon configuration
export const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Role-specific marker colors
export const ROLE_MARKER_COLORS: Record<UserRole, string> = {
  [AUTH_ROLES.SUPER_ADMIN]: '#FF0000', // Red
  [AUTH_ROLES.SHELTER_ADMIN]: '#4F46E5', // Indigo
  [AUTH_ROLES.DONOR]: '#10B981', // Green
  [AUTH_ROLES.PARTICIPANT]: '#F59E0B', // Yellow
};

// Custom marker icons based on role
export const MARKER_ICONS = {
  SHELTER: new L.Icon({
    ...DefaultIcon.options,
    iconUrl: `/images/markers/${AUTH_ROLES.SHELTER_ADMIN.toLowerCase()}-marker.png`,
  }),
  DONATION: new L.Icon({
    ...DefaultIcon.options,
    iconUrl: `/images/markers/${AUTH_ROLES.DONOR.toLowerCase()}-marker.png`,
  }),
  PARTICIPANT: new L.Icon({
    ...DefaultIcon.options,
    iconUrl: `/images/markers/${AUTH_ROLES.PARTICIPANT.toLowerCase()}-marker.png`,
  })
};

// Common map bounds
export const US_BOUNDS = L.latLngBounds([[25.7617, -124.6372], [49.3457, -66.9513]]);
export const NORTH_AMERICA_BOUNDS = L.latLngBounds([[15.7617, -134.6372], [55.3457, -56.9513]]);

// Initialize Leaflet with default settings
export function initializeLeaflet() {
  // Fix Leaflet's icon paths
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Marker.prototype.options.icon = DefaultIcon;
}

// Helper to create bounds from markers
export function calculateBounds(coordinates: Array<[number, number]>) {
  return coordinates.length > 0 
    ? L.latLngBounds(coordinates)
    : US_BOUNDS;
}

// Helper to create marker options based on role
export function getMarkerOptions(role: UserRole) {
  return {
    icon: MARKER_ICONS[role.toUpperCase()] || DefaultIcon,
    color: ROLE_MARKER_COLORS[role]
  };
} 