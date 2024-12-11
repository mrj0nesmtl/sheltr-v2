import QRCode from 'qrcode';
import { nanoid } from 'nanoid';

export async function generateQRCode(participantId: string): Promise<string> {
  const uniqueId = nanoid(10);
  const qrData = {
    type: 'SHELTR_PARTICIPANT',
    id: participantId,
    code: uniqueId,
    timestamp: Date.now()
  };

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 400,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    return qrCodeDataUrl;
  } catch (error) {
    console.error('QR Code generation failed:', error);
    throw error;
  }
} 