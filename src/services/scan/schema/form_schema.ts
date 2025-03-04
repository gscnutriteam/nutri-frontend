import { z } from "zod";

const confirmMakananSchema = z.object({
    title: z.string({
        required_error: "Judul wajib diisi",
    }),
    calorieEstimation: z.number({
        required_error: "Estimasi kalori wajib diisi",
    }).min(0, {
        message: "Estimasi kalori tidak valid",
    }),
    proteinEstimation: z.number({
        required_error: "Estimasi protein wajib diisi",
    }).min(0, {
        message: "Estimasi protein tidak valid",
    }),
    fatEstimation: z.number({
        required_error: "Estimasi lemak wajib diisi",
    }).min(0, {
        message: "Estimasi lemak tidak valid",
    }),
    carboEstimation: z.number({
        required_error: "Estimasi karbohidrat wajib diisi",
    }).min(0, {
        message: "Estimasi karbohidrat tidak valid",
    }),
});

export { confirmMakananSchema };