import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { QRCode } from '@/components/ui/QRCode';
import { useTranslation } from 'react-i18next';

interface Participant {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: Date;
  totalReceived: number;
  qrCode: string;
  loginToken?: string;
}

interface ParticipantListProps {
  participants: Participant[];
  onViewDetails: (id: string) => void;
}

export function ParticipantList({ participants, onViewDetails }: ParticipantListProps) {
  const { t } = useTranslation();

  const getStatusBadge = (status: Participant['status']) => {
    const styles = {
      active: 'bg-green-500/10 text-green-400 border-green-500/20',
      inactive: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };
    return styles[status];
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">
          {t('admin.shelter.participants.title')}
        </h3>
        <Button variant="outline" size="sm">
          <Icon name="user-plus" className="h-4 w-4 mr-2" />
          {t('admin.shelter.participants.add')}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400">
              <th className="pb-4">{t('admin.shelter.participants.name')}</th>
              <th className="pb-4">{t('admin.shelter.participants.status')}</th>
              <th className="pb-4">{t('admin.shelter.participants.joinDate')}</th>
              <th className="pb-4">{t('admin.shelter.participants.totalReceived')}</th>
              <th className="pb-4">{t('admin.shelter.participants.qrCode')}</th>
              <th className="pb-4">{t('admin.shelter.participants.loginToken')}</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id} className="border-t border-gray-700/50">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center">
                      {participant.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{participant.name}</div>
                      <div className="text-sm text-gray-400">{participant.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(participant.status)}`}>
                    {t(`admin.shelter.participants.statuses.${participant.status}`)}
                  </span>
                </td>
                <td className="py-4 text-gray-300">
                  {new Date(participant.joinDate).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-300">
                  ${participant.totalReceived.toLocaleString()}
                </td>
                <td className="py-4">
                  <div className="w-12 h-12">
                    <QRCode value={participant.qrCode} size={48} />
                  </div>
                </td>
                <td className="py-4">
                  {participant.loginToken && (
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-700/50 px-2 py-1 rounded">
                        {participant.loginToken}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(participant.loginToken!)}
                      >
                        <Icon name="copy" className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </td>
                <td className="py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(participant.id)}
                  >
                    <Icon name="eye" className="h-4 w-4 mr-2" />
                    {t('admin.shelter.participants.viewDetails')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 