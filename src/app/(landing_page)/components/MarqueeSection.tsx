'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Testimonial Components
interface TestimonialCardProps {
  name: string;
  role: string;
  message: string;
  imgSrc: string;
}

export function TestimonialCard({ name, role, message, imgSrc }: TestimonialCardProps) {
  return (
    <div className="p-6 bg-white border-2 border-black rounded-xl shadow-shadow mb-4 transition-transform hover:-translate-y-1">
      <p className="text-base mb-3">{message}</p>
      <div className="flex mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <div className="flex items-center">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-black mr-3">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-sm">{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pengguna sejak 2022",
      message: "NutriPlate telah membantu saya mengontrol diabetes saya dengan mengatur porsi makanan yang tepat. Berat badan saya turun 5kg dalam 3 bulan!",
      imgSrc: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Siti Rahayu",
      role: "Nutrisionis",
      message: "Sebagai ahli gizi, saya sangat merekomendasikan NutriPlate kepada klien saya. Teknologi QR pada piring ini sangat inovatif.",
      imgSrc: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Andi Wijaya",
      role: "Pengguna Premium",
      message: "Aplikasinya sangat mudah digunakan dan memberikan saran nutrisi yang personal. Saya merasa lebih sehat dan berenergi sekarang!",
      imgSrc: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      name: "Maya Indira",
      role: "Pengguna sejak 2021",
      message: "NutriPlate membantu saya memahami porsi makanan yang tepat. Tekanan darah saya sekarang terkontrol dengan baik.",
      imgSrc: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      name: "Denny Prakoso",
      role: "Atlet",
      message: "Sebagai atlet, nutrisi sangat penting. NutriPlate memudahkan saya melacak asupan kalori dan nutrisi untuk performa optimal.",
      imgSrc: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      name: "Linda Kusuma",
      role: "Ibu Rumah Tangga",
      message: "Membantu saya menyiapkan makanan sehat untuk keluarga. Anak-anak juga senang dengan desain piringnya yang colorful!",
      imgSrc: "https://randomuser.me/api/portraits/women/6.jpg"
    }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard key={i} {...testimonial} />
        ))}
      </div>
    </div>
  );
}

// Partners Components
export function PartnersSection() {
  const partners = [
    { name: "Kementerian Kesehatan RI", logo: "/assets/img/partners/kemkes.png" },
    { name: "Rumah Sakit Cipto Mangunkusumo", logo: "/assets/img/partners/rscm.png" },
    { name: "Perhimpunan Dokter Gizi Medik Indonesia", logo: "/assets/img/partners/pdgmi.png" },
    { name: "Universitas Indonesia", logo: "/assets/img/partners/ui.png" },
    { name: "Persatuan Ahli Gizi Indonesia", logo: "/assets/img/partners/persagi.png" },
    { name: "World Health Organization", logo: "/assets/img/partners/who.png" }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-center text-3xl md:text-5xl font-bold text-black mb-10">
        DIPERCAYA <span className="text-primary">OLEH</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {partners.map((partner, i) => (
          <div key={i} className="flex justify-center">
            <div className="bg-white border-2 border-black p-4 rounded-lg shadow-shadow hover:-translate-y-1 transition-transform">
              {/* Just showing a placeholder since we don't have the actual logos */}
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded">
                <span className="text-xs text-center font-bold text-gray-500">{partner.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 