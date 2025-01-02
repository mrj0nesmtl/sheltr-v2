import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  author?: string;
  publishedDate?: string;
  type?: string;
}

export function MetaTags({ 
  title = 'SHELTR - Hacking Homelessness with Technology',
  description = 'Transform daily donations into meaningful actions using blockchain technology and smart contracts to directly support homeless individuals with transparency and accountability.',
  image = 'https://sheltr-ops.replit.app/images/og-image.jpg',
  url = 'https://sheltr-ops.replit.app',
  author = 'SHELTR Team',
  publishedDate = new Date().toISOString(),
  type = 'website'
}: MetaTagsProps) {
  const fullImageUrl = image;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SHELTR" />

      {/* LinkedIn Specific */}
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta name="author" content={author} />
      <meta name="article:published_time" content={publishedDate} />
      <meta name="article:author" content={author} />
      <meta name="article:publisher" content="SHELTR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:src" content={fullImageUrl} />
      
      {/* Additional Meta Tags */}
      <meta property="og:locale" content="en_US" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Add debugging meta tags */}
      <meta name="debug:image" content={fullImageUrl} />
      <meta name="debug:url" content={url} />
      
      {/* Ensure image is specified multiple ways */}
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta name="twitter:image:src" content={fullImageUrl} />
      <meta itemprop="image" content={fullImageUrl} />
    </Helmet>
  );
} 