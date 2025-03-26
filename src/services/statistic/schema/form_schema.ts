import { z } from "zod";

const tambahBeratSchema = z.object({
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
  recorded_at: z.date({
    required_error: "Tanggal wajib diisi",
  }),
});

const targetBeratBadanSchema = z.object({
  target: z.number().min(1, "Target berat harus diisi"),
  height: z.number().min(1, "Tinggi badan harus diisi"),
  tanggal: z.date({
    required_error: "Tanggal harus diisi",
  }),
});

export { editBeratBadanSchema, targetBeratBadanSchema, tambahBeratSchema };
