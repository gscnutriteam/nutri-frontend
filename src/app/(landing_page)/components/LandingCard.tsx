'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import styles from '../landing.module.css';

interface LandingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'neutral' | 'yellow' | 'mint';
  isRecommended?: boolean;
}

export const LandingCard: React.FC<LandingCardProps> = ({
  className,
  children,
  variant = 'default',
  isRecommended = false,
  ...props
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white';
      case 'yellow':
        return 'bg-yellow-300 text-black';
      case 'mint':
        return 'bg-[#DEF5E0] text-black';
      case 'neutral':
        return 'bg-white text-black';
      default:
        return 'bg-secondary text-black';
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl border-2 border-black shadow-shadow transition-all',
        getBackgroundColor(),
        isRecommended && 'relative z-10',
        className
      )}
      {...props}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <div className="bg-button text-white font-bold px-4 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            BEST VALUE
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export const LandingCardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('p-6', className)} {...props}>
    {children}
  </div>
);

export const LandingFeatureCard: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    description: string;
    icon: React.ReactNode;
    iconClass: string;
    buttonVariant?: 'default' | 'reverse';
  }
> = ({ title, description, icon, iconClass, buttonVariant = 'default', className, ...props }) => (
  <LandingCard 
    className={cn('bg-white hover:bg-secondary/10 hover:translate-y-[-5px]', className)} 
    {...props}
  >
    <LandingCardContent>
      <div className={`${styles.featureIcon} ${iconClass}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-base">{description}</p>
      
      <button 
        className={cn(
          'mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm px-4 py-2 border-2 border-black transition-all',
          buttonVariant === 'default' 
            ? 'bg-button text-white shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none' 
            : 'bg-secondary shadow-shadow text-black hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none'
        )}
      >
        Pelajari Lebih Lanjut
      </button>
    </LandingCardContent>
  </LandingCard>
); 