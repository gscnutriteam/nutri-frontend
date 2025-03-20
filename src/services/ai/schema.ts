import { z } from "zod";

const aiResultSchema = z.object({
	foods: z.array(
		z.object({
			name: z.string().describe("Nama makanan dengan bahasa indonesia. Judulnya saja (contoh: Nasi Goreng, Ayam Bakar, Sate Ayam, dll.)"),
			calorie: z
				.number()
				.describe(
					"Estimasi kalori makanan dari persis gambar yang diinputkan dengan satuan kalori (kkal)",
				),
			protein: z
				.number()
				.describe(
					"Estimasi protein makanan dari persis gambar yang diinputkan dengan satuan gram (g)",
				),
			fat: z
				.number()
				.describe(
					"Estimasi lemak makanan dari persis gambar yang diinputkan dengan satuan gram (g)",
				),
			carbo: z
				.number()
				.describe(
					"Estimasi karbohidrat makanan dari persis gambar yang diinputkan dengan satuan gram (g)",
				),
		}),
	),
	status: z.enum(["healty", "not healty", "unknown"]),
    comment: z
        .string()
        .describe(
            "Komentar yang diberikan terkait makanan yang diinputkan",
        ),
	recomendation: z
		.string()
		.describe(
			"Rekomendasi makanan yang masih bisa ditingkatkan atau dikurangi",
		),
});

export type AiResult = z.infer<typeof aiResultSchema>;
export { aiResultSchema };
