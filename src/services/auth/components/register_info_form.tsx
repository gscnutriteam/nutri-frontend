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
import { useEffect } from "react";
import { registerInfoSchema } from "../schema/form_schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import useRegisterAPI, { type RegisterResponse } from "../api/register";
import { toast } from "sonner";
import { useAppRouter } from "@/hooks/useAppRouter";
import { Loader2 } from "lucide-react";
import {
	formatDateForInput,
	saveAuthTokenRegister,
} from "../util/util";
import { useMutation } from "@tanstack/react-query";
import { getPayloadFromToken, verifyJWT } from "@/lib/jwt";

export const RegisterInfoForm = () => {
	const {
		birth,
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

	const router = useAppRouter();

	useEffect(() => {
		if (!name || !email || !password) {
			router.back();
		}
	}, [name, email, password, router]);

	const form = useForm<z.infer<typeof registerInfoSchema>>({
		resolver: zodResolver(registerInfoSchema),
		defaultValues: {
			birth: birth ?? undefined,
			gender: gender ?? undefined,
			height: typeof height === "number" ? height : undefined,
			weight: typeof weight === "number" ? weight : undefined,
			physicalActivity: physicalActivity ?? undefined,
			medicalHistory: medicalHistory ?? "",
		},
	});

	// React Query mutation
	const registerMutation = useMutation({
		mutationFn: useRegisterAPI,
		onSuccess: async (response) => {
			if (!response.success) {
				console.error(response);

				throw new Error(response.error || "Registration failed");
			}

			const responseData = response.data as RegisterResponse;

			// Store tokens in cookies
			saveAuthTokenRegister(responseData.tokens);

			// Show success message
			toast.success("Registration successful!");

			// Redirect user
			router.push('/token');
		},
		onError: (error: Error) => {
			console.error("Registration error:", error);
			toast.error(error.message || "Registration failed. Please try again.");
		}
	});

	async function onSubmit(values: z.infer<typeof registerInfoSchema>) {
		if (!name || !email || !password) {
			router.back();
			return;
		}

		// Update store values
		set({
			birth: values.birth,
			gender: values.gender as Gender,
			height: values.height,
			weight: values.weight,
			physicalActivity: (values.physicalActivity as PhsyicalActivity) || null,
			medicalHistory: values.medicalHistory,
		});

		// Submit using React Query
		registerMutation.mutate({
			name,
			email,
			password,
			...values,
			gender: values.gender as Gender,
			physicalActivity: (values.physicalActivity as PhsyicalActivity) || null,
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
						name="birth"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">Tanggal Lahir</FormLabel>
								<FormControl>
									<Input
										type="date"
										placeholder="Masukkan Tanggal Lahir"
										{...field}
										className="relative w-full"
										value={formatDateForInput(new Date(field.value).getTime())}
										onChange={(e) => field.onChange(new Date(e.target.value))}
										disabled={registerMutation.isPending}
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
									disabled={registerMutation.isPending}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Pilih jenis kelamin" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Male">Laki-laki</SelectItem>
										<SelectItem value="Female">Perempuan</SelectItem>
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
										disabled={registerMutation.isPending}
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
										disabled={registerMutation.isPending}
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
									disabled={registerMutation.isPending}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Pilih tingkat aktivitas fisik" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Light">Ringan</SelectItem>
										<SelectItem value="Medium">Sedang</SelectItem>
										<SelectItem value="Heavy">Berat</SelectItem>
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
										disabled={registerMutation.isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={registerMutation.isPending || registerMutation.isSuccess}>
						{registerMutation.isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Submitting...
							</>
						) : (
							"Submit"
						)}
					</Button>
				</form>
			</Form>
		</>
	);
};
