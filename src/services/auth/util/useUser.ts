"use client"
import { getPayloadFromToken } from '@/lib/jwt';
import { useRouter } from "next/navigation";
import { JWTUserTOProfileProps } from '@/services/profile/util/util';
import Cookies from 'js-cookie';

export const useUser = () => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (!accessToken || !refreshToken) {
        return null;
    }

    const user = getPayloadFromToken(accessToken);

    if (!user) {
        return null
    }

    return JWTUserTOProfileProps(user);
}

export const isUserPro = () => {
    try {
        // Safely check if we're on the client side before using useUser
        if (typeof window === 'undefined') {
            return false; // Default value for server-side rendering
        }
        
        const user = useUser();
        if (!user) return false;

        return Object.values(user.subscriptionFeatures ?? {}).some(Boolean);
    } catch (error) {
        return false; // Fallback in case of any errors
    }
}