"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerTokenSchema } from "../schema/form_schema";

export const RegisterTokenForm = () => {
  const form = useForm<z.infer<typeof registerTokenSchema>>({
    resolver: zodResolver(registerTokenSchema),
    defaultValues: {
      token: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerTokenSchema>) {
    // set({
    //   name: values.name,
    //   email: values.email,
    //   password: values.password,
    // });

    // router.replace(registerInfoUrl);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-semibold space-y-4 mt-6"
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Token</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
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
  );
};
