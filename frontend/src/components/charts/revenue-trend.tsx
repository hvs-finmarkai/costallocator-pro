"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { month: "Dec '24", revenue: 58, forecast: null },
  { month: "Jan '25", revenue: 72, forecast: null },
  { month: "Feb '25", revenue: 95, forecast: null },
  { month: "Mar '25", revenue: 110, forecast: null },
  { month: "Apr '25", revenue: 118, forecast: 120 },
  { month: "May '25", revenue: 124, forecast: 130 },
];

export function RevenueTrendChart() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900">Revenue Trend</h3>
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
          <span>Revenue (₹ Cr)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-0.5 w-4 bg-indigo-600 border-dashed" style={{ borderTopStyle: "dashed", borderTopWidth: 2, height: 0 }} />
          <span>Forecast (₹ Cr)</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 3, fill: "#4f46e5" }}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#4f46e5"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3, fill: "#4f46e5" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
