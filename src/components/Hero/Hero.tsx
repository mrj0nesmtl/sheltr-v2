import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart, Wallet, Home, QrCode, Shield, BarChart3 } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();

  const features = [
    {
      title: 'Direct Impact',
      description: 'Your donations directly support individuals in need through secure, transparent blockchain transactions.',
      icon: Heart,
      styles: {
        icon: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        glow: 'group-hover:shadow-indigo-500/30',
        border: 'group-hover:border-indigo-500/50'
      }
    },
    {
      title: 'Smart Allocation',
      description: 'Funds are automatically distributed: 80% for immediate needs, 15% for housing, and 5% for operations.',
      icon: Wallet,
      styles: {
        icon: 'text-purple-400',
        bg: 'bg-purple-500/20',
        hover: 'hover:border-purple-500/50 hover:shadow-purple-500/20'
      }
    },
    {
      title: 'Housing Focus',
      description: 'Every donation contributes to a dedicated housing fund, helping create lasting change.',
      icon: Home,
      styles: {
        icon: 'text-blue-400',
        bg: 'bg-blue-500/20',
        hover: 'hover:border-blue-500/50 hover:shadow-blue-500/20'
      }
    },
    {
      title: 'QR Technology',
      description: 'Scan unique QR codes to make instant, secure donations to specific individuals in need.',
      icon: QrCode,
      styles: {
        icon: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
        hover: 'hover:border-emerald-500/50 hover:shadow-emerald-500/20'
      }
    },
    {
      title: 'Blockchain Security',
      description: 'Every transaction is secured and verified through blockchain technology, ensuring complete transparency.',
      icon: Shield,
      styles: {
        icon: 'text-rose-400',
        bg: 'bg-rose-500/20',
        hover: 'hover:border-rose-500/50 hover:shadow-rose-500/20'
      }
    },
    {
      title: 'Impact Tracking',
      description: 'Monitor your contributions and see the real impact of your donations in real-time.',
      icon: BarChart3,
      styles: {
        icon: 'text-amber-400',
        bg: 'bg-amber-500/20',
        hover: 'hover:border-amber-500/50 hover:shadow-amber-500/20'
      }
    }
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">
          {t('hero.title')}
        </h1>
        <Button
          variant="outline"
          size="lg"
          asChild
        >
          <Link to="/blockchain/whitepaper">
            <Icon name="file-text" className="mr-2 h-5 w-5" />
            {t('hero.readWhitepaper')}
          </Link>
        </Button>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className={`
                  relative p-6 rounded-2xl 
                  bg-gray-800/30 backdrop-blur-lg
                  border border-gray-700/50
                  transition-all duration-500 ease-out
                  hover:bg-gray-800/50
                  hover:-translate-y-1 hover:scale-[1.02]
                  hover:shadow-2xl
                  ${feature.styles.glow}
                  ${feature.styles.border}
                  group
                  cursor-pointer
                `}
              >
                {/* Glow effect */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500
                  ${feature.styles.bg} blur-xl -z-10
                `} />
                
                <div 
                  className={`
                    inline-flex p-3 rounded-lg mb-4
                    ${feature.styles.bg}
                    transform transition-all duration-500
                    group-hover:scale-110 group-hover:rotate-3
                    ring-1 ring-white/10 group-hover:ring-white/20
                  `}
                >
                  <Icon 
                    className={`
                      w-6 h-6 ${feature.styles.icon}
                      transition-all duration-500
                      group-hover:animate-pulse
                      group-hover:scale-110
                    `}
                  />
                </div>
                <h3 className="
                  text-lg font-semibold text-white mb-2
                  transition-all duration-500
                  group-hover:text-opacity-100
                  group-hover:translate-x-1
                ">
                  {feature.title}
                </h3>
                <p className="
                  text-gray-400
                  transition-all duration-500
                  group-hover:text-gray-300
                  group-hover:translate-x-1
                ">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 