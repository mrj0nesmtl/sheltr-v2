import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

interface SignUpOptionProps {
  to: string;
  icon: "heart" | "building";
  iconColor: string;
  title: string;
  description: string;
  ctaText: string;
}

const SignUpOption = ({ to, icon, iconColor, title, description, ctaText }: SignUpOptionProps) => (
  <Link 
    to={to}
    className="group bg-secondary/80 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center text-center transition-all hover:bg-secondary/90 relative overflow-hidden"
  >
    {/* Icon Container */}
    <div className="mb-6 relative">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon name={icon} className={`w-8 h-8 ${iconColor}`} />
      </div>
    </div>

    {/* Content */}
    <h2 className="text-2xl font-bold text-primary mb-3">{title}</h2>
    <p className="text-secondary mb-6">{description}</p>
    
    {/* CTA */}
    <div className="flex items-center text-accent-primary font-medium group-hover:translate-x-1 transition-transform">
      {ctaText}
      <Icon name="arrowRight" className="ml-2 w-5 h-5" />
    </div>
  </Link>
);

export function SignUpSelector() {
  const { t } = useTranslation();

  const options: SignUpOptionProps[] = [
    {
      to: "/signup/donor",
      icon: "heart",
      iconColor: "text-christmas-red",
      title: "Become a Donor",
      description: "Support individuals directly and track your impact with our transparent donation system.",
      ctaText: "Get Started"
    },
    {
      to: "/signup/shelter",
      icon: "building",
      iconColor: "text-christmas-green",
      title: "Register Your Shelter",
      description: "Partner with us to manage participants and track fund allocation effectively.",
      ctaText: "Partner Now"
    }
  ];

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-primary mb-3">
          Join the SHELTR Community
        </h1>
        <p className="text-xl text-secondary">
          Choose how you want to make a difference
        </p>
      </div>

      {/* Sign Up Options */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          {options.map((option) => (
            <SignUpOption key={option.to} {...option} />
          ))}
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-12">
          <p className="text-secondary">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-accent-primary hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}