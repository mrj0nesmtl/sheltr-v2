import React, { useRef, useState } from 'react';
import { Icon } from './Icon';

interface ImageUploadProps {
  currentImage?: string;
  onSave: (file: File) => Promise<void>;
  className?: string;
}

export function ImageUpload({ currentImage, onSave, className }: ImageUploadProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await onSave(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {currentImage ? (
        <img
          src={currentImage}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-full">
          <Icon name="user" className="h-12 w-12 text-gray-400" />
        </div>
      )}

      {(isHovering || isUploading) && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <Icon name="loader" className="h-8 w-8 text-white animate-spin" />
          ) : (
            <Icon name="camera" className="h-8 w-8 text-white" />
          )}
        </div>
      )}
    </div>
  );
} 