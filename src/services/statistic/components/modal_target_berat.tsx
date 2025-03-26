"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { targetBeratBadanSchema } from "../schema/form_schema";
import { FooterImage } from "./footer_image";
import { LocateIcon, Loader2, Edit3Icon } from "lucide-react";
import { addWeightTarget } from "../api/addWeightTarget";
import { updateWeightTarget } from "../api/updateWeightTarget";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { WEIGHT_QUERY_KEYS } from "../hooks/useWeightHeightData";
import type { WeightTargetData } from "../api/addWeightTarget";

interface ModalTargetBeratProps {
  onSuccess?: () => void;
  latestHeight?: number;
  existingTarget?: WeightTargetData | null;
}

type FormValues = z.infer<typeof targetBeratBadanSchema>;

export const ModalTargetBerat2 = ({ onSuccess, latestHeight, existingTarget }: ModalTargetBeratProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  
  // Check if we have an active target - to determine if we're editing or creating
  const isEditMode = Boolean(existingTarget && existingTarget.id);

  const form = useForm<FormValues>({
    resolver: zodResolver(targetBeratBadanSchema),
    defaultValues: {
      target: existingTarget?.weight || 0,
      height: existingTarget?.height || latestHeight || 0,
      tanggal: existingTarget?.target_date 
        ? new Date(existingTarget.target_date)
        : new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days from now
    },
  });

  // Update form values when existingTarget or latestHeight changes
  useEffect(() => {
    if (existingTarget) {
      form.setValue('target', existingTarget.weight);
      form.setValue('height', existingTarget.height);
      if (existingTarget.target_date) {
        form.setValue('tanggal', new Date(existingTarget.target_date));
      }
    } else if (latestHeight) {
      form.setValue('height', latestHeight);
    }
  }, [existingTarget, latestHeight, form]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      if (isEditMode && existingTarget?.id) {
        // Use the update API for existing targets
        await updateWeightTarget({
          id: existingTarget.id,
          weight: values.target,
          height: values.height,
          target_date: values.tanggal.toISOString(),
        });
        
        toast.success("Target berat badan berhasil diperbarui");
      } else {
        // Use the create API for new targets
        await addWeightTarget({
          weight: values.target,
          height: values.height,
          target_date: values.tanggal.toISOString(),
        });
        
        toast.success("Target berat badan berhasil ditambahkan");
      }
      
      form.reset({
        target: 0,
        height: latestHeight || 0,
        tanggal: new Date(new Date().setDate(new Date().getDate() + 30)),
      });
      
      setIsOpen(false);
      
      // Invalidate all queries to refresh data everywhere
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightHeightData] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.currentWeight] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.targetWeight] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightChartData] });
      
      // Trigger additional custom refresh if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error saving weight target:', error);
      toast.error(error.message || "Gagal menyimpan target berat badan");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!isSubmitting) {
        setIsOpen(open);
      }
    }}>
      <DialogTrigger asChild>
        <Button variant={"default"} className="flex-1">
          {isEditMode ? (
            <>
              <Edit3Icon size={24} className="mr-1" />
              Ubah Target Berat
            </>
          ) : (
            <>
              <LocateIcon size={24} className="mr-1" />
              Tambah Target Berat
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-start">
          <DialogTitle>
            {isEditMode ? "Ubah Target Berat badan" : "Tambah Target Berat badan"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Mengubah target berat badan yang ingin dicapai"
              : "Menambah target berat badan yang ingin dicapai"
            }
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="font-semibold space-y-4"
          >
            <FormField
              control={form.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Tanggal Target</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min={today}
                      {...field}
                      className="relative"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const date = e.target.value
                          ? new Date(e.target.value)
                          : null;
                        field.onChange(date);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Target Berat (kg)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="60"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : 0
                        )
                      }
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Tinggi Badan (cm)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="170"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : 0
                        )
                      }
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSubmitting 
                ? "Menyimpan..." 
                : isEditMode 
                  ? "Simpan Perubahan" 
                  : "Tambah Target"
              }
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <FooterImage />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
