import useGetUserCalories from "@/services/statistic/api/getUserCalories";
import { tool } from "ai";
import { z } from "zod";

export const userCalorieTool = tool({
    description: "Mendapatkan riwayat makan dari user.",
    parameters: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
    }),
    async execute({ page, limit }: { page?: number, limit?: number }) {
        const userCalories = await useGetUserCalories(page, limit);
        return userCalories;
    },
});