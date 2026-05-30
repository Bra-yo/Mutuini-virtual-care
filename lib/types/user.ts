/**
 * User Types
 * Authentication, authorization, and user-related interfaces
 */

import { UserRole, AuditTrail } from "./common";

export interface User extends AuditTrail {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  department?: string;
  licenseNumber?: string; // For doctors and CHPs
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthSession extends User {
  token: AuthToken;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  department?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
