import { type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  children?: NavItem[];
}

export interface KPICard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  forecast?: number;
}

export interface DonutSegment {
  name: string;
  value: number;
  amount: number;
  color: string;
}

export interface AlertItem {
  id: string;
  type: "margin_drop" | "cost_overrun" | "utilization_low" | "revenue_gap";
  title: string;
  description: string;
  timestamp: string;
  severity: "high" | "medium" | "low";
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "pricing" | "resource" | "cost_leakage" | "forecast" | "anomaly";
}

export interface AccountRanking {
  rank: number;
  name: string;
  margin: number;
}

export interface DateFilter {
  period: "mtd" | "qtd" | "ytd" | "custom";
  compareWith?: string;
  startDate?: string;
  endDate?: string;
}
