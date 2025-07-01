import CompleteProfile from "@/services/profile/pages/complete_profile";
import { Metadata } from "next";

// Define metadata directly in this server component
export const metadata: Metadata = {
  title: "Complete Profile | NutriCare",
  description: "Complete your profile on NutriCare app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Complete Profile | NutriCare",
    description: "Complete your profile on NutriCare app",
  },
};

export default function CompleteProfilePage() {
  return <CompleteProfile />;
} 