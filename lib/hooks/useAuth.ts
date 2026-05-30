/**
 * useAuth Hook
 * Manages authentication state and operations
 */

import { useCallback, useState } from "react";
import { AuthSession, User } from "@/lib/types";
import { authService } from "@/lib/services";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const session = await authService.login({ email, password });
      setUser(session);
      // TODO: Store token in localStorage/sessionStorage
      return session;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      // TODO: Clear stored token
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const session = await authService.register(data);
        setUser(session);
        return session;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Registration failed";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      setLoading(true);
      setError(null);
      try {
        await authService.changePassword(currentPassword, newPassword);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Password change failed";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    changePassword,
    isAuthenticated: !!user,
  };
};
