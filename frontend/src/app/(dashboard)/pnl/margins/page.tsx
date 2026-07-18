"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, Target, PieChart, AlertTriangle } from "lucide-react";
import { KPICard } from "@/components/shared";

const waterfallData = [
  { name: "Revenue", value: 124.08, fill: "#4f46e5" },
  { name: "Direct Cost", value: -65.2, fill: "#ef4444" },
  { name: "Gross Profit", value: 58.88, fill: "#10b981" },
  { name: "Indirect Cost", value: -12.45, fill: "#f97316" },
  { name: "Contribution", value: 46.43, fill: "#06b6d4" },
  { name: "Shared Cost", value: -8.11, fill: "#f59e0b" },
  { name: "Net Profit", value: 38.32, fill: "#10b981" },
];

const marginTrend = [
  { month: "Jan", gross: 42.5, contribution: 35.2, net: 15.8 },
  { month: "Feb", gross: 44.1, contribution: 36.8, net: 16.2 },
  { month: "Mar", gross: 43.8, contribution: 36.1, net: 15.9 },
  { month: "Apr", gross: 45.2, contribution: 37.5, net: 17.2 },
  { month: "May", gross: 47.5, contribution: 37.4, net: 17.8 },
];

const clientMargins = [
  { client: "Microsoft", revenue: 42.5, margin: 24.6, status: "healthy" },
  { client: "Amazon", revenue: 31.8, margin: 21.3, status: "healthy" },
  { client: "Google", revenue: 28.9, margin: 19.8, status: "healthy" },
  { client: "SAP", revenue: 51.2, margin: 18.2, status: "healthy" },
  { client: "IBM", revenue: 19.5, margin: 17.1, status: "healthy" },
  { client: "Accenture", revenue: 8.7, margin: 5.2, status: "watch" },
  { client: "Client X", revenue: 12.4, margin: 3.8, status: "risk" },
  { client: "Client Y", revenue: 6.2, margin: -1.2, status: "loss" },
];

const statusBadge: Record<string, string> = {
  healthy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  watch: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  risk: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  loss: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
};

export default function MarginsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Margin Analysis</h1>
        <p className="text-sm text-muted-foreground">Gross, contribution, and net margin breakdown</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard title="Gross Margin" value="47.5%" change={2.3} changeLabel="pp vs last month" icon={TrendingUp} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <KPICard title="Contribution Margin" value="37.4%" change={-0.1} changeLabel="pp vs last month" icon={Target} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Net Margin" value="17.8%" change={0.6} changeLabel="pp vs last month" icon={PieChart} iconColor="text-indigo-600" iconBg="bg-indigo-50" />
        <KPICard title="At-Risk Clients" value="3" change={-15} changeLabel="vs last month" icon={AlertTriangle} iconColor="text-red-600" iconBg="bg-red-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">P&L Waterfall (₹ Cr)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={waterfallData} barSize={50}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip formatter={(value) => [`₹${Math.abs(Number(value))} Cr`]} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {waterfallData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Margin Trend (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={marginTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => [`${value}%`]} />
              <Line type="monotone" dataKey="gross" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Gross" />
              <Line type="monotone" dataKey="contribution" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} name="Contribution" />
              <Line type="monotone" dataKey="net" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} name="Net" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Client Margin Heatmap</h3>
        <div className="space-y-2">
          {clientMargins.map((client) => (
            <div key={client.client} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span className="text-sm font-medium w-28 text-slate-700 dark:text-slate-300">{client.client}</span>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${client.margin > 15 ? "bg-emerald-500" : client.margin > 5 ? "bg-amber-500" : client.margin > 0 ? "bg-orange-500" : "bg-red-500"}`}
                    style={{ width: `${Math.max(Math.min(client.margin * 3, 100), 2)}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground w-16 text-right">₹{client.revenue}Cr</span>
              <span className={`text-sm font-bold w-14 text-right ${client.margin >= 0 ? "text-slate-900 dark:text-white" : "text-red-500"}`}>
                {client.margin}%
              </span>
              <Badge variant="secondary" className={statusBadge[client.status]}>
                {client.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
