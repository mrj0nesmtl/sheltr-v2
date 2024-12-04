import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export function QRScanner() {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check camera permissions first
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setHasPermission(true);
        initializeScanner();
      })
      .catch((err) => {
        setHasPermission(false);
        setError(t('qrScanner.errors.cameraPermission'));
        console.error('Camera permission error:', err);
      });

    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.clear();
        } catch (err) {
          console.error('Error cleaning up scanner:', err);
        }
      }
    };
  }, [navigate, t]);

  const initializeScanner = () => {
    try {
      scannerRef.current = new Html5QrcodeScanner('qr-reader', {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2
      });

      scannerRef.current.render(
        (decodedText) => {
          if (scannerRef.current) {
            scannerRef.current.pause();
            setIsScanning(false);
            navigate(`/donate/${encodeURIComponent(decodedText)}`);
          }
        },
        (errorMessage) => {
          // Only show meaningful errors to the user
          if (errorMessage.includes('NotAllowedError')) {
            setError(t('qrScanner.errors.cameraPermission'));
          } else if (errorMessage.includes('NotFoundError')) {
            setError(t('qrScanner.errors.noCamera'));
          } else if (errorMessage.includes('NotReadableError')) {
            setError(t('qrScanner.errors.cameraInUse'));
          } else if (!errorMessage.includes('no MultiFormat Readers')) {
            setError(t('qrScanner.errors.initialization'));
          }
        }
      );

      setIsScanning(true);
      setError(null);
    } catch (err) {
      setError(t('qrScanner.errors.initialization'));
      console.error('Scanner initialization error:', err);
    }
  };

  const retryScanner = () => {
    setError(null);
    setHasPermission(null);
    initializeScanner();
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
                  onClick={retryScanner}
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
              {isScanning && (
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