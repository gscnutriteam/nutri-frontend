# Premium Service - Midtrans Integration

This directory contains the code for the premium subscription service with Midtrans payment gateway integration.

## Setup

1. Copy the `sample.env.local` file to `.env.local` in the root directory
2. Register for Midtrans account at [Midtrans Dashboard](https://dashboard.midtrans.com/)
3. Set your Midtrans API credentials in `.env.local`:
   ```
   NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-YOUR_CLIENT_KEY
   MIDTRANS_SERVER_KEY=SB-Mid-server-YOUR_SERVER_KEY
   NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION=false
   ```

## Implementation

- `api/midtrans.ts` - Server-side implementation for generating Midtrans payment tokens
- `components/midtrans-payment-button.tsx` - Client-side component for Midtrans payment popup
- `pages/list_premium.tsx` - Main page displaying available premium plans

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
- [midtrans-client NPM Package](https://www.npmjs.com/package/midtrans-client)