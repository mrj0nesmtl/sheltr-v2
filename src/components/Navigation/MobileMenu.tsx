import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, QrCode, Info, Settings, FileText, Coins, Activity, Box } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation();

  const menuSections = [
    {
      title: 'SOLUTIONS',
      items: [
        {
          icon: Info,
          title: 'How It Works',
          description: 'Learn how our platform transforms charitable giving',
          href: '/how-it-works'
        },
        {
          icon: Settings,
          title: 'Solutions',
          description: 'Discover our innovative solutions for donors and shelters',
          href: '/solutions'
        },
        {
          icon: Activity,
          title: 'Impact',
          description: 'Track and measure the real impact of your contributions',
          href: '/impact'
        }
      ]
    },
    {
      title: 'COMPANY',
      items: [
        {
          icon: Info,
          title: 'About',
          description: 'Our mission to revolutionize charitable giving',
          href: '/about'
        },
        {
          icon: FileText,
          title: 'Whitepaper',
          description: 'Technical details and platform architecture',
          href: '/whitepaper'
        }
      ]
    },
    {
      title: 'BLOCKCHAIN',
      items: [
        {
          icon: FileText,
          title: 'White Paper',
          description: 'Technical details and platform architecture',
          href: '/blockchain/whitepaper'
        },
        {
          icon: Coins,
          title: '$SHELTER Token',
          description: 'Token economics and utilities',
          href: '/blockchain/token'
        },
        {
          icon: Activity,
          title: 'Transactions',
          description: 'View blockchain transactions',
          href: '/blockchain/transactions'
        },
        {
          icon: Box,
          title: 'Homeless Depot',
          description: 'Access participant resources',
          href: '/blockchain/depot'
        }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900">
      <div className="h-full overflow-y-auto">
        <div className="px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Logo className="h-8 w-auto" />
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Scan & Donate Button */}
          <Link 
            to="/scan-donate"
            className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg mb-8"
          >
            <QrCode className="h-5 w-5" />
            <span className="font-medium">Scan & Donate</span>
          </Link>

          {/* Menu Sections */}
          <div className="space-y-8">
            {menuSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-medium text-gray-400 mb-4">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block p-3 rounded-lg hover:bg-gray-800"
                      onClick={onClose}
                    >
                      <div className="flex items-start">
                        <item.icon className="h-6 w-6 text-gray-400 mr-3" />
                        <div>
                          <div className="text-white font-medium">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-400">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
            <div className="space-y-3">
              <Button 
                variant="default" 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                asChild
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-700 text-white hover:bg-gray-800"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}