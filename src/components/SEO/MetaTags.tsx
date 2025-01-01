import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function MetaTags({ 
  title = 'SHELTR - Hacking Homelessness with Technology',
  description = 'Transform donations into meaningful actions using blockchain technology and smart contracts to directly support homeless individuals with transparency and accountability.',
  image = '/images/og-image.jpg',
  url = 'https://sheltr-ops.replit.app'
}: MetaTagsProps) {
  const siteUrl = 'https://sheltr-ops.replit.app';
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SHELTR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* LinkedIn */}
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta name="author" content="SHELTR" />
      <meta name="publisher" content="SHELTR" />

      {/* Additional Meta Tags */}
      <meta property="og:locale" content="en_US" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  );
} 