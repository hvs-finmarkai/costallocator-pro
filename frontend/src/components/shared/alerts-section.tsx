"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, AlertTriangle, ArrowDown, DollarSign } from "lucide-react";

const alerts = [
  {
    id: "1",
    type: "margin_drop",
    label: "Margin Drop",
    description: "Microsoft - Net margin dropped below 15%",
    time: "May 18, 2025  10:30 AM",
    icon: TrendingDown,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    id: "2",
    type: "cost_overrun",
    label: "Cost Overrun",
    description: "Project Apollo - Exceeded budget by 12%",
    time: "May 18, 2025  09:15 AM",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: "3",
    type: "utilization_low",
    label: "Utilization Low",
    description: "Retail BU - Utilization dropped below 70%",
    time: "May 18, 2025  08:45 AM",
    icon: ArrowDown,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: "4",
    type: "revenue_gap",
    label: "Revenue Gap",
    description: "Milestone achieved but invoice pending",
    time: "May 18, 2025  08:20 AM",
    icon: DollarSign,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

export function AlertsSection() {
  return (
    <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Alerts</h3>
          <span className="text-xs text-muted-foreground">(18)</span>
        </div>
        <button className="text-xs text-indigo-600 font-medium hover:underline">
          View all alerts
        </button>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3">
            <div className={cn("mt-0.5 flex h-6 w-6 items-center justify-center rounded-full", alert.bg)}>
              <alert.icon className={cn("h-3.5 w-3.5", alert.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-semibold", alert.color)}>{alert.label}</span>
              </div>
              <p className="text-xs text-slate-600 truncate">{alert.description}</p>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{alert.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
