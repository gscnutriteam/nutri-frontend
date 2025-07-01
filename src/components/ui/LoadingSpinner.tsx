'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 24, 
  className = '' 
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <Loader2 className={`h-${size/4} w-${size/4} animate-spin text-primary`} />
    </div>
  );
} 