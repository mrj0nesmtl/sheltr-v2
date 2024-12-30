import 'leaflet/dist/leaflet.css';
import { Building2, Phone, Users } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import type { ShelterProfile } from '../../../lib/types/shelter';
import { UserBadge } from '../../UserBadge/UserBadge';

interface ShelterMapProps {
  shelters: ShelterProfile[];
  className?: string;
}

export function ShelterMap({ shelters, className }: ShelterMapProps) {
  // Default center to North America
  const defaultCenter = { lat: 40.7128, lng: -74.0060 };
  
  return (
    <div className={className}>
      <MapContainer
        center={defaultCenter}
        zoom={4}
        className="h-full w-full rounded-lg"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {shelters.map((shelter) => (
          <Marker
            key={shelter.id}
            position={[
              // In real app, would need to geocode addresses to get lat/lng
              defaultCenter.lat + Math.random() * 20 - 10,
              defaultCenter.lng + Math.random() * 40 - 20
            ]}
          >
            <Popup className="shelter-popup">
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-indigo-500" />
                  <h3 className="font-semibold">{shelter.organization}</h3>
                </div>
                <div className="mb-2">
                  <UserBadge role="shelter_admin" verified={shelter.verified} />
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Capacity: {shelter.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{shelter.contactPhone}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}