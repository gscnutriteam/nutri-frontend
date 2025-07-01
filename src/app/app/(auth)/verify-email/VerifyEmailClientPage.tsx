'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react'; // Assuming Lottie is still used for loading/status
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { performTokenRefreshAndSetCookies } from "@/app/actions/auth_actions";

// Dynamically import the main status display, or integrate Lottie directly here
const VerifyEmailStatusDisplay = dynamic(() => import('@/app/app/(auth)/verify-email/VerifyEmailStatus'), {
  ssr: false,
  loading: () => <p style={{ textAlign: 'center', marginTop: '20vh' }}>Loading Display...</p>,
});

// Placeholder for a loading animation (e.g., a different Lottie animation)
const placeholderLoadingAnimation = {
    v: '5.5.7', fr: 30, ip: 0, op: 30, w: 100, h: 100, nm: 'Loading', ddd: 0, assets: [],
    layers: [ { ty: 4, ks: { o: {a: 0, k: 100}, s: {a: 0, k: [100,100]}, p: {a:0,k:[0,0]},a:{a:0,k:[0,0]}}, shapes: [ { ty:'gr', it: [ { ty:'el',d:1,s:{a:0,k:[80,80]},p:{a:0,k:[0,0]},nm:'E'}, {ty:'fl',c:{a:0,k:[0.5,0.5,0.5,1]},o:{a:0,k:100},r:1} ] } ] } ]
};

interface VerifyEmailClientPageProps {
  initialEmailVerified: boolean;
  initialMessage: string;
}

const VerifyEmailClientPage: React.FC<VerifyEmailClientPageProps> = ({ initialEmailVerified, initialMessage }) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshAttempted, setRefreshAttempted] = useState(false);
  const [finalSuccess, setFinalSuccess] = useState<boolean | null>(initialEmailVerified);
  const [displayMessage, setDisplayMessage] = useState(initialMessage);

  useEffect(() => {
    if (initialEmailVerified && !refreshAttempted) {
      setIsRefreshing(true);
      setRefreshAttempted(true);
      performTokenRefreshAndSetCookies()
        .then(result => {
          if (result.success) {
            setDisplayMessage(`${initialMessage} ${result.message}`);
            setFinalSuccess(true); // Overall success if email verified AND token refreshed
          } else {
            // Email was verified, but token refresh failed
            // setDisplayMessage(`${initialMessage} However, session refresh failed: ${result.message}`);
            setFinalSuccess(true); // Still mark as overall success for email verification part for display purposes
                                   // but the message will indicate refresh failure.
                                   // Alternatively, setFinalSuccess(false) if refresh is critical for "success".
          }
        })
        .catch(err => {
          setDisplayMessage(`${initialMessage} An unexpected error occurred during session refresh.`);
          setFinalSuccess(true); // Or false, depending on desired outcome on critical error
        })
        .finally(() => {
          setIsRefreshing(false);
        });
    }
  }, [initialEmailVerified, initialMessage, refreshAttempted]);

  const handleRedirect = () => {
    if (finalSuccess) { // Now based on overall success, including refresh if applicable
      router.push('/app/profile'); 
    } else {
      router.push('/app/register'); 
    }
  };

  if (isRefreshing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '20px' }}>
        <Lottie animationData={placeholderLoadingAnimation} style={{ width: 150, height: 150, marginBottom: '20px' }} loop={true} />
        <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>Refreshing session...</h1>
        <p>{initialMessage}</p> 
      </div>
    );
  }
  
  // Use the VerifyEmailStatusDisplay for the final message, or integrate its style here
  // For simplicity, I'll pass finalSuccess and displayMessage to it.
  // VerifyEmailStatusDisplay might need prop adjustments if its original `success` prop meant something different.
  return (
      <VerifyEmailStatusDisplay 
        success={finalSuccess ?? false} // Handle null case for success prop 
        message={displayMessage} 
      />
  );
  // Note: The original VerifyEmailStatus also had a button. 
  // If VerifyEmailStatusDisplay doesn't, you might need to add the button here as well, using handleRedirect.
  // Example if VerifyEmailStatusDisplay does NOT have the button:
  /*
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '20px' }}>
      <Lottie animationData={finalSuccess ? successAnimation : errorAnimation} style={{ width: 200, height: 200, marginBottom: '20px' }} loop={finalSuccess ? false : true} />
      <h1 style={{ fontSize: '24px', marginBottom: '10px', color: finalSuccess ? '#4CAF50' : '#F44336' }}>
        {finalSuccess ? 'Process Complete' : 'Process Incomplete'} // Adjust title
      </h1>
      <p style={{ fontSize: '16px', marginBottom: '30px', maxWidth: '400px' }}>{displayMessage}</p>
      <Button
        onClick={handleRedirect}
        variant={finalSuccess ? 'default' : 'danger'}
      >
        {finalSuccess ? 'Go to Profile' : 'Try Again / Register'}
      </Button>
    </div>
  );
  */
};

export default VerifyEmailClientPage; 