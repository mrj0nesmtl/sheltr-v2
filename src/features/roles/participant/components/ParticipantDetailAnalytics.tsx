import { useParams } from 'react-router-dom';

export function ParticipantDetailAnalytics() {
  const { participantId } = useParams();

  return (
    <div>
      <h1>Participant Analytics Details</h1>
      <p>Participant ID: {participantId}</p>
      {/* Add your analytics components here */}
    </div>
  );
} 