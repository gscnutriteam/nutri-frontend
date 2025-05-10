'use client';

import Link from 'next/link';
import { CheckCircle2, Stars, Sparkles, Award } from 'lucide-react';
import AppMobileLayout from '@/layout/app_mobile_layout';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PaymentSuccess() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set animation complete after a short delay
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppMobileLayout withBottomBar={false}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2
            }}
            className="mx-auto mb-6 relative"
          >
            <CheckCircle2 className="w-20 h-20 mx-auto text-green-500 mb-4" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -top-2 -right-2"
            >
              <Stars className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h1>
            <p className="text-gray-600 mb-6">
              Terima kasih atas pembelian Anda. Akun premium Anda telah diaktifkan.
            </p>

            <motion.div 
              className="bg-teal-50 rounded-lg p-4 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Award className="text-teal-500 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-teal-700">Status Premium Aktif</h3>
                <p className="text-sm text-teal-600">Anda sekarang memiliki akses ke semua fitur premium</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link 
              href="/app"
              className="w-full px-4 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors flex items-center justify-center"
            >
              Kembali ke Beranda
            </Link>
            <Link 
              href="/app/premium"
              className="w-full px-4 py-3 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-50 transition-colors"
            >
              Lihat Langganan Saya
            </Link>
          </motion.div>

          <motion.div
            className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Sparkles className="w-32 h-32 text-teal-500" />
          </motion.div>
        </motion.div>
      </div>
    </AppMobileLayout>
  );
} 