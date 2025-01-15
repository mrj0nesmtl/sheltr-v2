import { type FC, useState } from 'react';
import { DocumentUpload } from './DocumentUpload';
import { VerificationStatus } from './VerificationStatus';
import { ProfileProgress } from './ProfileProgress';
import { supabase } from '@/lib/supabase';

export const CompleteProfile: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Complete Your Shelter Profile</h1>
      
      {/* Progress indicator */}
      <ProfileProgress progress={progress} />

      {/* Verification Status */}
      <VerificationStatus />
      
      {/* Document Upload Sections */}
      <DocumentUpload />
    </div>
  );
}; 