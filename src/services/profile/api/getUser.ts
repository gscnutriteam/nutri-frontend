"use server"

import { getPayloadFromToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { JWTUserTOProfileProps } from "../util/util";
import { apiClient } from "@/lib/api_instance";

export const getUserData = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token');
    const user = getPayloadFromToken(accessToken?.value || '');
    return user;
}

// {
//     "message": "Get user successfully",
//     "status": "success",
//     "user": {
//       "activity_level": "Medium",
//       "birth_date": "2000-01-01T00:00:00Z",
//       "email": "fake@example.com",
//       "gender": "Male",
//       "height": 175.5,
//       "id": "e088d183-9eea-4a11-8d5d-74d7ec91bdf5",
//       "medical_history": "No known allergies",
//       "name": "fake name",
//       "role": "user",
//       "verified_email": false,
//       "weight": 65.2
//     }
//   }

export interface User {
    activity_level: string;
    birth_date: string;
    email: string;
    gender: string;
    height: number; 
    id: string;
    medical_history: string;
    name: string;
    role: string;
    verified_email: boolean;
    weight: number;
}

interface UserResponse {
    message: string;
    status: string;
    user?: User;
}

export const getDetailUser = async () => {
    const user = await getUserData();
    if (!user) return null;
    return JWTUserTOProfileProps(user);
}

export const getUserFromId = async (id: string) => {
    const user = await apiClient<undefined, UserResponse>(`/users/${id}`, 'GET');
    return user;
}

export const getCurrentUserApi = async () => {
    try {
        const user = await getUserData();
        if (!user) return null;
        return (await getUserFromId(user.userData.id)).data?.user;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}