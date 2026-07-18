export type Role = "super_admin" | "cfo" | "coo" | "finance_controller" | "account_manager" | "hr" | "operations" | "viewer";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  avatar?: string;
  organization_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  domain: string;
  currency: string;
  fiscal_year_start: number;
  created_at: string;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: "create" | "read" | "update" | "delete" | "export" | "approve";
}

export interface RoleConfig {
  id: string;
  name: string;
  display_name: string;
  permissions: Permission[];
  is_system: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  organization_name: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}
