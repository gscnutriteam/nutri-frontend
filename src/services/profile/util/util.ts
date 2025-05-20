import type { JWTPayload } from "@/lib/jwt";
import type { ProfileProps } from "../type/types";
import { getBMI } from "@/lib/utils";

export const JWTUserTOProfileProps = (user: JWTPayload): ProfileProps => {
    const userData = user.userData;
    return {
        id: userData.id,
        name: userData.name,
        age: birthdayToAge(userData.birth_date),
        birth_date: userData.birth_date,
        email: userData.email,
        gender: userData.gender,
        height: userData.height,
        weight: userData.weight,
        medical_history: userData.medical_history,
        physical_activity: userData.activity_level,
        profile_picture: userData.profile_picture ?? '/assets/img/no_pp.png',
        subscriptionFeatures: userData.subscriptionFeatures ?? {},
        progress: 0,
        bmi: getBMI(userData.height, userData.weight),
        isProductTokenVerified: userData.isProductTokenVerified,
        verified_email: userData.verified_email,
    }
}

export const birthdayToAge = (birthday: Date): number => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();

    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


export const trimString = (str: string, length = 20) => {
    return str.length > length ? `${str.substring(0, length)}...` : str;
}