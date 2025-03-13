import { BackButton } from "../components/back_button";
import type { Metadata } from "next";
import { LoginForm } from "../components/login_form";
import LinkAPP from "@/components/util/link";

export const metadataLoginUser: Metadata = {
  title: 'Login | NutriBox',
  description: 'Login page nutribox app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Login | NutriBox',
    description: 'Login page nutribox app',
  }
}

export default function Login() {
  return (
    <>
      <div className="w-full flex flex-col outfit-font">
        <BackButton />
        <img
          src="/assets/img/register-1.png"
          alt="Nubo Welcome"
          className="w-1/2 h-auto mx-auto mt-10"
        />
        <h1 className="text-3xl mt-5 text-center font-semibold">Login</h1>
        <p className="text-center mt-2 text-sm">
          Masukkan akun anda di bawah ini
        </p>
        <LoginForm />
        <p className="text-center mt-4 text-sm">
          Belum punya akun? <LinkAPP href="/register" className="text-button underline">Register</LinkAPP>
        </p>
      </div>
    </>
  );
}
