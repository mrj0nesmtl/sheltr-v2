import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImageUploadProps {
  currentImage?: string;
  onUpload: (file: File) => Promise<void>;
  className?: string;
}

export function ImageUpload({ currentImage, onUpload, className }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      await onUpload(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className={className}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative w-32 h-32 rounded-full overflow-hidden",
          "border-4 border-gray-700 transition-colors",
          isDragging && "border-indigo-500",
          className
        )}
      >
        {currentImage ? (
          <img
            src={currentImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <Camera className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileSelect(file);
            }
          }}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={cn(
            "absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100",
            "flex items-center justify-center transition-opacity",
            "cursor-pointer"
          )}
        >
          <div className="text-white text-center">
            <Camera className="h-8 w-8 mx-auto mb-2" />
            <span className="text-sm">
              {isUploading ? 'Uploading...' : 'Change Photo'}
            </span>
          </div>
        </button>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-400 text-center">
          {error}
        </div>
      )}

      <div className="mt-2 text-sm text-gray-400 text-center">
        Drop an image here or click to upload
      </div>
    </div>
  );
}