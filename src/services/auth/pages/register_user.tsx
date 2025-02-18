import AuthLayout from '@/layout/auth_layout';
import Head from 'next/head';
import { RegisterUserForm } from '../components/register_user_form';
import { BackButton } from '../components/back_button';


export default function RegisterUser() {
  return (
    <AuthLayout>
      <Head>
        <title>Welcome | NutriBox</title>
      </Head>
      <div className="w-full flex flex-col outfit-font">
        <BackButton />
        <img
          src="/assets/img/register-1.png"
          alt="Nubo Welcome"
          className="w-1/2 h-auto mx-auto mt-10"
        />
        <h1 className="text-3xl mt-5 text-center font-semibold">Register</h1>
        <p className="text-center mt-2 text-sm">
          Isi data diri anda di bawah ini
        </p>
        <RegisterUserForm />
      </div>
    </AuthLayout>
  );
}
