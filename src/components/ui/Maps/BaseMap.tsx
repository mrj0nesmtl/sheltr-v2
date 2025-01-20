import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ReactNode } from 'react';
import { DEFAULT_MAP_CONFIG, MapConfig, initializeLeaflet } from '@/features/shared/maps/utils';

// Initialize Leaflet once
initializeLeaflet();

interface BaseMapProps extends Partial<MapConfig> {
  children?: ReactNode;
}

export function BaseMap({ 
  children,
  center = DEFAULT_MAP_CONFIG.center,
  zoom = DEFAULT_MAP_CONFIG.zoom,
  bounds,
  scrollWheelZoom = DEFAULT_MAP_CONFIG.scrollWheelZoom,
  className = DEFAULT_MAP_CONFIG.className,
  height
}: BaseMapProps) {
  return (
    <div className={className} style={height ? { height } : undefined}>
      <MapContainer
        center={center}
        zoom={zoom}
        bounds={bounds}
        scrollWheelZoom={scrollWheelZoom}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {children}
      </MapContainer>
    </div>
  );
} 