import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useQuery } from 'react-query';
import { fetchMarkdown } from '../../../lib/api';
import { Layout } from '../Layout';

export const WhitepaperLayout = () => {
  const { i18n } = useTranslation();

  const contentPath = `/content/whitepaper/whitepaper_${i18n.language === 'fr' ? 'fr' : 'en'}.md`;

  const { data: content } = useQuery(['whitepaper', i18n.language], () => fetchMarkdown(contentPath));

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <ReactMarkdown source={content} />
      </div>
    </Layout>
  );
};
