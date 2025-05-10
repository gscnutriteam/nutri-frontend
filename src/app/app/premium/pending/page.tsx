'use client';

import Link from 'next/link';
import { Clock, AlertCircle } from 'lucide-react';
import AppMobileLayout from '@/layout/app_mobile_layout';
import { motion } from 'framer-motion';

export default function PaymentPending() {
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
          >
            <Clock className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Dalam Proses</h1>
            <p className="text-gray-600 mb-6">
              Pembayaran Anda sedang diproses. Kami akan mengaktifkan akun premium Anda segera setelah pembayaran selesai.
            </p>

            <motion.div 
              className="bg-yellow-50 rounded-lg p-4 mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <AlertCircle className="text-yellow-500 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-yellow-700">Status Menunggu</h3>
                <p className="text-sm text-yellow-600">Silakan cek status pembayaran Anda secara berkala</p>
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
              className="w-full px-4 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <Link 
              href="/app/premium"
              className="w-full px-4 py-3 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-50 transition-colors"
            >
              Cek Status Langganan
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </AppMobileLayout>
  );
} 