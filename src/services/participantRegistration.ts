import { supabase } from '@/lib/supabase';
import { generateQRCode } from '@/lib/utils/qrCode';
import { generateVerificationToken } from '@/lib/utils/token';
import { sendWelcomeEmail } from '@/lib/email/templates';
import type { NewParticipant } from '@/lib/types/participant';

export class ParticipantRegistrationService {
  static async registerParticipant(participantData: NewParticipant, adminId: string) {
    const { firstName, lastName, email, phone, dateOfBirth, ...profile } = participantData;

    try {
      // Start a Supabase transaction
      const { data: participant, error: participantError } = await supabase.from('participants').insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        date_of_birth: dateOfBirth,
        registered_by: adminId,
        status: 'pending',
        created_at: new Date().toISOString()
      }).single();

      if (participantError) throw participantError;

      // Generate unique QR code
      const qrCode = await generateQRCode(participant.id);
      
      // Generate verification token
      const verificationToken = await generateVerificationToken();

      // Update participant with QR and token
      const { error: updateError } = await supabase
        .from('participant_profiles')
        .insert({
          participant_id: participant.id,
          qr_code: qrCode,
          verification_token: verificationToken,
          ...profile
        });

      if (updateError) throw updateError;

      // Send welcome email with verification token
      await sendWelcomeEmail({
        to: email,
        name: `${firstName} ${lastName}`,
        verificationToken,
        qrCode
      });

      return {
        success: true,
        participant,
        qrCode,
        verificationToken
      };

    } catch (error) {
      console.error('Participant registration failed:', error);
      throw error;
    }
  }
} 