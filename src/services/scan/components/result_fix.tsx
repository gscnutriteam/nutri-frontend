"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
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
import { mealTrackingSchema } from "../schema/form_schema";
import { useScanStore } from "../store/scan_store";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useMutation } from "@tanstack/react-query";
import useAddMeal, { AddMealResponse } from "../api/addMeal";
import useAddMealDetail from "../api/addMealDetail";
import { toast } from "sonner";

const FoodTrackingResult = () => {
  const { scanResult, scanImageLink, reset } = useScanStore();
  const router = useAppRouter();

  console.log(scanImageLink);
  if (!scanResult) {
    router.push("/scan");
    return null;
  }

  // Calculate totals from added foods
  const [nutritionTotals, setNutritionTotals] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbo: 0,
  });

  console.log(scanResult);

  // Calculate total nutrition values from added foods
  useEffect(() => {
    if (scanResult?.foods) {
      // Filter only added foods
      const addedFoods = scanResult.foods.filter((food) =>
        Object.prototype.hasOwnProperty.call(food, "isAdded")
          ? (food as any).isAdded === true
          : true
      );

      // Calculate totals
      const totals = addedFoods.reduce(
        (acc, food) => {
          return {
            calories: acc.calories + food.calorie,
            protein: acc.protein + food.protein,
            fat: acc.fat + food.fat,
            carbo: acc.carbo + food.carbo,
          };
        },
        {
          calories: 0,
          protein: 0,
          fat: 0,
          carbo: 0,
        }
      );

      setNutritionTotals(totals);
    }
  }, [scanResult]);

  const addMealMutation = useMutation({
    mutationFn: useAddMeal,
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error("Gagal menambahkan makanan");
        return;
      }
      const dataResponse = data.data as AddMealResponse;
      const detailResponse = await useAddMealDetail(
        {
          meal_history_id: dataResponse.meal_history.id,
          api_result: JSON.stringify(scanResult) || "",
        },
        dataResponse.meal_history.id
      );

      if (!detailResponse.success) {
        toast.error("Gagal menambahkan makanan");
        return;
      }

      toast.success("Berhasil menambahkan makanan");
      router.push("/app");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    return () => {
      if (addMealMutation.isSuccess) {
        reset();
      }
    };
  }, []);

  const form = useForm<z.infer<typeof mealTrackingSchema>>({
    resolver: zodResolver(mealTrackingSchema),
    defaultValues: {
      title: "Makan Siang",
      eatingTime: "18:01",
      eatingDate: new Date().toISOString().split("T")[0],
    },
  });

  function onSubmit(values: z.infer<typeof mealTrackingSchema>) {
    const mealTime = new Date(`${values.eatingDate}T${values.eatingTime}`);
    addMealMutation.mutate({
      title: values.title,
      meal_time: mealTime.toISOString(),
      calories: nutritionTotals.calories,
      protein: nutritionTotals.protein,
      fat: nutritionTotals.fat,
      carbs: nutritionTotals.carbo,
      comment: scanResult?.comment || "",
      recommendation: scanResult?.recomendation || "",
    });
  }

  console.log(scanImageLink);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Main Content */}
      <div className="flex-1 p-4 pb-24 relative">
        {/* Meal Summary - Modified for side-by-side layout */}
        <div className="mb-8">
          <div className="relative flex flex-row items-center">
            {/* Food Image - Positioned on the left */}
            <div className="relative z-10 w-[150px] h-[150px] mr-3 flex-shrink-0">
              <div className="w-full h-full bg-white rounded-full border-2 border-border shadow-md overflow-hidden">
                <div className="w-full h-full mx-auto my-auto rounded-full bg-[#f5f5f5] flex items-center justify-center relative">
                  <Image
                    fill
                    src={scanImageLink || "/assets/img/nasi.png"}
                    alt="Food Image"
                    className="rounded-full object-cover"
                    // sizes="150px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Calorie Box - Next to the image */}
            <div className="flex-1">
              <Card
                variant="default"
                className="bg-[#FFEB3B] border-2 border-black p-2 shadow-md h-full"
              >
                <CardContent className="p-2">
                  <div className=" font-medium text-black">
                    Estimasi total kalori
                  </div>
                  <div className="text-3xl font-bold text-black">
                    {Math.round(nutritionTotals.calories)}{" "}
                    <span className="font-sm text-sm font-normal">kkal</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Nutrition Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <NutritionStats
            title="protein"
            value={Math.round(nutritionTotals.protein)}
            unit="gram"
          />
          <NutritionStats
            title="lemak"
            value={Math.round(nutritionTotals.fat)}
            unit="gram"
          />
          <NutritionStats
            title="karbohidrat"
            value={Math.round(nutritionTotals.carbo)}
            unit="gram"
          />
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

        {/* Done Button */}
        <Button
          variant="default"
          className="w-full text-white border-2 border-black py-3 font-semibold shadow-md transition-all hover:shadow-lg active:translate-y-0.5"
          onClick={form.handleSubmit(onSubmit)}
          disabled={addMealMutation.isPending}
        >
          {addMealMutation.isPending ? "Loading..." : "Done"}
          {addMealMutation.isPending && (
            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
          )}
        </Button>
      </div>

      {/* Bottom Warning - Improved positioning and responsiveness */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-transparent via-[rgba(178,223,219,0.5)] to-[#B2DFDB] pt-10">
        <div className="relative max-w-md mx-auto">
          {/* Character Image - Properly positioned and sized */}
          <div className="absolute bottom-0 left-0 z-10 w-20 h-16">
            <Image
              src="/assets/img/nubo_alert.png"
              alt="Character"
              width={64}
              height={64}
              className="absolute bottom-0 -left-2"
            />
          </div>

          {/* Recommendation Card - Better shaped and positioned */}
          <Card
            variant="default"
            className="bg-main text-black border-2 border-black py-2 pl-14 pr-4 rounded-tr-md rounded-br-md rounded-bl-md shadow-md"
          >
            <CardContent className="p-1">
              <p className="font-sm text-sm font-medium">
                {scanResult?.recomendation ||
                  "Kamu perlu makan lebih bergizi dan seimbang"}
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
    <div className="bg-primary aspect-square border-2 border-black rounded-lg text-white shadow-md transition-transform hover:scale-[1.02]">
      <CardContent className="p-3 flex flex-col items-center h-full justify-between">
        <div className="font-sm font-medium w-full">Estimasi total {title}</div>
        <div className="text-2xl font-bold flex w-full justify-start items-baseline gap-1">
          {value} <span className="font-sm font-normal font-sm">{unit}</span>
        </div>
      </CardContent>
    </div>
  );
};
