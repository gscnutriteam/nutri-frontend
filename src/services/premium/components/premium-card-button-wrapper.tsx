"use client";

import PremiumSubscribeButton from './premium-subscribe-button';

interface PremiumCardButtonWrapperProps {
  planId: string;
  isActive: boolean;
}

export default function PremiumCardButtonWrapper({ planId, isActive }: PremiumCardButtonWrapperProps) {
  return <PremiumSubscribeButton planId={planId} isActive={isActive} />;
} 