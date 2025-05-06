"use client";
import { apiClient } from "@/lib/api_instance";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useLoginGoogle } from "./login";
import { saveAuthTokens } from "../util/util";
import { useRouter } from "next/navigation";
import type { LoginResponse } from "./login";

export async function signInWithGoogle(isFromRegister = false) {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential?.accessToken;
		// The signed-in user info.
		const user = result.user;
		const idToken = await user.getIdToken();
		const response = await useLoginGoogle(idToken??'');
		
		if (response.success) {
			// Store auth tokens in cookies
			const responseData = response.data as LoginResponse;
			
			// Ensure we've received tokens in the expected format
			if (responseData && responseData.tokens) {
				saveAuthTokens(responseData.tokens);
				
				// Check if user profile is complete
				const userData = responseData.user;
				
				// Cast the userData to 'any' to access all potential fields
				const userDataAny = userData as any;
				
				// First check if product token is verified
				const isProductTokenVerified = userDataAny.isProductTokenVerified === true;
				
				if (!isProductTokenVerified) {
					// If product token is not verified, redirect to token input page
					window.location.href = '/app/register/token';
					return response;
				}
				
				// Check if profile data is incomplete (height and weight)
				const isProfileIncomplete = !userDataAny.height || !userDataAny.weight;
				
				// Redirect based on profile completion status
				if (isFromRegister || isProfileIncomplete) {
					// If coming from registration or profile is incomplete, redirect to complete profile
					window.location.href = '/app/profile/complete';
				} else {
					// Profile is complete, redirect to home
					window.location.href = '/app';
				}
			} else {
				console.error("Invalid token response format", responseData);
				throw new Error("Invalid token response format");
			}
		} else {
			console.error("Google login failed", response);
			throw new Error("Google login failed");
		}
		
		return response;
	} catch (error) {
		console.error("Error signing in with Google", error);
		// Display error to user
		alert("Failed to sign in with Google. Please try again.");
	}
}

export async function signOut() {
	try {
		return auth.signOut();
	} catch (error) {
		console.error("Error signing out with Google", error);
	}
}
