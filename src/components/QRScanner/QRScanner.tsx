import { Button } from '@/components/ui/Button';
import { validateQRCode } from '@/lib/services/qrService';
import { cn } from '@/lib/utils';
import { Html5Qrcode } from 'html5-qrcode';
import { AlertCircle, Camera, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface QRScannerProps {
  onSuccessfulDonation: () => void;
  className?: string;
}

export function QRScanner({ className }: QRScannerProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const navigate = useNavigate();

  const cleanupScanner = useCallback(async () => {
    if (!scannerRef.current) return;

    try {
      // First stop scanning if active
      if (isScanning) {
        await scannerRef.current.stop();
        setIsScanning(false);
      }

      // Wait a moment before clearing
      await new Promise(resolve => setTimeout(resolve, 100));

      // Then clear the scanner
      if (scannerRef.current) {
        await scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch (err) {
      console.error('Cleanup error:', err);
    } finally {
      setIsInitializing(false);
    }
  }, [isScanning]);

  const startScanner = useCallback(async () => {
    if (isInitializing || isScanning) return;

    try {
      setIsInitializing(true);
      setError(null);

      // Ensure cleanup before starting
      await cleanupScanner();

      // Initialize scanner
      scannerRef.current = new Html5Qrcode('qr-reader');

      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          const validatedData = await validateQRCode(decodedText);
          if (validatedData) {
            await cleanupScanner();
            navigate(`/donate/${validatedData.participantId}`);
          }
        },
        undefined
      );

      setIsScanning(true);
    } catch (err) {
      console.error('Scanner error:', err);
      setError(t('qrScanner.errors.initialization'));
      await cleanupScanner();
    } finally {
      setIsInitializing(false);
    }
  }, [isInitializing, isScanning, navigate, cleanupScanner, t]);

  const handleRetry = useCallback(async () => {
    await cleanupScanner();
    // Small delay before retrying
    setTimeout(() => {
      startScanner();
    }, 500);
  }, [cleanupScanner, startScanner]);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        cleanupScanner();
      }
    };
  }, [cleanupScanner]);

  return (
    <div className={cn(
      "relative bg-gray-900/95 rounded-2xl overflow-hidden shadow-xl",
      "max-w-2xl mx-auto aspect-[4/3]",
      className
    )}>
      {/* Scanner Container */}
      <div 
        id="qr-reader" 
        className="w-full h-full bg-black/20 backdrop-blur-sm"
      />

      {/* Scanning Overlay */}
      {isScanning && !error && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Scanner Frame */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-64 h-64 border-2 border-indigo-500/50 rounded-2xl">
            {/* Scanning Animation */}
            <div className="absolute inset-0 border-2 border-indigo-500 rounded-2xl 
                          animate-pulse" />
            {/* Corner Markers */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 rounded-tl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 rounded-tr" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-500 rounded-bl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-indigo-500 rounded-br" />
            </div>
          </div>

          {/* Scanning Instructions */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900">
            <p className="text-center text-white text-sm font-medium">
              {t('qrScanner.scannerActive')}
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 
                      bg-gray-900/95 backdrop-blur-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4 animate-bounce" />
          <p className="text-white text-center mb-6 max-w-md">
            {error}
          </p>
          <Button
            onClick={handleRetry}
            variant="outline"
            className="flex items-center space-x-2 hover:bg-gray-700/50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('qrScanner.retryButton')}</span>
          </Button>
        </div>
      )}

      {/* Initial State */}
      {!isScanning && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 
                      bg-gray-900/95 backdrop-blur-sm">
          <div className="max-w-md text-center space-y-6">
            <h3 className="text-xl font-semibold text-white">
              {t('qrScanner.instructions')}
            </h3>
            <p className="text-gray-400 text-sm">
              {t('qrScanner.instructionsDetail')}
            </p>
            <Button
              onClick={startScanner}
              variant="default"
              size="lg"
              className="flex items-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>{t('qrScanner.startButton')}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}