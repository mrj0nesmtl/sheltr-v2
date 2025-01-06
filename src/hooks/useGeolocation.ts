import { useState, useEffect } from 'react';

interface GeolocationState {
  coordinates: [number, number] | null;
  city: string | null;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    city: null,
    error: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported' }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];

        // Reverse geocoding to get city name
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`
          );
          const data = await response.json();
          
          setState({
            coordinates: coords,
            city: data.address.city || data.address.town || 'Unknown location',
            error: null
          });
        } catch (error) {
          setState({
            coordinates: coords,
            city: 'Unknown location',
            error: 'Could not determine city'
          });
        }
      },
      (error) => {
        setState(prev => ({ ...prev, error: error.message }));
      }
    );
  }, []);

  return state;
} 