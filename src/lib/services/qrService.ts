import { supabase } from '@/lib/supabase';

interface QRData {
  type: 'SHELTR_PARTICIPANT';
  id: string;
  code: string;
  timestamp: number;
}

export async function validateQRCode(qrData: string): Promise<{ participantId: string } | null> {
  try {
    // Parse the QR code data
    const parsedData: QRData = JSON.parse(qrData);

    // Basic validation
    if (
      parsedData.type === 'SHELTR_PARTICIPANT' && 
      parsedData.id && 
      parsedData.code && 
      parsedData.timestamp
    ) {
      return {
        participantId: parsedData.id
      };
    }

    return null;
  } catch (error) {
    console.error('QR Code validation failed:', error);
    return null;
  }
}