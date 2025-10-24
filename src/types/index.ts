// ===========================
// TYPES PRINCIPALES
// ===========================

// Usuario
export interface User {
  _id: string;
  email: string;
  name: string;
  role: "admin" | "visitor";
  avatar?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

// Auth Response
export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// API Response generics
export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Error Response
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

// Generic filter
export interface BaseFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// User roles enum
export enum UserRole {
  ADMIN = "admin",
  VISITOR = "visitor",
}
