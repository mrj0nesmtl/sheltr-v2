import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Fix for default marker icons in React Leaflet
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
  id: string;
  name: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  donations: number;
}

interface GlobalDonationMapProps {
  shelterId: string;
}

export function GlobalDonationMap({ shelterId }: GlobalDonationMapProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDonationLocations = async () => {
      try {
        // Get organization location first
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('id, name, city, state')
          .eq('id', shelterId)
          .single();

        if (orgError) throw orgError;

        // Get donation data
        const { data: donationsData, error: donationsError } = await supabase
          .from('donations')
          .select('amount')
          .eq('organization_id', shelterId);

        if (donationsError) throw donationsError;

        // For now, use a default location if we don't have real coordinates
        const totalDonations = donationsData?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;

        setLocations([{
          id: orgData.id,
          name: orgData.name,
          lat: 40.7128, // Default to NYC coordinates for now
          lng: -74.0060, // You should replace these with real coordinates
          city: orgData.city || 'Unknown',
          state: orgData.state || 'Unknown',
          donations: totalDonations
        }]);
      } catch (err) {
        console.error('Error loading donation locations:', err);
        setError('Failed to load donation locations');
      } finally {
        setLoading(false);
      }
    };

    loadDonationLocations();
  }, [shelterId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Default to US bounds if no locations
  const bounds = locations.length > 0 
    ? L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]))
    : L.latLngBounds([[25.7617, -124.6372], [49.3457, -66.9513]]); // US bounds

  return (
    <MapContainer
      bounds={bounds}
      className="h-[400px] rounded-lg"
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{location.name}</h3>
              <p className="text-sm">{location.city}, {location.state}</p>
              <p className="font-bold mt-1">${location.donations.toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 