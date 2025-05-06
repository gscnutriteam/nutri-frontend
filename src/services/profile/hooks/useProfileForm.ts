"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useAppRouter } from "@/hooks/useAppRouter";
import Cookies from "js-cookie";
import type { z } from "zod";

import { editProfileSchema } from "../schema/form";
import { ProfileProps } from "../type/types";
import { Gender, PhsyicalActivity } from "@/services/auth/store/register_store";
import { formatDateForInput, saveAuthTokens } from "@/services/auth/util/util";
import { getUserData } from "../api/getUser";
import usePatchUser, { PatchUserRequest } from "../api/editUser";
import useRefreshAPI from "@/services/auth/api/refresh";
import { LoginResponse } from "@/services/auth/api/login";

export const useProfileForm = (user: ProfileProps) => {
  const router = useAppRouter();
  const [newProfilePicture, setNewProfilePicture] = useState<string | null>(null);
  const defaultPhoto = "/assets/img/no_pp.png";
  
  // Create form with validation
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      birth: user.birth_date ? new Date(user.birth_date) : undefined,
      gender: user.gender as "Male" | "Female",
      height: user.height || undefined,
      weight: user.weight || undefined,
      profilePicture: user.profile_picture || defaultPhoto,
      physicalActivity: (() => {
        switch(user.physical_activity) {
          case PhsyicalActivity.low: return "Light";
          case PhsyicalActivity.moderate: return "Medium";
          case PhsyicalActivity.high: return "Heavy";
          default: return undefined;
        }
      })() as "Light" | "Medium" | "Heavy",
      medicalHistory: user.medical_history || "",
    },
  });

  // Handle profile update mutation
  const updateProfile = async (data: PatchUserRequest) => {
    try {
      // Ensure we have a valid access token before making the request
      const access_token = Cookies.get('access_token');
      
      if (!access_token) {
        // If no access token, try to refresh it
        const refresh_token = Cookies.get('refresh_token');
        if (refresh_token) {
          const response = await useRefreshAPI({ refresh_token });
          if (response.success) {
            const responseData = response.data as LoginResponse;
            saveAuthTokens(responseData.tokens);
          } else {
            throw new Error("Failed to refresh token before updating profile");
          }
        } else {
          throw new Error("No authentication tokens available");
        }
      }
      
      const userId = (await getUserData())?.userData.id || '';
      const { success, statusText } = await usePatchUser({  
        ...data, 
        gender: data.gender === "Male" ? Gender.male : Gender.female, 
        id: userId, 
      });

      return { success, statusText, data, userId };
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return { 
        success: false, 
        statusText: error instanceof Error ? error.message : "Unknown error", 
        data, 
        userId: user.id 
      };
    }
  };

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async(data) => {
      if (!data.success) {
        
        // If we get Forbidden, try to refresh the token and retry
        if (data.statusText === 'Forbidden') {
          const refresh_token = Cookies.get('refresh_token');
          if (refresh_token) {
            try {
              const response = await useRefreshAPI({ refresh_token });
              if (response.success) {
                const responseData = response.data as LoginResponse;
                saveAuthTokens(responseData.tokens);
                
                // Retry the update with new token
                toast.info("Retrying profile update with refreshed authentication...");
                updateMutation.mutate(data.data);
                return;
              }
            } catch (refreshError) {
              console.error("Failed to refresh token:", refreshError);
            }
          }
        }
        
        toast.error("Failed to update profile. Please try again.");
        return;
      }
      
      toast.success("Profile successfully updated!");
      const refresh_token = Cookies.get('refresh_token'); 
      
      if (!refresh_token) {
        toast.error("Failed to update profile. Please try again.");
        return;
      }
      
      const response = await useRefreshAPI({ refresh_token: refresh_token ?? "" });
      
      if (!response.success) {
        toast.error("Failed to update profile. Please try again.");
        return;
      }
      
      const responseData = response.data as LoginResponse;
      saveAuthTokens(responseData.tokens);
      router.push('/app/profile');
    },
    onError: (error: Error) => {
      console.error(error); 
      toast.error(error.message || "Failed to update profile. Please try again.");
    }
  });

  // Handle profile update submission
  const onSubmit = (values: z.infer<typeof editProfileSchema>) => {
    const updatedValues: PatchUserRequest = {
      id: user.id,
      name: values.name,
      email: values.email,
      birth_date: values.birth?.toISOString() || '',
      gender: values.gender === "Male" ? Gender.male : Gender.female,
      height: values.height,
      weight: values.weight,
      activity_level: values.physicalActivity === "Light" 
        ? PhsyicalActivity.low 
        : values.physicalActivity === "Medium" 
          ? PhsyicalActivity.moderate 
          : PhsyicalActivity.high,
      medical_history: values.medicalHistory,
      profile_picture: newProfilePicture || user.profile_picture || defaultPhoto
    };

    updateMutation.mutate(updatedValues);
  };

  // Handle profile picture update
  const handleProfilePictureChange = (url: string) => {
    setNewProfilePicture(url);
    form.setValue("profilePicture", url);
  };

  return {
    form,
    onSubmit,
    updateMutation,
    newProfilePicture,
    handleProfilePictureChange,
    formatDateForInput
  };
}; 