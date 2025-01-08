import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { MapComponent } from '@/components/ui/Charts/MapComponent';
import { useGeolocation } from '@/hooks/useGeolocation';

export function DonationAllocationPieChart() {
  const [activeCategory, setActiveCategory] = useState(null);
  const { coordinates, city, error } = useGeolocation();
  
  const location = {
    city: city || 'Montreal',
    coordinates: coordinates || [45.5017, -73.5673],
    zoom: 9
  };

  // Sample data
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
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          Local Donation Allocation
        </h2>
        <span className="text-sm text-gray-400">{location.city}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left side: Pie Chart */}
        <div className="relative h-[200px]">
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

        {/* Right side: Map */}
        <div className="h-[200px] rounded-lg overflow-hidden">
          <MapComponent
            center={location.coordinates}
            zoom={location.zoom}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {mockDonationData.map((item) => (
          <div 
            key={item.category}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">{item.category}</span>
              <span className="text-sm text-gray-400">{item.percentage}%</span>
            </div>
            <p className="text-lg font-semibold text-white">
              ${item.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}