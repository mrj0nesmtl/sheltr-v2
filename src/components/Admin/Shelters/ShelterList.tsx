import { Building2, Check, MapPin, Phone, Shield, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';
import { useShelterStore } from '../../../stores/shelterStore';

interface ShelterListProps {
  className?: string;
}

export function ShelterList({ className }: ShelterListProps) {
  const { t } = useTranslation();
  const { shelters, isLoading, error } = useShelterStore();

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-white/10 rounded w-1/4 mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Registered Shelters</h2>
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
          {shelters.length} Total
        </span>
      </div>

      <div className="grid gap-6">
        {shelters.map((shelter) => (
          <div
            key={shelter.id}
            className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <Building2 className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {shelter.organization}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Registration #{shelter.registrationNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {shelter.verified ? (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">
                    <Check className="h-4 w-4" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-sm">
                    <Shield className="h-4 w-4" />
                    Pending
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="h-5 w-5 text-gray-400" />
                <span>Capacity: {shelter.capacity}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span>{shelter.city}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{shelter.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="h-5 w-5 text-gray-400" />
                <span>{shelter.participantCount || 0} Participants</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Services Offered</h4>
              <div className="flex flex-wrap gap-2">
                {shelter.services.map((service) => (
                  <span
                    key={service}
                    className="px-2 py-1 bg-white/5 text-gray-300 rounded text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}