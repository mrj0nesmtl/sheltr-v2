import { type FC } from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const VerificationStatus: FC = () => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Verification Status</h2>
      
      <div className="space-y-4">
        <StatusItem
          icon={CheckCircle}
          title="Account Created"
          status="complete"
        />
        <StatusItem
          icon={Clock}
          title="Email Verification"
          status="pending"
        />
        <StatusItem
          icon={AlertCircle}
          title="Document Verification"
          status="required"
        />
      </div>
    </div>
  );
};

const StatusItem: FC<{
  icon: any;
  title: string;
  status: 'complete' | 'pending' | 'required';
}> = ({ icon: Icon, title, status }) => (
  <div className="flex items-center gap-3">
    <Icon className={`w-5 h-5 ${
      status === 'complete' ? 'text-green-500' :
      status === 'pending' ? 'text-yellow-500' :
      'text-red-500'
    }`} />
    <span>{title}</span>
    <span className="ml-auto text-sm opacity-70">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  </div>
); 