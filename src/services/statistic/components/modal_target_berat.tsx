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
import { LocateIcon } from "lucide-react";

export const ModalTargetBerat2 = () => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const form = useForm<z.infer<typeof targetBeratBadanSchema>>({
    resolver: zodResolver(targetBeratBadanSchema),
    defaultValues: {
      target: 0,
      tanggal: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof targetBeratBadanSchema>) {
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
        <Button variant={"default"} className="flex-1">
          <LocateIcon size={24} className="" />
          Tambah Target Berat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-start">
          <DialogTitle>Tambah Target Berat badan</DialogTitle>
          <DialogDescription>
            Menambah target berat badan yang ingin dicapai
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
                  <FormLabel className="font-semibold">Tinggi</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min={today}
                      {...field}
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
