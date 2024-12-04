import imageCompression from 'browser-image-compression';
import * as QRCode from 'qrcode';

interface CompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker?: boolean;
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1200,
    useWebWorker: true
  }
): Promise<File> {
  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}

export async function generateQRCode(data: string): Promise<string> {
  try {
    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(data, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    // Convert data URL to Blob
    const response = await fetch(qrDataUrl);
    const blob = await response.blob();
    
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

// Helper to convert Blob to File
export function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
} 