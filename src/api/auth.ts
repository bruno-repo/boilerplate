import apiClient from '@/api/apiClient';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  VerifyEmailRequest,
  ChangePasswordRequest,
  RefreshTokenRequest
} from '@/types/auth';

// Register a new user
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};

// Login a user
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  return response.data;
};

// Logout a user
export const logout = async (sessionId?: string): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/auth/logout', 
    sessionId ? { sessionId } : undefined
  );
  return response.data;
};

// Refresh tokens
export const refreshTokens = async (refreshToken: string): Promise<AuthResponse> => {
  const data: RefreshTokenRequest = { refreshToken };
  const response = await apiClient.post<AuthResponse>('/auth/refresh', data);
  return response.data;
};

// Verify email
export const verifyEmail = async (data: VerifyEmailRequest): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/auth/verify-email', data);
  return response.data;
};

// Change password
export const changePassword = async (data: ChangePasswordRequest): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/auth/change-password', data);
  return response.data;
};