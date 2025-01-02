import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { analyticsTheme } from '../utils/theme';

interface DonationMapProps {
  height?: number;
  initialView?: {
    center: [number, number];
    zoom: number;
  };
}

export function DonationMap({ 
  height = 400,
  initialView = { center: [-96, 37.8], zoom: 3 }
}: DonationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: initialView.center,
      zoom: initialView.zoom
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div 
      ref={mapContainer} 
      style={{ height }} 
      className="w-full rounded-lg overflow-hidden"
    />
  );
} 