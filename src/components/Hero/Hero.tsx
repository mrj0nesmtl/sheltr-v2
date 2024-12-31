import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart, Wallet, Home, QrCode, Shield, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
        </motion.div>
      </div>
    </div>
  );
} 