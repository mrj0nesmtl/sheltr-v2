import React, { useState } from 'react';
import { Table } from '@/components/ui/Table';

const mockShelters = [
  {
    id: 'sh_001',
    name: 'Hope Haven',
    location: 'Montreal, QC',
    capacity: 150,
    occupancy: 85,
    status: 'Active',
    lastUpdated: '2024-01-02'
  },
  {
    id: 'sh_002',
    name: 'Mercy House',
    location: 'Montreal, QC',
    capacity: 200,
    occupancy: 165,
    status: 'Active',
    lastUpdated: '2024-01-02'
  },
  {
    id: 'sh_003',
    name: 'Safe Harbor',
    location: 'Montreal, QC',
    capacity: 100,
    occupancy: 72,
    status: 'Active',
    lastUpdated: '2024-01-02'
  }
];

export function ShelterList() {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filter, setFilter] = useState('');

  const sortedShelters = [...mockShelters]
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    })
    .filter(shelter => 
      shelter.name.toLowerCase().includes(filter.toLowerCase()) ||
      shelter.location.toLowerCase().includes(filter.toLowerCase())
    );

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">Registered Shelters</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search shelters..."
            className="px-3 py-2 bg-gray-800/40 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <span className="text-sm text-gray-400">{sortedShelters.length} Total</span>
        </div>
      </div>
      <div className="bg-gray-800/40 rounded-lg overflow-hidden">
        <Table>
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Capacity</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Occupancy</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {sortedShelters.map((shelter) => (
              <tr key={shelter.id} className="hover:bg-gray-700/25 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-300">{shelter.name}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{shelter.location}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{shelter.capacity}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{shelter.occupancy}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                    {shelter.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{shelter.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}