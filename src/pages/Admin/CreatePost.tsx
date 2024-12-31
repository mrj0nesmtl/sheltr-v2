import { BlogEditor } from '@/components/Blog/BlogEditor';
import { createBlogPost } from '@/lib/api/blogApi';
import { useNavigate } from 'react-router-dom';

export function CreatePost() {
  const navigate = useNavigate();

  const handleSave = async (values: {
    title: string;
    content: string;
    excerpt: string;
    categories: string[];
    published: boolean;
  }) => {
    try {
      const slug = values.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const post = await createBlogPost({
        ...values,
        slug,
        author_id: 'your-author-id', // Get from auth context
      });

      navigate(`/blog/${post.slug}`);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <BlogEditor onSave={handleSave} />
    </div>
  );
} 