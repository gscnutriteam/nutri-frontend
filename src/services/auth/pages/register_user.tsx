import { RegisterUserForm } from "../components/register_user_form";
import { BackButton } from "../components/back_button";
import type { Metadata } from "next";
import LinkAPP from "@/components/util/link";

export const metadataRegisterUser: Metadata = {
  title: 'Register | NutriBox',
  description: 'Register page nutribox app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Register | NutriBox',
    description: 'Register page nutribox app',
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
          className="w-1/2 h-auto mx-auto mt-10"
        />
        <h1 className="text-3xl mt-5 text-center font-semibold">Register</h1>
        <p className="text-center mt-2 text-sm">
          Isi data diri anda di bawah ini
        </p>
        <RegisterUserForm />
        <p className="text-center mt-4 text-sm">
          Sudah punya akun? <LinkAPP href="/login" className="text-button underline">Login</LinkAPP>
        </p>
      </div>
    </>
  );
}
