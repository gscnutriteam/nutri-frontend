import { z } from "zod";

const registerInfoSchema = z.object({
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
});

const registerTokenSchema = z.object({
  token: z
    .string({
      required_error: "Token wajib diisi",
    })
    .min(1, {
      message: "Token wajib diisi",
    }),
});

const registerUserSchema = z
    .object({
      name: z
        .string({
          required_error: 'Nama wajib diisi',
        })
        .min(2, {
          message: 'Nama harus lebih dari 2 karakter.',
        }),
      email: z
        .string({
          required_error: 'Email wajib diisi',
        })
        .email({
          message: 'Email tidak valid.',
        }),
      password: z
        .string({
          required_error: 'Password wajib diisi',
        })
        .min(8, {
          message: 'Password minimal 8 karakter.',
        })
        .max(20, {
          message: 'Password maksimal 20 karakter.',
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
          message: 'Password harus mengandung huruf besar, huruf kecil, dan angka.',
        }),
      confirmPassword: z.string({
        required_error: 'Konfirmasi password wajib diisi',
      }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Password tidak cocok',
      path: ['confirmPassword'],
    });

  const loginSchema = z.object({
    email: z.string({
      required_error: 'Email wajib diisi',
    }).email({
      message: 'Email tidak valid',
    }),
    password: z.string({
      required_error: 'Password wajib diisi',
    }),
  });

export { registerInfoSchema, registerTokenSchema, registerUserSchema, loginSchema };
