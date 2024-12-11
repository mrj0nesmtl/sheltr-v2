import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { validateQRCode } from '@/lib/services/qrService';
import { toast } from '@/components/ui/Toast';

export function QRScanner() {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeScanner = async () => {
      try {
        // Only initialize if we haven't already
        if (!scannerRef.current) {
          scannerRef.current = new Html5Qrcode("qr-reader");
        }

        // Only start scanning if we're not already scanning
        if (!isScanning && scannerRef.current) {
          await scannerRef.current.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 }
            },
            async (decodedText) => {
              // Handle successful scan
              if (scannerRef.current) {
                await scannerRef.current.stop();
                setIsScanning(false);
                
                // Validate QR code
                const validatedData = await validateQRCode(decodedText);
                
                if (validatedData) {
                  // Valid participant QR code
                  navigate(`/donate/${validatedData.participantId}`);
                } else {
                  // Invalid QR code
                  toast({
                    title: t('qrScanner.errors.invalidCode'),
                    description: t('qrScanner.errors.invalidCodeDesc'),
                    variant: 'destructive'
                  });
                  // Restart scanning
                  handleRetry();
                }
              }
            },
            (errorMessage) => {
              // Only handle permission errors
              if (errorMessage.includes('NotAllowedError')) {
                setError(t('qrScanner.errors.cameraPermission'));
                setIsScanning(false);
              }
            }
          );
          setIsScanning(true);
          setError(null);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(
            err.name === 'NotAllowedError' 
              ? t('qrScanner.errors.cameraPermission')
              : t('qrScanner.errors.initialization')
          );
          setIsScanning(false);
        }
      }
    };

    initializeScanner();

    // Cleanup function
    return () => {
      const cleanup = async () => {
        if (scannerRef.current && isScanning) {
          try {
            await scannerRef.current.stop();
            scannerRef.current.clear();
            setIsScanning(false);
          } catch (err) {
            console.error('Error cleaning up scanner:', err);
          }
        }
      };
      cleanup();
    };
  }, []); // Empty dependency array - only run on mount/unmount

  const handleRetry = async () => {
    setError(null);
    if (scannerRef.current && isScanning) {
      await scannerRef.current.stop();
      setIsScanning(false);
    }
    // Re-initialize scanner
    if (scannerRef.current) {
      try {
        await scannerRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          async (decodedText) => {
            if (scannerRef.current) {
              await scannerRef.current.stop();
              setIsScanning(false);
              navigate(`/donate/${encodeURIComponent(decodedText)}`);
            }
          },
          (errorMessage) => {
            if (errorMessage.includes('NotAllowedError')) {
              setError(t('qrScanner.errors.cameraPermission'));
              setIsScanning(false);
            }
          }
        );
        setIsScanning(true);
      } catch (err) {
        console.error('Error retrying scanner:', err);
        setError(t('qrScanner.errors.initialization'));
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="relative flex-grow">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {t('qrScanner.title')}
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-md">
                <div className="flex items-center gap-2 text-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
                <button
                  onClick={handleRetry}
                  className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-md transition-colors"
                >
                  {t('qrScanner.retryButton')}
                </button>
              </div>
            )}

            <div className="bg-black rounded-lg overflow-hidden">
              <div id="qr-reader" className="w-full" />
            </div>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Camera className="h-5 w-5" />
                <p>{t('qrScanner.instructions')}</p>
              </div>
              {scannerRef.current && (
                <p className="mt-2 text-sm text-gray-400">
                  {t('qrScanner.scannerActive')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}