import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  userId?: string;
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    name: string;
  }>;
}

export const MapComponent: React.FC<MapComponentProps> = ({ 
  center = [45.5017, -73.5673],
  zoom = 12,
  markers = []
}) => {
  return (
    <div className="h-[300px] rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={[marker.lat, marker.lng]}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Also add a default export if needed
export default MapComponent; 