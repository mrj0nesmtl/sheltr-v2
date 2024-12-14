import { supabase } from '@/lib/supabase/client';

interface WelcomeEmailProps {
  to: string;
  name: string;
  verificationToken: string;
  qrCode: string;
}

export const sendWelcomeEmail = async ({ to, name, verificationToken, qrCode }: WelcomeEmailProps) => {
  try {
    // For development, just log the email
    console.log('Sending welcome email:', {
      to,
      subject: 'Welcome to SHELTR',
      content: `
        Hello ${name},
        
        Welcome to SHELTR! Your account has been created successfully.
        
        Your verification token is: ${verificationToken}
        
        Please use this token to verify your account when you first log in.
        
        Your personal QR code has been generated and is attached to this email.
        Keep this QR code safe as it will be used for receiving donations.
        
        Best regards,
        The SHELTR Team
      `
    });

    // In production, use your email service of choice
    // Example with Supabase Edge Functions:
    /*
    const { error } = await supabase.functions.invoke('send-welcome-email', {
      body: {
        to,
        name,
        verificationToken,
        qrCode
      }
    });

    if (error) throw error;
    */

    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
};

interface VerificationEmailProps {
  to: string;
  token: string;
}

export const sendVerificationEmail = async ({ to, token }: VerificationEmailProps) => {
  try {
    console.log('Sending verification email:', {
      to,
      subject: 'Verify Your SHELTR Account',
      content: `
        Please verify your SHELTR account using this token: ${token}
        
        If you didn't request this verification, please ignore this email.
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error };
  }
};

interface ResetPasswordEmailProps {
  to: string;
  resetToken: string;
}

export const sendPasswordResetEmail = async ({ to, resetToken }: ResetPasswordEmailProps) => {
  try {
    console.log('Sending password reset email:', {
      to,
      subject: 'Reset Your SHELTR Password',
      content: `
        A password reset was requested for your SHELTR account.
        
        Use this token to reset your password: ${resetToken}
        
        If you didn't request this reset, please ignore this email.
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return { success: false, error };
  }
};

interface ServiceNotificationProps {
  to: string;
  name: string;
  serviceName: string;
  appointmentDate?: Date;
  additionalInfo?: string;
}

export const sendServiceNotification = async ({
  to,
  name,
  serviceName,
  appointmentDate,
  additionalInfo
}: ServiceNotificationProps) => {
  try {
    console.log('Sending service notification:', {
      to,
      subject: `SHELTR Service Update: ${serviceName}`,
      content: `
        Hello ${name},
        
        This is a notification about your ${serviceName} service.
        ${appointmentDate ? `Your appointment is scheduled for: ${appointmentDate}` : ''}
        ${additionalInfo || ''}
        
        Best regards,
        The SHELTR Team
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send service notification:', error);
    return { success: false, error };
  }
}; 