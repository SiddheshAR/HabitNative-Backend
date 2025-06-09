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

export interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: number;
  email: string;
}

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

export interface Habit {
  id:number,
  user_id:number,
  title:string,
  description?:string,
  streak_count:number,
  last_completed_date:string,
  frequency:'daily' | 'monthly' | 'weekly',
  is_active:boolean,
  created_at:string,
  updated_at:string
}

export interface HabitResponse {
  id: number;
  title: string;
  description?: string;
  streak_count: number;
  last_completed_date?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HabitCreatePayload {
  title:string,
  description?:string,
  frequency:string,
}
export interface HabitCreateResponse {
  id:number,
  title:string,
  description?:string,
  frequency:string,
}
export interface UpdateHabitPayload{
  title?:string,
  description?:string,
  frequency?:string
  is_active?:boolean
}