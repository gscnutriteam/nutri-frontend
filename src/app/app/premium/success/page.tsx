import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import AppMobileLayout from '@/layout/app_mobile_layout';

export default function PaymentSuccess() {
  return (
    <AppMobileLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <CheckCircle2 className="w-20 h-20 mx-auto text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h1>
          <p className="text-gray-600 mb-6">
            Terima kasih atas pembelian Anda. Akun premium Anda telah diaktifkan.
          </p>
          <div className="flex flex-col space-y-3">
            <Link 
              href="/app"
              className="w-full px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <Link 
              href="/app/premium"
              className="w-full px-4 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-50 transition-colors"
            >
              Lihat Langganan Saya
            </Link>
          </div>
        </div>
      </div>
    </AppMobileLayout>
  );
} 