import apiClient from '@/api/apiClient';
import { User, UpdateUserProfileRequest } from '@/types/users';

// Get user profile
export const getUserProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>('/users/profile');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (data: UpdateUserProfileRequest): Promise<User> => {
  const response = await apiClient.patch<User>('/users/profile', data);
  return response.data;
};