import { Button } from '@/components/ui/button';
import AuthLayout from '@/layout/auth_layout';
import { Metadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export const metadataWelcome: Metadata = {
  title: 'Welcome | NutriBox',
  description: 'Welcome page nutribox app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Welcome | NutriBox',
    description: 'Welcome page nutribox app',
  }
}

export default function Welcome() {
  return (
    <>
      <Head>
        <title>Welcome | NutriBox</title>
        <meta name="description" content="Welcome to nutribox app" />
        <meta property="og:title" content="Welcome | NutriBox" />
        <meta property="og:description" content="Welcome to nutribox app" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <div className='w-full flex flex-col outfit-font'>
        <img src="/assets/img/welcome.png" alt="Nubo Welcome" className="w-full h-auto mx-auto mt-10" />
        <h1 className='text-3xl mt-5 text-center font-semibold'>NutriBox App</h1>
        <p className='text-center mt-2 text-sm'>Mulai hidup sehat Anda dengan menjaga porsi makan di atas bekal yang Anda bawa</p>
        <Link className='w-full' href={"TODO"}>
          <Button className='mt-8 w-full' size={'lg'}>Get Started</Button>
        </Link>
        <Button className='mt-4' size={'lg'} variant={'neutral'}>Saya sudah punya akun</Button>
        <Button className='mt-4' size={'lg'} variant={'neutral'}>
          <img src="/assets/icon/google.svg" alt="Google Icon" className="w-6 h-6 inline-block" />
          Lanjutkan dengan Google
        </Button>
      </div>
      </>
  );
}
