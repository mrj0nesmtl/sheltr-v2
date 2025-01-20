import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { AUTH_ROLES, UserRole } from '@/types/auth';

// Default icon setup
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

// Common bounds
export const US_BOUNDS = L.latLngBounds([[25.7617, -124.6372], [49.3457, -66.9513]]);
export const NORTH_AMERICA_BOUNDS = L.latLngBounds([[15.7617, -134.6372], [55.3457, -56.9513]]);

// Calculate bounds from array of coordinates
export function calculateBounds(coordinates: Array<[number, number]>) {
  return coordinates.length > 0 
    ? L.latLngBounds(coordinates)
    : US_BOUNDS;
}

// Initialize Leaflet with default icon
export function initializeLeaflet() {
  L.Marker.prototype.options.icon = DefaultIcon;
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

export const DEFAULT_MAP_CONFIG: MapConfig = {
  center: [39.8283, -98.5795], // Center of US
  zoom: 4,
  scrollWheelZoom: false,
  className: 'h-[400px] rounded-lg overflow-hidden',
}; 