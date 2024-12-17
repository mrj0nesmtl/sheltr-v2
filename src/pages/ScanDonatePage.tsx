import { Suspense } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRScanner } from '@/components/QRScanner/QRScanner';
import { QRScannerLoading } from '@/components/QRScanner/QRScannerLoading';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAuth } from '@/auth/components/AuthProvider';

export default function ScanDonatePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { from: '/scan-donate' },
        replace: true 
      });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h2 className="text-xl font-semibold mb-2">Unable to Access Scanner</h2>
          <p className="text-gray-400 mb-4">Please check your camera permissions and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      }
    >
      <Suspense fallback={<QRScannerLoading />}>
        <QRScanner />
      </Suspense>
    </ErrorBoundary>
  );
} 