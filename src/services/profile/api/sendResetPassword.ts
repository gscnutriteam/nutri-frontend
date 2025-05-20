"use server";

import { apiClient } from "@/lib/api_instance";

export interface SendResetPasswordResponse {
  message: string;
  status: string;
}


export const sendResetPassword = async (email: string) => {
  try {
    const data = {email: email};
    const response = await apiClient<typeof data, SendResetPasswordResponse>("/auth/forgot-password", "POST", data);
    return response;
  } catch (error) {
    console.error(error);
    return {
      message: "Gagal mengirim email reset password",
      status: "error"
    };
  }
};