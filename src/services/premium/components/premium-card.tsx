"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2Icon, XIcon, CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { purchaseSubscription } from '../api/subscriptions';

interface Feature {
  text: string;
  available: boolean;
}

interface PremiumCardProps {
  title: string;
  price: string;
  period: string;
  features: Feature[];
  badge: string;
  isMostPopular?: boolean;
  variant?: "default" | "primary" | "neutral" | "yellow" | "mint";
  planId: string;
  isActive?: boolean;
}

const PremiumCard: React.FC<PremiumCardProps> = ({
  title,
  price,
  period,
  features,
  badge,
  isMostPopular = false,
  variant = "neutral",
  planId,
  isActive = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    // If plan is already active, no need to purchase
    if (isActive) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Use the server action to purchase the subscription with default payment method
      const result = await purchaseSubscription(planId, 'gopay');
      
      if (result) {
        // Show success notification
        alert('Subscription successfully purchased!');
        router.refresh(); // Refresh the page to show updated subscription status
      } else {
        alert('Failed to purchase subscription. Please try again.');
      }
    } catch (error) {
      console.error('Failed to purchase subscription:', error);
      alert('Failed to purchase subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={`overflow-hidden rounded-xl border-2 ${isActive ? 'border-green-500 shadow-md shadow-green-200' : ''} relative`}
      variant={variant}
    >
      {isActive && (
        <div className="absolute -right-1 -top-1 bg-green-500 text-white p-1 rounded-bl-lg rounded-tr-lg shadow z-10 flex items-center">
          <CheckIcon size={14} className="mr-1" />
          <span className="text-xs font-semibold">Paket Anda</span>
        </div>
      )}
      
      <div className="relative p-5">
        {/* Plan title and price */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            {badge && badge !== "Aktif" && (
              <Badge 
                variant="default"
                className="ml-2 bg-teal-500 text-white"
              >
                {badge}
              </Badge>
            )}
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">{price}</span>
            {period && <span className="text-sm"> {period}</span>}
          </div>
        </div>
        
        {/* Features list */}
        <ul className="space-y-1.5 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature.available ? (
                <span className={`mr-2 ${isActive ? 'text-green-500' : 'text-teal-500'}`}>
                  <CheckCircle2Icon size={16} />
                </span>
              ) : (
                <span className="mr-2 text-red-500">
                  <XIcon size={16} />
                </span>
              )}
              <span className="text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>
        
        {/* Subscribe button */}
        <div className="flex justify-end">
          {isActive ? (
            <Button 
              variant="default" 
              className="bg-green-500 text-white py-1 px-3 text-sm cursor-default opacity-90"
              disabled={true}
            >
              <CheckIcon size={16} className="mr-1" />
              Paket Aktif
            </Button>
          ) : (
            <Button 
              variant="default" 
              className="bg-teal-500 hover:bg-teal-600 text-white py-1 px-3 text-sm"
              onClick={handleSubscribe}
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Langganan'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PremiumCard; 