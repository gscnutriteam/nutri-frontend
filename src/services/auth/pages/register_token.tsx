import AuthLayout from '@/layout/auth_layout';
import { RegisterTokenForm } from '../components/register_token_form';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Toaster } from 'sonner';

export const metadataToken: Metadata = {
  title: 'Token | NutriBox',
  description: 'Token page nutribox app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Token | NutriBox',
    description: 'Token page nutribox app',
  }
}

export default function RegisterToken() {
  return (
    <AuthLayout>
      <Toaster position="top-center" richColors />
      <div className="w-full flex flex-col outfit-font">
        <img
          src="/assets/img/register-3.png"
          alt="Nubo Welcome"
          className="w-full h-auto mx-auto mt-10"
        />
        <h1 className="text-3xl mt-5 text-center font-semibold">Register</h1>
        <p className="text-center mt-2 text-sm">
          Isi token Anda di bawah ini
        </p>
        <RegisterTokenForm />
        <p className="text-center mt-4 text-sm">
          Tidak memiliki token? <Link href="https://instagram.com/nutriplateid" target='_blank' className="text-button underline">Produk Kami</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
