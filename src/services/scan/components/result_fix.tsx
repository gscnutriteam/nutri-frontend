"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Form schema for meal tracking
const mealTrackingSchema = z.object({
  title: z.string().min(1, { message: "Nama makanan tidak boleh kosong" }),
  eatingTime: z.string().min(1, { message: "Waktu makan harus diisi" }),
  eatingDate: z.string().min(1, { message: "Tanggal makan harus diisi" }),
});

const FoodTrackingResult = () => {
  const form = useForm<z.infer<typeof mealTrackingSchema>>({
    resolver: zodResolver(mealTrackingSchema),
    defaultValues: {
      title: "Makan Siang",
      eatingTime: "18:01",
      eatingDate: new Date().toISOString().split("T")[0],
    },
  });

  function onSubmit(values: z.infer<typeof mealTrackingSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <div className="flex flex-col min-h-screen relative">
        <div className="absolute bottom-0 left-0">
            <div className="w-16 h-12 relative">
              <Image
                fill
                src="/assets/img/nubo_alert.png"
                alt="Food Cart Icon"
                className="absolute bottom-0 left-0"
              />
            </div>
          </div>
      {/* Main Content */}
      <div className="flex-1 p-4 pb-20 relative">
        {/* Meal Summary */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full">
            {/* Food Image */}
            <div className="w-[180px] h-[180px] bg-white rounded-full border-2 border-border shadow-md overflow-hidden flex items-center justify-center">
              <div className="w-[95%] h-[95%] rounded-full bg-[#f5f5f5] flex items-center justify-center relative">
                <Image
                  fill
                  src="/assets/img/nasi.png"
                  alt="Food Bowl"
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            {/* Calorie Box */}
            <div className="absolute -z-10 right-[0px] top-[20%] w-full flex justify-end ">
              <Card
                variant="default"
                className="bg-[#FFEB3B] border-2 w-full flex justify-end border-black p-2"
              >
                <CardContent className="p-2">
                  <div className="text-xs font-medium text-black">
                    Estimasi total kalori
                  </div>
                  <div className="text-3xl font-bold text-black">
                    170 <span className="text-sm font-normal">kcal</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Nutrition Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Protein */}
          <NutritionStats title="protein" value={10} unit="gram" />
         

          {/* Fat */}
          <NutritionStats title="lemak" value={10} unit="gram" />

          {/* Carbs */}
          <NutritionStats title="karbohidrat" value={20} unit="gram" />
        </div>

        {/* Meal Details Form */}
        <Card
          variant="default"
          className="mb-6 bg-primaryLight border-2 border-black"
        >
          <CardContent className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">
                        Judul/nama makanan
                      </FormLabel>
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
                  <div className="mb-1 ">
                    Kapan kamu makan ini
                  </div>
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

        {/* Done Button */}
        <Button
          variant="default"
          className="w-full text-white border-2 border-black py-3 font-medium"
          onClick={form.handleSubmit(onSubmit)}
        >
          Done
        </Button>
      </div>

      {/* Bottom Warning */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-transparent to-[#B2DFDB]">
        <div className="relative">
          <div className="absolute bottom-0 left-0">
            <div className="w-20 h-16 relative">
              <Image
                fill
                src="/assets/img/nubo_alert.png"
                alt="Food Cart Icon"
                className="absolute bottom-0 -left-5"
              />
            </div>
          </div>
          <Card
            variant="default"
            className="bg-danger text-white border-2 border-black py-1 pl-16 pr-4 !rounded-tl-full rounded-md"
          >
            <CardContent className="p-1">
              <p className="text-sm font-medium">
                Kamu perlu makan lebih bergizi dan seimbang
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FoodTrackingResult;

const NutritionStats = ({
  title,
  value,
  unit,
}: {
  title: string;
  value: number;
  unit: string;
}) => {
  return (
    <div className="bg-primary aspect-square border-2 border-black rounded-base text-white">
      <CardContent className="p-3 flex flex-col items-center h-full justify-between">
        <div className=" w-full">Estimasi total {title}</div>
        <div className="text-2xl font-bold flex w-full justify-left items-center gap-1">
          {value} <span className=" font-normal">{unit}</span>
        </div>
      </CardContent>
    </div>
  );
};
