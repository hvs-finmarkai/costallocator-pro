import {
  LayoutDashboard,
  TrendingUp,
  Calculator,
  Users,
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
    title: "Forecast & AI",
    href: "/forecast",
    icon: Brain,
    children: [
      { title: "Forecast", href: "/forecast", icon: Brain },
      { title: "AI Insights", href: "/forecast/ai", icon: Brain },
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
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Settings,
    children: [
      { title: "Users", href: "/admin/users", icon: Users },
      { title: "Roles", href: "/admin/roles", icon: Settings },
      { title: "Audit Logs", href: "/admin/audit", icon: FileText },
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];
