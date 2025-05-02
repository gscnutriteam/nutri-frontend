"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { purchaseSubscription } from '../api/subscriptions';

interface PremiumSubscribeButtonProps {
  planId: string;
  isActive?: boolean;
}

export default function PremiumSubscribeButton({
  planId,
  isActive = false
}: PremiumSubscribeButtonProps) {
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
    <>
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
    </>
  );
} 