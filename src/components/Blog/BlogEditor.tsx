import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BlogEditorProps {
  initialValues?: {
    title: string;
    content: string;
    excerpt: string;
    categories: string[];
  };
  onSave: (values: {
    title: string;
    content: string;
    excerpt: string;
    categories: string[];
    published: boolean;
  }) => Promise<void>;
}

export function BlogEditor({ initialValues, onSave }: BlogEditorProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [content, setContent] = useState(initialValues?.content ?? '');
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt ?? '');
  const [categories, setCategories] = useState<string[]>(initialValues?.categories ?? []);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent, published: boolean) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({
        title,
        content,
        excerpt,
        categories,
        published
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="max-w-4xl mx-auto space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={cn(
            "mt-1 block w-full rounded-md",
            "bg-white/5 border border-gray-600 text-white",
            "focus:ring-indigo-500 focus:border-indigo-500"
          )}
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className={cn(
            "mt-1 block w-full rounded-md",
            "bg-white/5 border border-gray-600 text-white",
            "focus:ring-indigo-500 focus:border-indigo-500"
          )}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300">
          Content
        </label>
        <textarea
          id="content"
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={cn(
            "mt-1 block w-full rounded-md",
            "bg-white/5 border border-gray-600 text-white",
            "focus:ring-indigo-500 focus:border-indigo-500"
          )}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          onClick={(e) => handleSubmit(e, false)}
          disabled={isSaving}
          className={cn(
            "px-4 py-2 border border-gray-600 rounded-md",
            "text-white bg-transparent hover:bg-white/5",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            "disabled:opacity-50"
          )}
        >
          Save Draft
        </button>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e, true)}
          disabled={isSaving}
          className={cn(
            "px-4 py-2 border border-transparent rounded-md",
            "text-white bg-indigo-600 hover:bg-indigo-700",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            "disabled:opacity-50",
            "flex items-center gap-2"
          )}
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Publish'}
        </button>
      </div>
    </form>
  );
}