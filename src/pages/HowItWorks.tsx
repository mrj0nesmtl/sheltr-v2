import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { PageBackground } from '@/components/ui/PageBackground';
import { motion } from 'framer-motion';
import {
    Database,
    Home,
    LineChart,
    QrCode,
    Shield,
    Wallet
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      title: '1. Scan QR Code',
      description: 'Each participant has a unique QR code linked to their secure digital wallet. Simply scan to start your donation.',
      icon: QrCode,
      iconBg: 'bg-indigo-500/30',
      iconColor: 'text-indigo-400',
      borderColor: 'border-indigo-500/20'
    },
    {
      title: '2. Smart Allocation',
      description: 'Your donation is automatically split: 80% for immediate needs, 15% for housing, and 5% for operations.',
      icon: Wallet,
      iconBg: 'bg-purple-500/30',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '3. Secure Processing',
      description: 'Blockchain technology ensures transparent and secure transaction processing with complete accountability.',
      icon: Shield,
      iconBg: 'bg-blue-500/30',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20'
    },
    {
      title: '4. Housing Fund',
      description: '15% of donations accumulate in a housing fund, helping participants work towards stable housing solutions.',
      icon: Home,
      iconBg: 'bg-emerald-500/30',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20'
    }
  ];

  const transparency = [
    {
      title: 'Blockchain Verified',
      description: 'Every transaction is recorded on the blockchain, ensuring complete transparency and accountability.',
      icon: Database,
      iconBg: 'bg-rose-500/30',
      iconColor: 'text-rose-400',
      borderColor: 'border-rose-500/20'
    },
    {
      title: 'Smart Contracts',
      description: 'Automated fund distribution through smart contracts ensures your donation is used as intended.',
      icon: Wallet,
      iconBg: 'bg-amber-500/30',
      iconColor: 'text-amber-400',
      borderColor: 'border-amber-500/20'
    },
    {
      title: 'Impact Tracking',
      description: 'Track the real impact of your donations with our transparent reporting system.',
      icon: LineChart,
      iconBg: 'bg-cyan-500/30',
      iconColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/20'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-900">
      <PageBackground
        imagePath="/images/backgrounds/how-it-works-bg.jpg"
        alt={t('howItWorks.backgroundAlt')}
        opacity={15}
        overlay={true}
        fadeHeight="75vh"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                How SHELTR Works
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Our innovative platform combines blockchain technology with direct funding support to create lasting change in the lives of homeless individuals.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border ${step.borderColor} hover:bg-gray-800/60 transition-all duration-300`}
              >
                <div className={`${step.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transparency Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl py-24 px-4 sm:px-6 lg:px-8 my-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Transparency & Trust
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
            {transparency.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border ${item.borderColor} hover:bg-gray-800/60 transition-all duration-300`}
              >
                <div className={`${item.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join us in revolutionizing charitable giving and creating lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 min-w-[200px]">
                  Become a Donor
                </Button>
              </Link>
              <Link to="/solutions">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Partner with Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 