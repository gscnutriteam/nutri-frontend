import CompleteProfile from "@/services/profile/pages/complete_profile";
import { Metadata } from "next";

// Define metadata directly in this server component
export const metadata: Metadata = {
  title: "Complete Profile | NutriPlate",
  description: "Complete your profile on NutriPlate app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Complete Profile | NutriPlate",
    description: "Complete your profile on NutriPlate app",
  },
};

export default function CompleteProfilePage() {
  return <CompleteProfile />;
} 