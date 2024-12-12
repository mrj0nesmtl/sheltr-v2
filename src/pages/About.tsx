import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Shield, Database, Globe, Users, 
  Code, Lock, Network, LineChart,
  Blocks, QrCode, Wallet, Brain,
  GitBranchPlus, CheckCircle2, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Button } from '@/components/ui/Button';
import { ProjectStatus } from '@/components/About/ProjectStatus';

export function AboutPage() {
  const { t } = useTranslation();

  const keyConcepts = [
    {
      title: 'Blockchain Transparency',
      description: 'Every donation is verified and tracked on the blockchain, ensuring complete transparency and accountability.',
      icon: Shield,
      iconBg: 'bg-indigo-500/20',
      iconColor: 'text-indigo-400',
      highlight: '100% Verifiable Transactions'
    },
    {
      title: 'QR Code Integration',
      description: 'Instant, secure donations through unique QR codes assigned to each participant.',
      icon: QrCode,
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      highlight: 'Direct Donor-to-Participant Connection'
    },
    {
      title: 'Smart Fund Allocation',
      description: 'Automated distribution of funds through smart contracts for maximum impact.',
      icon: Wallet,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      highlight: '80% Direct Support | 15% Housing | 5% Operations'
    }
  ];

  const techStack = [
    {
      title: 'Frontend Technologies',
      description: 'React 18, TypeScript, Tailwind CSS',
      icon: Code,
      features: [
        'Modern React with Hooks',
        'Type-safe development',
        'Responsive design',
        'Component library'
      ]
    },
    {
      title: 'Backend Infrastructure',
      description: 'Node.js, Supabase, PostgreSQL',
      icon: Database,
      features: [
        'Serverless architecture',
        'Real-time subscriptions',
        'Secure data storage',
        'API endpoints'
      ]
    },
    {
      title: 'Blockchain Integration',
      description: 'Polygon, Smart Contracts, Web3',
      icon: Blocks,
      features: [
        'Smart contract automation',
        'Transaction verification',
        'Wallet integration',
        'Token management'
      ]
    }
  ];

  const roadmap = [
    {
      title: 'Phase 1: Foundation',
      description: 'Completed Q4 2023',
      icon: GitBranchPlus,
      features: [
        'Core authentication system',
        'Basic user roles',
        'Initial database schema',
        'Project structure'
      ]
    },
    {
      title: 'Phase 2: Core Features',
      description: 'Completed Q1 2024',
      icon: CheckCircle2,
      features: [
        'QR code scanning system',
        'Multi-language support',
        'Role-based dashboards',
        'Blockchain integration'
      ]
    },
    {
      title: 'Phase 3: Enhancement',
      description: 'Current - Q2 2024',
      icon: Network,
      features: [
        'Analytics integration',
        'Payment processing',
        'Smart contract auditing',
        'Mobile optimization'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About SHELTR
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              SHELTR is revolutionizing charitable giving through blockchain technology, creating direct connections between donors and individuals experiencing homelessness.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Project Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white text-center mb-6"
        >
          Project Status
        </motion.h2>
        <ProjectStatus />
      </div>

      {/* Key Concepts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white text-center mb-6"
        >
          Key Features
        </motion.h2>
        <div className="grid gap-4 md:grid-cols-3">
          {keyConcepts.map((concept, index) => (
            <FeatureCard
              key={index}
              {...concept}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white text-center mb-6"
        >
          Technology Stack
        </motion.h2>
        <div className="grid gap-4 md:grid-cols-3">
          {techStack.map((tech, index) => (
            <FeatureCard
              key={index}
              {...tech}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white text-center mb-16"
        >
          Development Roadmap
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          {roadmap.map((phase, index) => (
            <FeatureCard
              key={index}
              {...phase}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>

      {/* Whitepaper CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Want to Learn More?
          </h2>
          <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
            Read our technical whitepaper for a comprehensive overview of SHELTR's architecture and implementation.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700"
            asChild
          >
            <a href="/blockchain/whitepaper">
              <FileText className="w-5 h-5 mr-2" />
              Read the Whitepaper
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
} 