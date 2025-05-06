"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, useAnimationContext, viewportConfig } from './AnimationProvider';
import { Companies } from '@/services/landing_page/components/patner';

export function PartnersSection() {
  const { controls, isMobile } = useAnimationContext();

  return (
    <motion.section 
      className="py-16 bg-white"
      initial="initial"
      animate={isMobile ? controls : undefined}
      whileInView={!isMobile ? "animate" : undefined}
      viewport={viewportConfig}
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
          DIPERCAYA <span className="text-primary">OLEH</span>
        </h2>
        <Companies />
      </div>
    </motion.section>
  );
} 