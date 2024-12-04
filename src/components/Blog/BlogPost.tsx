import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Category {
  name: string;
  slug: string;
}

interface BlogPostProps {
  title: string;
  content: string;
  publishedAt: string;
  author: {
    name: string;
  };
  categories: Category[];
}

export function BlogPost({ title, content, publishedAt, author, categories }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <div className="flex items-center text-gray-400 gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <time>{new Date(publishedAt).toLocaleDateString()}</time>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>{author.name}</span>
          </div>
        </div>
        {categories.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <Tag className="h-5 w-5 text-gray-400" />
            <div className="flex gap-2">
              {categories.map((category) => (
                <span
                  key={category.slug}
                  className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>
      <div 
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}