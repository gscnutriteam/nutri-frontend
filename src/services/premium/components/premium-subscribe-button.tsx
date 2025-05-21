"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MidtransPaymentButton from './midtrans-payment-button';

interface PremiumSubscribeButtonProps {
  planId: string;
  isActive?: boolean;
  planName?: string;
  amount?: number;
  lockOthersIfActive?: boolean;
}

export default function PremiumSubscribeButton({
  planId,
  isActive = false,
  planName = "Premium",
  amount = 0,
  lockOthersIfActive = false
}: PremiumSubscribeButtonProps) {
  const router = useRouter();

  // Extract numbers from the price string if amount isn't provided
  const getAmount = () => {
    if (amount > 0) return amount;
    
    // Fallback amounts based on plan IDs
    const planAmounts: Record<string, number> = {
      "1": 15000,
      "2": 99000,
      "3": 30000,
      "4": 120000
    };
    
    return planAmounts[planId] || 10000; // Default to 10000 if not found
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
        <MidtransPaymentButton
          planId={planId}
          planName={planName}
          amount={getAmount()}
          buttonText="Langganan"
          disabled={lockOthersIfActive}
        />
      )}
    </>
  );
} 