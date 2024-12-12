import { QRScanner } from '../components/QRScanner/QRScanner';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function ScanDonatePage() {
  return (
    <ErrorBoundary>
      <QRScanner />
    </ErrorBoundary>
  );
} 