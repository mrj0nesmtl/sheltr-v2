import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { motion } from 'framer-motion'
import 'leaflet/dist/leaflet.css'

interface ShelterLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  amount: number;
}

interface GlobalDonationMapProps {
  shelterLocations: ShelterLocation[];
  initialView?: {
    center: [number, number];
    zoom: number;
  };
}

export const GlobalDonationMap = ({ 
  shelterLocations,
  initialView = {
    center: [45.5017, -73.5673] as [number, number],
    zoom: 13
  }
}: GlobalDonationMapProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-[400px] w-full rounded-lg overflow-hidden"
    >
      <MapContainer
        center={initialView.center}
        zoom={initialView.zoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />
        {shelterLocations.map((shelter) => (
          <CircleMarker
            key={shelter.id}
            center={[shelter.lat, shelter.lng]}
            radius={8}
            fillColor="#EF4444"
            color="#ffffff"
            weight={1}
            opacity={1}
            fillOpacity={0.8}
          >
            <Popup>
              <div className="bg-slate-800 p-3 rounded-lg shadow-lg">
                <p className="text-white font-medium">{shelter.name}</p>
                <p className="text-sm text-emerald-400">Monthly Donations: ${shelter.amount.toLocaleString()}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </motion.div>
  )
} 