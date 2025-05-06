"use client";

import React from 'react';
import styles from '@/app/(landing_page)/landing.module.css';
import { AnimationProvider } from '@/app/(landing_page)/components/AnimationProvider';
import { HeroSection } from '@/app/(landing_page)/components/HeroSection';
import { ProductShowcase } from '@/app/(landing_page)/components/ProductShowcase';
import { FeaturesSection } from '@/app/(landing_page)/components/FeaturesSection';
import { PricingWrapper } from '@/app/(landing_page)/components/PricingWrapper';
import { PartnersSection } from '@/app/(landing_page)/components/PartnersSection';
import { TestimonialsSection } from '@/app/(landing_page)/components/TestimonialsSection';
import { CallToAction } from '@/app/(landing_page)/components/cta';
import { Chatbot } from '@/app/(landing_page)/components/Chatbot';

export default function LandingPage() {
  return (
    <AnimationProvider>
      <main className={styles.landingContainer}>
        <HeroSection />
        <ProductShowcase />
        <FeaturesSection />
        <PricingWrapper />
        <PartnersSection />
        <TestimonialsSection />
        <CallToAction />
        <Chatbot />
      </main>
    </AnimationProvider>
  );
}
