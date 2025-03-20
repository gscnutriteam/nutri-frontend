import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { confirmMakananSchema } from "../schema/form_schema";
import { useScanStore } from "../store/scan_store";
import { useState } from "react";
import type { NutritionEstimations } from "../types/type";

interface UseMakananFormProps {
  title: string;
  isAdded?: boolean;
  estimations?: NutritionEstimations;
}

export const useMakananForm = ({ title, isAdded = false, estimations }: UseMakananFormProps) => {
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

  const onSubmit = (values: z.infer<typeof confirmMakananSchema>) => {
    // Mark the food as added in the store
    setFoodAdded(values.title, true);

    // Close the dialog
    setOpen(false);
  };

  const handleRemove = () => {
    // Remove the food from tracking
    setFoodAdded(title, false);
    // Close the dialog
    setOpen(false);
  };

  return {
    form,
    open,
    setOpen,
    foodIsAdded,
    onSubmit,
    handleRemove,
  };
}; 