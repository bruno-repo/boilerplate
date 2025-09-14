import { http, HttpResponse } from 'msw';

import { Session } from '@/types/sessions';
import { User } from '@/types/users';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'demo@example.com',
  username: 'demo_user',
  isEmailVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock session data
const mockSession: Session = {
  id: '1',
  ipAddress: '127.0.0.1',
  userAgent: navigator.userAgent,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const handlers = [
  // Auth endpoints
  http.post(`${baseUrl}/auth/register`, async ({ request }) => {
    const data = await request.json() as Partial<User>;
    return HttpResponse.json({
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
      user: { ...mockUser, ...data },
    }, { status: 201 });
  }),

  http.post(`${baseUrl}/auth/login`, () => {
    return HttpResponse.json({
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
      user: mockUser,
    });
  }),

  http.post(`${baseUrl}/auth/logout`, () => {
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),

  http.post(`${baseUrl}/auth/refresh`, () => {
    return HttpResponse.json({
      accessToken: 'new_mock_access_token',
      refreshToken: 'new_mock_refresh_token',
      user: mockUser,
    });
  }),

  http.post(`${baseUrl}/auth/verify-email`, () => {
    return HttpResponse.json({ message: 'Email verified successfully' });
  }),

  http.post(`${baseUrl}/auth/change-password`, () => {
    return HttpResponse.json({ message: 'Password changed successfully' });
  }),

  // Sessions endpoints
  http.get(`${baseUrl}/sessions`, () => {
    return HttpResponse.json([mockSession]);
  }),

  http.delete(`${baseUrl}/sessions/:sessionId`, () => {
    return HttpResponse.json({ message: 'Session deactivated successfully' });
  }),

  http.delete(`${baseUrl}/sessions`, () => {
    return HttpResponse.json({
      message: 'All sessions deactivated successfully',
      count: 1,
    });
  }),

  // Users endpoints
  http.get(`${baseUrl}/users/profile`, () => {
    return HttpResponse.json(mockUser);
  }),

  http.patch(`${baseUrl}/users/profile`, async ({ request }) => {
    const data = await request.json() as Partial<User>;
    return HttpResponse.json({ ...mockUser, ...data });
  }),
];