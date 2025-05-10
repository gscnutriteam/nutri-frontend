# Premium Service - Midtrans Integration

This directory contains the code for the premium subscription service with Midtrans payment gateway integration.

## Setup

1. Copy the `sample.env.local` file to `.env.local` in the root directory
2. Set your Midtrans client key in `.env.local`:
   ```
   NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-YOUR_CLIENT_KEY
   NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION=false
   ```

## Implementation

- `api/subscriptions.ts` - API client for backend subscription endpoints, including Midtrans payment
- `components/midtrans-payment-button.tsx` - Client-side component for Midtrans payment popup
- `pages/list_premium.tsx` - Main page displaying available premium plans

## Integration Flow

1. User selects a premium plan and clicks the payment button
2. Frontend calls `/subscriptions/purchase/{planId}` backend API
3. Backend generates Midtrans token and returns it to the frontend
4. Frontend loads Midtrans Snap.js and opens payment popup with the token
5. User completes payment in the Midtrans popup
6. User is redirected to success or pending page based on payment result

## Features

- Sandbox mode for testing payments
- Multiple subscription plan options
- Responsive payment flow with Midtrans Snap popup
- Success/Pending pages for payment status

## Testing 

In sandbox mode, you can use various payment methods with test credentials. For example:

- Credit Card: 
  - Card Number: 4811 1111 1111 1114
  - CVV: 123
  - Expiry: Any future date
  
- QRIS/GoPay:
  - Simply scan the QR code and the transaction will be automatically completed in sandbox mode

## References

- [Midtrans Documentation](https://docs.midtrans.com/)
- [Midtrans Snap Integration Guide](https://docs.midtrans.com/docs/snap-snap-integration-guide)