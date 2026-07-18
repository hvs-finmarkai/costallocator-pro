"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { name: "India", value: 42.3, amount: 52.49, color: "#4f46e5" },
  { name: "MEA", value: 18.7, amount: 23.19, color: "#10b981" },
  { name: "APAC", value: 16.5, amount: 20.48, color: "#f59e0b" },
  { name: "Europe", value: 13.2, amount: 16.36, color: "#06b6d4" },
  { name: "USA", value: 9.3, amount: 11.56, color: "#f97316" },
];

export function RevenueByGeographyChart() {
  return (
    <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Revenue by Geography</h3>
        <span className="text-xs text-muted-foreground">(MTD)</span>
        <span className="text-muted-foreground text-xs">ⓘ</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-[140px] h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                dataKey="value"
                strokeWidth={2}
                stroke="#fff"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs font-bold text-slate-900 dark:text-white">₹124.08 Cr</p>
            <p className="text-[10px] text-muted-foreground">Total</p>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 dark:text-slate-400">{item.value}%</span>
                <span className="font-medium text-slate-900 dark:text-white">₹{item.amount} Cr</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
