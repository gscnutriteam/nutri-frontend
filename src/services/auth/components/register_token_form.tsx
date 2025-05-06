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
import useRefreshAPI from "../api/refresh";
import { getUserData } from "@/services/profile/api/getUser";
import Cookies from "js-cookie";
import { removeAuthTokens, saveTokensFromApi } from "../util/util";
import { getPayloadFromToken, verifyJWT } from "@/lib/jwt";

// Definisikan interface untuk respons token API
interface TokensResponse {
	access: {
		token: string;
		expires: string;
	};
	refresh: {
		token: string;
		expires: string;
	};
}

export const RegisterTokenForm = () => {
	const form = useForm<z.infer<typeof registerTokenSchema>>({
		resolver: zodResolver(registerTokenSchema),
		defaultValues: {
			token: "",
		},
	});
	const router = useAppRouter();

	// Fungsi untuk mendapatkan token dari /auth/refresh-tokens
	const fetchTokensWithRefresh = async () => {
		try {
			// Dapatkan refresh token yang mungkin ada dari cookies
			const refreshToken = Cookies.get('refresh_token');
			
			if (!refreshToken) {
				console.error("No refresh token available");
				return null;
			}
			
			// Hit API refresh token
			const response = await useRefreshAPI({ refresh_token: refreshToken });
		
			
			// @ts-ignore - ignoring type check
			if (response.success && response.data && response.data.tokens) {
				// @ts-ignore - ignoring type check
				return response.data.tokens;
			} else {
				console.error("Failed to refresh tokens:", response);
				return null;
			}
		} catch (error) {
			console.error("Error refreshing tokens:", error);
			return null;
		}
	};

	// React Query mutation
	const tokenMutation = useMutation({
		mutationFn: useTokenAPI,
		onSuccess: async (data) => {
			if (!data.success) {
				throw new Error(
					(data.data as { message?: string })?.message || "Invalid token",
				);
			}
			
			
			// @ts-ignore - ignoring type check
			if (data.data && data.data.status === "success") {
				toast.success("Token produk berhasil divalidasi!");
				
				// @ts-ignore - ignoring type check
				const hasTokens = data.data.tokens !== undefined;
				
				// Token produk valid, sekarang hit API refresh token untuk mendapatkan token auth
				if (!hasTokens) {
					// Jika tidak ada tokens di response, coba get dari refresh API
					try {
						// Tunggu sebentar untuk memastikan token produk sudah diproses di server
						setTimeout(async () => {
							const authTokens = await fetchTokensWithRefresh();
							
							if (authTokens) {
								// Hapus token lama (jika ada)
								removeAuthTokens();
								// Simpan token baru
								saveTokensFromApi(authTokens);
								
								// Redirect ke home page
								router.push("/");
							} else {
								console.error("Failed to get tokens from refresh API");
								toast.error("Gagal mendapatkan token. Silakan coba lagi.");
							}
						}, 1000);
					} catch (error) {
						console.error("Error getting tokens:", error);
						toast.error("Terjadi kesalahan. Silakan coba lagi.");
					}
				} else {
					// Jika sudah ada tokens di response, gunakan saja
					removeAuthTokens();
					// @ts-ignore - ignoring type check
					saveTokensFromApi(data.data.tokens);
					
					// Redirect ke home page
					setTimeout(() => {
						router.push("/");
					}, 1000);
				}
			} else {
				toast.error("Validasi token gagal. Silakan coba lagi.");
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
