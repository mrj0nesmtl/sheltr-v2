import { MediaCard } from '../components';

export const MediaSection = () => {
  const mediaItems = [
    {
      type: 'podcast',
      title: 'Hacking Homelessness',
      platform: 'Spotify',
      url: 'https://open.spotify.com/episode/2TZquGVy7vT6yZMgDraMYe',
      icon: '🎧'
    },
    {
      type: 'blog',
      title: 'SHELTR is Hacking Homelessness',
      platform: 'Arcana Blog',
      url: 'https://www.arcanaconcept.com/blog/shelter-is-hacking-homelessness',
      icon: '📝'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Media</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {mediaItems.map((item) => (
            <MediaCard key={item.url} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}; 