import { Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlobalDonationMap } from '@/features/dashboard/roles/shelter-admin/components/GlobalDonationMap';

export function GlobalImpactSection() {
  // Sample data for the map
  const SHELTER_LOCATIONS = [
    {
      id: '1',
      name: 'Downtown Shelter',
      lat: 40.7128,
      lng: -74.0060,
      city: 'New York',
      state: 'NY',
      donations: 125000,
    },
    {
      id: '2',
      name: 'Harbor Hope',
      lat: 42.3601,
      lng: -71.0589,
      city: 'Boston',
      state: 'MA',
      donations: 98000,
    },
    {
      id: '3',
      name: 'Mission Center',
      lat: 41.8781,
      lng: -87.6298,
      city: 'Chicago',
      state: 'IL',
      donations: 156000,
    }
  ];

  return (
    <section id="global-impact" className="py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Globe2 className="w-6 h-6 mr-2" />
          Global Impact
        </h2>
        
        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-sm text-gray-400">Total Shelters</h3>
            <p className="text-2xl font-bold text-white">48</p>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-sm text-gray-400">Countries</h3>
            <p className="text-2xl font-bold text-white">12</p>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-sm text-gray-400">Total Donations</h3>
            <p className="text-2xl font-bold text-white">$789K</p>
          </div>
        </div>

        {/* Map */}
        <div className="h-[400px] rounded-lg overflow-hidden">
          <GlobalDonationMap locations={SHELTER_LOCATIONS} />
        </div>

        {/* Legend or additional info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Active Shelters
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Recent Donations
          </div>
        </div>
      </motion.div>
    </section>
  );
} 