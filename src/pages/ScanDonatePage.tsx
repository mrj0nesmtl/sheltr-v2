import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRScanner } from '@/components/QRScanner/QRScanner';
import { QRScannerLoading } from '@/components/QRScanner/QRScannerLoading';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function ScanDonatePage() {
  const navigate = useNavigate();

  const handleSuccessfulDonation = () => {
    // After successful donation, redirect to signup
    navigate('/signup/donor', { 
      state: { 
        from: 'donation',
        message: 'Thank you for your donation! Create an account to track your impact.'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Scan QR Code to Donate
        </h1>
        <ErrorBoundary
          fallback={
            <div className="text-center text-white">
              <p className="mb-4">Unable to access camera</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Try Again
              </button>
            </div>
          }
        >
          <Suspense fallback={<QRScannerLoading />}>
            <QRScanner onSuccessfulDonation={handleSuccessfulDonation} />
          </Suspense>
        </ErrorBoundary>
        <p className="text-center text-gray-400 mt-4">
          No account needed to donate. Scan a QR code to help someone in need.
        </p>
      </div>
    </div>
  );
} 