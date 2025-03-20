import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Clock } from "lucide-react";
import type { z } from "zod";
import { mealTrackingSchema } from "../../schema/form_schema";
import { UseFormReturn } from "react-hook-form";

interface MealDetailsFormProps {
  form: UseFormReturn<z.infer<typeof mealTrackingSchema>, any, undefined>;
}

const MealDetailsForm = ({ form }: MealDetailsFormProps) => {
  return (
    <Card variant="default" className="mb-6 bg-primaryLight border-2 border-black">
      <CardContent className="p-4">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Judul/nama makanan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Makan Siang"
                      type="text"
                      {...field}
                      className="border-2 border-black bg-white rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="mb-1 ">Kapan kamu makan ini</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="eatingDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                            <Input
                              type="date"
                              {...field}
                              className="border-2 border-black bg-white rounded-md pl-10 appearance-none"
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="eatingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                            <Input
                              type="time"
                              {...field}
                              className="border-2 border-black bg-white rounded-md pl-10 appearance-none"
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MealDetailsForm; 