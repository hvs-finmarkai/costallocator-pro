import {
  LayoutDashboard,
  TrendingUp,
  Calculator,
  CreditCard,
  Users,
  BarChart3,
  Bell,
  FileText,
  Settings,
  Brain,
  Building2,
} from "lucide-react";
import type { NavItem } from "@/types";

export const navigationItems: NavItem[] = [
  {
    title: "Executive Dashboard",
    href: "/executive",
    icon: LayoutDashboard,
  },
  {
    title: "P&L Management",
    href: "/pnl",
    icon: TrendingUp,
    children: [
      { title: "Overview", href: "/pnl", icon: TrendingUp },
      { title: "Revenue", href: "/pnl/revenue", icon: TrendingUp },
      { title: "Costs", href: "/pnl/costs", icon: TrendingUp },
      { title: "Margins", href: "/pnl/margins", icon: TrendingUp },
    ],
  },
  {
    title: "CostAllocator Pro",
    href: "/allocation",
    icon: Calculator,
    children: [
      { title: "Cost Centers", href: "/allocation/cost-centers", icon: Calculator },
      { title: "Allocation Rules", href: "/allocation/rules", icon: Calculator },
      { title: "Simulation", href: "/allocation/simulation", icon: Calculator },
      { title: "Pricing Advisor", href: "/allocation/pricing", icon: Calculator },
    ],
  },
  {
    title: "Revenue Recognition",
    href: "/revenue",
    icon: CreditCard,
  },
  {
    title: "Workforce",
    href: "/workforce",
    icon: Users,
    children: [
      { title: "Overview", href: "/workforce", icon: Users },
      { title: "Utilization", href: "/workforce/utilization", icon: Users },
      { title: "Bench", href: "/workforce/bench", icon: Users },
    ],
  },
  {
    title: "Forecast & AI",
    href: "/forecast",
    icon: Brain,
    children: [
      { title: "Forecast", href: "/forecast", icon: Brain },
      { title: "AI Insights", href: "/forecast/ai", icon: Brain },
      { title: "Ask AI", href: "/forecast/ask", icon: Brain },
    ],
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: Bell,
    badge: 18,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
    children: [
      { title: "Generate", href: "/reports/generate", icon: FileText },
      { title: "Scheduled", href: "/reports/scheduled", icon: FileText },
      { title: "Templates", href: "/reports/templates", icon: FileText },
    ],
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Settings,
    children: [
      { title: "Users", href: "/admin/users", icon: Users },
      { title: "Roles", href: "/admin/roles", icon: Settings },
      { title: "Organization", href: "/admin/organization", icon: Building2 },
      { title: "Audit Logs", href: "/admin/audit", icon: FileText },
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];
