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

export const ModalEditlBerat = ({ berat, tinggi }: ModalEditBeratProps) => {
  const form = useForm<z.infer<typeof editBeratBadanSchema>>({
    resolver: zodResolver(editBeratBadanSchema),
    defaultValues: {
      berat: berat,
      tinggi: tinggi,
    },
  });

  function onSubmit(values: z.infer<typeof editBeratBadanSchema>) {
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
                    <Input placeholder="60" type="number" {...field} />
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
                    <Input placeholder="170" type="number" {...field} />
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
