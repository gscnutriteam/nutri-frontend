"use server";
import { apiClient } from "@/lib/api_instance";

export interface SendEmailVerificationResponse {
  status: string;
  message: string;
}

export const sendEmailVerification = async () => {
  const response = await apiClient<undefined, SendEmailVerificationResponse>("/auth/send-verification-email", "POST");
  return response.data;
};
