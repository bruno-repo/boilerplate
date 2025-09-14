import { ReactNode, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { login, logout, refreshTokens, register } from "@/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { User } from "@/types/users";

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: (sessionId?: string) => Promise<void>;
  refreshTokens: () => Promise<void>;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isInitialized,
    setTokens,
    logout: logoutStore,
    initialize,
    setUser,
  } = useAuthStore();

  // Initialize auth state
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // Check if token needs refreshing on app start
  useEffect(() => {
    const checkAuth = async () => {
      if (refreshToken && !accessToken) {
        try {
          const result = await refreshTokens(refreshToken);
          setTokens({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            user: result.user,
          });
        } catch {
          logoutStore();
        }
      }
    };

    checkAuth();
  }, [accessToken, refreshToken, setTokens, logoutStore]);

  const handleLogin = async (data: LoginRequest) => {
    try {
      const result = await login(data);
      setTokens({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      });
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch {
      // Error is handled by the API client
    }
  };

  const handleRegister = async (data: RegisterRequest) => {
    try {
      const result = await register(data);
      setTokens({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      });
      toast.success("Registered successfully");
      navigate("/dashboard");
    } catch {
      // Error is handled by the API client
    }
  };

  const handleLogout = async (sessionId?: string) => {
    try {
      await logout(sessionId);
      toast.success("Logged out successfully");
    } catch {
      // Error is handled by the API client
    } finally {
      // Force logout even if API call fails
      logoutStore();
      navigate("/login");
    }
  };

  const handleRefreshTokens = async () => {
    if (!refreshToken) return;

    try {
      const result = await refreshTokens(refreshToken);
      setTokens({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      });
    } catch {
      logoutStore();
      navigate("/login");
    }
  };

  const value = {
    user,
    isAuthenticated,
    isInitialized,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshTokens: handleRefreshTokens,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
