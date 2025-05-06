"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Sparkles, Clock, ShoppingCart } from 'lucide-react';
import { LandingCard, LandingCardContent } from './LandingCard';

export function PricingSection() {
  const plans = [
    {
      id: "single",
      name: "NutriPlate Single",
      price: 175000,
      price_formatted: "Rp175.000",
      description: "1 Piring Pintar + Akses Premium",
      features: [
        "1x NutriPlate Smart Plate",
        "Akses premium GRATIS selama periode early bird",
        "Scan AI makanan tanpa batas",
        "Estimasi kalori otomatis",
        "Pemantauan BMI",
        "Konsultasi dengan AI Nutritionist",
        "Tracking berat badan",
        "Akses artikel kesehatan premium"
      ]
    },
    {
      id: "double",
      name: "NutriPlate Couple",
      price: 300000,
      price_formatted: "Rp300.000",
      original_price: "Rp350.000",
      description: "2 Piring Pintar + Akses Premium",
      save: "Hemat Rp50.000",
      features: [
        "2x NutriPlate Smart Plate",
        "Akses premium GRATIS selama periode early bird",
        "Scan AI makanan tanpa batas",
        "Estimasi kalori otomatis",
        "Pemantauan BMI",
        "Konsultasi dengan AI Nutritionist",
        "Tracking berat badan",
        "Akses artikel kesehatan premium"
      ],
      is_recommended: true
    },
    {
      id: "subscription",
      name: "Premium App Only",
      price: 99000,
      price_formatted: "Rp99.000",
      description: "Langganan Bulanan Tanpa Piring",
      billing: "/bulan",
      features: [
        "Tanpa Smart Plate",
        "Akses semua fitur premium",
        "Scan AI makanan tanpa batas",
        "Estimasi kalori otomatis",
        "Pemantauan BMI",
        "Konsultasi dengan AI Nutritionist",
        "Tracking berat badan",
        "Akses artikel kesehatan premium"
      ]
    }
  ];

  const ecommerceLinks = {
    shopee: "https://shopee.com/nutriplate"
  };

  return (
    <section className="py-8 md:py-16 relative bg-secondary/10">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-primary/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 inline-block mr-2 text-primary" />
            <span className="text-sm font-medium">Early Bird Special</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            NUTRIPLATE <span className="text-primary">SMART PLATE</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium text-gray-600">
              Penawaran Terbatas: Dapatkan Akses Premium GRATIS selama periode early bird
            </p>
          </div>
          <p className="text-lg text-gray-600">
            Beli NutriPlate sekarang dan dapatkan <span className="font-bold text-primary">AKSES PREMIUM GRATIS</span> selama periode early bird!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {plans.map((plan, i) => (
            <div key={i} className={`relative ${plan.is_recommended ? 'md:-mt-4 z-10' : ''}`}>
              <LandingCard 
                className="h-full"
                variant={plan.is_recommended ? "default" : "neutral"} 
                isRecommended={plan.is_recommended}
              >
                <LandingCardContent className="flex flex-col h-full p-4 md:p-6">
                  {/* {plan.is_recommended && (
                    <div className="absolute -top-3 right-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-neobrutalism-sm">
                      Best Value
                    </div>
                  )} */}
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">{plan.price_formatted}</span>
                      {plan.billing && (
                        <span className="text-sm text-gray-500">{plan.billing}</span>
                      )}
                      {plan.save && (
                        <div className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                          {plan.save}
                        </div>
                      )}
                    </div>
                    {plan.original_price && (
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="line-through">{plan.original_price}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm mb-4">{plan.description}</p>
                  
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-2">
                    <Button 
                      asChild
                      variant={plan.is_recommended ? "default" : "neutral"}
                      className="w-full rounded-lg border-2 border-black shadow-neobrutalism hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                    >
                      <Link href={plan.id === "subscription" ? "/subscribe" : ecommerceLinks.shopee} target="_blank" className="flex items-center justify-center gap-2">
                        {plan.id === "subscription" ? (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Berlangganan Sekarang
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Beli di Shopee
                          </>
                        )}
                      </Link>
                    </Button>
                  </div>
                </LandingCardContent>
              </LandingCard>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            *Penawaran akses premium gratis hanya berlaku selama periode early bird
          </p>
        </div>
      </div>
    </section>
  );
} 