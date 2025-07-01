'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CalorieRingProps } from '../types/homeTypes';

const CalorieRing = ({ value, max }: CalorieRingProps) => {
  const percent = value / max;
  const remaining = max - value;
  const progress = percent * 100;
  
  // Format untuk menampilkan angka dengan separator ribuan
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Emoji dan pesan berdasarkan progress
  const getEmoji = () => {
    if (progress < 30) return "🔥"; // Masih banyak sisa kalori
    if (progress < 70) return "🍽️"; // Setengah kalori terpakai
    if (progress < 90) return "⚠️"; // Hampir habis
    return "✅"; // Sudah mencapai target
  };
  
  // Pesan sesuai progress
  const getMessage = () => {
    if (progress < 30) return "Masih banyak kalori tersisa! Kamu masih bisa makan lagi hari ini.";
    if (progress < 70) return "Setengah kalori sudah terpakai. Cukup untuk 1-2 kali makan lagi.";
    if (progress < 90) return "Kalori hampir habis. Batasi konsumsi makanan berat.";
    if (progress < 100) return "Kalori hampir mencapai target. Pilih camilan ringan saja.";
    return "Kalori sudah mencapai target. Hindari makan berlebihan.";
  };

  // Warna latar dan teks berdasarkan progress
  const getCardStyles = () => {
    if (progress < 30) {
      return { bgColor: "bg-green-50", borderColor: "border-green-200" };
    }
    if (progress < 70) {
      return { bgColor: "bg-blue-50", borderColor: "border-blue-200" };
    }
    if (progress < 90) {
      return { bgColor: "bg-amber-50", borderColor: "border-amber-200" };
    }
    return { bgColor: "bg-rose-50", borderColor: "border-rose-200" };
  };

  const { bgColor, borderColor } = getCardStyles();
  
  return (
    <div className={`w-full rounded-xl border-2 border-black  p-5`}>
      {/* Header dengan emoji */}
      <div className="flex items-center justify-start gap-2 mb-4">
        <h3 className="text-lg font-bold">Sisa Kalori Hari Ini</h3>
        <span className="text-2xl">{getEmoji()}</span>
      </div>
      
      {/* Sisa kalori - angka besar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1">
          <div className="text-5xl font-extrabold">{formatNumber(remaining)}</div>
          <div className="text-gray-500 text-sm mt-1">kalori tersisa</div>
        </div>
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-black">
          <span className="text-xl font-bold">{Math.round(progress)}%</span>
        </div>
      </div>
      
      {/* Progress bar menggunakan komponen Progress */}
      <div className="mb-2">
        <Progress 
          value={value} 
          max={max}
          fillColor="bg-main"
          className="h-5"
        />
      </div>
      
      {/* Dimakan vs. Target */}
      <div className="flex justify-between text-sm mb-4">
        <div>
          <span className="font-semibold">{formatNumber(value)} kcal</span>
          <span className="text-gray-500 ml-1">dimakan</span>
        </div>
        <div>
          <span className="font-semibold">{formatNumber(max)} kcal</span>
          <span className="text-gray-500 ml-1">target</span>
        </div>
      </div>
      
      {/* Pesan informatif */}
      <div className={`${bgColor} border p-3 rounded-lg ${borderColor}`}>
        <p className="text-sm">{getMessage()}</p>
      </div>
    </div>
  );
};

export default CalorieRing; 