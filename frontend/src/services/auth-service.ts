import { httpClient } from "./http-client";
import type { LoginRequest, RegisterRequest, AuthResponse, User } from "@/types";

export const authService = {
  login: (data: LoginRequest) =>
    httpClient.post<AuthResponse>("/auth/login", data),

  register: (data: RegisterRequest) =>
    httpClient.post<AuthResponse>("/auth/register", data),

  logout: () => httpClient.post("/auth/logout"),

  me: () => httpClient.get<User>("/auth/me"),

  forgotPassword: (email: string) =>
    httpClient.post("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    httpClient.post("/auth/reset-password", { token, password }),

  refreshToken: (refreshToken: string) =>
    httpClient.post<AuthResponse>("/auth/refresh", { refreshToken }),
};
