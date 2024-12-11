import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

interface RoleSpecificStats {
  participant?: {
    housingStatus: string;
    employmentStatus: string;
    totalReceived: number;
    servicesEnrolled: Array<{
      serviceType: string;
      status: string;
      startDate: string;
    }>;
  };
  donor?: {
    totalDonated: number;
    donationCount: number;
    impactScore: number;
    beneficiariesHelped: number;
  };
  admin?: {
    organizationName: string;
    totalParticipants: number;
    activeParticipants: number;
    totalDonations: number;
  };
}

export function RoleSpecificInfo({ role, stats }: { role: string; stats: RoleSpecificStats }) {
  switch (role) {
    case 'participant':
      return (
        <div className="space-y-6">
          <Card>
            <Card.Header>
              <h3 className="text-lg font-medium text-white">Program Status</h3>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Housing Status</p>
                  <p className="text-lg font-medium text-white">
                    {stats.participant?.housingStatus}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Employment Status</p>
                  <p className="text-lg font-medium text-white">
                    {stats.participant?.employmentStatus}
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <h3 className="text-lg font-medium text-white">Services Enrolled</h3>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {stats.participant?.servicesEnrolled.map((service) => (
                  <div key={service.serviceType} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="check-circle" className="text-green-400" />
                      <span className="text-white">{service.serviceType}</span>
                    </div>
                    <span className="text-gray-400">
                      Since {new Date(service.startDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      );

    case 'donor':
      return (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">Donation Impact</h3>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Total Donated</p>
                <p className="text-2xl font-bold text-white">
                  ${stats.donor?.totalDonated.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Impact Score</p>
                <p className="text-2xl font-bold text-indigo-400">
                  {stats.donor?.impactScore}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Donations Made</p>
                <p className="text-2xl font-bold text-white">
                  {stats.donor?.donationCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Lives Impacted</p>
                <p className="text-2xl font-bold text-white">
                  {stats.donor?.beneficiariesHelped}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      );

    case 'admin':
      return (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {stats.admin?.organizationName} Overview
            </h3>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-400">Total Participants</p>
                <p className="text-2xl font-bold text-white">
                  {stats.admin?.totalParticipants}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Participants</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats.admin?.activeParticipants}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Donations</p>
                <p className="text-2xl font-bold text-white">
                  ${stats.admin?.totalDonations.toLocaleString()}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      );

    default:
      return null;
  }
} 