'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

// You'd typically get this from your database
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// Mock function to get current user
async function getCurrentUser(): Promise<User> {
  // This would typically come from your auth system
  return {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '081234567890'
  };
}

export interface CreatePaymentRequest {
  planId: string;
  amount: number;
  description: string;
}

export interface MidtransResponse {
  token: string;
  redirect_url: string;
}

/**
 * Creates a payment transaction and returns a Midtrans snap token
 */
export async function createPaymentToken(request: CreatePaymentRequest): Promise<MidtransResponse> {
  try {
    const user = await getCurrentUser();
    
    // Generate a unique order ID
    const orderId = `ORDER-${user.id}-${uuidv4()}`;
    
    // Create the transaction payload
    const transactionDetails = {
      order_id: orderId,
      gross_amount: request.amount,
    };
    
    const customerDetails = {
      first_name: user.name,
      email: user.email,
      phone: user.phone,
    };
    
    const itemDetails = [
      {
        id: request.planId,
        price: request.amount,
        quantity: 1,
        name: request.description,
      },
    ];

    // Create the request payload
    const payload = {
      transaction_details: transactionDetails,
      customer_details: customerDetails,
      item_details: itemDetails,
      credit_card: {
        secure: true,
      },
    };

    // In a real app, this would be an actual API call to Midtrans
    // using the server key. For this example, we'll mock it.
    const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
    
    if (!SERVER_KEY) {
      throw new Error('MIDTRANS_SERVER_KEY is not defined in environment variables');
    }
    
    // Make the API call to Midtrans
    const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(SERVER_KEY + ':').toString('base64'),
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to create payment: ${errorData}`);
    }
    
    const data = await response.json();
    
    // Skip cookie setting for now - we'll handle this client side if needed
    // or implement cookie storage in a different way
    
    return {
      token: data.token,
      redirect_url: data.redirect_url,
    };
  } catch (error) {
    console.error('Error creating payment token:', error);
    throw error;
  }
} 