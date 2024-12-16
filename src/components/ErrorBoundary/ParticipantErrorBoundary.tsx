import { BaseErrorBoundary } from './BaseErrorBoundary';

export class ParticipantErrorBoundary extends BaseErrorBoundary {
  constructor(props: any) {
    super({ ...props, variant: 'participant' });
  }
} 