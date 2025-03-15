"use client";
import { apiClient } from "@/lib/api_instance";
import { auth } from "@/lib/firebase";
import { logger } from "@/lib/logger";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useLoginGoogle } from "./login";

export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log("Google sign in token", token);
        // The signed-in user info.
        const user = result.user;
        console.log("Google sign in user", user);
        const idToken = await user.getIdToken();
        const response = await useLoginGoogle(idToken??'');
        console.log("Google sign in response", response);
        return response;
	} catch (error) {
		console.error("Error signing in with Google", error);
	}
}

export async function signOut() {
	try {
		return auth.signOut();
	} catch (error) {
		console.error("Error signing out with Google", error);
	}
}
