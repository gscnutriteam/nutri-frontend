"use server"
import { apiClient } from "@/lib/api_instance";

interface AddMealDetailRequest {
    meal_history_id: string;
    api_result: string;
}

interface AddMealDetailResponse {
    message: string;
    status: string;
}

const useAddMealDetail = async (data: AddMealDetailRequest, meal_id: string) => {
    try {
            return await apiClient(
            `/meals/${meal_id}/scan-detail`,
            "POST",
            data
        );
    } catch (error) {
        console.error('Add Meal Detail API error:', error);
        throw error;
    }
}

export default useAddMealDetail;