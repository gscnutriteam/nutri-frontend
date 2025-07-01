"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styles from '@/app/(landing_page)/landing.module.css';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from './AnimationProvider';

export function HeroSection() {
  return (
    <motion.section 
      className={styles.heroSection}
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <div className={styles.heroBackground}></div>
      
      <div className="container px-4 mx-auto relative z-10 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div 
            className="md:w-1/2 space-y-4"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
              Portioning <span className="text-primary">Precision</span> Health in Every Division
            </h1>
            
            <p className="text-lg font-medium text-black">
              NutriCare - SmartCare Berbasis QR Code untuk Porsi Makan Terklasifikasi
            </p>
            
            <div className="pt-6">
              <Button 
                asChild 
                variant="default" 
                size="lg" 
                className="rounded-lg border-2 border-black shadow-neobrutalism hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
              >
                <Link href="/app/register" className="flex items-center gap-2">
                  Coba NutriCare
                  <ArrowRight className="ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 pt-6 md:pt-0"
            variants={fadeInUp}
          >
            <div className="relative w-full mx-auto">
              <div className="absolute -top-3 -left-3 w-full h-full bg-secondary rounded-xl border-2 border-black"></div>
              <div className="relative border-2 border-black rounded-xl overflow-hidden p-4 bg-white shadow-neobrutalism">
                <Image 
                  src="/assets/img/piring_phone.png" 
                  alt="NutriCare Smart Care" 
                  width={500}
                  height={500}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 