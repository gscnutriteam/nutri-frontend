"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import AppMobileLayout from "@/layout/app_mobile_layout";
import Head from "next/head";
import { Gender, PhsyicalActivity } from "@/services/auth/store/register_store";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { HeaderFeature } from "@/components/ui/header_feature";
import EditProfileSection from "../components/edit_profile_section";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getUserData } from "../api/getUser";
import usePatchUser from "../api/editUser";
import { useAppRouter } from "@/hooks/useAppRouter";
import type { ProfileProps } from "../type/types";
import Cookies from "js-cookie";
import useRefreshAPI from "@/services/auth/api/refresh";
import { LoginResponse } from "@/services/auth/api/login";
import { saveAuthTokens } from "@/services/auth/util/util";
import ProfileSkeleton from "../components/ProfileSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompleteProfile() {
	const router = useAppRouter();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<ProfileProps | null>(null);

	// Fetch user data on component mount
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await getUserData();
				if (data && data.userData) {
					setUser({
						id: data.userData.id,
						name: data.userData.name,
						email: data.userData.email,
						birth_date: data.userData.birth_date ? new Date(data.userData.birth_date) : new Date(),
						gender: data.userData.gender || Gender.male,
						physical_activity: data.userData.activity_level || PhsyicalActivity.moderate,
						medical_history: data.userData.medical_history || "",
						profile_picture: data.userData.profile_picture || "/assets/img/no_pp.png",
						progress: 0, // Default progress since it's a new user profile
					});
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	return (
		<>
			<Head>
				<title>Complete Profile | NutriCare</title>
			</Head>
			<AppMobileLayout withBottomBar={false}>
				<Toaster position="top-center" richColors />
				<div className="flex w-full flex-col max-h-[100vh] overflow-auto">
					<HeaderFeature
						title="Complete Your Profile"
						variant={"primary"}
						className="text-center w-full py-3"
					/>
					
					{loading && (
						<>
							<div className="px-4 py-6">
								<div className="space-y-3">
									<Skeleton className="w-36 h-5" />
									<Skeleton className="w-4/5 h-4" />
								</div>
							</div>
							<ProfileSkeleton />
						</>
					)}
					
					{!loading && !user && (
						<div className="px-4 py-6 text-center">
							<h2 className="text-lg font-semibold mb-3 text-red-500">Unable to load profile</h2>
							<p className="text-sm text-gray-600 mb-6">
								There was a problem loading your profile data. Please try again later.
							</p>
							<Button onClick={() => router.push('/app')} variant="neutral">
								Return to Home
							</Button>
						</div>
					)}
					
					{!loading && user && (
						<>
							<div className="px-4 py-6">
								<h2 className="text-lg font-semibold mb-3">Welcome to NutriCare!</h2>
								<p className="text-sm text-gray-600 mb-6">
									Please complete your profile to get personalized nutrition recommendations.
								</p>
							</div>
							<EditProfileSection {...user} />
						</>
					)}
				</div>
			</AppMobileLayout>
		</>
	);
} 