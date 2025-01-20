import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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
  locations: Location[];
}

export function GlobalDonationMap({ locations }: GlobalDonationMapProps) {
  // Calculate bounds from locations or use default US bounds
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