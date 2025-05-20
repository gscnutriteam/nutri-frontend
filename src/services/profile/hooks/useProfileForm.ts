"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useAppRouter } from "@/hooks/useAppRouter";
import type { z } from "zod";

import { editProfileSchema } from "../schema/form";
import { ProfileProps } from "../type/types";
import { Gender, PhsyicalActivity } from "@/services/auth/store/register_store";
import { formatDateForInput } from "@/services/auth/util/util";
import { getUserData } from "../api/getUser";
import usePatchUser, { PatchUserRequest, PatchUserResponse } from "../api/editUser";
import { 
    refreshAndSetNewTokensAfterUpdate
} from "@/app/actions/auth_actions";

// Assuming apiClient returns a structure like this. Adjust if your apiClient is different.
interface ApiClientResponse<DataType> {
  success: boolean;
  status: number;
  statusText: string;
  data: DataType; 
  error?: any; 
}

export const useProfileForm = (user: ProfileProps) => {
  const router = useAppRouter();
  const [newProfilePicture, setNewProfilePicture] = useState<string | null>(null);
  const defaultPhoto = "/assets/img/no_pp.png";
  
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

  const attemptTokenRefreshAndRetry = async (failedMutationData: PatchUserRequest) => {
    try {
      toast.info("Authentication may have expired. Attempting to refresh session...");
      const refreshResult = await refreshAndSetNewTokensAfterUpdate();
      if (refreshResult.success) {
        toast.success("Session refreshed. Retrying profile update...");
        updateMutation.mutate(failedMutationData);
      } else {
        toast.error(refreshResult.error || "Session refresh failed. Please log in again.");
      }
    } catch (error) {
      toast.error("Error during token refresh process. Please log in again.");
    }
  };

  const updateProfileMutationFn = async (data: PatchUserRequest): Promise<ApiClientResponse<PatchUserResponse> & { originalData: PatchUserRequest }> => {
    const userId = (await getUserData())?.userData.id || user.id;
    
    const result = await usePatchUser({  
      ...data, 
      gender: data.gender === "Male" ? Gender.male : Gender.female, 
      id: userId, 
    }) as ApiClientResponse<PatchUserResponse>;
    return { ...result, originalData: data }; 
  };

  const updateMutation = useMutation<ApiClientResponse<PatchUserResponse> & { originalData: PatchUserRequest }, Error, PatchUserRequest>({
    mutationFn: updateProfileMutationFn,
    onSuccess: async (response) => {
      if (response.success) {
        toast.success("Profile successfully updated! Refreshing session with updated data...");
        
        const postUpdateRefreshResult = await refreshAndSetNewTokensAfterUpdate();
        if (!postUpdateRefreshResult.success) {
          toast.warning(postUpdateRefreshResult.error || "Could not refresh session after profile update, but profile was saved.");
        }
        router.push('/app/profile');
      } else {
        const errorMessage = (response.data as any)?.message || response.error?.message || response.statusText || "Failed to update profile.";
        
        const isAuthError = response.status === 401 || 
                            response.status === 403 || 
                            (typeof response.statusText === 'string' && response.statusText.toLowerCase().includes('forbidden')) ||
                            (typeof errorMessage === 'string' && errorMessage.toLowerCase().includes('unauthorized'));
                            
        if (isAuthError) {
          await attemptTokenRefreshAndRetry(response.originalData);
        } else {
          toast.error(errorMessage);
        }
      }
    },
    onError: async (error: Error, variables) => { 
      console.error("Profile update error:", error);
      const errorMessageText = error.message.toLowerCase();
      if (errorMessageText.includes("unauthorized") || errorMessageText.includes("forbidden") || errorMessageText.includes("401") || errorMessageText.includes("403")) {
        await attemptTokenRefreshAndRetry(variables);
      } else {
        toast.error(error.message || "An unexpected error occurred. Please try again.");
      }
    }
  });

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