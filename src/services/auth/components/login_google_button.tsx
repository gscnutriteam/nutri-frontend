"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "../api/google";

export default function LoginGoogleButton() {
    const handleLoginGoogle = async () => {
        console.log('Login with Google');
        await signInWithGoogle()
    }
    return (
        <Button onClick={handleLoginGoogle} className='mt-3 w-full' size={'lg'} variant={'neutral'}>
          <img src="/assets/icon/google.svg" alt="Google Icon" className="w-6 h-6 inline-block" />
          Lanjutkan dengan Google
        </Button>
    );
}