import { MediaCard } from '../components';

export function MediaSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-10 text-white text-center">
        Featured Media
      </h2>
      
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 px-4">
        {/* Spotify Card */}
        <a 
          href="https://open.spotify.com/episode/2TZquGVy7vT6yZMgDraMYe" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group block"
        >
          <div className="relative bg-gradient-to-br from-[#1DB954]/10 to-[#1DB954]/5 rounded-xl p-6 border border-[#1DB954]/20 hover:border-[#1DB954]/40 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#1DB954]">
                <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </span>
              <div>
                <span className="text-[#1DB954] uppercase text-xs font-bold tracking-wider">Spotify Podcast</span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-[#1DB954] transition-colors">
                  Hacking Homelessness
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm">Episode • 45 min</div>
              <div className="flex items-center text-[#1DB954] font-medium">
                Listen Now
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </a>

        {/* Arcana Blog Card */}
        <a 
          href="https://www.arcanaconcept.com/concepts/sheltr" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group block"
        >
          <div className="relative bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 rounded-xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-indigo-400">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                </svg>
              </span>
              <div>
                <span className="text-indigo-400 uppercase text-xs font-bold tracking-wider">Arcana Blog</span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-indigo-400 transition-colors">
                  SHELTR is Hacking Homelessness
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm">Featured Article</div>
              <div className="flex items-center text-indigo-400 font-medium">
                Read More
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
} 