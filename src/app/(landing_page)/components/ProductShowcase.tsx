"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck, MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styles from '@/app/(landing_page)/landing.module.css';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren, useAnimationContext, mobileFirstClass, essentialContentClass, viewportConfig } from './AnimationProvider';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ProductShowcase() {
  const { controls, isMobile } = useAnimationContext();
  
  const features: FeatureItem[] = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>,
      title: "Food-Grade Material",
      description: "Terbuat dari bahan food-grade yang aman dan tahan lama"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V16"></path><path d="M2 8V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H7"></path><path d="M17 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V8"></path><path d="M22 16V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H17"></path><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>,
      title: "AI Technology",
      description: "Dilengkapi teknologi AI untuk analisis makanan"
    },
    {
      icon: <ClipboardCheck />,
      title: "Portion Control",
      description: "Pembagian area makanan yang jelas dan proporsional"
    },
    {
      icon: <MessageCircle />,
      title: "Chatbot",
      description: "Chatbot nutrisionis untuk mendapatkan informasi lebih lanjut"
    }
  ];

  return (
    <motion.section 
      className={`py-16 relative bg-white ${mobileFirstClass} ${essentialContentClass} scroll-mt-28`}
      initial="initial"
      animate={isMobile ? controls : undefined}
      whileInView={!isMobile ? "animate" : undefined}
      viewport={viewportConfig}
      variants={staggerChildren}
      id='product' 
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
            className="lg:w-1/2 w-full px-4"
            variants={fadeInUp}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto group [perspective:1000px]">
              <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 border-2 border-black bg-white rounded-xl p-4 shadow-neobrutalism [backface-visibility:hidden]">
                  <Image 
                    src="/assets/img/piring_phone.png" 
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
                    src="/assets/img/piring_phone.png" 
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
            className="lg:w-1/2 w-full px-4 space-y-6"
            variants={fadeInUp}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Teknologi Smart Plate</h3>
              <p className="text-lg text-gray-600">
                NutriPlate membantu Anda mengontrol porsi makan dengan tepat melalui pembagian area makanan yang dirancang khusus dan teknologi QR code yang inovatif.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
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
  );
} 