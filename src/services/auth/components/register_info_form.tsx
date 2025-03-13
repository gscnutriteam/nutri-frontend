"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
	type Gender,
	type PhsyicalActivity,
	useRegisterStore,
} from "../store/register_store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { registerInfoSchema } from "../schema/form_schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

export const RegisterInfoForm = () => {
	const {
		age,
		gender,
		height,
		weight,
		physicalActivity,
		medicalHistory,
		name,
		email,
		password,
		set,
	} = useRegisterStore();

	const router = useRouter();

	useEffect(() => {
		if (!name || !email || !password) {
			router.back();
		}
	}, [name, email, password]);

	const form = useForm<z.infer<typeof registerInfoSchema>>({
		resolver: zodResolver(registerInfoSchema),
		defaultValues: {
			age: typeof age === "number" ? age : undefined,
			gender: gender ?? undefined,
			height: typeof height === "number" ? height : undefined,
			weight: typeof weight === "number" ? weight : undefined,
			physicalActivity: physicalActivity ?? undefined,
			medicalHistory: medicalHistory ?? "",
		},
	});

	function onSubmit(values: z.infer<typeof registerInfoSchema>) {
		if (!name || !email || !password) {
			router.back();
		}
		set({
			age: values.age,
			gender: values.gender as Gender,
			height: values.height,
			weight: values.weight,
			physicalActivity: values.physicalActivity as PhsyicalActivity,
			medicalHistory: values.medicalHistory,
		});
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="font-semibold space-y-4 mt-6"
				>
					<FormField
						control={form.control}
						name="age"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">Umur</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Masukkan umur"
										{...field}
										value={field.value || ""}
										onChange={(e) => field.onChange(e.target.valueAsNumber)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">Jenis Kelamin</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value || ""}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Pilih jenis kelamin" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="male">Laki-laki</SelectItem>
										<SelectItem value="female">Perempuan</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="height"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">
									Tinggi Badan (cm)
								</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Masukkan tinggi badan"
										{...field}
										value={field.value || ""}
										onChange={(e) => field.onChange(e.target.valueAsNumber)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="weight"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">
									Berat Badan (kg)
								</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Masukkan berat badan"
										{...field}
										value={field.value || ""}
										onChange={(e) => field.onChange(e.target.valueAsNumber)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="physicalActivity"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">Aktivitas Fisik</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value || ""}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Pilih tingkat aktivitas fisik" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="low">Ringan</SelectItem>
										<SelectItem value="moderate">Sedang</SelectItem>
										<SelectItem value="high">Berat</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="medicalHistory"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">
									Riwayat Penyakit
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Masukkan riwayat penyakit"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</Form>
		</>
	);
};
