"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, TrendingDown, AlertTriangle, ArrowDown, DollarSign, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

const alerts = [
  { id: "1", type: "margin_drop", severity: "high", title: "Margin Drop", description: "Microsoft - Net margin dropped below 15%", time: "10:30 AM", date: "May 18, 2025", read: false },
  { id: "2", type: "cost_overrun", severity: "high", title: "Cost Overrun", description: "Project Apollo - Exceeded budget by 12%", time: "09:15 AM", date: "May 18, 2025", read: false },
  { id: "3", type: "utilization_low", severity: "medium", title: "Utilization Low", description: "Retail BU - Utilization dropped below 70%", time: "08:45 AM", date: "May 18, 2025", read: false },
  { id: "4", type: "revenue_gap", severity: "medium", title: "Revenue Gap", description: "Milestone achieved but invoice pending for 15 days", time: "08:20 AM", date: "May 18, 2025", read: true },
  { id: "5", type: "margin_drop", severity: "high", title: "Margin Drop", description: "Client X - Negative margin for 3rd consecutive month", time: "07:00 AM", date: "May 18, 2025", read: true },
  { id: "6", type: "cost_overrun", severity: "medium", title: "Cost Overrun", description: "IT shared costs increased 18% MoM", time: "06:30 AM", date: "May 17, 2025", read: true },
  { id: "7", type: "utilization_low", severity: "low", title: "Bench Alert", description: "5 new employees on bench for 30+ days", time: "09:00 AM", date: "May 17, 2025", read: true },
  { id: "8", type: "revenue_gap", severity: "low", title: "Invoice Delay", description: "3 invoices pending over 60 days", time: "11:00 AM", date: "May 16, 2025", read: true },
];

const severityStyles: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
};

const iconMap: Record<string, typeof TrendingDown> = {
  margin_drop: TrendingDown,
  cost_overrun: AlertTriangle,
  utilization_low: ArrowDown,
  revenue_gap: DollarSign,
};

export default function AlertsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Alerts</h1>
          <Badge className="bg-red-500 text-white">{alerts.filter((a) => !a.read).length} new</Badge>
        </div>
        <Button variant="outline" size="sm">
          <CheckCircle className="h-4 w-4 mr-1" /> Mark All Read
        </Button>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All ({alerts.length})</TabsTrigger>
          <TabsTrigger value="high">High ({alerts.filter((a) => a.severity === "high").length})</TabsTrigger>
          <TabsTrigger value="medium">Medium ({alerts.filter((a) => a.severity === "medium").length})</TabsTrigger>
          <TabsTrigger value="low">Low ({alerts.filter((a) => a.severity === "low").length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filtered.map((alert) => {
          const Icon = iconMap[alert.type] || Bell;
          return (
            <Card key={alert.id} className={`p-4 flex items-start gap-4 dark:bg-slate-900 dark:border-slate-800 ${!alert.read ? "border-l-4 border-l-indigo-500" : ""}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${alert.severity === "high" ? "bg-red-50 dark:bg-red-950" : alert.severity === "medium" ? "bg-amber-50 dark:bg-amber-950" : "bg-blue-50 dark:bg-blue-950"}`}>
                <Icon className={`h-5 w-5 ${alert.severity === "high" ? "text-red-600" : alert.severity === "medium" ? "text-amber-600" : "text-blue-600"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{alert.title}</span>
                  <Badge variant="secondary" className={severityStyles[alert.severity]}>{alert.severity}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{alert.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">{alert.date}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end mt-0.5">
                  <Clock className="h-3 w-3" /> {alert.time}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
