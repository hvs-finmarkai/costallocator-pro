"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, TrendingDown, Users, Search } from "lucide-react";

const insights = [
  { title: "Pricing Opportunity", description: "Increase pricing for 12 accounts to achieve 15%+ margin", impact: "high", icon: Zap },
  { title: "Resource Optimization", description: "Move 18 resources from low-margin to high-margin projects", impact: "medium", icon: Users },
  { title: "Cost Leakage Detected", description: "₹1.2 Cr in unallocated costs across 8 projects", impact: "high", icon: Search },
  { title: "Margin Drop Alert", description: "3 clients trending below target margin for 2nd month", impact: "high", icon: TrendingDown },
  { title: "Hiring Recommendation", description: "Hire 5 senior engineers for cloud BU to meet demand", impact: "medium", icon: Users },
];

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Insights</h1>
        <p className="text-sm text-muted-foreground">AI-generated recommendations and anomaly detection</p>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <Card key={i} className="p-4 flex items-start gap-4 dark:bg-slate-900 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950 shrink-0">
              <insight.icon className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{insight.title}</h3>
                <Badge variant="secondary" className={insight.impact === "high" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"}>
                  {insight.impact} impact
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
