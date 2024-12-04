-- Create blog posts table
create table if not exists public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references public.user_profiles(id) not null,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create blog categories table
create table if not exists public.blog_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  description text
);

-- Create posts_categories junction table
create table if not exists public.posts_categories (
  post_id uuid references public.blog_posts(id) on delete cascade,
  category_id uuid references public.blog_categories(id) on delete cascade,
  primary key (post_id, category_id)
);

-- Enable RLS
alter table public.blog_posts enable row level security;
alter table public.blog_categories enable row level security;
alter table public.posts_categories enable row level security;

-- Create policies
create policy "Public can view published posts"
  on blog_posts for select
  using (published = true or auth.uid() = author_id);

create policy "Super admins can manage all posts"
  on blog_posts for all
  using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid()
      and role = 'super_admin'
    )
  );

create policy "Public can view categories"
  on blog_categories for select
  using (true);

create policy "Super admins can manage categories"
  on blog_categories for all
  using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid()
      and role = 'super_admin'
    )
  );

-- Create indexes
create index idx_blog_posts_author on blog_posts(author_id);
create index idx_blog_posts_published on blog_posts(published, published_at);
create index idx_blog_posts_slug on blog_posts(slug);
create index idx_blog_categories_slug on blog_categories(slug);