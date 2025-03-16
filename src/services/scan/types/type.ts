import type { z } from "zod";
import type { confirmMakananSchema } from "../schema/form_schema";

export interface NutritionEstimations {
    calorieEstimation?: number;
    proteinEstimation?: number;
    fatEstimation?: number;
    carboEstimation?: number;
}
export interface BadgeMakananProps {
    title: string;
    isAdded?: boolean;
    estimations?: NutritionEstimations;
}

type ResultScan = z.infer<typeof confirmMakananSchema>;
type ResultConfirm = {
    title: string;
    eatingTime: string;
    eatingDate: string;
    caloriesEstimation: number;
    proteinEstimation: number;
    fatEstimation: number;
    carboEstimation: number;
}

export type { ResultScan, ResultConfirm };