import axios from "axios";
import { getAuthToken } from "@/services/auth/api/token";

const axiosInstance = axios.create({
	baseURL: process.env.BASE_API_URL,
	// timeout: 1000,
	headers: {
		"Content-Type": "application/json",
	},
});

async function apiClient<T, R>(endpoint: string, method: string, data?: T, includeAuth = true) {
	try {
	  // Prepare headers
	  const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	  };

	  // Include authorization token if needed
	  if (includeAuth) {
		const token = await getAuthToken();
		if (token) {
		  headers.Authorization = `Bearer ${token}`;
		}
	  }
	  
	  const response = await fetch(`${process.env.BASE_API_URL}${endpoint}`, {
		method,
		headers,
		body: data ? JSON.stringify(data) : undefined,
	  });
	  
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
