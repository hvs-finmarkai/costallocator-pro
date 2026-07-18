"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Zap, Users, Search } from "lucide-react";

const insights = [
  {
    id: "1",
    title: "Pricing Opportunity",
    description: "Increase pricing for 12 accounts to achieve 15%+ margin",
    impact: "high" as const,
    icon: Zap,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    id: "2",
    title: "Resource Optimization",
    description: "Move 18 resources from low-margin to high-margin projects",
    impact: "medium" as const,
    icon: Users,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    id: "3",
    title: "Cost Leakage Detected",
    description: "₹1.2 Cr in unallocated costs identified across 8 projects",
    impact: "high" as const,
    icon: Search,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
];

const impactStyles = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-green-50 text-green-700 border-green-200",
};

export function AIInsightsSection() {
  return (
    <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">AI Insights</h3>
          <span className="text-xs text-muted-foreground">(23 New)</span>
        </div>
        <button className="text-xs text-indigo-600 font-medium hover:underline">
          View all insights
        </button>
      </div>
      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", insight.iconBg)}>
              <insight.icon className={cn("h-4 w-4", insight.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{insight.title}</h4>
                <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", impactStyles[insight.impact])}>
                  {insight.impact === "high" ? "High Impact" : "Medium Impact"}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
