import { Icon } from '@/components/ui/Icon';
import { BlogPost } from '@/lib/types/blog';
import { getBlogPosts } from '@/lib/api/blogApi';
import { formatDate } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getBlogPosts();
        setPosts(data || []);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>SHELTR Blog - Latest Updates</title>
        <meta name="description" content="Stay updated with the latest news about SHELTR's mission to revolutionize charitable giving." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Latest Updates</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with our latest news, insights, and stories about revolutionizing charitable giving.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-8">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No blog posts yet.</p>
            <p className="text-gray-500">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      {post.categories && post.categories.length > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex gap-2">
                            {post.categories.map((category) => (
                              <span 
                                key={category}
                                className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      {post.author && (
                        <div className="flex items-center gap-2">
                          {post.author.avatar && (
                            <img 
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <span className="text-sm text-gray-400">{post.author.name}</span>
                        </div>
                      )}
                      <span className="text-indigo-400 flex items-center gap-1">
                        Read more <Icon name="arrowRight" className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}