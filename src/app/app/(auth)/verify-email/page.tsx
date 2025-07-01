// import VerifyEmailStatus from './VerifyEmailStatus';

// import { apiClient } from "@/lib/api_instance"; // No longer used directly for verification here
// import dynamic from 'next/dynamic'; // No longer needed here
// import { cookies as nextCookies } from 'next/headers'; // No longer used directly for refresh here
// import useRefreshAPI from '@/services/auth/api/refresh'; // No longer directly calling this from here
import VerifyEmailClientPage from '@/app/app/(auth)/verify-email/VerifyEmailClientPage';
// import { performTokenRefreshAndSetCookies } from "@/app/actions/auth_actions"; // Client will call this
import { apiClient } from "@/lib/api_instance"; // For initial email verification

// Dynamically import VerifyEmailStatus to ensure it's client-side only
// const VerifyEmailStatus = dynamic(() => import('@/app/app/(auth)/verify-email/VerifyEmailStatus'), {
//   ssr: false, // Disable server-side rendering for this component
//   loading: () => <p>Loading status...</p>, // Optional loading component
// });

interface VerifyEmailPageProps {
  searchParams: {
    token?: string;
  };
}

interface VerifyEmailApiResponse {
  status: string; 
  message: string;
}

// async function verifyToken(token: string): Promise<boolean> {
//   const endpoint = `/auth/verify-email?token=${token}`;
//   console.log(`Verifying token using apiClient. Endpoint: ${endpoint}`);
//
//   try {
//     // Assuming process.env.BASE_API_URL in apiClient is configured to the API root (e.g., http://localhost:5000/v1)
//     // If process.env.BASE_API_URL is http://localhost:5000 (without /v1), 
//     // then endpoint should be `/v1/auth/verify-email?token=${token}`
//     const result = await apiClient<undefined, VerifyEmailApiResponse>(
//       endpoint, 
//       'POST', 
//       undefined, // No request body data
//       false,     // This endpoint does not require authentication
//       false      // Not form data
//     );
//
//     console.log('apiClient Response Status:', result.status);
//     console.log('apiClient Response Data:', result.data);
//
//     if (result.success && result.data && result.data.status === 'success') {
//       return true;
//     }
//     
//     // Log specific error message from API if available
//     if (result.data && result.data.message) {
//       console.error('Email verification failed via apiClient:', result.data.message);
//     } else if (result.error) {
//       console.error('Email verification failed via apiClient:', result.error);
//     } else {
//       console.error('Email verification failed via apiClient with status:', result.statusText);
//     }
//     return false;
//
//   } catch (error) {
//     // This catch block might be redundant if apiClient handles all errors and returns a result object.
//     // However, it's a good safety net for unexpected issues during the apiClient call itself.
//     console.error('Critical error calling apiClient for email verification:', error);
//     return false;
//   }
// }

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const token = searchParams?.token;
  let emailVerified = false;
  let verificationMessage = 'An unexpected error occurred during email verification.';

  if (token) {
    const verifyEndpoint = `/auth/verify-email?token=${token}`;
    try {
      const verifyResult = await apiClient<undefined, VerifyEmailApiResponse>(
        verifyEndpoint,
        'POST',
        undefined,
        false, 
        false
      );

      if (verifyResult.success && verifyResult.data?.status === 'success') {
        emailVerified = true;
        verificationMessage = verifyResult.data.message || 'Email successfully verified.';
      } else {
        emailVerified = false;
        verificationMessage = verifyResult.data?.message || verifyResult.error || `Email verification failed: ${verifyResult.statusText}.`;
      }
    } catch (error) {
      emailVerified = false;
      verificationMessage = error instanceof Error ? error.message : 'Critical error during email verification API call.';
    }
  } else {
    verificationMessage = 'No verification token found. Please check the link or try again.';
  }

  return <VerifyEmailClientPage initialEmailVerified={emailVerified} initialMessage={verificationMessage} />;
} 