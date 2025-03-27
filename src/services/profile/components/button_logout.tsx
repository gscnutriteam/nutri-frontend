"use client";
import { Button } from "@/components/ui/button";
import { useAppRouter } from "@/hooks/useAppRouter";
import useLogoutAPI from "@/services/auth/api/logout";
import { useMutation } from "@tanstack/react-query";
import { Cookie, Loader2, LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface ButtonLogoutProps {
    variant?: "default" | "danger" | "noShadow" | "neutral" | "reverse" | "neutralNoShadow";
    className?: string;
    iconOnly?: boolean;
}

export const ButtonLogout = ({ 
    variant = "danger", 
    className = "w-full mt-2", 
    iconOnly = false 
}: ButtonLogoutProps) => {
    const router = useAppRouter();
    const mutation = useMutation({
        mutationFn: useLogoutAPI,
        onSuccess: (response) => {

            if (!response.success) {
                throw new Error(
                    (response.data as { message?: string })?.message || "Logout failed"
                );
            }

            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            router.push("/login");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Logout failed. Please try again.");
        },
    });

    const handleOnClick = () => {
        const refresh_token = Cookies.get("refresh_token");
        mutation.mutate({ refresh_token: refresh_token ?? "" });
    }
	return (
		<Button onClick={handleOnClick} variant={variant} disabled={mutation.isPending || mutation.isSuccess} className={className}>
			{mutation.isPending ? <Loader2 className="animate-spin" /> : <LogOutIcon className={iconOnly ? "" : "mr-2"} />}
            {!iconOnly && "Logout"}
		</Button>
	);
};
