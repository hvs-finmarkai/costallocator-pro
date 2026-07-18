"use client";

import {
  IndianRupee,
  TrendingUp,
  PiggyBank,
  BarChart3,
  FolderKanban,
  Brain,
  Sparkles,
} from "lucide-react";
import { KPICard, TopAccountsCard, BottomAccountsCard, AlertsSection, AIInsightsSection } from "@/components/shared";
import {
  RevenueTrendChart,
  MarginTrendChart,
  MarginWaterfallChart,
  RevenueByGeographyChart,
  RevenueByBUChart,
} from "@/components/charts";

const kpis = [
  {
    title: "Total Revenue",
    value: "₹124.08 Cr",
    change: 12.4,
    changeLabel: "vs Apr 2025",
    icon: IndianRupee,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
  },
  {
    title: "Net Margin",
    value: "17.8%",
    change: 1.6,
    changeLabel: "pp vs Apr 2025",
    icon: TrendingUp,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    title: "Gross Profit",
    value: "₹38.32 Cr",
    change: 9.8,
    changeLabel: "vs Apr 2025",
    icon: PiggyBank,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "Forecast (Next 3M)",
    value: "18.6%",
    change: 2.1,
    changeLabel: "pp vs Current",
    icon: BarChart3,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    title: "Active Projects",
    value: "186",
    change: 8,
    changeLabel: "vs Apr 2025",
    icon: FolderKanban,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
  },
  {
    title: "AI Confidence",
    value: "97%",
    change: 0,
    changeLabel: "High Confidence",
    icon: Brain,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
  },
];

export default function ExecutiveDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, CFO! Here&apos;s your company performance overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RevenueTrendChart />
        <MarginTrendChart />
        <MarginWaterfallChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <RevenueByGeographyChart />
        <RevenueByBUChart />
        <TopAccountsCard />
        <BottomAccountsCard />
      </div>

      <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
          <Sparkles className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-indigo-900">AI Insights</p>
          <p className="text-xs text-indigo-600">23 new insights available</p>
        </div>
        <button className="text-xs font-medium text-indigo-700 bg-white border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50">
          View Insights
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AlertsSection />
        <AIInsightsSection />
      </div>
    </div>
  );
}
