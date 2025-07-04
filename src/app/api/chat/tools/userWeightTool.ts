import { getWeightHeight } from "@/services/statistic/api/getWeightHeight";
import { tool } from "ai";
import { z } from "zod";

export const userWeightTool = tool({
    parameters: z.object({
    }),
    description: "Mendapatkan data riwayatberat badan dari user.",
    execute: async () => {
        const weightHeight = await getWeightHeight();
        return weightHeight;
    }
});