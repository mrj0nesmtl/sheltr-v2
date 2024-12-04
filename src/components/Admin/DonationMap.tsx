import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { formatDistance } from 'date-fns';

interface DonationLocation {
  id: string;
  lat: number;
  lng: number;
  amount: number;
  participant_name: string;
  created_at: string;
}

interface DonationMapProps {
  donations: DonationLocation[];
}

export function DonationMap({ donations }: DonationMapProps) {
  return (
    <div className="h-[400px] rounded-xl overflow-hidden">
      <MapContainer
        center={[40.7128, -74.0060]} // Default to NYC
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {donations.map((donation) => (
          <Marker key={donation.id} position={[donation.lat, donation.lng]}>
            <Popup>
              <div className="p-2">
                <p className="font-semibold">${donation.amount.toFixed(2)}</p>
                <p className="text-sm">To: {donation.participant_name}</p>
                <p className="text-xs text-gray-500">
                  {formatDistance(new Date(donation.created_at), new Date(), { addSuffix: true })}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}