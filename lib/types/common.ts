/**
 * Common Types
 * Shared interfaces used across the application
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export enum UserRole {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  CHP = "CHP",
  NURSE = "NURSE",
  RECEPTIONIST = "RECEPTIONIST",
  PATIENT = "PATIENT",
  SYSTEM = "SYSTEM",
}

export enum StatusCode {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ARCHIVED = "ARCHIVED",
}

export interface Timestamp {
  createdAt: string;
  updatedAt: string;
}

export interface AuditTrail extends Timestamp {
  createdBy: string;
  updatedBy?: string;
}
