import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { motion } from 'framer-motion'
import 'leaflet/dist/leaflet.css'

const MONTREAL_COORDS = {
  lat: 45.5017,
  lng: -73.5673,
  zoom: 13
}

// Real shelter locations in Montreal
const SHELTER_LOCATIONS = [
  { id: '1', name: 'Mission Old Brewery', lat: 45.5119, lng: -73.5596, amount: 2500 },
  { id: '2', name: 'Welcome Hall Mission', lat: 45.4897, lng: -73.5785, amount: 1800 },
  { id: '3', name: 'Maison du Père', lat: 45.5167, lng: -73.5623, amount: 2100 },
  { id: '4', name: 'Accueil Bonneau', lat: 45.5097, lng: -73.5524, amount: 1500 },
  { id: '5', name: 'Mission Bon Accueil', lat: 45.4889, lng: -73.5717, amount: 1900 },
  { id: '6', name: 'La rue des Femmes', lat: 45.5139, lng: -73.5647, amount: 1700 },
  { id: '7', name: 'Dans la rue', lat: 45.5181, lng: -73.5625, amount: 1600 },
  { id: '8', name: 'Le Chainon', lat: 45.5156, lng: -73.5797, amount: 2200 },
  { id: '9', name: 'CARE Montreal', lat: 45.5233, lng: -73.5545, amount: 1400 },
  { id: '10', name: 'Refuge des Jeunes', lat: 45.5167, lng: -73.5551, amount: 1950 },
  { id: '11', name: "Saint Michael's Mission", lat: 45.5003, lng: -73.5744, amount: 1650 },
  { id: '12', name: 'Mission of the Great Shepherd', lat: 45.4925, lng: -73.5524, amount: 2300 }
]

export const GlobalDonationMap = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-[400px] w-full rounded-lg overflow-hidden"
    >
      <h3 className="text-lg font-medium text-white mb-2">Montreal Shelter Network</h3>
      <p className="text-sm text-gray-400 mb-4">Active donation locations</p>
      
      <MapContainer
        center={[MONTREAL_COORDS.lat, MONTREAL_COORDS.lng]}
        zoom={MONTREAL_COORDS.zoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />
        {SHELTER_LOCATIONS.map((shelter) => (
          <motion.div
            key={shelter.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CircleMarker
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
          </motion.div>
        ))}
      </MapContainer>
    </motion.div>
  )
} 