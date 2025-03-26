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
import { ButtonIcon } from "./button_icon";
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
import { editBeratBadanSchema } from "../schema/form_schema";
import type { ModalEditBeratProps } from "../types/berat";
import { FooterImage } from "./footer_image";
import { editWeightHeight } from "../api/editWeightHeight";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query"; 
import { WEIGHT_QUERY_KEYS } from "../hooks/useWeightHeightData";

interface ModalEditlBeratProps extends ModalEditBeratProps {
  onSuccess?: () => void;
}

export const ModalEditlBerat = ({ berat, tinggi, tanggal, id, onSuccess }: ModalEditlBeratProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof editBeratBadanSchema>>({
    resolver: zodResolver(editBeratBadanSchema),
    defaultValues: {
      berat: berat,
      tinggi: tinggi,
      recorded_at: tanggal,
    },
  });

  async function onSubmit(values: z.infer<typeof editBeratBadanSchema>) {
    try {
      setIsLoading(true);
      const response = await editWeightHeight(String(id), {
        weight: values.berat,
        height: values.tinggi,
        recorded_at: values.recorded_at.toISOString(),
      });
      
      toast.success("Data berat dan tinggi badan berhasil diperbarui");
      form.reset();
      setOpen(false);
      
      // Invalidate all weight-related queries to ensure everything is refreshed
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightHeightData] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.currentWeight] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.targetWeight] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.statistics] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightChartData] });
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonIcon variant="edit" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-start">
          <DialogTitle>Edit Rekaman Data</DialogTitle>
          <DialogDescription>
            Mengubah rekaman data berat badan dan tinggi badan
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
                  <FormLabel className="font-semibold">Berat</FormLabel>
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
                  <FormLabel className="font-semibold">Tinggi</FormLabel>
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
            <FormField
              control={form.control}
              name="recorded_at"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-semibold">Tanggal</FormLabel>
                  <FormControl>
                    <Input 
                      type="date"
                      {...field}
                      value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        field.onChange(date);
                      }}
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
