import { deleteProfileImage, uploadProfileImage } from '../services/imageService';
import { supabase } from '../supabase';

export async function updateProfile(userId: string, updates: {
  name?: string;
  profileImage?: string;
  defaultDonation?: number;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}) {
  const { error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
}

export async function updateProfileImage(userId: string, file: File): Promise<string> {
  // Get current profile to check if we need to delete old image
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('profile_image')
    .eq('id', userId)
    .single();

  // Upload new image
  const imageUrl = await uploadProfileImage(file);

  // Update profile with new image URL
  const { error } = await supabase
    .from('user_profiles')
    .update({ profile_image: imageUrl })
    .eq('id', userId);

  if (error) {
    // If profile update fails, delete the uploaded image
    await deleteProfileImage(imageUrl);
    throw error;
  }

  // Delete old image if it exists
  if (profile?.profile_image) {
    try {
      await deleteProfileImage(profile.profile_image);
    } catch (error) {
      console.error('Failed to delete old image:', error);
      // Don't throw error here as the update was successful
    }
  }

  return imageUrl;
}