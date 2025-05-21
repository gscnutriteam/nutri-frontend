"use client";

import PremiumSubscribeButton from './premium-subscribe-button';

interface PremiumCardButtonWrapperProps {
  planId: string;
  isActive: boolean;
  planName?: string;
  amount?: number;
  lockOthersIfActive?: boolean;
}

export default function PremiumCardButtonWrapper({ 
  planId, 
  isActive,
  planName,
  amount,
  lockOthersIfActive = false
}: PremiumCardButtonWrapperProps) {
  return (
    <PremiumSubscribeButton 
      planId={planId} 
      isActive={isActive} 
      planName={planName} 
      amount={amount} 
      lockOthersIfActive={lockOthersIfActive}
    />
  );
} 