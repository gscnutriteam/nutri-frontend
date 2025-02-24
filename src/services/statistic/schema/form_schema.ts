import { z } from "zod";

const editBeratBadanSchema = z.object({
  berat: z
    .number({
      required_error: "Berat badan wajib diisi",
    })
    .min(1, {
      message: "Berat badan tidak valid",
    })
    .max(500, {
      message: "Berat badan tidak valid",
    }),
  tinggi: z
    .number({
      required_error: "Tinggi badan wajib diisi",
    })
    .min(1, {
      message: "Tinggi badan tidak valid",
    })
    .max(300, {
      message: "Tinggi badan tidak valid",
    }),
});

const targetBeratBadanSchema = z.object({
  target: z
    .number({
      required_error: "Target berat badan wajib diisi",
    })
    .min(1, {
      message: "Target berat badan tidak valid",
    })
    .max(500, {
      message: "Target berat badan tidak valid",
    }),
  tanggal: z.date({
    required_error: "Tanggal wajib diisi",
  }),
});

export { editBeratBadanSchema, targetBeratBadanSchema };
