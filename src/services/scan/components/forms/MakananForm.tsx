import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { confirmMakananSchema } from "../../schema/form_schema";

interface MakananFormProps {
  form: UseFormReturn<z.infer<typeof confirmMakananSchema>, any, undefined>;
  onSubmit: (values: z.infer<typeof confirmMakananSchema>) => void;
  onRemove?: () => void;
  isAdded?: boolean;
}

const MakananForm = ({ form, onSubmit, onRemove, isAdded = false }: MakananFormProps) => {
  return (
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
            {isAdded ? "Update Makanan" : "Add Makanan"}
          </Button>
          
          {isAdded && onRemove && (
            <Button type="button" variant="danger" onClick={onRemove}>
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default MakananForm; 