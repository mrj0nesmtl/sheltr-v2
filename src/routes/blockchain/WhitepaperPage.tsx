import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useWhitepaper } from '@/hooks/useWhitepaper';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function WhitepaperPage() {
  const { i18n } = useTranslation();
  const { content, isLoading, error } = useWhitepaper(i18n.language);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 flex items-center text-red-400">
            <Icon name="alert-triangle" className="h-5 w-5 mr-2" />
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2"
          >
            <Icon name="globe" className="h-4 w-4" />
            <span>{i18n.language === 'en' ? 'Français' : 'English'}</span>
          </Button>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => window.print()}
            >
              <Icon name="printer" className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Icon name="download" className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-bold mb-8 text-white" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-bold mt-12 mb-6 text-white" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl font-bold mt-8 mb-4 text-white" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a 
                  className="text-indigo-400 hover:text-indigo-300 transition-colors" 
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="my-6 list-disc list-inside" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="my-6 list-decimal list-inside" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote 
                  className="border-l-4 border-indigo-500 pl-4 my-4 italic" 
                  {...props}
                />
              ),
              code: ({ node, inline, ...props }) => (
                inline ? (
                  <code 
                    className="bg-gray-800 px-1 py-0.5 rounded text-sm" 
                    {...props}
                  />
                ) : (
                  <code 
                    className="block bg-gray-800 p-4 rounded-lg text-sm" 
                    {...props}
                  />
                )
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <p>© 2024 SHELTR. All rights reserved.</p>
            <p>Last updated: March 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
} 