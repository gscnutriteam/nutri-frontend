import AuthLayout from "@/layout/auth_layout";
import Head from "next/head";
import { RegisterInfoForm } from "../components/register_info_form";
import { BackButton } from "../components/back_button";
import { Metadata } from "next";

export const metaDataRegisterInfo: Metadata = {
  title: 'Register Detail | NutriBox',
  description: 'Register Detail page nutribox app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Register Detail | NutriBox',
    description: 'Register Detail page nutribox app',
  }
}


export default function RegisterInfo() {
  return (
    <AuthLayout>
      <Head>
        <title>Welcome | NutriBox</title>
      </Head>
      <div className="w-full flex flex-col outfit-font">
       <BackButton />
        <img
          src="/assets/img/register-2.png"
          alt="Nubo Welcome"
          className="w-1/2 h-auto mx-auto mt-10"
        />
        <h1 className="text-3xl mt-5 text-center font-semibold">Register</h1>
        <p className="text-center mt-2 text-sm">
          Isi informasi kesehatan Anda di bawah ini
        </p>
        <RegisterInfoForm />
      </div>
    </AuthLayout>
  );
}
