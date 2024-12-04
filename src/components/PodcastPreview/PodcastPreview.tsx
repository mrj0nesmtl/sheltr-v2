import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

interface PodcastPreviewProps {
  className?: string;
}

export function PodcastPreview({ className }: PodcastPreviewProps) {
  const { t } = useTranslation();

  // Actual podcast data
  const podcastData = {
    title: "Lab | Studio | Fund",
    showName: "Tomes of Arcana",
    playlistId: "2OOwTrX6t82bCjAB0dSGYs",
    embedUrl: "https://open.spotify.com/embed/playlist/2OOwTrX6t82bCjAB0dSGYs?utm_source=generator"
  };

  return (
    <div className={`
      absolute bottom-full mb-2 left-1/2 -translate-x-1/2
      w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700
      p-3 transform origin-bottom scale-95 opacity-0
      group-hover:scale-100 group-hover:opacity-100
      transition-all duration-200 z-50
      ${className}
    `}>
      {/* Arrow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 
        border-8 border-transparent border-t-gray-800">
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded bg-gray-700 flex-shrink-0 overflow-hidden flex items-center justify-center">
            <Icon name="headphones" className="w-6 h-6 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white truncate">
              {podcastData.title}
            </h4>
            <p className="text-xs text-gray-400">{podcastData.showName}</p>
          </div>
        </div>

        {/* Spotify Embed Preview */}
        <div className="relative w-full h-24 rounded-md overflow-hidden bg-gray-900">
          <iframe
            src={podcastData.embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="encrypted-media"
            className="absolute inset-0"
          />
        </div>

        {/* Listen Button */}
        <a
          href={`https://open.spotify.com/playlist/${podcastData.playlistId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-full transition-colors text-sm font-medium"
        >
          <Icon name="play" className="w-4 h-4" />
          {t('podcast.preview.listen')}
        </a>
      </div>
    </div>
  );
} 