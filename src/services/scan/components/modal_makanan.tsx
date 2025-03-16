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
import { BadgeMakanan } from "./badge_makanan";
import type { BadgeMakananProps } from "../types/type";
import { confirmMakananSchema } from "../schema/form_schema";
import { FooterImage } from "@/services/statistic/components/footer_image";
import { Check, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScanStore } from "../store/scan_store";
import { useState } from "react";

export const ModalConfirmMakanan = ({
  title,
  estimations,
  isAdded = false,
}: BadgeMakananProps) => {
  const { setFoodAdded, isFoodAdded } = useScanStore();
  const [open, setOpen] = useState(false);

  // Check if this food is already added from the store state
  const foodIsAdded = isAdded || isFoodAdded(title);

  const form = useForm<z.infer<typeof confirmMakananSchema>>({
    resolver: zodResolver(confirmMakananSchema),
    defaultValues: {
      title: title,
      calorieEstimation: estimations?.calorieEstimation,
      carboEstimation: estimations?.carboEstimation,
      proteinEstimation: estimations?.proteinEstimation,
      fatEstimation: estimations?.fatEstimation,
    },
  });

  function onSubmit(values: z.infer<typeof confirmMakananSchema>) {
    // Mark the food as added in the store
    setFoodAdded(values.title, true);

    // Close the dialog
    setOpen(false);
  }

  function handleRemove() {
    // Remove the food from tracking
    setFoodAdded(title, false);
    // Close the dialog
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-between py-1 px-2 rounded-full border w-fit",
            foodIsAdded
              ? "border-green-500 text-green-700 bg-white"
              : "border-teal-500 text-teal-700 bg-white"
          )}
        >
          <span className="font-medium text-sm mr-3">{title}</span>
          <div
            className={cn(
              "rounded-full flex items-center justify-center w-4 h-4",
              foodIsAdded ? "bg-green-500 text-white" : "bg-teal-100 text-teal-500"
            )}
          >
            {foodIsAdded ? (
              <Check size={12} strokeWidth={3} />
            ) : (
              <Plus size={12} strokeWidth={3} />
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-start">
          <DialogTitle>Konfirmasi makananmu</DialogTitle>
          <DialogDescription>
            Pilih makanan yang sesuai dengan yang kamu makan
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="font-semibold space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Nama Makananmu
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Telur Goreng" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="calorieEstimation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Estimasi Kalori (kkal)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="400" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carboEstimation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Estimasi Karbohidrat (g)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="400" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proteinEstimation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Estimasi Protein (g)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="400" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatEstimation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Estimasi Lemak (g)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="400" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 w-full">
              <Button type="submit" className="flex-1">
                {foodIsAdded ? "Update Makanan" : "Add Makanan"}
              </Button>
              
              {foodIsAdded && (
                <Button type="button" variant="danger" onClick={handleRemove}>
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          </form>
        </Form>
        <DialogFooter>
          <FooterImage />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
