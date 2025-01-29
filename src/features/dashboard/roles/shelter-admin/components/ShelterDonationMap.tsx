import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from 'react-leaflet'
import { motion } from 'framer-motion'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface ParticipantLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lastDonation?: number;
  totalDonations?: number;
}

interface ShelterDonationMapProps {
  shelterId: string;
}

// Custom shelter icon
const shelterIcon = new Icon({
  iconUrl: '/icons/shelter-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const ShelterDonationMap = ({ shelterId }: ShelterDonationMapProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shelterLocation, setShelterLocation] = useState<{
    name: string;
    lat: number;
    lng: number;
    totalDonations: number;
    status: string;
  } | null>(null);
  const [participants, setParticipants] = useState<ParticipantLocation[]>([]);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        // Update query to use only existing columns
        const { data: shelter, error: shelterError } = await supabase
          .from('organizations')
          .select(`
            id, 
            name,
            status,
            current_capacity
          `)
          .eq('id', shelterId)
          .single();

        if (shelterError) throw shelterError;

        // For now, use default coordinates
        const shelterData = {
          name: shelter.name,
          lat: 40.7128, // Default NYC coordinates
          lng: -74.0060,
          totalDonations: 0,
          status: shelter.status
        };

        // Get participants data
        const { data: participantsData, error: participantsError } = await supabase
          .from('organization_participants')
          .select(`
            participant_id,
            participants (
              id,
              name
            )
          `)
          .eq('organization_id', shelterId);

        if (participantsError) throw participantsError;

        // Transform participants data
        const mappedParticipants: ParticipantLocation[] = participantsData.map((p: any) => ({
          id: p.participants.id,
          name: p.participants.name,
          lat: 40.7128 + (Math.random() - 0.5) * 0.1, // Random spread around shelter
          lng: -74.0060 + (Math.random() - 0.5) * 0.1,
          lastDonation: 0,
          totalDonations: 0
        }));

        setShelterLocation(shelterData);
        setParticipants(mappedParticipants);
      } catch (err) {
        console.error('Error loading map data:', err);
        setError('Failed to load map data');
      } finally {
        setLoading(false);
      }
    };

    loadMapData();
  }, [shelterId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!shelterLocation) return <div className="text-yellow-500">No location data available</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[400px] w-full rounded-lg overflow-hidden"
    >
      <MapContainer
        center={[shelterLocation.lat, shelterLocation.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />
        
        {/* Shelter Marker */}
        <Marker
          position={[shelterLocation.lat, shelterLocation.lng]}
          icon={shelterIcon}
        >
          <Popup>
            <div className="bg-slate-800 p-3 rounded-lg shadow-lg">
              <p className="text-white font-medium">{shelterLocation.name}</p>
              <p className="text-sm text-emerald-400">
                Total Donations: ${shelterLocation.totalDonations.toLocaleString()}
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Participant Markers */}
        {participants.map((participant) => (
          <CircleMarker
            key={participant.id}
            center={[participant.lat, participant.lng]}
            radius={6}
            fillColor="#60A5FA"
            color="#ffffff"
            weight={1}
            opacity={1}
            fillOpacity={0.8}
          >
            <Popup>
              <div className="bg-slate-800 p-3 rounded-lg shadow-lg">
                <p className="text-white font-medium">{participant.name}</p>
                {participant.lastDonation && (
                  <p className="text-sm text-gray-400">
                    Last Donation: ${participant.lastDonation.toLocaleString()}
                  </p>
                )}
                {participant.totalDonations && (
                  <p className="text-sm text-emerald-400">
                    Total: ${participant.totalDonations.toLocaleString()}
                  </p>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </motion.div>
  )
} 