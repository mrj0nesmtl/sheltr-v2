import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { IconName } from '@/components/ui/Icon';

interface ConceptCardProps {
  icon: IconName;
  title: string;
  description: string;
  highlight?: string;
}

function ConceptCard({ icon, title, description, highlight }: ConceptCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-gray-700/50 p-6 rounded-lg 
        transform transition-all duration-300 
        hover:bg-gray-700/70 hover:scale-105 hover:shadow-xl
        hover:shadow-indigo-500/10
        group cursor-pointer
      `}
    >
      <div className="flex items-center mb-4">
        <div className={`
          p-3 rounded-lg transition-all duration-300
          ${isHovered 
            ? 'bg-indigo-500/20 rotate-12' 
            : 'bg-indigo-500/10'
          }
        `}>
          <Icon 
            name={icon} 
            className={`
              h-6 w-6 transition-all duration-300
              ${isHovered 
                ? 'text-indigo-300 scale-110' 
                : 'text-indigo-400'
              }
            `} 
          />
        </div>
        <h3 className="text-xl font-semibold text-white ml-3 transition-colors duration-300 group-hover:text-indigo-300">
          {title}
        </h3>
      </div>
      <p className="text-gray-300 leading-relaxed mb-3 transition-colors duration-300 group-hover:text-gray-200">
        {description}
      </p>
      {highlight && (
        <div className={`
          mt-4 py-2 px-3 rounded-lg text-sm font-medium
          transition-all duration-300
          ${isHovered 
            ? 'bg-indigo-500/20 text-indigo-300' 
            : 'bg-gray-800/50 text-indigo-400'
          }
        `}>
          {highlight}
        </div>
      )}
    </div>
  );
}

interface FullContentModalProps {
  onClose: () => void;
  content: React.ReactNode;
}

function FullContentModal({ onClose, content }: FullContentModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-gray-900/95 z-50 overflow-y-auto backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="min-h-screen px-4 py-12 flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gray-800/90 rounded-xl max-w-4xl w-full p-8 shadow-2xl backdrop-blur-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Complete Introduction to SHELTR
              </h2>
              <p className="text-gray-400">
                Our comprehensive platform overview
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors group"
            >
              <Icon 
                name="x" 
                className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" 
              />
            </button>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-700/30 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Overview
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {['Users', 'Transactions', 'Impact'].map(stat => (
                  <div key={stat} className="text-center">
                    <div className="text-2xl font-bold text-indigo-400">1000+</div>
                    <div className="text-gray-400">{stat}</div>
                  </div>
                ))}
              </div>
            </div>
            {content}
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <Link 
              to="/blockchain/whitepaper"
              className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300"
            >
              <Icon name="file-text" className="h-5 w-5" />
              <span>{t('about.whitepaper.readMore')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Introduction() {
  const { t } = useTranslation();
  const [showFullContent, setShowFullContent] = useState(false);
  const [fullContent, setFullContent] = useState<string>('');

  useEffect(() => {
    const loadFullContent = async () => {
      try {
        const response = await fetch('/docs/SHELTR_INTRO_eng.md');
        const text = await response.text();
        setFullContent(text);
      } catch (error) {
        console.error('Failed to load full content:', error);
      }
    };

    if (showFullContent) {
      loadFullContent();
    }
  }, [showFullContent]);

  const keyConcepts: { icon: IconName; title: string; description: string; highlight?: string; }[] = [
    {
      icon: 'blocks',
      title: 'Blockchain Transparency',
      description: 'Every donation is verified and tracked on the blockchain, ensuring complete transparency and accountability.',
      highlight: '100% Verifiable Transactions'
    },
    {
      icon: 'qr-code',
      title: 'QR Code Integration',
      description: 'Instant, secure donations through unique QR codes assigned to each participant.',
      highlight: 'Direct Donor-to-Participant Connection'
    },
    {
      icon: 'wallet-cards',
      title: 'Smart Fund Allocation',
      description: 'Automated distribution of funds through smart contracts for maximum impact.',
      highlight: '80% Direct Support | 15% Housing | 5% Operations'
    },
    {
      icon: 'brain-circuit',
      title: 'AI-Powered Tools',
      description: 'Intelligent financial guidance and resource allocation for participants.',
      highlight: 'Personalized Support System'
    },
    {
      icon: 'shield-lock',
      title: 'Multi-Factor Security',
      description: 'Advanced security measures protecting all transactions and user data.',
      highlight: 'Bank-Grade Protection'
    },
    {
      icon: 'globe',
      title: 'Global Accessibility',
      description: 'Multi-language support and worldwide accessibility for donors and participants.',
      highlight: 'Available in Multiple Languages'
    },
    {
      icon: 'chart-bar',
      title: 'Impact Analytics',
      description: 'Real-time tracking and visualization of donation impact and community growth.',
      highlight: 'Data-Driven Insights'
    },
    {
      icon: 'users',
      title: 'Community Network',
      description: 'Building connections between donors, participants, and support organizations.',
      highlight: 'Growing Support Network'
    },
    {
      icon: 'shopping-bag',
      title: 'Homeless Depot',
      description: 'Integrated marketplace for essential items and services.',
      highlight: 'Direct Resource Access'
    }
  ];

  return (
    <div className="bg-gray-800/50 rounded-xl p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Icon name="info" className="h-8 w-8 text-indigo-400 mr-3" />
        <div>
          <h2 className="text-2xl font-bold text-white">
            {t('about.intro.title')}
          </h2>
          <p className="text-gray-400 mt-1 max-w-2xl">
            {t('about.intro.abstract')}
          </p>
        </div>
      </div>

      {/* Key Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {keyConcepts.map((concept) => (
          <ConceptCard key={concept.title} {...concept} />
        ))}
      </div>

      {/* Full Content Modal */}
      {showFullContent && (
        <FullContentModal
          onClose={() => setShowFullContent(false)}
          content={
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {fullContent}
              </ReactMarkdown>
            </div>
          }
        />
      )}
    </div>
  );
} 