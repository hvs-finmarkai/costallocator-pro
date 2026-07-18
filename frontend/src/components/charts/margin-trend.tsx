"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { month: "Dec '24", margin: 12.1, forecast: null },
  { month: "Jan '25", margin: 10.5, forecast: null },
  { month: "Feb '25", margin: 14.2, forecast: null },
  { month: "Mar '25", margin: 16.8, forecast: null },
  { month: "Apr '25", margin: 17.2, forecast: 18.5 },
  { month: "May '25", margin: 17.8, forecast: 19.2 },
];

export function MarginTrendChart() {
  return (
    <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Margin Trend (%)</h3>
          <span className="text-muted-foreground text-xs">ⓘ</span>
        </div>
        <select className="text-xs border rounded-md px-2 py-1 text-slate-600">
          <option>MTD</option>
          <option>QTD</option>
          <option>YTD</option>
        </select>
      </div>
      <div className="flex items-center gap-4 mb-3 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <div className="h-0.5 w-4 bg-indigo-600" />
          <span>Net Margin (%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-0.5 w-4 bg-slate-400" />
          <span>Forecast (%)</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${v}%`} />
          <Tooltip formatter={(value) => [`${value}%`]} />
          <Line
            type="monotone"
            dataKey="margin"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 3, fill: "#4f46e5" }}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3, fill: "#94a3b8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
