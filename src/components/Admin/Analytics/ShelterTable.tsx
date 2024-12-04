import React from 'react';
import { Building2, MapPin, Phone, Users, CheckCircle, XCircle } from 'lucide-react';
import { UserBadge } from '../../UserBadge/UserBadge';
import { cn } from '../../../lib/utils';
import type { ShelterProfile } from '../../../lib/types/shelter';

interface ShelterTableProps {
  shelters: ShelterProfile[];
  onVerify?: (id: string) => Promise<void>;
  className?: string;
}

export function ShelterTable({ shelters, onVerify, className }: ShelterTableProps) {
  return (
    <div className={cn("bg-white/10 backdrop-blur-lg rounded-xl p-6", className)}>
      <h3 className="text-lg font-semibold text-white mb-4">Registered Shelters</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-3 text-gray-400 font-medium">Organization</th>
              <th className="pb-3 text-gray-400 font-medium">Location</th>
              <th className="pb-3 text-gray-400 font-medium">Contact</th>
              <th className="pb-3 text-gray-400 font-medium">Capacity</th>
              <th className="pb-3 text-gray-400 font-medium">Status</th>
              <th className="pb-3 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {shelters.map((shelter) => (
              <tr key={shelter.id} className="group hover:bg-white/5">
                <td className="py-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <Building2 className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{shelter.organization}</p>
                      <p className="text-sm text-gray-400">#{shelter.registrationNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{shelter.city}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{shelter.contactPhone}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{shelter.capacity}</span>
                  </div>
                </td>
                <td className="py-4">
                  <UserBadge 
                    role="shelter_admin" 
                    verified={shelter.verified} 
                  />
                </td>
                <td className="py-4">
                  {!shelter.verified && onVerify && (
                    <button
                      onClick={() => onVerify(shelter.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-300 rounded-md hover:bg-green-500/30"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Verify</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}