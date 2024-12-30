import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import {
    BarChart3, Cog, Headphones,
    Shield,
    Users
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PageBackground } from '@/components/ui/PageBackground';

export default function Solutions() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const solutions = [
    {
      title: 'For Shelters & Organizations',
      icon: Users,
      features: [
        'Participant management system',
        'Fund allocation tracking',
        'Impact reporting dashboard',
        'QR code generation',
        'Real-time analytics'
      ],
      iconBg: 'bg-indigo-500/20',
      iconColor: 'text-indigo-400'
    },
    {
      title: 'For Participants',
      icon: Shield,
      features: [
        'Secure digital wallet',
        'Housing fund tracking',
        'Progress monitoring',
        'Resource connections',
        'Support network'
      ],
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400'
    },
    {
      title: 'For Donors',
      icon: BarChart3,
      features: [
        'Transparent transactions',
        'Impact visualization',
        'Donation history',
        'Tax receipts',
        'Community engagement'
      ],
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400'
    }
  ];

  const benefits = [
    {
      title: 'Technology Benefits',
      icon: Cog,
      features: [
        'Blockchain security',
        'Smart contract automation',
        'Real-time tracking',
        'Data analytics',
        'Mobile accessibility'
      ],
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-400'
    },
    {
      title: 'Support & Resources',
      icon: Headphones,
      features: [
        '24/7 technical support',
        'Training materials',
        'Implementation guidance',
        'Community forums',
        'Regular updates'
      ],
      iconBg: 'bg-rose-500/20',
      iconColor: 'text-rose-400'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-900">
      <PageBackground
        imagePath="/images/backgrounds/solutions-bg.jpg"
        alt={t('solutions.backgroundAlt')}
        opacity={15}
        overlay={true}
        fadeHeight="65vh"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Solutions for Everyone
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive tools and features designed to maximize impact and ensure transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {solutions.map((solution, index) => (
              <FeatureCard
                key={index}
                title={solution.title}
                icon={solution.icon}
                features={solution.features}
                iconBg={solution.iconBg}
                iconColor={solution.iconColor}
              />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-800/30 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white text-center mb-16">
              Partnership Benefits
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <FeatureCard
                  key={index}
                  title={benefit.title}
                  icon={benefit.icon}
                  features={benefit.features}
                  iconBg={benefit.iconBg}
                  iconColor={benefit.iconColor}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/95">
            {/* We can add background image here later */}
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-12 text-center shadow-2xl"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Join the Revolution
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Be part of the solution to end homelessness through innovative technology.
              </p>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 text-lg
                           shadow-lg shadow-red-600/20 hover:shadow-red-500/30 
                           transform hover:-translate-y-0.5 transition-all duration-200"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 