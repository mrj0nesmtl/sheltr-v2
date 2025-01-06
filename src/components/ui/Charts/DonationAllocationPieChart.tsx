import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { MapComponent } from '@/components/ui/Charts/MapComponent';
import { useGeolocation } from '@/hooks/useGeolocation';

// Default North America view
const DEFAULT_LOCATION = {
  city: 'North America',
  coordinates: [43.6532, -79.3832] as [number, number], // Centered on Toronto
  zoom: 4
};

export function DonationAllocationPieChart() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [location, setLocation] = useState<{
    city: string;
    coordinates: [number, number];
    zoom: number;
  }>(DEFAULT_LOCATION);
  
  const { coordinates, city, error } = useGeolocation();

  useEffect(() => {
    if (coordinates && city) {
      setLocation({
        city,
        coordinates,
        zoom: 12 // Closer zoom for local view
      });
    } else if (error) {
      console.log('Geolocation error, using default view:', error);
      setLocation(DEFAULT_LOCATION);
    }
  }, [coordinates, city, error]);

  // Sample data - in production this would be fetched based on location
  const mockDonationData = [
    { 
      category: 'Food Programs', 
      amount: 45000, 
      percentage: 35,
      color: '#60A5FA',
    },
    { 
      category: 'Shelter Operations', 
      amount: 38000, 
      percentage: 30,
      color: '#F59E0B',
    },
    { 
      category: 'Medical Aid', 
      amount: 25000, 
      percentage: 20,
      color: '#10B981',
    },
    { 
      category: 'Education', 
      amount: 15000, 
      percentage: 15,
      color: '#EF4444',
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center justify-between">
        <span>
          {location === DEFAULT_LOCATION ? 'Regional' : 'Local'} Donation Allocation
        </span>
        <span className="text-sm text-gray-400">
          {location.city}
        </span>
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="relative h-[300px]">
          <PieChart
            data={mockDonationData.map(item => ({
              title: item.category,
              value: item.percentage,
              color: item.color
            }))}
            animate
            animationDuration={500}
            label={({ dataEntry }) => `${dataEntry.percentage}%`}
            labelStyle={{ fontSize: '5px', fill: '#fff' }}
            onClick={(_, index) => setActiveCategory(mockDonationData[index])}
          />
        </div>

        {/* Map View - Always shows something */}
        <div className="h-[300px] rounded-lg overflow-hidden">
          <MapComponent
            center={location.coordinates}
            zoom={location.zoom}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {mockDonationData.map((item) => (
          <div 
            key={item.category}
            className={`bg-gray-800/40 p-4 rounded-lg cursor-pointer transition-all
              ${activeCategory?.category === item.category ? 'ring-2 ring-blue-500' : ''}
            `}
            onClick={() => setActiveCategory(item)}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-300">{item.category}</span>
              <span className="text-gray-400">{item.percentage}%</span>
            </div>
            <p className="text-2xl font-semibold text-gray-200">
              ${item.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}