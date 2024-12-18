import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function PageMeta({ 
  title = 'SHELTR - Revolutionizing Charitable Giving',
  description = 'Transform donations into meaningful actions using blockchain technology and smart contracts to directly support homeless individuals.',
  image = '/images/logo.svg',
  url = 'https://sheltr-ops.netlify.app'
}: PageMetaProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:image:width" content="564" />
      <meta property="og:image:height" content="132" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}${image}`} />
    </Helmet>
  );
} 