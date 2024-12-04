import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  author: {
    name: string;
  };
}

export function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden hover:bg-white/15 transition-colors"
        >
          <Link to={`/blog/${post.slug}`} className="block">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-400 gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time>{new Date(post.published_at).toLocaleDateString()}</time>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}