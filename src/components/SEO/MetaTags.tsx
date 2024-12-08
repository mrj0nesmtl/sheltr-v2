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
  image = '/images/homeless-person-bench.jpg',
  url = 'https://sheltr.org'
}: MetaTagsProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="icon" type="image/svg+xml" href="/images/icon.svg" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SHELTR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@sheltr" />

      {/* Additional Meta Tags */}
      <meta name="application-name" content="SHELTR" />
      <meta name="theme-color" content="#1F2937" />
      <link rel="apple-touch-icon" href="/images/icon.svg" />
    </Helmet>
  );
} 