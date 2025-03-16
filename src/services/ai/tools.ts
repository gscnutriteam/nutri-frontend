import { ai } from "@/lib/genkit";
import { z } from "zod";
import image from "../scan/util/image";
import { aiResultSchema } from "./schema";
import { predictNutrition } from "./generate";


const getPredictNutrition = ai.defineTool({
    name: "Prediksi Nutrisi",
    description: "Prediksi estimasi detail nutrisi makanan dari gambar",
    inputSchema: z.object({
        image: z.string({
            required_error: "Gambar wajib diisi",
        }).describe("Gambar makanan yang akan diprediksi"),
    }),
    outputSchema: aiResultSchema || null,
    }, async ({ image }) => {
        try {
            const result = await predictNutrition(image);
            
            return result || {
                status: "unknown" as "unknown" | "healty" | "not healty",
                foods: [],
                comment: "Failed to analyze the image",
                recomendation: "Please try again with a clearer image"
            };
            
        } catch (error) {
            console.error("Error predicting nutrition:", error);
            return {
                status: "unknown" as "unknown" | "healty" | "not healty",
                foods: [],
                comment: "Failed to analyze the image",
                recomendation: "Please try again with a clearer image"
            };
        }
        
    }
)

export { getPredictNutrition };