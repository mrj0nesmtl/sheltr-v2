import type { ExtendedParticipant } from '@/lib/types/organization';
import { useNavigate } from 'react-router-dom';

interface ParticipantRowProps {
  participant: ExtendedParticipant;
  onUpdate: () => void;
}

export function ParticipantRow({ participant }: ParticipantRowProps) {
  const navigate = useNavigate();

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{participant.name}</div>
            <div className="text-sm text-gray-500">{participant.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${participant.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'}`}
        >
          {participant.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${participant.totalReceived.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {participant.lastServiceDate 
          ? new Date(participant.lastServiceDate).toLocaleDateString()
          : 'Never'
        }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => navigate(`/participants/${participant.id}`)}
          className="text-indigo-600 hover:text-indigo-900"
        >
          View Details
        </button>
      </td>
    </tr>
  );
} 