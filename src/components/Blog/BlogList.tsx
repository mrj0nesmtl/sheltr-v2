import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '@/lib/content/blog/posts';
import { formatDate } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function BlogList() {
  return (
    <>
      <Helmet>
        <title>SHELTR Blog - Latest Updates on Charitable Giving Technology</title>
        <meta name="description" content="Stay updated with the latest news, insights, and stories about SHELTR's mission to revolutionize charitable giving through blockchain technology." />
        <meta property="og:title" content="SHELTR Blog" />
        <meta property="og:description" content="Latest updates on charitable giving technology and homeless support initiatives." />
        <meta property="og:image" content="/images/social/blog-cover.jpg" />
        <meta property="og:type" content="blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="SHELTR, blockchain, charitable giving, homelessness, technology, social impact" />
        <link rel="canonical" href="https://sheltr.org/blog" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Latest Updates</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with our latest news, insights, and stories about revolutionizing charitable giving.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
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
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-400">{post.author.name}</span>
                    </div>
                    <span className="text-indigo-400 flex items-center gap-1">
                      Read more <Icon name="arrowRight" className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <section className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-200 mb-6">
              Get the latest updates on SHELTR's development, impact stories, and community news.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-indigo-600 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}