import { type FC, useState } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

export const DocumentUpload: FC = () => {
  const [files, setFiles] = useState<{
    registration?: File;
    tax?: File;
    insurance?: File;
    logo?: File;
  }>({});

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-xl font-semibold">Required Documents</h2>
      
      <div className="grid gap-6">
        <FileUpload
          label="Registration Document"
          accept=".pdf"
          onChange={(file) => setFiles(prev => ({ ...prev, registration: file }))}
          required
        />
        {/* Add other file uploads */}
      </div>
    </div>
  );
}; 