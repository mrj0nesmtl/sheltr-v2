import { Icon } from '@/components/ui/Icon';
import { supabase } from '@/lib/supabase/client';
import { organizationService } from '@/services/organizationService';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { shelterProfileSchema } from '@/auth/schemas/validation';

export function ShelterRegistrationForm() {
  const { t } = useTranslation();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  
  const form = useForm({
    resolver: zodResolver(shelterProfileSchema),
    defaultValues: {
      name: '',
      registration_number: '',
      email: '',
      capacity: 0,
      services: [],
      contact_phone: '',
      city: '',
      address: '',
      emergency_contact: {
        name: '',
        phone: '',
        relationship: ''
      }
    }
  });

  const handleLogoUpload = async (file: File) => {
    // Preview
    setLogoPreview(URL.createObjectURL(file));
    setLogoFile(file);
  };

  const handleSubmit = async (data: z.infer<typeof shelterProfileSchema>) => {
    try {
      let logoUrl = '';
      if (logoFile) {
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('shelter-logos')
          .upload(`${data.registration_number}/logo`, logoFile);

        if (!uploadError && uploadData) {
          logoUrl = supabase.storage
            .from('shelter-logos')
            .getPublicUrl(uploadData.path).data.publicUrl;
        }
      }

      await organizationService.createOrganization({
        ...data,
        logo_url: logoUrl,
        status: 'pending',
        verified: false
      });

      toast.success('Registration submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit registration');
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {/* Logo Upload Section */}
      <div className="space-y-6">
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
        
        {/* Organization Details */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Organization Name"
            {...form.register('name')}
            error={form.formState.errors.name?.message}
          />
          <Input
            label="Registration Number"
            {...form.register('registration_number')}
            error={form.formState.errors.registration_number?.message}
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            {...form.register('email')}
            error={form.formState.errors.email?.message}
          />
          <Input
            label="Phone"
            {...form.register('contact_phone')}
            error={form.formState.errors.contact_phone?.message}
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            {...form.register('city')}
            error={form.formState.errors.city?.message}
          />
          <Input
            label="Address"
            {...form.register('address')}
            error={form.formState.errors.address?.message}
          />
        </div>

        {/* Capacity & Services */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Capacity"
            type="number"
            {...form.register('capacity', { valueAsNumber: true })}
            error={form.formState.errors.capacity?.message}
          />
          <Select
            label="Services"
            multiple
            {...form.register('services')}
            error={form.formState.errors.services?.message}
            options={SHELTER_SERVICES}
          />
        </div>

        {/* Emergency Contact */}
        <fieldset className="border border-gray-700 rounded-lg p-4">
          <legend className="text-sm font-medium">Emergency Contact</legend>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Name"
              {...form.register('emergency_contact.name')}
              error={form.formState.errors.emergency_contact?.name?.message}
            />
            <Input
              label="Phone"
              {...form.register('emergency_contact.phone')}
              error={form.formState.errors.emergency_contact?.phone?.message}
            />
            <Input
              label="Relationship"
              {...form.register('emergency_contact.relationship')}
              error={form.formState.errors.emergency_contact?.relationship?.message}
            />
          </div>
        </fieldset>

        <Button type="submit" loading={form.formState.isSubmitting}>
          Submit Registration
        </Button>
      </div>
    </form>
  );
} 