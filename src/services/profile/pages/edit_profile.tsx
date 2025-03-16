import React from "react";
import { Card } from "@/components/ui/card";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { Progress } from "@/components/ui/progress";
import { LogOutIcon, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Head from "next/head";
import type { Metadata } from "next";
import { Gender, PhsyicalActivity } from "@/services/auth/store/register_store";
import { Button } from "@/components/ui/button";
import { ButtonLogout } from "../components/button_logout";
import { Toaster } from "sonner";
import type { ProfileProps } from "../type/types";
import { HeaderFeature } from "@/components/ui/header_feature";
import EditProfileSection from "../components/edit_profile_section";

export const metadataEditProfile: Metadata = {
	title: "Edit Profile | NutriBox",
	description: "Edit Profile page nutribox app",
	icons: "/assets/img/logo.png",
	openGraph: {
		title: "Edit Profile | NutriBox",
		description: "Edit Profile nutribox app",
	},
};

export default function EditProfile(user: ProfileProps) {
	return (
		<>
			<Head>
				<title>Profile | NutriBox</title>
			</Head>
			<AppMobileLayout withBottomBar={false}>
				<Toaster position="top-center" richColors />
                <div className="flex w-full flex-col max-h-[100vh] overflow-auto">
					<HeaderFeature
						title="Edit Profile"
						variant={"primary"}
						className="text-center w-full py-3"
					/>
					<EditProfileSection {...user} />
                </div>
                
			</AppMobileLayout>
		</>
	);
}
