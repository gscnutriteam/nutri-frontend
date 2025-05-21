import { Gender, PhsyicalActivity } from "@/services/auth/store/register_store";
import { getUserData } from "@/services/profile/api/getUser";
import Profile from "@/services/profile/pages/profile_info";
import type { ProfileProps } from "@/services/profile/type/types";
import { JWTUserTOProfileProps } from "@/services/profile/util/util";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Metadata } from "next";
import RetryButton from "@/components/RetryButton";

// Define metadata in the server component
export const metadata: Metadata = {
  title: 'Profile | NutriBox',
  description: 'Profile page nutribox app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Profile | NutriBox',
    description: 'Profile nutribox app',
  }
};

// Fallback profile in case user data can't be fetched
const fallbackProfile: ProfileProps = {
    id: '0',
    name: 'Guest User',
    age: 25,
    gender: Gender.male,
    height: 170,
    bmi: 20.5,
    medical_history: 'Tidak ada data',
    physical_activity: PhsyicalActivity.moderate,
    profile_picture: "/assets/img/default-avatar.png",
    progress: 0,
    email: "",
    birth_date: new Date(),
    weight: 60
}

export default async function Page() {
    try {
        const user = await getUserData();
        
        // If user data is successfully fetched, render profile with user data
        if (user) {
            return <Profile {...JWTUserTOProfileProps(user)} />;
        }
        
        // If no user data but not an error, show fallback profile
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">No User Data Found</h2>
                    <p className="text-gray-600">Please login or create an account to view your profile</p>
                </div>
                <a href="/auth/login" className="bg-primary border-2 border-black text-white px-6 py-2 rounded-base shadow-neobrutalism font-medium">
                    Login / Register
                </a>
            </div>
        );
    } catch (error) {
        // Handle error case with a friendly message
        console.error("Error fetching user data:", error);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600">We couldn't load your profile information</p>
                </div>
                <RetryButton />
            </div>
        );
    }
}