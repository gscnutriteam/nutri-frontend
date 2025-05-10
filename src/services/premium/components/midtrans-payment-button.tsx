'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon, CheckCircle } from 'lucide-react';
import { purchaseSubscription } from '../api/subscriptions';
import useRefreshAPI from '@/services/auth/api/refresh';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: any) => void;
    };
  }
}

// Define possible token response structures
interface TokensResponse {
  tokens?: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
  access?: {
    token: string;
    expires: string;
  };
  refresh?: {
    token: string;
    expires: string;
  };
  [key: string]: any; // Allow for unknown properties
}

interface MidtransPaymentButtonProps {
  planId: string;
  planName: string;
  amount: number;
  disabled?: boolean;
  buttonText?: string;
}

export default function MidtransPaymentButton({
  planId,
  planName,
  amount,
  disabled = false,
  buttonText = 'Beli Sekarang'
}: MidtransPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [refreshingToken, setRefreshingToken] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load the Snap.js script if it's not already loaded
      await loadSnapScript();

      // Get the token from our backend API
      const response = await purchaseSubscription(planId, "");
      
      if (!response || !response.transaction_token) {
        throw new Error('Failed to get payment token from server');
      }

      // Open the Snap payment popup
      if (window.snap) {
        window.snap.pay(response.transaction_token, {
          onSuccess: async function(result: any) {
            console.log('Payment success:', result);
            setPaymentSuccess(true);
            setIsLoading(false);
            
            // Wait for 3 seconds with animation
            setRefreshingToken(true);
            
            // After 3 seconds, refresh the token and redirect
            setTimeout(async () => {
              try {
                // Get refresh token from cookies
                const refreshToken = getCookie('refresh_token');
                
                if (!refreshToken) {
                  console.error('Refresh token not found in cookies');
                  throw new Error('Refresh token not found');
                }
                
                console.log('Attempting to refresh token with:', refreshToken);
                
                // Refresh the token
                const refreshResponse = await useRefreshAPI({ refresh_token: refreshToken.toString() });
                
                // Log the entire response for debugging
                console.log('Refresh token response:', JSON.stringify(refreshResponse, null, 2));
                
                if (refreshResponse && refreshResponse.success && refreshResponse.data) {
                  // Cast response data to our expected type for better type checking
                  const responseData = refreshResponse.data as TokensResponse;
                  console.log('Token response data structure:', Object.keys(responseData));
                  
                  // Get tokens based on the actual response structure
                  // The structure might be data.tokens.access or directly data.access
                  if (responseData.tokens && responseData.tokens.access && responseData.tokens.refresh) {
                    // Structure: { tokens: { access: {...}, refresh: {...} } }
                    console.log('Using tokens.access structure');
                    
                    setCookie('access_token', responseData.tokens.access.token, { 
                      maxAge: 60 * 60, // 1 hour
                      path: '/' 
                    });
                    setCookie('refresh_token', responseData.tokens.refresh.token, { 
                      maxAge: 60 * 60 * 24 * 30, // 30 days
                      path: '/' 
                    });
                  } else if (responseData.access && responseData.refresh) {
                    // Structure: { access: {...}, refresh: {...} }
                    console.log('Using direct access structure');
                    
                    setCookie('access_token', responseData.access.token, { 
                      maxAge: 60 * 60, // 1 hour
                      path: '/' 
                    });
                    setCookie('refresh_token', responseData.refresh.token, { 
                      maxAge: 60 * 60 * 24 * 30, // 30 days
                      path: '/' 
                    });
                  } else if (typeof responseData === 'string') {
                    // Handle possible string response by parsing it
                    try {
                      console.log('Attempting to parse string response');
                      const parsedData = JSON.parse(responseData) as TokensResponse;
                      
                      if (parsedData.tokens && parsedData.tokens.access) {
                        setCookie('access_token', parsedData.tokens.access.token, { 
                          maxAge: 60 * 60, 
                          path: '/' 
                        });
                        setCookie('refresh_token', parsedData.tokens.refresh.token, { 
                          maxAge: 60 * 60 * 24 * 30, 
                          path: '/' 
                        });
                      } else if (parsedData.access && parsedData.refresh) {
                        setCookie('access_token', parsedData.access.token, { 
                          maxAge: 60 * 60, 
                          path: '/' 
                        });
                        setCookie('refresh_token', parsedData.refresh.token, { 
                          maxAge: 60 * 60 * 24 * 30, 
                          path: '/' 
                        });
                      } else {
                        throw new Error('Invalid token structure in parsed data');
                      }
                    } catch (parseError) {
                      console.error('Failed to parse token response:', parseError);
                      throw new Error('Failed to parse token response');
                    }
                  } else {
                    console.error('Unexpected token response structure:', responseData);
                    throw new Error('Unexpected token response structure');
                  }
                  
                  // Redirect to success page
                  router.push('/app/premium/success');
                } else {
                  console.error('Token refresh failed - Response:', refreshResponse);
                  throw new Error('Token refresh failed');
                }
              } catch (err) {
                console.error('Token refresh error:', err);
                // Even if refresh fails, still redirect to success page
                router.push('/app/premium/success');
              } finally {
                setRefreshingToken(false);
              }
            }, 3000);
          },
          onPending: function(result: any) {
            console.log('Payment pending:', result);
            // Handle pending payment
            router.push('/app/premium/pending');
          },
          onError: function(result: any) {
            console.error('Payment error:', result);
            setError('Payment failed. Please try again.');
            setIsLoading(false);
          },
          onClose: function() {
            // Only set loading to false if not already in success state
            if (!paymentSuccess) {
              console.log('Customer closed the popup without finishing payment');
              setIsLoading(false);
            }
          }
        });
      } else {
        setError('Payment system not available. Please try again later.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Payment initialization error:', err);
      setError('Failed to initialize payment. Please try again.');
      setIsLoading(false);
    }
  };

  // Function to load the Snap.js script
  const loadSnapScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // If the script is already loaded, resolve immediately
      if (window.snap) {
        resolve();
        return;
      }

      const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
      if (!clientKey) {
        reject(new Error('Midtrans client key not found'));
        return;
      }

      const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true';
      const snapUrl = isProduction
        ? 'https://app.midtrans.com/snap/snap.js'
        : 'https://app.sandbox.midtrans.com/snap/snap.js';

      const script = document.createElement('script');
      script.src = `${snapUrl}`;
      script.setAttribute('data-client-key', clientKey);
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Midtrans Snap script'));

      document.body.appendChild(script);
    });
  };

  return (
    <div>
      {paymentSuccess ? (
        <div className="flex flex-col items-center text-center py-4">
          <div className="relative mb-2">
            <CheckCircle className="text-green-500 w-10 h-10" />
            {refreshingToken && (
              <div className="absolute inset-0 border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <p className="text-green-600 font-medium">Pembayaran Berhasil!</p>
          <p className="text-gray-500 text-sm mt-1">
            {refreshingToken 
              ? "Memperbarui akses premium..." 
              : "Mengarahkan ke halaman sukses..."}
          </p>
        </div>
      ) : (
        <>
          <Button
            onClick={handlePayment}
            disabled={isLoading || disabled}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md"
          >
            {isLoading ? (
              <>
                <span className="mr-2">Processing...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                {buttonText} <ShoppingCartIcon className="ml-1" size={16} />
              </>
            )}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
      )}
    </div>
  );
} 