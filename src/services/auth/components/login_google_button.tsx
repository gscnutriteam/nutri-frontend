"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "../api/google";

interface LoginGoogleButtonProps {
    isFromRegister?: boolean;
    className?: string;
}

export default function LoginGoogleButton({ isFromRegister = false, className = '' }: LoginGoogleButtonProps) {
    const handleLoginGoogle = async () => {
        await signInWithGoogle(isFromRegister)
    }
    return (
        <Button onClick={handleLoginGoogle} className={`mt-3 w-full ${className}`} size={'lg'} variant={'neutral'}>
          <img src="/assets/icon/google.svg" alt="Google Icon" className="w-6 h-6 inline-block" />
          Lanjutkan dengan Google
        </Button>
    );
}