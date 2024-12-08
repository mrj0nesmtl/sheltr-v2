import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

interface PodcastPreviewProps {
  url: string;
  title: string;
  duration: string;
  thumbnail?: string;
}

export function PodcastPreview({ url, title, duration, thumbnail }: PodcastPreviewProps) {
  const { t } = useTranslation();

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
    >
      {/* Thumbnail */}
      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-700 flex-shrink-0">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="headphones" className="w-6 h-6 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </div>

      {/* Content */}
      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {title}
        </p>
        <div className="flex items-center mt-1 text-xs text-gray-400">
          <Icon name="play" className="w-3 h-3 mr-1" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Play Icon */}
      <div className="ml-4 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center group-hover:bg-indigo-400 transition-colors">
          <Icon name="play" className="w-4 h-4 text-white" />
        </div>
      </div>
    </a>
  );
} 