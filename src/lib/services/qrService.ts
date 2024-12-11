import { supabase } from '@/lib/supabase';
import { createHash, createHmac } from 'crypto';
import { getSecretKey } from '@/lib/config/secrets';

interface QRData {
  participantId: string;
  type: 'participant' | 'service' | 'event';
  metadata?: Record<string, any>;
  expiresAt?: string;
}

interface SignedQRData extends QRData {
  timestamp: string;
  signature: string;
  nonce: string;
}

// Generate a secure signature for QR data
async function generateSignature(data: QRData, nonce: string): Promise<string> {
  const secretKey = await getSecretKey();
  const payload = JSON.stringify({
    ...data,
    nonce,
    timestamp: new Date().toISOString()
  });
  
  return createHmac('sha256', secretKey)
    .update(payload)
    .digest('hex');
}

// Generate a unique nonce
function generateNonce(): string {
  return createHash('sha256')
    .update(Date.now().toString() + Math.random().toString())
    .digest('hex')
    .slice(0, 16);
}

export async function generateQRCode(data: QRData): Promise<string> {
  const nonce = generateNonce();
  const timestamp = new Date().toISOString();
  const signature = await generateSignature(data, nonce);
  
  const payload: SignedQRData = {
    ...data,
    timestamp,
    signature,
    nonce
  };
  
  // Log QR code generation for analytics
  await logQRCodeEvent('generate', payload);
  
  return btoa(JSON.stringify(payload));
}

export async function validateQRCode(qrData: string): Promise<QRData | null> {
  try {
    const payload = JSON.parse(atob(qrData)) as SignedQRData;
    
    // Check expiration
    if (payload.expiresAt && new Date(payload.expiresAt) < new Date()) {
      await logQRCodeEvent('expired', payload);
      return null;
    }

    // Verify signature
    const expectedSignature = await generateSignature(
      {
        participantId: payload.participantId,
        type: payload.type,
        metadata: payload.metadata,
        expiresAt: payload.expiresAt
      },
      payload.nonce
    );

    if (expectedSignature !== payload.signature) {
      await logQRCodeEvent('invalid_signature', payload);
      return null;
    }

    // Check if QR code has been used (if one-time use)
    const isUsed = await checkQRCodeUsage(payload);
    if (isUsed) {
      await logQRCodeEvent('already_used', payload);
      return null;
    }

    // Check if participant exists and is active
    const { data: participant, error } = await supabase
      .from('participants')
      .select('id, status, organization_id')
      .eq('id', payload.participantId)
      .single();

    if (error || !participant) {
      await logQRCodeEvent('invalid_participant', payload);
      return null;
    }

    if (participant.status !== 'active') {
      await logQRCodeEvent('inactive_participant', payload);
      return null;
    }

    // Log successful validation
    await logQRCodeEvent('validated', payload);

    return {
      participantId: payload.participantId,
      type: payload.type,
      metadata: payload.metadata
    };
  } catch (error) {
    console.error('Error validating QR code:', error);
    return null;
  }
}

// Analytics tracking
async function logQRCodeEvent(
  event: 'generate' | 'validate' | 'expired' | 'invalid_signature' | 'already_used' | 'invalid_participant' | 'inactive_participant' | 'validated',
  data: SignedQRData
) {
  try {
    await supabase.from('qr_code_events').insert({
      event_type: event,
      participant_id: data.participantId,
      qr_type: data.type,
      metadata: data.metadata,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error logging QR code event:', error);
  }
}

// Check if QR code has been used
async function checkQRCodeUsage(data: SignedQRData): Promise<boolean> {
  const { data: usage } = await supabase
    .from('qr_code_usage')
    .select('id')
    .eq('signature', data.signature)
    .single();

  return !!usage;
}

// Offline validation support
export function getOfflineValidationData(): Promise<{
  publicKey: string;
  validParticipants: string[];
}> {
  return supabase
    .from('offline_validation')
    .select('public_key, valid_participants')
    .single()
    .then(({ data }) => ({
      publicKey: data?.public_key || '',
      validParticipants: data?.valid_participants || []
    }));
}

// Validate QR code offline
export function validateQRCodeOffline(
  qrData: string,
  validationData: { publicKey: string; validParticipants: string[] }
): boolean {
  try {
    const payload = JSON.parse(atob(qrData)) as SignedQRData;
    
    // Check if participant is in valid list
    if (!validationData.validParticipants.includes(payload.participantId)) {
      return false;
    }

    // Verify signature using public key
    // Note: Implement actual offline signature verification here
    return true;
  } catch {
    return false;
  }
}