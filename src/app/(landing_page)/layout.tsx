import React from 'react';
import { Navbar } from '@/services/landing_page/components/navbar';

interface LandingPageLayoutProps {
  children: React.ReactNode;
}

export default function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
} 