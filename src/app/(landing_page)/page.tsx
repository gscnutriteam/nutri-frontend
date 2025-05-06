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

// Pricing section component with client-side data fetching
function PricingSection() {
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([
    {
      id: "1",
      name: "Paket Hemat",
      price: 15000,
      price_formatted: "Rp15.000",
      description: "Paket dasar untuk pemula",
      ai_scan_limit: 10,
      validity_days: 30,
      features: {
        scan_ai: true,
        scan_estimasi_kalori: true,
        bmi_check: false,
        chatbot_gizi: true,
        tracking_berat_badan: false,
        informasi_kesehatan: false,
      },
      is_recommended: false
    },
    {
      id: "2",
      name: "Paket Sehat",
      price: 30000,
      price_formatted: "Rp30.000",
      description: "Paket terbaik untuk kesehatan",
      ai_scan_limit: 20,
      validity_days: 90,
      features: {
        scan_ai: true,
        scan_estimasi_kalori: true,
        bmi_check: true,
        chatbot_gizi: true,
        tracking_berat_badan: false,
        informasi_kesehatan: false,
      },
      is_recommended: true
    },
    {
      id: "3",
      name: "Paket Sultan",
      price: 120000,
      price_formatted: "Rp120.000",
      description: "Paket lengkap untuk hasil maksimal",
      ai_scan_limit: 30,
      validity_days: 365,
      features: {
        scan_ai: true,
        scan_estimasi_kalori: true,
        bmi_check: true,
        chatbot_gizi: true,
        tracking_berat_badan: true,
        informasi_kesehatan: true,
      },
      is_recommended: false
    }
  ]);

  useEffect(() => {
    // Fetch subscription plans
    const fetchPlans = async () => {
      try {
        const plans = await getAllSubscriptionPlans();
        if (plans && plans.length > 0) {
          setSubscriptionPlans(plans);
        }
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section className="py-16 relative bg-white">
      <div className="container px-4 mx-auto relative z-10 max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
          PAKET <span className="text-primary">BERLANGGANAN</span>
        </h2>
        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan, i) => (
            <div key={i} className={`relative ${plan.is_recommended ? 'md:-mt-4 z-10' : ''}`}>
              <LandingCard 
                className="h-full"
                variant={plan.is_recommended ? "default" : "neutral"} 
                isRecommended={plan.is_recommended}
              >
                <LandingCardContent className="flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="mb-3">
                    <span className="text-3xl font-bold">{plan.price_formatted}</span>
                    <span className="text-sm ml-1">/ {plan.validity_days} hari</span>
                  </div>
                  <p className="text-sm mb-4">{plan.description}</p>
                  
                  <ul className="space-y-2 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span>{plan.ai_scan_limit}x scan AI</span>
                    </li>
                    {Object.entries(plan.features).map(([key, value], j) => {
                      const featureLabels: {[key: string]: string} = {
                        scan_ai: "Scan AI",
                        scan_estimasi_kalori: "Scan estimasi kalori",
                        bmi_check: "Cek BMI",
                        chatbot_gizi: "ChatBot gizi",
                        tracking_berat_badan: "Tracking pemantauan berat badan",
                        informasi_kesehatan: "Informasi kesehatan",
                      };
                      
                      return (
                        <li key={j} className="flex items-start gap-2">
                          {value ? (
                            <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          ) : (
                            <div className="w-5 h-5 mt-0.5 shrink-0"></div>
                          )}
                          <span className={value ? "" : "text-gray-400 line-through"}>
                            {featureLabels[key] || key}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  
                  <Button 
                    asChild
                    variant={plan.is_recommended ? "default" : "neutral"}
                    className="w-full rounded-lg border-2 border-black shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                  >
                    <Link href={`/app/premium/purchase/${plan.id}`}>
                      BELI SEKARANG
                    </Link>
                  </Button>
                </LandingCardContent>
              </LandingCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  // State for the active food component
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  // Food components data
  const foodComponents = [
    { name: "Karbohidrat", foods: ["Nasi", "Kentang", "Roti", "Mie"], recommendedArea: "section1", color: "#FFDC58" },
    { name: "Protein", foods: ["Ayam", "Ikan", "Daging", "Telur", "Tahu", "Tempe"], recommendedArea: "section2", color: "#53C2C6" },
    { name: "Sayuran", foods: ["Sayur Hijau", "Wortel", "Tomat", "Brokoli"], recommendedArea: "section3", color: "#FFDC58" },
    { name: "Buah", foods: ["Apel", "Pisang", "Jeruk", "Pepaya"], recommendedArea: "section4", color: "#53C2C6" }
  ];

  const [activeCategory, setActiveCategory] = useState<string>(foodComponents[0].name);
  const [activeFoods, setActiveFoods] = useState<string[]>(foodComponents[0].foods);
  const [selectedFoodItem, setSelectedFoodItem] = useState<string | null>(null);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    const foods = foodComponents.find(c => c.name === category)?.foods || [];
    setActiveFoods(foods);
    setSelectedFoodItem(null);
  };

  const [prompt, setState] = React.useState(null);


  useEffect(() => {
    // console.log("beforeinstallprompt", prompt); 
    const ready = (e) => {
      // console.log("beforeinstallpromptaa", e);  
      if (e) {
        e.prompt();
        e.preventDefault();
      }
     
      console.log("beforeinstallprompt", e);  
    };

    window.addEventListener('beforeinstallprompt', ready);

    // console.log("beforeinstallprompt", prompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', ready);
    };
    
  }, []);

  // Handle food selection
  const handleFoodSelect = (food: string) => {
    setSelectedFoodItem(food);
    const category = foodComponents.find(c => c.foods.includes(food));
    if (category) {
      setSelectedArea(category.recommendedArea);
    }
  };

  // Get area color based on selected area
  const getAreaColor = (areaId: string) => {
    if (!selectedArea) return null;
    
    const category = foodComponents.find(c => c.recommendedArea === areaId);
    return selectedArea === areaId ? category?.color : "transparent";
  };

  return (
    <main className={styles.landingContainer}>
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Teal Circle */}
        <div className="absolute -right-20 top-1/4 w-40 h-40 bg-primary/20 rounded-full"
             style={{ animation: `${styles.floatSlow}` }}></div>
        
        {/* Yellow Star */}
        <div className="absolute left-10 top-[30%] text-secondary"
             style={{ animation: `${styles.spinSlow}` }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </div>
        
        {/* Cross */}
        <div className="absolute right-[10%] top-[60%] text-primary"
             style={{ animation: `${styles.bounceSlow}` }}>
          <svg width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        
        {/* Yellow Circle */}
        <div className="absolute -left-10 bottom-1/4 w-32 h-32 bg-secondary/30 rounded-full"
             style={{ animation: `${styles.pulseSlow}` }}></div>
      </div>

      {/* Hero Section - add more space from navbar */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-black leading-tight">
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
                  className="rounded-lg border-2 border-black shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                >
                  <Link href="/app/register" className="flex items-center gap-2">
                    MULAI SEKARANG
                    <ArrowRight className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 pt-6 md:pt-0">
              <div className="relative w-full mx-auto">
                <div className="absolute -top-3 -left-3 w-full h-full bg-secondary rounded-xl border-2 border-black"></div>
                <div className="relative border-2 border-black rounded-xl overflow-hidden p-4 bg-white shadow-shadow">
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
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - center title and style */}
      <section className="py-16 relative">
        <div className="absolute inset-0 z-0 bg-secondary/10 pointer-events-none"></div>
        
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <div className={styles.problemTitleContainer}>
            <h2 className={styles.problemTitle}>
              TANTANGAN KESEHATAN INDONESIA
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Obesitas",
                value: "21.8%",
                desc: "Penduduk Indonesia mengalami obesitas, meningkat setiap tahunnya"
              },
              {
                title: "Diabetes",
                value: "10.7%",
                desc: "Prevalensi diabetes di Indonesia, dengan tingkat kematian tinggi"
              },
              {
                title: "Hipertensi",
                value: "34.1%",
                desc: "Masyarakat Indonesia menderita hipertensi, sering tanpa gejala"
              }
            ].map((stat, i) => (
              <LandingCard key={i} variant="neutral" className="hover:translate-y-[-5px]">
                <LandingCardContent>
                  <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
                  <p className="text-4xl font-black text-primary my-3">{stat.value}</p>
                  <p className="text-base">{stat.desc}</p>
                </LandingCardContent>
              </LandingCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Showcase */}
      <section className="py-16 relative bg-white">
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
            NUTRIPLATE <span className="text-primary">SMART PLATE</span>
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <div className="relative w-full aspect-square max-w-md mx-auto group perspective">
                <div className="relative w-full h-full transform-gpu transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="absolute inset-0 border-2 border-black bg-white rounded-xl p-4 shadow-shadow backface-hidden">
                    <Image 
                      src="/assets/img/plate-front.png" 
                      alt="NutriPlate Front View" 
                      width={400}
                      height={400}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 border-2 border-black bg-secondary rounded-xl p-4 shadow-shadow backface-hidden rotate-y-180">
                    <Image 
                      src="/assets/img/plate-back.png" 
                      alt="NutriPlate Back View" 
                      width={400}
                      height={400}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <p className="text-center mt-3 text-sm">Hover untuk melihat tampilan belakang</p>
            </div>
            
            <div className="lg:w-1/2 space-y-5">
              <h3 className="text-2xl font-bold">Piring Pintar dengan Teknologi QR</h3>
              <p className="text-lg">
                NutriPlate membantu Anda mengontrol porsi makan dengan tepat melalui pembagian area makanan yang dirancang khusus.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Terbuat dari bahan food-grade yang aman dan tahan lama",
                  "Dilengkapi teknologi QR code untuk pemindaian cepat",
                  "Pembagian area makanan yang jelas dan proporsional",
                  "Dapat disesuaikan dengan kebutuhan diet khusus"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Button 
                  asChild 
                  variant="default" 
                  size="lg"
                  className="rounded-lg bg-black text-white border-2 border-black shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                >
                  <Link href="/product-detail" className="flex items-center gap-2">
                    LIHAT SELENGKAPNYA
                    <ArrowRight className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - change to use more variants */}
      <section className="py-16 relative bg-primary/10">
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
            FITUR <span className="text-primary">APLIKASI</span>
          </h2>

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
      </section>
      
      {/* Pricing Section */}
      <div className="py-16 relative bg-white">
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
            PAKET <span className="text-primary">BERLANGGANAN</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Paket Hemat",
                price: "Rp15.000",
                period: "/ 30 hari",
                description: "Solusi dasar untuk pemula",
                features: [
                  "10x scan AI",
                  "Scan estimasi kalori",
                  "ChatBot gizi",
                  "Laporan nutrisi dasar",
                  "Dukungan email"
                ],
                recommended: false,
                color: "bg-white"
              },
              {
                name: "Paket Sehat",
                price: "Rp30.000",
                period: "/ 90 hari",
                description: "Pilihan terbaik untuk kesehatan",
                features: [
                  "20x scan AI",
                  "Scan estimasi kalori",
                  "ChatBot gizi premium",
                  "Cek BMI",
                  "Laporan nutrisi mendetail",
                  "Konsultasi ahli gizi (1x)"
                ],
                recommended: true,
                color: "bg-secondary/30"
              },
              {
                name: "Paket Sultan",
                price: "Rp120.000",
                period: "/ 365 hari",
                description: "Paket lengkap untuk hasil maksimal",
                features: [
                  "30x scan AI",
                  "Scan estimasi kalori",
                  "ChatBot gizi premium",
                  "Cek BMI",
                  "Tracking pemantauan berat badan",
                  "Informasi kesehatan",
                  "Konsultasi ahli gizi (3x)"
                ],
                recommended: false,
                color: "bg-white"
              }
            ].map((plan, i) => (
              <div key={i} className={`relative ${plan.recommended ? 'md:-mt-4 z-10' : ''}`}>
                <Card 
                  className={`border-2 border-black ${plan.color} rounded-xl overflow-hidden shadow-shadow transition-all hover:translate-y-[-5px] h-full`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <div className="bg-primary text-black font-bold px-4 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        BEST VALUE
                      </div>
                    </div>
                  )}
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <div className="mb-3">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm ml-1">{plan.period}</span>
                    </div>
                    <p className="text-sm mb-4">{plan.description}</p>
                    
                    <ul className="space-y-2 mb-6 flex-grow">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      asChild
                      variant={plan.recommended ? "default" : "neutral"}
                      className="w-full rounded-lg border-2 border-black shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                    >
                      <Link href="/app/premium">
                        BELI SEKARANG
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Component Food Section - Improved version */}
      <section className="py-16 relative bg-primary/10">
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
            PILIH <span className="text-primary">KOMPONEN MAKANAN</span> YANG SESUAI
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="aspect-square relative max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-black bg-white shadow-shadow">
                  <div className="absolute inset-0 p-8">
                    {/* Plate Sections */}
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      {/* Plate base */}
                      <circle cx="150" cy="150" r="145" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                      
                      {/* Plate divisions */}
                      <path d="M150,5 L150,295" stroke="#000000" strokeWidth="2" strokeDasharray="5,5" />
                      <path d="M5,150 L295,150" stroke="#000000" strokeWidth="2" strokeDasharray="5,5" />
                      
                      {/* Food Areas with labels */}
                      <g>
                        <path 
                          d="M150,150 L150,5 A145,145 0 0,1 295,150 Z" 
                          fill={getAreaColor("section1") || "#FFDC58"} 
                          fillOpacity={getAreaColor("section1") ? "1" : "0.3"}
                          stroke="#000000" 
                          strokeWidth="2" 
                          className="hover:opacity-80 cursor-pointer transition-opacity" 
                          onClick={() => setSelectedArea("section1")}
                        />
                        <text x="215" y="70" textAnchor="middle" fill="black" fontSize="12" fontWeight="bold">Karbohidrat</text>
                      </g>
                      
                      <g>
                        <path 
                          d="M150,150 L295,150 A145,145 0 0,1 150,295 Z" 
                          fill={getAreaColor("section2") || "#53C2C6"} 
                          fillOpacity={getAreaColor("section2") ? "1" : "0.3"}
                          stroke="#000000" 
                          strokeWidth="2" 
                          className="hover:opacity-80 cursor-pointer transition-opacity" 
                          onClick={() => setSelectedArea("section2")}
                        />
                        <text x="215" y="230" textAnchor="middle" fill="black" fontSize="12" fontWeight="bold">Protein</text>
                      </g>
                      
                      <g>
                        <path 
                          d="M150,150 L150,295 A145,145 0 0,1 5,150 Z" 
                          fill={getAreaColor("section3") || "#FFDC58"} 
                          fillOpacity={getAreaColor("section3") ? "1" : "0.3"}
                          stroke="#000000" 
                          strokeWidth="2" 
                          className="hover:opacity-80 cursor-pointer transition-opacity" 
                          onClick={() => setSelectedArea("section3")}
                        />
                        <text x="85" y="230" textAnchor="middle" fill="black" fontSize="12" fontWeight="bold">Sayuran</text>
                      </g>
                      
                      <g>
                        <path 
                          d="M150,150 L5,150 A145,145 0 0,1 150,5 Z" 
                          fill={getAreaColor("section4") || "#53C2C6"} 
                          fillOpacity={getAreaColor("section4") ? "1" : "0.3"}
                          stroke="#000000" 
                          strokeWidth="2" 
                          className="hover:opacity-80 cursor-pointer transition-opacity" 
                          onClick={() => setSelectedArea("section4")}
                        />
                        <text x="85" y="70" textAnchor="middle" fill="black" fontSize="12" fontWeight="bold">Buah</text>
                      </g>
                      
                      {/* QR Code at center */}
                      <rect x="125" y="125" width="50" height="50" rx="5" fill="white" stroke="#000000" strokeWidth="2" />
                      <g transform="translate(130, 130) scale(0.4)">
                        <rect x="0" y="0" width="10" height="10" fill="black" />
                        <rect x="20" y="0" width="10" height="10" fill="black" />
                        <rect x="80" y="0" width="10" height="10" fill="black" />
                        <rect x="0" y="10" width="10" height="10" fill="black" />
                        <rect x="30" y="10" width="10" height="10" fill="black" />
                        <rect x="50" y="10" width="10" height="10" fill="black" />
                        <rect x="70" y="10" width="10" height="10" fill="black" />
                        <rect x="80" y="10" width="10" height="10" fill="black" />
                      </g>
                      
                      {/* Food Item Label */}
                      {selectedFoodItem && selectedArea && (
                        <g>
                          <rect
                            x="100"
                            y={selectedArea === "section1" || selectedArea === "section4" ? 100 : 180}
                            width="100"
                            height="20"
                            rx="5"
                            fill="white"
                            stroke="black"
                          />
                          <text
                            x="150"
                            y={selectedArea === "section1" || selectedArea === "section4" ? 114 : 194}
                            textAnchor="middle"
                            fill="black"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {selectedFoodItem}
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Kelompok Makanan</h3>
                <p className="text-base">
                  Pilih kelompok makanan dan item makanan untuk mengisi piring NutriPlate Anda. Setiap kategori memiliki area yang sesuai.
                </p>
                
                {selectedFoodItem && selectedArea && (
                  <div className="p-4 bg-white border-2 border-black rounded-lg shadow-shadow">
                    <p className="font-bold">Item Terpilih: {selectedFoodItem}</p>
                    <p>Kategori: {activeCategory}</p>
                    <p>Area yang Direkomendasikan: {
                      selectedArea === "section1" ? "Kanan Atas" : 
                      selectedArea === "section2" ? "Kanan Bawah" : 
                      selectedArea === "section3" ? "Kiri Bawah" : "Kiri Atas"
                    }</p>
                  </div>
                )}
              </div>
              
              {/* Category Selection */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Kelompok Makanan:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {foodComponents.map((category) => (
                    <Button 
                      key={category.name} 
                      variant={activeCategory === category.name ? "default" : "neutral"}
                      className="px-3 py-2"
                      onClick={() => handleCategorySelect(category.name)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Food Items */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Pilih Item Makanan:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeFoods.map((food) => (
                    <Button 
                      key={food} 
                      variant="neutral"
                      className={`px-3 py-2 ${selectedFoodItem === food ? 'bg-primary text-white' : ''}`}
                      onClick={() => handleFoodSelect(food)}
                    >
                      {food}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  asChild 
                  variant="default" 
                  className="w-full rounded-lg border-2 border-black shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                >
                  <Link href="/food-guide" className="flex items-center justify-center gap-2">
                    PANDUAN LENGKAP
                    <ArrowRight className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 relative bg-white">
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
            DIPERCAYA <span className="text-primary">OLEH</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {[
              "Kementerian Kesehatan", 
              "RSCM", 
              "IDI", 
              "PDGMI", 
              "Universitas Indonesia", 
              "WHO"
            ].map((partner, i) => (
              <div key={i} className="flex justify-center">
                <div className="bg-white border-2 border-black p-4 rounded-xl shadow-shadow hover:-translate-y-1 transition-transform">
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-sm text-center font-bold text-gray-600">{partner}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 relative bg-primary/5">
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-6">
            PENGALAMAN <span className="text-primary">PENGGUNA</span>
          </h2>
          <p className="text-center text-base max-w-2xl mx-auto mb-10">
            Lihat apa yang dikatakan pengguna tentang pengalaman mereka menggunakan NutriPlate untuk meningkatkan kualitas hidup.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Budi Santoso",
                role: "Pengguna sejak 2022",
                message: "NutriPlate telah membantu saya mengontrol diabetes saya dengan mengatur porsi makanan yang tepat. Berat badan saya turun 5kg dalam 3 bulan!",
                img: "https://randomuser.me/api/portraits/men/1.jpg"
              },
              {
                name: "Siti Rahayu",
                role: "Nutrisionis",
                message: "Sebagai ahli gizi, saya sangat merekomendasikan NutriPlate kepada klien saya. Teknologi QR pada piring ini sangat inovatif.",
                img: "https://randomuser.me/api/portraits/women/2.jpg"
              },
              {
                name: "Andi Wijaya",
                role: "Pengguna Premium",
                message: "Aplikasinya sangat mudah digunakan dan memberikan saran nutrisi yang personal. Saya merasa lebih sehat dan berenergi sekarang!",
                img: "https://randomuser.me/api/portraits/men/3.jpg"
              },
              {
                name: "Maya Indira",
                role: "Pengguna sejak 2021",
                message: "NutriPlate membantu saya memahami porsi makanan yang tepat. Tekanan darah saya sekarang terkontrol dengan baik.",
                img: "https://randomuser.me/api/portraits/women/4.jpg"
              },
              {
                name: "Denny Prakoso",
                role: "Atlet",
                message: "Sebagai atlet, nutrisi sangat penting. NutriPlate memudahkan saya melacak asupan kalori dan nutrisi untuk performa optimal.",
                img: "https://randomuser.me/api/portraits/men/5.jpg"
              },
              {
                name: "Linda Kusuma",
                role: "Ibu Rumah Tangga",
                message: "Membantu saya menyiapkan makanan sehat untuk keluarga. Anak-anak juga senang dengan desain piringnya yang colorful!",
                img: "https://randomuser.me/api/portraits/women/6.jpg"
              }
            ].map((testimonial, i) => (
              <LandingCard 
                key={i}
                variant={i % 3 === 0 ? "primary" : i % 3 === 1 ? "yellow" : "mint"}
                className="overflow-hidden hover:-translate-y-1 transition-transform"
              >
                <LandingCardContent>
                  <p className="text-base mb-3">{testimonial.message}</p>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-black mr-3">
                      <img 
                        src={testimonial.img} 
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </LandingCardContent>
              </LandingCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Health Info Section */}
      <section className="py-16 relative bg-white">
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-10">
            INFO <span className="text-primary">KESEHATAN</span>
          </h2>

          <div className="mb-8">
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="flex items-center border-2 border-black rounded-lg bg-white overflow-hidden shadow-shadow">
                <input 
                  type="text" 
                  placeholder="Cari artikel kesehatan..." 
                  className="w-full px-4 py-3 text-base focus:outline-none"
                />
                <button className="h-full px-4 border-l-2 border-black">
                  <Search className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Panduan Porsi Makan untuk Diabetes",
                category: "Diabetes",
                image: "/assets/img/article1.jpg",
                variant: "yellow"
              },
              {
                title: "10 Makanan untuk Menurunkan Tekanan Darah",
                category: "Hipertensi",
                image: "/assets/img/article2.jpg",
                variant: "primary"
              },
              {
                title: "Pola Makan untuk Jantung Sehat",
                category: "Jantung",
                image: "/assets/img/article3.jpg",
                variant: "mint"
              }
            ].map((article, i) => (
              <LandingCard 
                key={i} 
                variant={article.variant as any}
                className="overflow-hidden hover:translate-y-[-5px] transition-all"
              >
                <div className="relative h-40 overflow-hidden border-b-2 border-black">
                  <div className="absolute top-2 left-2 bg-secondary px-3 py-1 border-2 border-black rounded-full z-10 text-sm font-bold">
                    {article.category}
                  </div>
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <LandingCardContent className="p-4">
                  <h3 className="text-lg font-bold mb-3">{article.title}</h3>
                  <Link href="/articles" className="flex items-center text-primary font-bold text-sm">
                    Baca Selengkapnya
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </LandingCardContent>
              </LandingCard>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              asChild 
              variant="neutral" 
              className="rounded-lg border-2 border-black bg-secondary shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            >
              <Link href="/articles">
                LIHAT SEMUA ARTIKEL
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative bg-white">
        <div className="container px-4 mx-auto relative z-10 max-w-6xl">
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-full h-full bg-primary rounded-xl border-2 border-black"></div>
            <div className="relative border-2 border-black rounded-xl overflow-hidden bg-secondary p-8 shadow-shadow">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Siap Untuk Hidup Lebih Sehat?
                </h2>
                <p className="text-lg mb-6">
                  Dapatkan NutriPlate sekarang dan mulai perjalanan menuju gaya hidup sehat yang lebih baik.
                </p>
                <Button 
                  asChild 
                  variant="default" 
                  size="lg" 
                  className="bg-black text-white rounded-lg border-2 border-black shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                >
                  <Link href="/app/register" className="flex items-center gap-2">
                    MULAI SEKARANG
                    <ArrowRight className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-black text-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-primary">NutriPlate</h2>
              <p className="mb-4 text-sm">
                Solusi inovatif untuk membantu Anda mengontrol porsi makanan dengan tepat melalui teknologi QR code.
              </p>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'instagram'].map((social) => (
                  <a key={social} href={`#${social}`} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                    <span className="sr-only">{social}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2 text-sm">
                {['Beranda', 'Tentang Kami', 'Produk', 'Artikel', 'FAQ', 'Kontak'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-primary transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Kontak</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✉</span>
                  <span>info@nutriplate.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">☎</span>
                  <span>+62 812 3456 7890</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">📍</span>
                  <span>Jl. Inovasi Teknologi No. 123, Jakarta</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm">
            <p>&copy; 2023 NutriPlate. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-primary rounded-t-lg border-t-2 border-x-2 border-black shadow-lg">
          <div className="flex justify-between items-center px-4 py-2">
            {[
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: "Beranda" },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, label: "Statistik" },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V16"/><path d="M2 8V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H7"/><path d="M17 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V8"/><path d="M22 16V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H17"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>, label: "Scan", highlight: true },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: "Chat" },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label: "Profil" }
            ].map((item, i) => (
              <Link 
                key={i} 
                href={item.highlight ? "/scan" : `#${item.label}`} 
                className={`flex flex-col items-center ${item.highlight ? '-mt-6' : ''}`}
              >
                {item.highlight ? (
                  <div className="bg-secondary p-3 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {item.icon}
                  </div>
                ) : (
                  <div className="w-5 h-5 mb-1 text-white">
                    {item.icon}
                  </div>
                )}
                <span className={`text-xs font-medium ${item.highlight ? 'text-black' : 'text-white'}`}>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 