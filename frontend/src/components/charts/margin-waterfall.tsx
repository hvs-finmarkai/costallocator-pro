"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { name: "Revenue", value: 124.08, fill: "#4f46e5" },
  { name: "Direct Cost\nSavings", value: 12.45, fill: "#10b981" },
  { name: "Operating\nLeverage", value: 6.32, fill: "#10b981" },
  { name: "Shared Cost\nImpact", value: -8.73, fill: "#ef4444" },
  { name: "Other Costs", value: -6.12, fill: "#ef4444" },
  { name: "Net Profit", value: 38.32, fill: "#4f46e5" },
];

export function MarginWaterfallChart() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Margin Waterfall (MTD)</h3>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 9 }}
            stroke="#94a3b8"
            interval={0}
          />
          <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
          <Tooltip formatter={(value) => [`₹${Math.abs(Number(value))} Cr`]} />
          <ReferenceLine y={0} stroke="#e2e8f0" />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
