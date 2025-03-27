"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "../schema/form_schema";
import { useAppRouter } from "@/hooks/useAppRouter";
import useLoginAPI, { type LoginResponse } from "../api/login";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { saveAuthTokens } from "../util/util";
import { useMutation } from "@tanstack/react-query";
import { getPayloadFromToken, verifyJWT } from "@/lib/jwt";
import LoginGoogleButton from "./login_google_button";

export const LoginForm = () => {
  const router = useAppRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // React Query mutation
  const loginMutation = useMutation({
    mutationFn: useLoginAPI,
    onSuccess: async (response) => {
      if (!response.success) {
        throw new Error((response.data as { message?: string }).message || 'Login failed');
      }
      
      const responseData = response.data as LoginResponse;
      
      // Save tokens
      saveAuthTokens(responseData.tokens);
      
      // Show success message
      toast.success('Login successful!');
      
      const access_token = responseData.tokens.access.token;
      const isValid = verifyJWT(access_token);
      const payload = getPayloadFromToken(access_token);

      if (await isValid && payload?.userData.isProductTokenVerified) {
        // Redirect user to dashboard
        router.push('/');
        
      }

      router.push('/token');
      // Redirect user to home page
     
    },
    onError: (error: Error) => {
      form.setError('email', { message: error.message || 'Login failed' });
      form.setError('password', { message: error.message || 'Login failed' });
      toast.error(error.message || 'Login failed. Please check your credentials and try again.');
    }
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate({
      email: values.email,
      password: values.password
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-semibold space-y-4 mt-6"
      >
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  disabled={loginMutation.isPending}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  disabled={loginMutation.isPending}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loginMutation.isPending || loginMutation.data?.success}>
          {loginMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};
