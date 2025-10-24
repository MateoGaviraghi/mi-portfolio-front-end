// ===========================
// TYPES PRINCIPALES
// ===========================

// Usuario (compatible con backend)
export interface User {
  id: string; // El backend devuelve 'id', no '_id'
  _id?: string; // Mantener para compatibilidad con otras partes
  email: string;
  name: string;
  role: "admin" | "visitor";
  avatar?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  refreshToken?: string;
  createdAt?: string;
  updatedAt?: string;
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

// Auth Response (estructura del backend)
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "admin" | "visitor";
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
