import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';
import { PODCAST_LINKS } from '@/constants/podcast';
import { Music } from 'lucide-react';

export function PodcastPreview() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 rounded-lg p-4 max-h-[160px]">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Music className="h-5 w-5 text-green-500" />
          <h4 className="text-white text-sm font-medium">Latest Episode</h4>
        </div>
        
        <h5 className="text-white font-medium">Hacking Homelessness</h5>
        <p className="text-gray-400 text-sm">Tomes of Arcana • 14:04</p>
        
        <div className="flex space-x-4">
          <a
            href="https://open.spotify.com/episode/2TZquGVy7vT6yZMgDraMYe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400 text-sm font-medium inline-flex items-center space-x-1"
          >
            <span>Listen to Episode</span>
          </a>
        </div>
      </div>
    </div>
  );
} 