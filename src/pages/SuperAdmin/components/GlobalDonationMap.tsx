import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/lib/supabase';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface DonationLocation {
  id: string;
  lat: number;
  lng: number;
  amount: number;
  donorCount: number;
}

export function GlobalDonationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 3
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Clean up
    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    const fetchDonationLocations = async () => {
      const { data: locations } = await supabase
        .from('donation_locations')
        .select('*');

      if (locations && map.current) {
        locations.forEach((location: DonationLocation) => {
          // Create a marker element
          const el = document.createElement('div');
          el.className = 'donation-marker';
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = 'rgba(129, 140, 248, 0.6)';
          el.style.border = '2px solid #818CF8';

          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat([location.lng, location.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <p class="font-bold">$${location.amount.toLocaleString()}</p>
                    <p class="text-sm">${location.donorCount} donors</p>
                  </div>
                `)
            )
            .addTo(map.current);
        });
      }
    };

    fetchDonationLocations();
  }, []);

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-medium text-white">Global Donation Map</h3>
      </Card.Header>
      <Card.Content>
        <div ref={mapContainer} className="h-[400px] rounded-lg" />
      </Card.Content>
    </Card>
  );
} 