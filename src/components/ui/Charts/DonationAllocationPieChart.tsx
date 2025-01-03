import React, { useState, Suspense, lazy } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

// Lazy load map components
const MapComponent = lazy(() => import('./MapComponent'));

const mockDonationData = [
  { 
    category: 'Food Programs', 
    amount: 45000, 
    percentage: 35,
    color: '#60A5FA',
    locations: [
      { lat: 45.5017, lng: -73.5673, name: 'Montreal Food Bank' },
      { lat: 45.5088, lng: -73.5878, name: 'Hope Kitchen' }
    ]
  },
  { 
    category: 'Shelter Operations', 
    amount: 38000, 
    percentage: 30,
    color: '#F59E0B',
    locations: []
  },
  { 
    category: 'Medical Aid', 
    amount: 25000, 
    percentage: 20,
    color: '#10B981',
    locations: []
  },
  { 
    category: 'Education', 
    amount: 15000, 
    percentage: 15,
    color: '#EF4444',
    locations: []
  }
];

export function DonationAllocationPieChart() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Donation Allocation</h3>
      
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

        {/* Map View with Suspense */}
        <Suspense fallback={
          <div className="h-[300px] flex items-center justify-center bg-gray-800/50 rounded-lg">
            <span className="text-gray-400">Loading map...</span>
          </div>
        }>
          <MapComponent activeCategory={activeCategory} />
        </Suspense>
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