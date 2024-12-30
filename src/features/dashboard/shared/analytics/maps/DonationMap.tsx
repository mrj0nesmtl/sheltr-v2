import { formatDistance } from 'date-fns';
import 'leaflet/dist/leaflet.css';
import { DollarSign, User } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { cn } from '../../lib/utils';

// Fix for default marker icons in React Leaflet
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  lat: number;
  lng: number;
}

interface DonationMarker {
  id: string;
  location: Location;
  amount: number;
  participantName: string;
  timestamp: string;
  type: 'donation' | 'participant';
}

interface DonationMapProps {
  markers: DonationMarker[];
  className?: string;
}

export function DonationMap({ markers = [], className }: DonationMapProps) {
  // Default center to North America if no markers
  
  // Calculate bounds from markers or use default
  const bounds = markers.length > 0 
    ? L.latLngBounds(markers.map(m => [m.location.lat, m.location.lng]))
    : L.latLngBounds([[25.7617, -124.6372], [49.3457, -66.9513]]); // North America bounds

  return (
    <div className={cn("h-[400px] rounded-xl overflow-hidden", className)}>
      <MapContainer
        bounds={bounds}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.location.lat, marker.location.lng]}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-1">
                  {marker.type === 'donation' ? (
                    <DollarSign className="h-4 w-4 text-green-600" />
                  ) : (
                    <User className="h-4 w-4 text-blue-600" />
                  )}
                  <span className="font-semibold">
                    {marker.type === 'donation' ? (
                      `$${marker.amount.toFixed(2)}`
                    ) : (
                      'Participant'
                    )}
                  </span>
                </div>
                <p className="text-sm">To: {marker.participantName}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistance(new Date(marker.timestamp), new Date(), { addSuffix: true })}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}