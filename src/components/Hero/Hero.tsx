import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Feature {
  title: string;
  description: string;
  icon: IconName;
  color: string;
}

export function Hero() {
  const { t } = useTranslation();

  const features: Feature[] = [
    {
      title: 'QR Technology',
      description: t('hero.qrTechnology'),
      icon: 'qrCode' as const,
      color: 'bg-purple-500'
    },
    {
      title: 'Direct Impact',
      description: t('hero.directImpact'),
      icon: 'heart' as const,
      color: 'bg-rose-500'
    },
    {
      title: 'Smart Allocation',
      description: t('hero.smartAllocation'),
      icon: 'wallet' as const,
      color: 'bg-emerald-500'
    },
    {
      title: 'Housing Focus',
      description: t('hero.housingFocus'),
      icon: 'home' as const,
      color: 'bg-blue-500'
    },
    {
      title: 'Blockchain Security',
      description: t('hero.blockchainSecurity'),
      icon: 'shield' as const,
      color: 'bg-indigo-500'
    },
    {
      title: 'Impact Tracking',
      description: t('hero.impactTracking'),
      icon: 'lineChart' as const,
      color: 'bg-cyan-500'
    },
  ];

  return (
    <div className="bg-primary text-primary">
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
        {/* Rest of hero content */}
      </div>
    </div>
  );
} 