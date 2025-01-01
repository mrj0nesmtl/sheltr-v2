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
  url = 'https://sheltr.org'
}: MetaTagsProps) {
  const canonicalUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/images/logo.svg" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="SHELTR" />

      {/* PWA Icons */}
      <link rel="icon" type="image/png" sizes="192x192" href="/images/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/images/icon-512.png" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${canonicalUrl}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SHELTR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${canonicalUrl}${image}`} />
      <meta name="twitter:site" content="@sheltr" />

      {/* PWA Meta Tags */}
      <meta name="application-name" content="SHELTR" />
      <meta name="theme-color" content="#1F2937" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/manifest.json" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
} 