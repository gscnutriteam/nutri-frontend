import type { LoginResponse } from "../api/login";
import Cookies from 'js-cookie';
import type { RegisterRequest, RegisterResponse } from "../api/register";
import { Gender, type RegisterData } from "../store/register_store";

export interface AuthTokens {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

/**
 * Store authentication tokens in cookies
 */
export const saveAuthTokens = (tokens: LoginResponse['tokens']) => {
    const accessExpires = new Date(tokens.access.expires);
    const refreshExpires = new Date(tokens.refresh.expires);
    
    const cookieOptions = { 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const
    };
    
    Cookies.set('access_token', tokens.access.token, { 
      ...cookieOptions, 
      expires: accessExpires 
    });
    
    Cookies.set('refresh_token', tokens.refresh.token, { 
      ...cookieOptions, 
      expires: refreshExpires 
    });
  };
  
/**
 * Transforms the user registration data from our application's format
 * to the format expected by the API
 */
export const mapRegisterDataToRequest = (data: RegisterData): RegisterRequest => {
    return {
        activity_level: data.physicalActivity || '',
        birth_date: data.birth || new Date(),
        email: data.email,
        gender: data.gender || Gender.male,
        height: data.height || 0,
        medical_history: data.medicalHistory,
        name: data.name,
        password: data.password,
        weight: data.weight || 0,
    }
}

/**
 * Store authentication tokens in cookies
 */
export const saveAuthTokenRegister = (tokens: RegisterResponse['tokens']) => {
  const accessExpires = new Date(tokens.access.expires);
  const refreshExpires = new Date(tokens.refresh.expires);
  
  const cookieOptions = { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };
  
  Cookies.set('access_token', tokens.access.token, { 
    ...cookieOptions, 
    expires: accessExpires 
  });
  
  Cookies.set('refresh_token', tokens.refresh.token, { 
    ...cookieOptions, 
    expires: refreshExpires 
  });
};

/**
 * Helper function to format dates correctly for form inputs
 */
export const formatDateForInput = (date: number | undefined): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

