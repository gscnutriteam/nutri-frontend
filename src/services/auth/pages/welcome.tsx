import { Button } from '@/components/ui/button';
import LinkAPP from '@/components/util/link';
import type { Metadata } from 'next';
import LoginGoogleButton from '../components/login_google_button';

export const metadataWelcome: Metadata = {
  title: 'Welcome | NutriPlate',
  description: 'Welcome page NutriPlate app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Welcome | NutriPlate',
    description: 'Welcome page NutriPlate app',
  }
}

export default function Welcome() {
  return (
    <>
      <div className='w-full flex flex-col outfit-font'>
        <img src="/assets/img/welcome.png" alt="Nubo Welcome" className="w-full h-auto mx-auto mt-10" />
        <h1 className='text-3xl mt-5 text-center font-semibold'>NutriPlate App</h1>
        <p className='text-center mt-2 text-sm'>Mulai hidup sehat Anda dengan menjaga porsi makan di atas bekal yang Anda bawa</p>
        <LinkAPP className='w-full' href={"register"}>
          <Button className='mt-8 w-full' size={'lg'}>Get Started</Button>
        </LinkAPP>
        <LinkAPP className='w-full' href={"login"}>
          <Button className='mt-4 w-full' size={'lg'} variant={'neutral'}>Saya sudah punya akun</Button>
        </LinkAPP>
      </div>
      </>
  );
}
