"use server";

import { apiClient } from "@/lib/api_instance";
import { WeightHeight } from "./getWeightHeight";

interface EditWeightHeightProps {
    weight: number;
    height: number;
    recorded_at: string;
}

export const editWeightHeight = async (id: string, data: EditWeightHeightProps) => {
    try {
        const response = await apiClient(`/weight-height/${id}`, "PUT", data);
        if (!response.success) {
            throw new Error("Terjadi kesalahan saat memperbarui data");
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}