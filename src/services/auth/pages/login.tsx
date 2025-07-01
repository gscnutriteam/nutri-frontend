import { BackButton } from "../components/back_button";
import type { Metadata } from "next";
import { LoginForm } from "../components/login_form";
import LinkAPP from "@/components/util/link";
import { Toaster } from "sonner";
import LoginGoogleButton from "../components/login_google_button";

export const metadataLoginUser: Metadata = {
  title: 'Login | NutriCare',
  description: 'Login page NutriCare app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Login | NutriCare',
    description: 'Login page NutriCare app',
  }
}

export default function Login() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="w-full flex flex-col outfit-font">
        <BackButton />
        <img
          src="/assets/img/register-1.png"
          alt="Nubo Welcome"
          className="w-1/2 h-auto mx-auto mt-10"
        />
        <h1 className="text-3xl mt-5 text-center font-semibold">Login</h1>
        <p className="text-center mt-2 text-sm">
          Belum punya akun? <LinkAPP href="/register" className="text-button underline">Register</LinkAPP>
        </p>
        <div className="px-6">
          <LoginForm />
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Atau</span>
            </div>
          </div>
          <LoginGoogleButton isFromRegister={false} />
        </div>
      </div>
    </>
  );
}
