import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

import { refreshTokens } from '@/api/auth';
import { getAuthStore } from '@/stores/authStore';

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = getAuthStore();
    
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // If the error is 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, logout , setTokens} = getAuthStore();
      try {
        if (!refreshToken) {
          // No refresh token available, logout
          logout();
          return Promise.reject(error);
        }
        
        // Try to refresh the token
        const result = await refreshTokens(refreshToken);
        
        if (result) {
          // Update auth store with new tokens
          setTokens({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            user: result.user,
          });
          
          // Retry the original request with the new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
          }
          
          return apiClient(originalRequest);
        }
      } catch {
        // If refresh token fails, logout
        logout();
        toast.error('Your session has expired. Please log in again.');
      }
    }
    
    // Show error toast for certain statuses
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { message?: string };
      
      if (status === 400) {
        toast.error(data.message || 'Bad request');
      } else if (status === 403) {
        toast.error(data.message || 'You do not have permission to perform this action');
      } else if (status === 404) {
        toast.error(data.message || 'Resource not found');
      } else if (status === 409) {
        toast.error(data.message || 'Conflict with current state');
      } else if (status === 500) {
        toast.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;