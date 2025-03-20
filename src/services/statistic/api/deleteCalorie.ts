"use server";

import { apiClient } from "@/lib/api_instance";

const deleteCalorie = async (id: string) => {
    try {
        const response = await apiClient(`/meals/${id}`, "DELETE");
        return response.data;
    } catch (error) {
        console.error("Delete Calorie API error:", error);
        throw error;
    }
};

export default deleteCalorie;