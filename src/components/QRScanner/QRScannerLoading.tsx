import { Loader2 } from 'lucide-react';

export function QRScannerLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-900">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
      <p className="text-gray-300">Initializing camera...</p>
    </div>
  );
} 