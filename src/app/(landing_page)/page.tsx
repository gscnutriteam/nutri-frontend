import { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NutriPlate - Home',
  description: 'Welcome to NutriPlate - Your nutrition guidance',
};

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pb-24">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primaryLight to-white opacity-30"></div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 pt-12 md:pt-20">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Nutrition Made <span className="text-primary">Simple</span> for Everyone
              </h1>
              
              <p className="text-lg text-gray-700">
                Track your meals, analyze your nutrition, and get personalized recommendations to improve your health journey.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  asChild 
                  variant="default" 
                  size="lg" 
                  className="bg-primary text-white rounded-base border-2 border-black shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                >
                  <Link href="/products" className="flex items-center gap-2">
                    Dapatkan Produk
                    <ArrowRight size={16} />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="neutralNoShadow"
                  size="lg" 
                  className="rounded-base border-2 border-black"
                >
                  <Link href="/features">
                    Pelajari Fitur
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="relative w-full h-full p-6">
                  <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-primaryLight rounded-lg -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-secondaryLight rounded-lg -z-10"></div>
                  <div className="relative w-full h-full border-2 border-black rounded-lg overflow-hidden shadow-shadow bg-white p-4">
                    <Image 
                      src="/assets/img/welcome.png" 
                      alt="NutriPlate App" 
                      width={400}
                      height={400}
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 