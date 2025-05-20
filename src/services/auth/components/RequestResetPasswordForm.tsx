'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  requestResetPasswordSchema,
  type RequestResetPasswordFormData,
} from '@/services/auth/schema/requestResetPasswordSchema';
import { sendResetPassword, type SendResetPasswordResponse } from '@/services/profile/api/sendResetPassword';

// The sendResetPassword can return either the apiClient's structure or its own catch block structure.
// Let's define a more encompassing type for the result we expect in the form.
interface ProcessedSendResetPasswordResult {
  success?: boolean; // From apiClient's direct response
  status?: string | number; // status string from SendResetPasswordResponse or custom error, or number from apiClient
  message?: string; // message from SendResetPasswordResponse or custom error
  data?: SendResetPasswordResponse; // data from apiClient success
  error?: string; // error string from apiClient failure
}

export const RequestResetPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RequestResetPasswordFormData>({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: RequestResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const result: ProcessedSendResetPasswordResult = await sendResetPassword(data.email);

      // Check for success based on the structure of SendResetPasswordResponse within result.data
      if (result.success && result.data && result.data.status === 'success') {
        toast.success(result.data.message || 'If an account exists for this email, a password reset link has been sent.');
        form.reset(); 
      } 
      // Check for error from the sendResetPassword catch block (which has status: 'error')
      else if (result.status === 'error' && result.message) {
        toast.error(result.message);
      }
      // Check for API error message if result.data is populated but not a 'success' status
      else if (result.data && result.data.message) {
        toast.error(result.data.message);
      }
      // Check for a general error message on the result itself (e.g. from apiClient direct error string)
      else if (result.message) {
        toast.error(result.message);
      }
       // Fallback error
      else {
        toast.error('Failed to send reset link. Please try again.');
      }
    } catch (error) {
      // This catch is for unexpected errors during the await sendResetPassword or within the try block itself
      toast.error('An unexpected error occurred. Please try again.');
      console.error("Request reset password error:", error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending Link...' : 'Send Reset Link'}
        </Button>
      </form>
    </Form>
  );
}; 