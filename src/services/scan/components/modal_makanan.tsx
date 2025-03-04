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
import { z } from "zod";
import { BadgeMakanan } from "./badge_makanan";
import { BadgeMakananProps } from "../types/type";
import { confirmMakananSchema } from "../schema/form_schema";
import { FooterImage } from "@/services/statistic/components/footer_image";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const ModalConfirmMakanan = ({
  title,
  isAdded = false,
}: BadgeMakananProps) => {
  const form = useForm<z.infer<typeof confirmMakananSchema>>({
    resolver: zodResolver(confirmMakananSchema),
    defaultValues: {
      title: title,
    },
  });

  function onSubmit(values: z.infer<typeof confirmMakananSchema>) {
    // set({
    //   name: values.name,
    //   email: values.email,
    //   password: values.password,
    // });
    // router.replace(registerInfoUrl);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-between py-1 px-2 rounded-full border w-fit",
            isAdded
              ? "border-green-500 text-green-700 bg-white"
              : "border-teal-500 text-teal-700 bg-white"
          )}
        >
          <span className="font-medium text-sm mr-3">{title}</span>
          <div
            className={cn(
              "rounded-full flex items-center justify-center w-4 h-4",
              isAdded ? "bg-green-500 text-white" : "bg-teal-100 text-teal-500"
            )}
          >
            {isAdded ? (
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
                    Estimasi Kalori
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
                    Estimasi Karbohidrat
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
                    Estimasi Protein
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
                    Estimasi Lemak
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="400" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
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
