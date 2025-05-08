'use client';

import { useState } from 'react';
import { createPaymentToken, CreatePaymentRequest } from '../api/midtrans';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: any) => void;
    };
  }
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

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load the Snap.js script if it's not already loaded
      await loadSnapScript();

      // Create the payment request
      const request: CreatePaymentRequest = {
        planId: planId,
        amount: amount,
        description: `Subscription to ${planName}`,
      };

      // Get the token from our server action
      const response = await createPaymentToken(request);

      // Open the Snap payment popup
      if (window.snap) {
        window.snap.pay(response.token, {
          onSuccess: function(result: any) {
            console.log('Payment success:', result);
            // Here you would typically redirect to a success page
            // or update the UI to show the payment was successful
            window.location.href = '/app/premium/success';
          },
          onPending: function(result: any) {
            console.log('Payment pending:', result);
            // Handle pending payment
            window.location.href = '/app/premium/pending';
          },
          onError: function(result: any) {
            console.error('Payment error:', result);
            setError('Payment failed. Please try again.');
          },
          onClose: function() {
            console.log('Customer closed the popup without finishing payment');
            setIsLoading(false);
          }
        });
      } else {
        setError('Payment system not available. Please try again later.');
      }
    } catch (err) {
      console.error('Payment initialization error:', err);
      setError('Failed to initialize payment. Please try again.');
    } finally {
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
      <Button
        onClick={handlePayment}
        disabled={isLoading || disabled}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md"
      >
        {isLoading ? 'Processing...' : buttonText} <ShoppingCartIcon className="ml-1" size={16} />
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
} 