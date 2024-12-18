import { Avatar } from '@/components/ui/Avatar';
import { useTranslation } from 'react-i18next';

interface Activity {
  id: string;
  type: 'donation' | 'referral' | 'post' | 'impact';
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  details?: string;
  amount?: number;
}

export function FriendActivity() {
  const { t } = useTranslation();
  const [activities, setActivities] = useState<Activity[]>([]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h3 className="text-lg font-medium text-white mb-4">
        {t('profile.activity.title')}
      </h3>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-center py-4">
            {t('profile.activity.empty')}
          </p>
        ) : (
          activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50"
            >
              <Avatar
                src={activity.user.avatar}
                fallback={activity.user.name[0]}
                className="h-10 w-10"
              />
              <div className="flex-1">
                <p className="text-white">
                  <span className="font-medium">{activity.user.name}</span>
                  {' '}
                  {t(`profile.activity.${activity.type}`)}
                  {activity.amount && (
                    <span className="text-green-400">
                      {' '}${activity.amount}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-400">
                  {activity.details}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 