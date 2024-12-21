import { Icon, IconName } from '@/components/ui/Icon';
import { Brain, Wallet, Globe, Lock, QrCode, Shield, Users, BarChart, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

type IconType = typeof Brain | typeof Wallet | typeof Globe | typeof Lock | 
                typeof QrCode | typeof Shield | typeof Users | 
                typeof BarChart | typeof ShoppingBag;

interface ConceptCardProps {
  icon: IconType | string;
  title: string;
  description: string;
  highlight?: string;
}

function ConceptCard({ icon, title, description, highlight }: ConceptCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = typeof icon === 'string'
    ? () => <Icon name={icon as IconName} className={`h-6 w-6 ${isHovered ? 'text-indigo-300 scale-110' : 'text-indigo-400'}`} />
    : icon;

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
          ${isHovered ? 'bg-indigo-500/20 rotate-12' : 'bg-indigo-500/10'}
        `}>
          <IconComponent className={`
            h-6 w-6 transition-all duration-300
            ${isHovered ? 'text-indigo-300 scale-110' : 'text-indigo-400'}
          `} />
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
              <span>Read More</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Introduction() {
  const { t, i18n } = useTranslation();
  const [showFullContent, setShowFullContent] = useState(false);
  const [fullContent, setFullContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFullContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const contentFile = i18n.language === 'fr'
          ? '/src/pages/About/content/shelter_intro_fr.md'
          : '/src/pages/About/content/sheltr_intro_eng.md';
        
        const response = await fetch(contentFile);
        if (!response.ok) throw new Error('Failed to load content');
        
        const text = await response.text();
        setFullContent(text);
      } catch (error) {
        console.error('Failed to load content:', error);
        setError('Failed to load content. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (showFullContent) {
      loadFullContent();
    }
  }, [showFullContent, i18n.language]);

  const keyConcepts: ConceptCardProps[] = [
    {
      icon: Lock,
      title: 'Blockchain Transparency', 
      description: 'Every donation is verified and tracked on the blockchain, ensuring complete transparency and accountability.',
      highlight: '100% Verifiable Transactions'
    },
    {
      icon: QrCode,
      title: 'QR Code Integration', 
      description: 'Instant, secure donations through unique QR codes assigned to each participant.',
      highlight: 'Direct Donor-to-Participant Connection'
    },
    {
      icon: Wallet,
      title: 'Smart Fund Allocation',
      description: 'Automated distribution of funds through smart contracts for maximum impact.',
      highlight: '80% Direct Support | 15% Housing | 5% Operations'
    },
    {
      icon: Brain,
      title: 'AI-Powered Tools',
      description: 'Intelligent financial guidance and resource allocation for participants.',
      highlight: 'Personalized Support System'
    },
    {
      icon: Shield,
      title: 'Multi-Factor Security',
      description: 'Advanced security measures protecting all transactions and user data.',
      highlight: 'Bank-Grade Protection'
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Multi-language support and worldwide accessibility for donors and participants.',
      highlight: 'Available in Multiple Languages'
    },
    {
      icon: BarChart,
      title: 'Impact Analytics',
      description: 'Real-time tracking and visualization of donation impact and community growth.',
      highlight: 'Data-Driven Insights'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Building connections between donors, participants, and support organizations.',
      highlight: 'Growing Support Network'
    },
    {
      icon: ShoppingBag,
      title: 'Homeless Depot',
      description: 'Integrated marketplace for essential items and services.',
      highlight: 'Direct Resource Access'
    }
  ];

  return (
    <div className="bg-gray-800/50 rounded-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
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
        <button
          onClick={() => setShowFullContent(true)}
          disabled={isLoading}
          className={`
            px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
            ${isLoading 
              ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20'
            }
          `}
        >
          {isLoading ? (
            <>
              <Icon name="loader" className="h-5 w-5 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Icon name="file-text" className="h-5 w-5" />
              <span>Read Full Overview</span>
            </>
          )}
        </button>
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

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-center text-red-400">
            <Icon name="alert-triangle" className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
          <button 
            onClick={() => setShowFullContent(true)}
            className="mt-2 text-sm text-red-400 hover:text-red-300"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
} 