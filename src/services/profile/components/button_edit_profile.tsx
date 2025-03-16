"use client";
import { useAppRouter } from "@/hooks/useAppRouter";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const ButtonEditProfile = () => {
    const router = useAppRouter();
    const handleOnClick = () => {
        router.push("/profile/edit");
    }
	return (
		<button
			className="absolute top-5 z-10 right-5 bg-yellow-400 border-white border-2 rounded-full p-2"
			type="button"
            onClick={handleOnClick}
		>
			<svg
				className="w-4 h-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>Edit</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
				/>
			</svg>
		</button>
	);
};

export { ButtonEditProfile };
