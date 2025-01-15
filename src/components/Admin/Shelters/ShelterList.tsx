import React, { useState, useEffect } from 'react';
import { Table } from '@/components/ui/Table';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { supabase, db } from '@/lib/supabase';
import { Building2, Loader2 } from 'lucide-react';

interface Shelter {
  id: string;
  name: string;
  location: string;
  capacity: number;
  occupancy: number;
  status: string;
  lastUpdated: string;
}

export const ShelterList = () => {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        console.log('Fetching shelters...');
        
        const { data, error } = await supabase
          .from('organizations')
          .select(`
            id,
            name,
            city,
            total_capacity,
            current_capacity,
            status,
            created_at,
            updated_at,
            verified,
            services
          `)
          .eq('verified', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Shelter fetch error:', error);
          return;
        }
        
        console.log('Fetched shelters:', data);
        
        if (data) {
          const formattedShelters = data.map(shelter => ({
            id: shelter.id,
            name: shelter.name,
            location: shelter.city || 'Location pending',
            capacity: shelter.total_capacity || 0,
            occupancy: shelter.current_capacity || 0,
            status: shelter.status,
            lastUpdated: new Date(shelter.updated_at).toLocaleDateString()
          }));
          setShelters(formattedShelters);
          setLoading(false);
        }
      } catch (error) {
        console.error('Shelter list fetch error:', error);
        setLoading(false);
      }
    };

    fetchShelters();

    const subscription = supabase
      .channel('shelter_updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'shelters' },
        (payload) => {
          fetchShelters();
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="text-xl font-semibold text-white">Registered Shelters</h2>
        <span className="text-sm text-gray-400">
          {shelters.length} total
        </span>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-40 bg-gray-800/50 rounded-lg">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          <span className="ml-3 text-gray-400">Loading shelters...</span>
        </div>
      ) : shelters.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 bg-gray-800/50 rounded-lg border border-dashed border-gray-700">
          <Building2 className="w-12 h-12 text-gray-600 mb-3" />
          <p className="text-gray-400 text-center">No shelters registered yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Registered shelters will appear here
          </p>
        </div>
      ) : (
        <Table
          data={shelters}
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Location', accessor: 'location' },
            { header: 'Capacity', accessor: 'capacity' },
            { header: 'Occupancy', accessor: 'occupancy' },
            { header: 'Status', accessor: 'status' },
            { header: 'Last Updated', accessor: 'lastUpdated' }
          ]}
        />
      )}
    </div>
  );
};