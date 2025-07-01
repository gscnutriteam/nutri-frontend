import { RegisterUserForm } from "../components/register_user_form";
import { BackButton } from "../components/back_button";
import type { Metadata } from "next";
import LinkAPP from "@/components/util/link";
import LoginGoogleButton from "../components/login_google_button";

export const metadataRegisterUser: Metadata = {
  title: 'Register | NutriCare',
  description: 'Register page NutriCare app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Register | NutriCare',
    description: 'Register page NutriCare app',
  }
}

export default function RegisterUser() {
  return (
    <>
      <div className="w-full flex flex-col outfit-font">
        <BackButton />
        <img
          src="/assets/img/register-1.png"
          alt="Nubo Welcome"
          className="w-1/2 h-auto mx-auto mt-2"
        />
        <h1 className="text-3xl mt-5 text-center font-semibold">Register</h1>
        <p className="text-center mt-2 text-sm">
          Sudah punya akun? <LinkAPP href="/login" className="text-button underline">Login</LinkAPP>
        </p>
        <div className="px-6">
          <RegisterUserForm />
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Atau</span>
            </div>
          </div>
          <LoginGoogleButton isFromRegister={true} />
        </div>
      </div>
    </>
  );
}
