import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';
import { PODCAST_LINKS } from '@/constants/podcast';

export function PodcastPreview() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">Latest Episode</h4>
        <Icon name="spotify" className="h-6 w-6 text-green-500" />
      </div>

      <div className="space-y-3">
        <div>
          <h5 className="font-medium text-white mb-1">
            {PODCAST_LINKS.EPISODE_INFO.title}
          </h5>
          <p className="text-sm text-gray-400">
            {PODCAST_LINKS.EPISODE_INFO.show} • {PODCAST_LINKS.EPISODE_INFO.duration}
          </p>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2">
          {PODCAST_LINKS.EPISODE_INFO.description}
        </p>

        <div className="flex items-center space-x-4">
          <a
            href={PODCAST_LINKS.LATEST_EPISODE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-green-500 hover:text-green-400 text-sm font-medium"
          >
            <Icon name="play" className="h-5 w-5" />
            <span>Listen to Episode</span>
          </a>
          
          <a
            href={PODCAST_LINKS.SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white"
          >
            View Show
          </a>
        </div>
      </div>
    </div>
  );
} 