"use server";

import { ai } from "@/lib/genkit";
import { aiResultSchema } from "./schema";

export const predictNutrition = async (imageUrl: string) => {
    try {
        const { output } = await ai.generate({
            system: "Kamu adalah ahli gizi atau nutrisi, kamu memprediksi estimasi dengan nutrisi makanan yang ada pada gambar, lalu sebagai ahli gizi, kamu memberikan komentar dan rekomendasi terkait nutrisi makanan tersebut",
            prompt: [{ media: { url: imageUrl } }], // base64-encoded data uri
            output: {
                schema: aiResultSchema,
                instructions: "Outputkan hasil prediksi nutrisi dari gambar dengan bahasa indonesia",
            },
          });

        return output;
    } catch (error) {
        console.error("Error predicting nutrition:", error);
        throw error;
    }
}