import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Dynamically import the client component
const LandingPage = dynamic(
  () => import('@/services/landing_page/pages/LandingPage'),
  { 
    ssr: true,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
    )
  }
);

export const metadata: Metadata = {
  title: 'NutriCare - Smart Plate for Precision Health',
  description: 'Piring pintar pertama di Indonesia yang menggabungkan teknologi QR code dengan panduan porsi makan yang tepat',
  openGraph: {
    title: 'NutriCare - Smart Plate for Precision Health',
    description: 'Piring pintar pertama di Indonesia yang menggabungkan teknologi QR code dengan panduan porsi makan yang tepat',
    type: 'website',
    locale: 'id_ID',
    url: 'https://nutriplate.id',
    siteName: 'NutriPlate',
    images: [
      {
        url: '/assets/img/nutriplate-hero.png',
        width: 1200,
        height: 630,
        alt: 'NutriPlate Smart Plate',
      },
    ],
  },
};

export default function Page() {
  return <LandingPage />;
} 