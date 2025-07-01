"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, LineChart, Calendar, UserCircle } from 'lucide-react';
import styles from '@/app/(landing_page)/landing.module.css';
import { fadeInUp, staggerChildren, useAnimationContext, viewportConfig } from './AnimationProvider';
import { LandingFeatureCard } from './LandingCard';

const features = [
  {
    icon: <QrCode size={24} />,
    title: "Pemindaian QR Code",
    description: "Cukup pindai QR code pada piring untuk mendapatkan rekomendasi porsi makanan secara instan",
    iconClass: styles.primaryIcon
  },
  {
    icon: <LineChart size={24} />,
    title: "Analisis Nutrisi Real-time",
    description: "Dapatkan informasi nutrisi lengkap dari makanan yang Anda konsumsi dalam hitungan detik",
    iconClass: styles.secondaryIcon
  },
  {
    icon: <Calendar size={24} />,
    title: "Pelacakan Pola Makan",
    description: "Monitor kebiasaan makan harian dan lihat tren kesehatan Anda dari waktu ke waktu",
    iconClass: styles.primaryIcon
  },
  {
    icon: <UserCircle size={24} />,
    title: "Rekomendasi Personalisasi",
    description: "Terima saran makanan yang disesuaikan berdasarkan kebutuhan dan tujuan kesehatan Anda",
    iconClass: styles.secondaryIcon
  }
];

export function FeaturesSection() {
  const { controls, isMobile } = useAnimationContext();

  return (
    <motion.section 
      className="py-16 relative bg-primary/10"
      initial="initial"
      animate={isMobile ? controls : undefined}
      whileInView={!isMobile ? "animate" : undefined}
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      <div id='feature' className="container px-4 mx-auto relative z-10 max-w-6xl scroll-mt-28">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-black text-center mb-10"
          variants={fadeInUp}
        >
          FITUR <span className="text-primary">APLIKASI</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <LandingFeatureCard
              key={i}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconClass={feature.iconClass}
              buttonVariant={i % 2 === 0 ? 'default' : 'reverse'}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
} 