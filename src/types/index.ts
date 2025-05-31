import { Request } from 'express';

// User interface
export interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

// User without sensitive data (for responses)
export interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
}

// Registration request body
export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

// Login request body
export interface LoginRequest {
  email: string;
  password: string;
}

// JWT payload
export interface JwtPayload {
  userId: number;
  email: string;
}

// Extended Request interface for authenticated routes
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// API Response structure
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}