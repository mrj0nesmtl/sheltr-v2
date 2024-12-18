import { Icon } from '@/components/ui/Icon';
import { supabase } from '@/lib/supabase/client';
import { organizationService } from '@/services/organizationService';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function ShelterRegistrationForm() {
  const { t } = useTranslation();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleLogoUpload = async (file: File) => {
    // Preview
    setLogoPreview(URL.createObjectURL(file));
    setLogoFile(file);
  };

  const handleSubmit = async () => {
    if (logoFile) {
      const { error: uploadError } = await supabase.storage
        .from('shelter-logos')
        .upload(`${organizationId}/logo`, logoFile);

      if (!uploadError) {
        const logoUrl = supabase.storage
          .from('shelter-logos')
          .getPublicUrl(`${organizationId}/logo`).data.publicUrl;
          
        // Update organization with logo URL
        await organizationService.updateOrganization(organizationId, {
          logoUrl
        });
      }
    }
    // ... rest of form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Logo Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {t('registration.shelter.logo')}
        </label>
        <div className="flex items-center space-x-4">
          <div className="h-24 w-24 rounded-lg overflow-hidden bg-white/10">
            {logoPreview ? (
              <img 
                src={logoPreview} 
                alt="Logo preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Icon name="image" className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleLogoUpload(e.target.files[0])}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700"
          >
            {t('registration.shelter.uploadLogo')}
          </label>
        </div>
      </div>
      {/* ... rest of form fields ... */}
    </form>
  );
} 