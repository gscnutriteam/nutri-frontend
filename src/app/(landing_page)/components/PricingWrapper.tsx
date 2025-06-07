"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, useAnimationContext, viewportConfig, mobileFirstClass, essentialContentClass } from './AnimationProvider';
import { PricingSection } from './PricingSection';

export function PricingWrapper() {
  const { controls, isMobile } = useAnimationContext();

  return (
    <motion.div
      className={`${mobileFirstClass} ${essentialContentClass} scroll-mt-28`}
      initial="initial"
      animate={isMobile ? controls : undefined}
      whileInView={!isMobile ? "animate" : undefined}
      viewport={viewportConfig}
      variants={fadeInUp}
      id='price' 
    >
      <PricingSection />
    </motion.div>
  );
} 