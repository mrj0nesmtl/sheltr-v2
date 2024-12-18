import { Icon } from '@/components/ui/Icon';
import { uploadImage } from '@/lib/storage/storageService';
import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  currentImage?: string | null;
  onUpload: (url: string) => Promise<void>;
  className?: string;
}

export function ImageUpload({ currentImage, onUpload, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadImage(file, {
        folder: 'profiles',
        userId: 'user_id', // Get from context
        fileName: `profile.${file.name.split('.').pop()}`
      });
      
      await onUpload(url);
    } catch (error) {
      console.error('Upload failed:', error);
      // Show error toast
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
        {currentImage ? (
          <img
            src={currentImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="user" className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-full",
          "bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity",
          isUploading && "opacity-100 cursor-wait"
        )}
      >
        <Icon
          name={isUploading ? "loader" : "camera"}
          className={cn(
            "w-6 h-6 text-white",
            isUploading && "animate-spin"
          )}
        />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}