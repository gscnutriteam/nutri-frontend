"use server"

import { getPayloadFromToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { JWTUserTOProfileProps } from "../util/util";

export const getUserData = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token');
    const user = getPayloadFromToken(accessToken?.value || '');
    return user;
}


export const getDetailUser = async () => {
    const user = await getUserData();
    if (!user) return null;
    return JWTUserTOProfileProps(user);
}