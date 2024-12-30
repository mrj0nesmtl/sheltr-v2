import { ErrorBoundary } from '@/components/ErrorBoundary';
import { QRScanner } from '@/components/QRScanner/QRScanner';
import { QRScannerLoading } from '@/components/QRScanner/QRScannerLoading';
import { Button } from '@/components/ui/Button';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ScanDonatePage() {
  const navigate = useNavigate();

  const handleSuccessfulDonation = () => {
    navigate('/signup/donor', { 
      state: { 
        from: 'donation',
        message: 'Thank you for your donation! Create an account to track your impact.'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6 text-center">
        <h1 className="text-3xl font-bold text-white">
          Scan QR Code to Donate
        </h1>
        
        <h2 className="text-xl text-gray-300">
          Point your camera at a participant's QR code
        </h2>

        {/* Scanner Frame */}
        <ErrorBoundary
          fallback={
            <div className="bg-gray-800/50 rounded-xl p-8 text-center">
              <p className="text-white mb-4">Unable to access camera</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          }
        >
          <Suspense fallback={<QRScannerLoading />}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800/50 rounded-xl p-6"
            >
              <QRScanner 
                onSuccessfulDonation={handleSuccessfulDonation}
                className="w-full aspect-square rounded-lg overflow-hidden"
              />
            </motion.div>
          </Suspense>
        </ErrorBoundary>

        <p className="text-gray-400">
          No account needed to donate. Help someone in need today!
        </p>
      </div>
    </div>
  );
}
