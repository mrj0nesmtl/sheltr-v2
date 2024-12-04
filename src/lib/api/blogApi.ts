import { supabase } from '../supabase';

export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      published_at,
      author:author_id(name)
    `)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getBlogPost(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      content,
      published_at,
      author:author_id(name),
      categories:posts_categories(
        category:blog_categories(name, slug)
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) throw error;
  return data;
}

export async function createBlogPost(post: {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  author_id: string;
  categories: string[];
}) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      slug: post.slug,
      published: post.published,
      published_at: post.published ? new Date().toISOString() : null,
      author_id: post.author_id
    })
    .select()
    .single();

  if (error) throw error;

  if (post.categories.length > 0) {
    const { error: categoriesError } = await supabase
      .from('posts_categories')
      .insert(
        post.categories.map(categoryId => ({
          post_id: data.id,
          category_id: categoryId
        }))
      );

    if (categoriesError) throw categoriesError;
  }

  return data;
}

export async function updateBlogPost(
  id: string,
  updates: Partial<{
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    published: boolean;
    categories: string[];
  }>
) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...updates,
      published_at: updates.published ? new Date().toISOString() : null
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  if (updates.categories) {
    // Remove existing categories
    await supabase
      .from('posts_categories')
      .delete()
      .eq('post_id', id);

    // Add new categories
    if (updates.categories.length > 0) {
      const { error: categoriesError } = await supabase
        .from('posts_categories')
        .insert(
          updates.categories.map(categoryId => ({
            post_id: id,
            category_id: categoryId
          }))
        );

      if (categoriesError) throw categoriesError;
    }
  }

  return data;
}