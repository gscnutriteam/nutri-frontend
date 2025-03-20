import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { mealTrackingSchema } from "../schema/form_schema";
import { useMutation } from "@tanstack/react-query";
import useAddMeal, { AddMealResponse } from "../api/addMeal";
import useAddMealDetail from "../api/addMealDetail";
import { toast } from "sonner";
import { useScanStore } from "../store/scan_store";
import { useEffect, useState } from "react";
import { useAppRouter } from "@/hooks/useAppRouter";

export const useMealForm = () => {
  const { scanResult, reset } = useScanStore();
  const router = useAppRouter();
  
  // Calculate totals from added foods
  const [nutritionTotals, setNutritionTotals] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbo: 0,
  });
  
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
  
  const form = useForm<z.infer<typeof mealTrackingSchema>>({
    resolver: zodResolver(mealTrackingSchema),
    defaultValues: {
      title: "Makan Siang",
      eatingTime: "18:01",
      eatingDate: new Date().toISOString().split("T")[0],
    },
  });

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
  }, [addMealMutation.isSuccess, reset]);

  const onSubmit = (values: z.infer<typeof mealTrackingSchema>) => {
    if (!scanResult) {
      toast.error("Tidak ada data makanan");
      return;
    }
    
    const mealTime = new Date(`${values.eatingDate}T${values.eatingTime}`);
    
    addMealMutation.mutate({
      title: values.title,
      meal_time: mealTime.toISOString(),
      calories: nutritionTotals.calories,
      protein: nutritionTotals.protein,
      fat: nutritionTotals.fat,
      carbs: nutritionTotals.carbo,
      comment: scanResult.comment || "",
      recommendation: scanResult.recomendation || "",
    });
  };

  return {
    form,
    addMealMutation,
    onSubmit,
    nutritionTotals,
  };
}; 