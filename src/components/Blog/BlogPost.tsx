import { Icon } from '@/components/ui/Icon';
import { getBlogPost } from '@/lib/api/blogApi';
import { formatDate } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await getBlogPost(slug!);
        setPost(data);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Generate hashtags from categories
  const hashtags = post.categories.map(cat => `#${cat.toLowerCase().replace(/\s+/g, '')}`).join(' ');

  return (
    <>
      <Helmet>
        <title>{`${post.title} - SHELTR Blog`}</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.categories[0]} />
        {post.categories.map((category) => (
          <meta key={category} property="article:tag" content={category} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary} />
        <meta name="twitter:image" content={post.image} />
        <meta name="keywords" content={`SHELTR, ${post.categories.join(', ')}, blockchain, charitable giving`} />
        <link rel="canonical" href={`https://sheltr.org/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.image,
            "datePublished": post.publishedAt,
            "author": {
              "@type": "Person",
              "name": post.author.name
            },
            "publisher": {
              "@type": "Organization",
              "name": "SHELTR",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sheltr.org/images/logo/sheltr-logo.png"
              }
            },
            "description": post.summary,
            "keywords": post.categories.join(', ')
          })}
        </script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8">
          <Icon name="arrowLeft" className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-semibold text-white">{post.author.name}</div>
              {post.author.title && (
                <div className="text-sm text-gray-400">{post.author.title}</div>
              )}
            </div>
            <div className="text-gray-400 text-sm ml-auto">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <span 
                key={category}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200"
              >
                {category}
              </span>
            ))}
          </div>
          <div className="text-gray-400">{hashtags}</div>
        </header>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => (
                <a {...props} className="text-indigo-400 hover:text-indigo-300" />
              ),
              img: ({ node, ...props }) => (
                <img {...props} className="rounded-lg" loading="lazy" />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-semibold mb-2">Share this post</h2>
              <div className="flex gap-4">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}&hashtags=${post.categories.join(',')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Icon name="twitter" className="w-6 h-6" />
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Icon name="linkedin" className="w-6 h-6" />
                </a>
              </div>
            </div>
            {post.author.bio && (
              <div className="max-w-sm">
                <h2 className="text-white font-semibold mb-2">About the Author</h2>
                <p className="text-gray-400 text-sm">{post.author.bio}</p>
              </div>
            )}
          </div>
        </footer>
      </article>
    </>
  );
}