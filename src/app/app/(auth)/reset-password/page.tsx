import { HeaderFeature } from '@/components/ui/header_feature';
import { ResetPasswordForm } from '@/services/auth/components/ResetPasswordForm';
import { RequestResetPasswordForm } from '@/services/auth/components/RequestResetPasswordForm';
import Image from 'next/image';
import { Toaster } from 'sonner';

interface ResetPasswordPageProps {
  searchParams: {
    token?: string;
  };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const token = searchParams?.token;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <Toaster richColors position="top-center" />
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Image src="/assets/img/nubo-large.png" alt="logo" width={300} height={300} />
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {token ? 'Reset Your Password' : 'Forgot Your Password?'}
          </h2>
          {!token && (
            <p className="mt-2 text-center text-sm text-gray-600">
              No problem. Enter your email address below and we&apos;ll send you a link to reset it.
            </p>
          )}
        </div>
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <RequestResetPasswordForm />
        )}
      </div>
    </div>
  );
} 