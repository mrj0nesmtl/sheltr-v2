import { BaseErrorBoundary } from './BaseErrorBoundary';

export class ShelterAdminErrorBoundary extends BaseErrorBoundary {
  constructor(props: any) {
    super({ ...props, variant: 'shelter-admin' });
  }
} 