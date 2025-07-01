"use server";
import { apiClient } from "@/lib/api_instance";
import { Gender, PhsyicalActivity } from "@/services/auth/store/register_store";

export interface PatchUserRequest {
    id: string;
    name?: string;
    email?: string;
    birth_date?: string;
    gender?: Gender;
    height?: number;
    weight?: number;
    activity_level?: PhsyicalActivity;
    medical_history?: string;
    profile_picture?: string;
}

export interface PatchUserResponse {
    message: string;
    status: string;
    user: {
        activity_level: PhsyicalActivity;
        birth_date: string;
        email: string;
        gender: Gender;
        height: number;
        id: string;
        medical_history: string; 
        name: string;
        role: string;
        verified_email: boolean;
        weight: number;
    }; 
}

const usePatchUser = async (data: PatchUserRequest) => {
    try {
        const jsonToFormData = (data: PatchUserRequest) => {
            const formData = new FormData();
            if (data.name) formData.append('name', data.name);
            if (data.email) formData.append('email', data.email);
            if (data.birth_date) formData.append('birth_date', data.birth_date);
            if (data.gender) formData.append('gender', data.gender);
            if (data.height) formData.append('height', data.height.toString());
            if (data.weight) formData.append('weight', data.weight.toString());
            if (data.activity_level) formData.append('activity_level', data.activity_level);
            if (data.medical_history) formData.append('medical_history', data.medical_history);
            if (data.profile_picture) formData.append('profile_picture', data.profile_picture);
            return formData;
        }
        return await apiClient(`/users/${data.id}`, 'PATCH', jsonToFormData(data), true, true);
    } catch (error) {
        console.error('Edit user API error:', error);
        throw error;
    }
}

export default usePatchUser;
