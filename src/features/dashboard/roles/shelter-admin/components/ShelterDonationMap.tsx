import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from 'react-leaflet'
import { motion } from 'framer-motion'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

interface ParticipantLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lastDonation?: number;
  totalDonations?: number;
}

interface ShelterDonationMapProps {
  shelterLocation: {
    name: string;
    lat: number;
    lng: number;
    totalDonations: number;
  };
  participants?: ParticipantLocation[];
}

// Custom shelter icon
const shelterIcon = new Icon({
  iconUrl: '/icons/shelter-marker.svg', // Make sure to add this icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const ShelterDonationMap = ({ 
  shelterLocation,
  participants = []
}: ShelterDonationMapProps) => {
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