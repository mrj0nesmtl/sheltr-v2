import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';

// Constants
const PODCAST_LINKS = {
  SPOTIFY_URL: 'https://open.spotify.com/show/your-show-id',
  LATEST_EPISODE_URL: 'https://open.spotify.com/episode/your-episode-id'
};

export function PodcastPreview() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h4 className="text-lg font-semibold mb-2">{t('footer.podcast.latest')}</h4>
      <p className="text-gray-400 text-sm mb-4">{t('footer.podcast.description')}</p>
      <div className="flex items-center space-x-2">
        <Icon name="headphones" className="h-5 w-5 text-green-500" />
        <a
          href={PODCAST_LINKS.SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-green-500 hover:text-green-400"
        >
          {t('footer.podcast.listenOn')}
        </a>
      </div>
    </div>
  );
} 