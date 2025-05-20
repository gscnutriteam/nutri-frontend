import { HeaderFeature } from '@/components/ui/header_feature';
import { ResetPasswordForm } from '@/services/auth/components/ResetPasswordForm';
import Image from 'next/image';

interface ResetPasswordPageProps {
  searchParams: {
    token?: string;
  };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const token = searchParams?.token;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Image src="/assets/img/nubo-large.png" alt="logo" width={300} height={300} />
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
        </div>
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-red-600">Invalid or Missing Token</h3>
            <p className="mt-2 text-gray-600">
              The password reset link is invalid or has expired. Please request a new one if needed.
            </p>
            {/* Optional: Add a button to redirect to forgot password page */}
            {/* <Button onClick={() => router.push('/app/forgot-password')} className="mt-4">Request New Link</Button> */}
          </div>
        )}
      </div>
    </div>
  );
} 