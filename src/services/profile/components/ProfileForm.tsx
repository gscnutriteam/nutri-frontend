"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { useAppRouter } from "@/hooks/useAppRouter";
import { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { UseMutationResult } from "@tanstack/react-query";

import { editProfileSchema } from "../schema/form";
import { PatchUserRequest } from "../api/editUser";
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

interface ProfileFormProps {
  form: UseFormReturn<z.infer<typeof editProfileSchema>>;
  onSubmit: (values: z.infer<typeof editProfileSchema>) => void;
  updateMutation: UseMutationResult<any, Error, PatchUserRequest>;
  isUploadingPhoto: boolean;
  formatDateForInput: (timestamp: number) => string;
  isEmailVerified?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  form,
  onSubmit,
  updateMutation,
  isUploadingPhoto,
  formatDateForInput,
  isEmailVerified = false,
}) => {
  const router = useAppRouter();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
                  disabled={isEmailVerified}
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
  );
};

export default ProfileForm; 