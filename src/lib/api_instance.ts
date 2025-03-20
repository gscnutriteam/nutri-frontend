import axios from "axios";
import { getAuthToken } from "@/services/auth/api/token";

const axiosInstance = axios.create({
	baseURL: process.env.BASE_API_URL,
	// timeout: 1000,
	headers: {
		"Content-Type": "application/json",
	},
});

async function apiClient<T, R>(endpoint: string, method: string, data?: T, includeAuth = true, isFormData = false) {
	try {
	  // Prepare headers
	  const headers: Record<string, string> = {
	  };

	  if (!isFormData) {
		headers['Content-Type'] = 'application/json';
	  }

	  // Include authorization token if needed
	  if (includeAuth) {
		const token = await getAuthToken();
		if (token) {
		  headers.Authorization = `Bearer ${token}`;
		}
	  }

	   // Fix: Properly type the body parameter
	   let body: BodyInit | null | undefined;
	   if (data !== undefined) {
		 body = isFormData ? (data as unknown as FormData) : JSON.stringify(data);
	   }

	  const response = await fetch(`${process.env.BASE_API_URL}${endpoint}`, {
		method,
		headers,
		body
	  });

	  console.log("response: ", response.body);
	  
	  console.info(`API Call to ${endpoint}`, {
		status: response.status,
		statusText: response.statusText
	  });

	  const responseData = await response.json().catch(() => ({}));

	  return {
		success: response.ok,
		status: response.status,
		statusText: response.statusText,
		data: responseData as R
	  };
	} catch (error) {
		console.log(error)
	  console.error(`API Call to ${endpoint}`, {
		errorMessage: error instanceof Error ? error.message : String(error)
	  });
	  return {
		success: false,
		status: 500,
		statusText: 'Internal Error',
		error: error instanceof Error ? error.message : String(error)
	  };
	}
  }

export { axiosInstance, apiClient };
