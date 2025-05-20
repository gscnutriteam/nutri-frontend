"use client";
import { useAppRouter } from "@/hooks/useAppRouter";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const ButtonEditProfile = () => {
    const router = useAppRouter();
    
    return (
        <Button
            variant="default"
            className="absolute top-4 right-4 z-10 bg-secondary text-black font-semibold shadow-neobrutalism-sm flex items-center gap-2"
            onClick={() => router.push("profile/edit")}
        >
            <User size={18} />
            Edit Profile
        </Button>
    );
};

export { ButtonEditProfile };
