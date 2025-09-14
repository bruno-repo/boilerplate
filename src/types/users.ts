export interface User {
  id: string;
  email: string;
  username: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileRequest {
  username?: string;
}