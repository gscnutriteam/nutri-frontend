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
import { tambahBeratSchema } from "../schema/form_schema";
import { FooterImage } from "./footer_image";
import { PlusCircleIcon, Loader2 } from "lucide-react";
import { addWeightHeight } from "../api/addWeightHeight";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { WEIGHT_QUERY_KEYS } from "../hooks/useWeightHeightData";

interface ModalTambahBeratProps {
  onSuccess?: () => void;
  latestHeight?: number;
}

export const ModalTambahBerat2 = ({ onSuccess, latestHeight }: ModalTambahBeratProps) => {
  const form = useForm<z.infer<typeof tambahBeratSchema>>({
    resolver: zodResolver(tambahBeratSchema),
    defaultValues: {
      berat: 0,
      tinggi: latestHeight || 0
    }
  });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // Update height value when latestHeight changes
  useEffect(() => {
    if (latestHeight) {
      form.setValue('tinggi', latestHeight);
    }
  }, [latestHeight, form]);

  async function onSubmit(values: z.infer<typeof tambahBeratSchema>) {
    try {
      setIsLoading(true);
      
      const response = await addWeightHeight(values.berat, values.tinggi);
      
      if (!response.success) {
        toast.error("Terjadi kesalahan saat menambahkan data");
        return;
      }
      
      toast.success("Data berat dan tinggi badan berhasil ditambahkan");
      form.reset({ berat: 0, tinggi: latestHeight || 0 });
      setOpen(false);
      
      // Invalidate all queries to refresh data everywhere
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightHeightData] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.currentWeight] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.targetWeight] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightChartData] });
      
      // Trigger additional custom refresh if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Exception during submit:', error);
      toast.error("Terjadi kesalahan saat menambahkan data");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"neutral"}>
          <PlusCircleIcon size={24} className="mr-1" />
          Tambah Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-start">
          <DialogTitle>Tambah Rekaman Data</DialogTitle>
          <DialogDescription>
            Menambah rekaman data berat badan dan tinggi badan
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="font-semibold space-y-4"
          >
            <FormField
              control={form.control}
              name="berat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Berat (kg)</FormLabel>
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
              name="tinggi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Tinggi (cm)</FormLabel>
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit
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
