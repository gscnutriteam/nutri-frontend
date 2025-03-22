import { z } from "zod";

export const editProfileSchema = z.object({
    name: z
      .string({
        required_error: "Nama wajib diisi",
      })
      .min(2, {
        message: "Nama harus lebih dari 2 karakter",
      }),
    email: z
        .string({
            required_error: "Email wajib diisi",
        })
        .email({
            message: "Email tidak valid",
        }),
    birth: z
      .date({
        required_error: "Tanggal lahir wajib diisi",
      }),
    gender: z.enum(["Male", "Female"], {
      required_error: "Jenis kelamin wajib diisi",
    }),
    height: z
      .number({
        required_error: "Tinggi badan wajib diisi",
      })
      .min(1, {
        message: "Tinggi badan tidak valid",
      })
      .max(300, {
        message: "Tinggi badan tidak valid",
      }),
    weight: z
      .number({
        required_error: "Berat badan wajib diisi",
      })
      .min(1, {
        message: "Berat badan tidak valid",
      })
      .max(500, {
        message: "Berat badan tidak valid",
      }),
    physicalActivity: z.enum(["Light", "Medium", "Heavy"], {
      required_error: "Aktivitas fisik wajib diisi",
    }),
    medicalHistory: z.string({
      required_error: "Riwayat penyakit wajib diisi",
    }),
    profilePicture: z.string().optional(),
});