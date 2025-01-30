import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ReactNode } from 'react';
import { DEFAULT_MAP_CONFIG, MapConfig, initializeLeaflet } from '@/features/shared/maps/utils';

// Initialize Leaflet once
initializeLeaflet();

interface BaseMapProps extends Partial<MapConfig> {
  children?: ReactNode;
  onMapLoad?: (map: L.Map) => void;
  markers?: Array<{
    position: [number, number];
    popup?: string;
    icon?: L.Icon;
  }>;
  customControls?: ReactNode;
  interactive?: boolean;
}

export function BaseMap({ 
  children,
  center = DEFAULT_MAP_CONFIG.center,
  zoom = DEFAULT_MAP_CONFIG.zoom,
  bounds,
  scrollWheelZoom = DEFAULT_MAP_CONFIG.scrollWheelZoom,
  className = DEFAULT_MAP_CONFIG.className,
  height,
  onMapLoad,
  markers = [],
  customControls,
  interactive = true
}: BaseMapProps) {
  return (
    <div className={`relative ${className}`} style={height ? { height } : undefined}>
      <MapContainer
        center={center}
        zoom={zoom}
        bounds={bounds}
        scrollWheelZoom={scrollWheelZoom && interactive}
        dragging={interactive}
        className="h-full w-full rounded-lg shadow-sm"
        whenCreated={onMapLoad}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {children}
        {customControls}
      </MapContainer>
    </div>
  );
} 