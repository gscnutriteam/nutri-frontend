"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Gender, PhsyicalActivity } from "@/services/auth/store/register_store";
import { editProfileSchema } from "../schema/form";
import type { ProfileProps } from "../type/types";
import { formatDateForInput } from "@/services/auth/util/util";
import { useMutation } from "@tanstack/react-query";
import { useAppRouter } from "@/hooks/useAppRouter";
import { uploadImageToStorage } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Mock API function - replace with your actual API call
const updateProfile = async (data: z.infer<typeof editProfileSchema>) => {
  // Simulate API request
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true };
};

const EditProfileSection = (user : ProfileProps) => {
  const router = useAppRouter();
  const [newProfilePicture, setNewProfilePicture] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      birth: user.birth_date ? new Date(user.birth_date) : undefined,
      gender: user.gender as "Male" | "Female",
      height: user.height || undefined,
      weight: user.weight || undefined,
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

  const handlePhotoUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        try {
          setIsUploadingPhoto(true);
          const reader = new FileReader();
          
          reader.onloadend = async () => {
            const base64data = reader.result as string;
            
            // Display preview immediately
            setNewProfilePicture(base64data);
            
            try {
              // Upload to Firebase
              const fileName = `profile_${user.id}_${uuidv4()}.jpg`;
              const downloadURL = await uploadImageToStorage(base64data, fileName);
              
              // Set the uploaded image URL
              setNewProfilePicture(downloadURL);
              
              // Update form with the new profile picture URL
              form.setValue("profilePicture", downloadURL);
              
              toast.success("Profile picture updated successfully!");
            } catch (error) {
              console.error("Error uploading profile picture:", error);
              toast.error("Failed to upload profile picture. Please try again.");
              // Reset to original picture if upload fails
              setNewProfilePicture(null);
            }
          };
          
          reader.readAsDataURL(file);
        } catch (error) {
          console.error("Error processing image:", error);
          toast.error("Failed to process image. Please try again.");
        } finally {
          setIsUploadingPhoto(false);
        }
      }
    };
    
    fileInput.click();
  };

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile successfully updated!");
      router.push('/profile');
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile. Please try again.");
    }
  });

  const onSubmit = (values: z.infer<typeof editProfileSchema>) => {
    // Add profile picture to values if it was changed
    const updatedValues = {
      ...values,
      profilePicture: newProfilePicture || user.profile_picture
    };
    console.log(values)
    updateMutation.mutate(updatedValues);
  };

  return (
    <div className="px-4 pt-20 pb-10">
      <div className="relative mb-8">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-2 border-black bg-gray-200 overflow-hidden">
              <img
                src={newProfilePicture || user.profile_picture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handlePhotoUpload}
              >
                <span className="text-white text-sm font-medium">
                  {isUploadingPhoto ? 'Uploading...' : 'Change Photo'}
                </span>
              </div>
            </div>
            <div 
              className="absolute bottom-1 right-1 bg-primary rounded-full p-2 border-2 border-white cursor-pointer"
              onClick={handlePhotoUpload}
            >
              {isUploadingPhoto ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Change Photo</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Nama</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Masukkan nama" 
                      {...field} 
                      disabled={updateMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="Masukkan email" 
                      {...field} 
                      disabled={updateMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Masukkan Tanggal Lahir"
                      {...field}
                      className="relative w-full"
                      value={field.value ? formatDateForInput(new Date(field.value).getTime()) : ''}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      disabled={updateMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Jenis Kelamin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={updateMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Laki-laki</SelectItem>
                      <SelectItem value="Female">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Tinggi Badan (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan tinggi badan"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        disabled={updateMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Berat Badan (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan berat badan"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        disabled={updateMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="physicalActivity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Aktivitas Fisik</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    disabled={updateMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat aktivitas fisik" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Light">Ringan</SelectItem>
                      <SelectItem value="Medium">Sedang</SelectItem>
                      <SelectItem value="Heavy">Berat</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Riwayat Penyakit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan riwayat penyakit"
                      {...field}
                      disabled={updateMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 mt-6">
              <Button 
                type="button" 
                variant="neutral" 
                className="flex-1"
                onClick={() => router.back()}
                disabled={updateMutation.isPending || isUploadingPhoto}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                onClick={() => {onSubmit(form.getValues())}}
                disabled={updateMutation.isPending || isUploadingPhoto}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileSection;