import React from 'react';
import { Button } from '@/components/ui/Button';
import type { ExtendedParticipant } from '@/lib/types/organization';

interface ParticipantRowProps {
  participant: ExtendedParticipant;
  onUpdate: () => void;
}

export function ParticipantRow({ participant, onUpdate }: ParticipantRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{participant.name}</div>
        <div className="text-sm text-gray-500">{participant.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${participant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {participant.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${participant.total_received?.toFixed(2) || '0.00'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(participant.last_activity || '').toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          variant="ghost"
          onClick={() => onUpdate()}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Edit
        </Button>
      </td>
    </tr>
  );
} 