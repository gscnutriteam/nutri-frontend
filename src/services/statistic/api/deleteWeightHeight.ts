"use server"

import { apiClient } from "@/lib/api_instance"

export const deleteWeightHeight = async (id: string) => {
    try {
        const response = await apiClient(`/weight-height/${id}`, "DELETE")
        if (!response.success) {
            throw new Error("Terjadi kesalahan saat menghapus data");
        }
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }
}