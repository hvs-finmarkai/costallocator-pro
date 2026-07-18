export const APP_CONFIG = {
  name: "CostAllocator Pro",
  brand: "Finmark.ai",
  partner: "Denave",
  description: "Enterprise Financial Intelligence Platform",
  version: "1.0.0",
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  version: "v1",
  timeout: 30000,
} as const;

export const AUTH_CONFIG = {
  tokenKey: "access_token",
  refreshTokenKey: "refresh_token",
  tokenExpiry: 60 * 60 * 1000,
} as const;

export const ROUTES = {
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
  },
  dashboard: {
    executive: "/executive",
    company: "/company",
    businessUnit: "/business-unit",
    geography: "/geography",
    clients: "/clients",
    projects: "/projects",
  },
  pnl: {
    overview: "/pnl",
    revenue: "/pnl/revenue",
    costs: "/pnl/costs",
    margins: "/pnl/margins",
  },
  allocation: {
    overview: "/allocation",
    costCenters: "/allocation/cost-centers",
    rules: "/allocation/rules",
    simulation: "/allocation/simulation",
    pricing: "/allocation/pricing",
  },
  forecast: {
    overview: "/forecast",
    ai: "/forecast/ai",
  },
  reports: {
    overview: "/reports",
    generate: "/reports/generate",
    scheduled: "/reports/scheduled",
  },
  admin: {
    overview: "/admin",
    users: "/admin/users",
    roles: "/admin/roles",
    settings: "/admin/settings",
    audit: "/admin/audit",
  },
  alerts: "/alerts",
} as const;
