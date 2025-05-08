import Link from 'next/link';
import { Clock } from 'lucide-react';
import AppMobileLayout from '@/layout/app_mobile_layout';

export default function PaymentPending() {
  return (
    <AppMobileLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <Clock className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Dalam Proses</h1>
          <p className="text-gray-600 mb-6">
            Pembayaran Anda sedang diproses. Kami akan mengaktifkan akun premium Anda segera setelah pembayaran selesai.
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
              Cek Status Langganan
            </Link>
          </div>
        </div>
      </div>
    </AppMobileLayout>
  );
} 