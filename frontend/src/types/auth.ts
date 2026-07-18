export type Role = "super_admin" | "cfo" | "coo" | "finance_controller" | "account_manager" | "hr" | "operations" | "viewer";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar?: string;
  organizationId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  domain: string;
  currency: string;
  fiscalYearStart: number;
  createdAt: string;
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
  displayName: string;
  permissions: Permission[];
  isSystem: boolean;
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
  firstName: string;
  lastName: string;
  organizationName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
