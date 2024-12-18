import { Link as LinkIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SocialLinksProps {
  links: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  } | null;
  isEditing?: boolean;
  onChange?: (links: Record<string, string>) => void;
  className?: string;
}

export function SocialLinks({ links, isEditing, onChange, className }: SocialLinksProps) {
  if (!links && !isEditing) return null;

  const handleChange = (platform: string, value: string) => {
    if (onChange) {
      onChange({
        ...links,
        [platform]: value
      });
    }
  };

  return (
    <div className={cn("bg-white/5 rounded-lg p-6", className)}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <LinkIcon className="h-5 w-5 mr-2" />
        Social Links
      </h3>
      
      {isEditing ? (
        <div className="space-y-4">
          {['twitter', 'facebook', 'instagram', 'linkedin'].map((platform) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
                {platform}
              </label>
              <input
                type="url"
                value={links?.[platform as keyof typeof links] || ''}
                onChange={(e) => handleChange(platform, e.target.value)}
                placeholder={`Enter your ${platform} profile URL`}
                className="bg-white/5 border border-gray-600 rounded-md w-full px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(links || {}).map(([platform, url]) => (
            url && (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <span className="capitalize">{platform}</span>
                <LinkIcon className="h-4 w-4 ml-2" />
              </a>
            )
          ))}
        </div>
      )}
    </div>
  );
}