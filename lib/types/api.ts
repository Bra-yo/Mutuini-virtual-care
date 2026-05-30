/**
 * API Types
 * Request/response types for API operations
 */
import type { ApiResponse, ApiErrorResponse } from "./common";

export interface ApiRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: unknown;
  timeout?: number;
}

export interface ApiClientOptions {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  interceptors?: {
    request?: (config: ApiRequestConfig) => ApiRequestConfig;
    response?: (response: ApiResponse) => ApiResponse;
    error?: (error: ApiErrorResponse) => void;
  };
}