"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, LineChart, Calendar, UserCircle } from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: "Pemindaian QR Code",
    description: "Cukup pindai QR code pada piring untuk mendapatkan rekomendasi porsi makanan secara instan",
    color: "bg-gradient-to-br from-teal-400 to-emerald-500",
    delay: 0.1
  },
  {
    icon: LineChart,
    title: "Analisis Nutrisi Real-time",
    description: "Dapatkan informasi nutrisi lengkap dari makanan yang Anda konsumsi dalam hitungan detik",
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
    delay: 0.2
  },
  {
    icon: Calendar,
    title: "Pelacakan Pola Makan",
    description: "Monitor kebiasaan makan harian dan lihat tren kesehatan Anda dari waktu ke waktu",
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    delay: 0.3
  },
  {
    icon: UserCircle,
    title: "Rekomendasi Personalisasi",
    description: "Terima saran makanan yang disesuaikan berdasarkan kebutuhan dan tujuan kesehatan Anda",
    color: "bg-gradient-to-br from-purple-400 to-pink-500",
    delay: 0.4
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            FITUR <span className="text-primary">APLIKASI</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nikmati berbagai fitur canggih untuk membantu Anda mencapai gaya hidup sehat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-neobrutalism hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-black">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 shadow-neobrutalism-sm`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
} 