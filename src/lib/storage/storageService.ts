import { supabase } from '../supabase';
import { compressImage } from './imageUtils';

const BUCKET_NAME = 'public';
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface UploadOptions {
  folder: 'profiles' | 'qrcodes';
  userId: string;
  fileName: string;
}

export async function uploadImage(file: File, options: UploadOptions) {
  try {
    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
    }

    // Compress if needed
    let imageFile = file;
    if (file.size > MAX_FILE_SIZE) {
      imageFile = await compressImage(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200
      });
    }

    const filePath = `${options.folder}/${options.userId}/${options.fileName}`;
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, imageFile, {
        upsert: true,
        cacheControl: '3600',
        contentType: imageFile.type
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function deleteImage(filePath: string) {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

export function getImageUrl(filePath: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);
  
  return publicUrl;
} 