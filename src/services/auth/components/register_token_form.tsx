"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerTokenSchema } from "../schema/form_schema";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useMutation } from "@tanstack/react-query";
import useTokenAPI from "../api/token";
import { getUserData } from "@/services/profile/api/getUser";
import Cookies from "js-cookie";

export const RegisterTokenForm = () => {
	const form = useForm<z.infer<typeof registerTokenSchema>>({
		resolver: zodResolver(registerTokenSchema),
		defaultValues: {
			token: "",
		},
	});
	const router = useAppRouter();

	// React Query mutation
	const tokenMutation = useMutation({
		mutationFn: useTokenAPI,
		onSuccess: async (data) => {
			if (!data.success) {
				throw new Error(
					(data.data as { message?: string })?.message || "Invalid token",
				);
			}
			toast.success("Token validated successfully!");

			// Check user profile to determine next step
			try {
				const userData = await getUserData();
				if (userData && userData.userData) {
					// Check if profile is incomplete (missing height or weight)
					if (!userData.userData.height || !userData.userData.weight) {
						// Redirect to profile completion
						setTimeout(() => {
							router.push("/app/profile/complete");
						}, 1000);
					} else {
						// Profile is complete, go to home
						setTimeout(() => {
							router.push("/app");
						}, 1000);
					}
				} else {
					// Fallback to registration if user data can't be fetched
					setTimeout(() => {
						router.push("/register");
					}, 1000);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
				// Fallback to registration
				setTimeout(() => {
					router.push("/register");
				}, 1000);
			}
		},
		onError: (error: Error) => {
			const errorMessage = error?.message || "Token validation failed";

			// Set form error
			form.setError("token", {
				type: "manual",
				message: errorMessage,
			});

			// Show toast notification
			toast.error(errorMessage);
		},
	});

	async function onSubmit(values: z.infer<typeof registerTokenSchema>) {
		tokenMutation.mutate(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="font-semibold space-y-4 mt-6"
			>
				<FormField
					control={form.control}
					name="token"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Token</FormLabel>
							<FormControl>
								<Input
									placeholder="12345"
									{...field}
									disabled={tokenMutation.isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full"
					disabled={tokenMutation.isPending || tokenMutation.data?.success}
				>
					{tokenMutation.isPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Validating...
						</>
					) : (
						"Submit"
					)}
				</Button>
			</form>
		</Form>
	);
};
