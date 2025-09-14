import apiClient from '@/api/apiClient';
import { Session } from '@/types/sessions';

// Get user sessions
export const getUserSessions = async (): Promise<Session[]> => {
  const response = await apiClient.get<Session[]>('/sessions');
  return response.data;
};

// Deactivate a session
export const deactivateSession = async (sessionId: string): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(`/sessions/${sessionId}`);
  return response.data;
};

// Deactivate all sessions
export const deactivateAllSessions = async (): Promise<{ message: string; count: number }> => {
  const response = await apiClient.delete<{ message: string; count: number }>('/sessions');
  return response.data;
};