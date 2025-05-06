"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Check, ChevronRight, Search, Star } from 'lucide-react';
import { getAllSubscriptionPlans } from '@/services/premium/api/subscriptions-client';
import type { SubscriptionPlan } from '@/services/premium/api/subscriptions-client';
import styles from './landing.module.css';
import { LandingCard, LandingCardContent, LandingFeatureCard } from './components/LandingCard';
import { InstallPrompt, PushNotificationManager } from '@/components/util/PushNotificationManaget';
import { Companies } from '@/services/landing_page/components/patner';
import { SocialProofTestimonials } from '@/services/landing_page/components/testimonial';
import { Marquee } from './components/Marquee';
import { PricingSection } from '@/app/(landing_page)/components/PricingSection';
import { motion } from 'framer-motion';
import { CallToAction } from './components/cta';

const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 40 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerChildren = {
  animate: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <main className={styles.landingContainer}>
      {/* Hero Section */}
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
                NutriPlate - SmartPlate Berbasis QR Code untuk Porsi Makan Terklasifikasi
              </p>
              
              <div className="pt-6">
                <Button 
                  asChild 
                  variant="default" 
                  size="lg" 
                  className="rounded-lg border-2 border-black  shadow-neobrutalism hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                >
                  <Link href="/app/register" className="flex items-center gap-2">
                    Beli Nutriplate
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
                    src="/assets/img/nutriplate-hero.png" 
                    alt="NutriPlate Smart Plate" 
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
      
      {/* Product Showcase */}
      <motion.section 
        className="py-16 relative bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ 
          once: true,
          margin: "-100px",
          amount: 0.3
        }}
        variants={staggerChildren}
      >
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <div className="inline-block bg-primary/20 rounded-full px-4 py-2 mb-4">
              <Star className="w-4 h-4 inline-block mr-2 text-primary" />
              <span className="text-sm font-medium">Produk Inovatif</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              NUTRIPLATE <span className="text-primary">SMART PLATE</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Piring pintar pertama di Indonesia yang menggabungkan teknologi QR code dengan panduan porsi makan yang tepat
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-10">
            <motion.div 
              className="lg:w-1/2"
              variants={fadeInUp}
            >
              <div className="relative w-full aspect-square max-w-md mx-auto group [perspective:1000px]">
                <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 border-2 border-black bg-white rounded-xl p-4 shadow-neobrutalism [backface-visibility:hidden]">
                    <Image 
                      src="/assets/img/plate-front.png" 
                      alt="NutriPlate Front View" 
                      width={400}
                      height={400}
                      className="object-contain w-full h-full"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-2 rounded-lg text-sm text-center">
                      Tampilan Depan
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 border-2 border-black bg-secondary rounded-xl p-4 shadow-neobrutalism [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <Image 
                      src="/assets/img/plate-back.png" 
                      alt="NutriPlate Back View" 
                      width={400}
                      height={400}
                      className="object-contain w-full h-full"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-2 rounded-lg text-sm text-center">
                      Tampilan Belakang dengan QR Code
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center mt-3 text-sm text-gray-500">Hover untuk melihat tampilan belakang</p>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 space-y-6"
              variants={fadeInUp}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Teknologi Smart Plate</h3>
                <p className="text-lg text-gray-600">
                  NutriPlate membantu Anda mengontrol porsi makan dengan tepat melalui pembagian area makanan yang dirancang khusus dan teknologi QR code yang inovatif.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>,
                    title: "Food-Grade Material",
                    description: "Terbuat dari bahan food-grade yang aman dan tahan lama"
                  },
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V16"></path><path d="M2 8V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H7"></path><path d="M17 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V8"></path><path d="M22 16V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H17"></path><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>,
                    title: "QR Technology",
                    description: "Dilengkapi teknologi QR code untuk pemindaian cepat"
                  },
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>,
                    title: "Portion Control",
                    description: "Pembagian area makanan yang jelas dan proporsional"
                  },
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>,
                    title: "Customizable",
                    description: "Dapat disesuaikan dengan kebutuhan diet khusus"
                  }
                ].map((feature, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl border-2 border-black shadow-neobrutalism-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <div className="text-primary">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <Button 
                  asChild 
                  variant="default" 
                  size="lg"
                  className="rounded-lg text-white border-2 border-black shadow-neobrutalism hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                >
                  <Link href="/product-detail" className="flex items-center gap-2">
                    Lihat Selengkapnya
                    <ArrowRight className="ml-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
      </motion.section>
      
      {/* Features Section */}
      <motion.section 
        className="py-16 relative bg-primary/10"
        initial="initial"
        whileInView="animate"
        viewport={{ 
          once: true,
          margin: "-100px",
          amount: 0.3
        }}
        variants={staggerChildren}
      >
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-black text-center mb-10"
            variants={fadeInUp}
          >
            FITUR <span className="text-primary">APLIKASI</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Pemindaian QR Code",
                description: "Cukup pindai QR code pada piring untuk mendapatkan rekomendasi porsi makanan secara instan",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V16" />
                  <path d="M2 8V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H7" />
                  <path d="M17 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V8" />
                  <path d="M22 16V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H17" />
                  <rect x="8" y="8" width="8" height="8" rx="1" />
                </svg>,
                iconClass: styles.primaryIcon
              },
              {
                title: "Analisis Nutrisi Real-time",
                description: "Dapatkan informasi nutrisi lengkap dari makanan yang Anda konsumsi dalam hitungan detik",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                  <path d="M18 10l-2-2-4 4" />
                </svg>,
                iconClass: styles.secondaryIcon
              },
              {
                title: "Pelacakan Pola Makan",
                description: "Monitor kebiasaan makan harian dan lihat tren kesehatan Anda dari waktu ke waktu",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>,
                iconClass: styles.primaryIcon
              },
              {
                title: "Rekomendasi Personalisasi",
                description: "Terima saran makanan yang disesuaikan berdasarkan kebutuhan dan tujuan kesehatan Anda",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>,
                iconClass: styles.secondaryIcon
              }
            ].map((feature, i) => (
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
      
      {/* Pricing Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ 
          once: true,
          margin: "-100px",
          amount: 0.3
        }}
        variants={fadeInUp}
      >
        <PricingSection />
      </motion.div>
      
      {/* Partners Section */}
      <motion.section 
        className="py-16 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ 
          once: true,
          margin: "-100px",
          amount: 0.3
        }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
            DIPERCAYA <span className="text-primary">OLEH</span>
          </h2>
          <Companies />
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-16"
        initial="initial"
        whileInView="animate"
        viewport={{ 
          once: true,
          margin: "-100px",
          amount: 0.3
        }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
            PENGALAMAN <span className="text-primary">PENGGUNA</span>
          </h2>
          <SocialProofTestimonials />
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ 
          once: true,
          margin: "-100px",
          amount: 0.3
        }}
        variants={fadeInUp}
      >
        <CallToAction />
      </motion.div>
    </main>
  );
} 