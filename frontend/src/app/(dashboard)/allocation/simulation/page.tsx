"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FlaskConical, Play } from "lucide-react";

const comparisonData = [
  { project: "Microsoft", current: 24.6, simulated: 26.2 },
  { project: "Amazon", current: 21.3, simulated: 22.8 },
  { project: "Google", current: 19.8, simulated: 21.1 },
  { project: "SAP", current: 18.2, simulated: 19.5 },
  { project: "IBM", current: 17.1, simulated: 18.3 },
];

export default function SimulationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Scenario Simulator</h1>
          <p className="text-sm text-muted-foreground">Run what-if scenarios to optimize cost allocation</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
          <Play className="h-4 w-4 mr-1" /> Run Simulation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 dark:bg-slate-900 dark:border-slate-800 col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="h-5 w-5 text-amber-600" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Scenario Parameters</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Move Employees</Label>
              <Input type="number" placeholder="e.g. 5" defaultValue="3" />
              <p className="text-xs text-muted-foreground">From bench to high-margin projects</p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Revenue Increase (%)</Label>
              <Input type="number" placeholder="e.g. 10" defaultValue="5" />
              <p className="text-xs text-muted-foreground">Expected revenue growth</p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Cost Reduction (%)</Label>
              <Input type="number" placeholder="e.g. 8" defaultValue="3" />
              <p className="text-xs text-muted-foreground">Shared cost optimization</p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Reallocation Driver</Label>
              <select className="w-full rounded-md border px-3 py-2 text-sm dark:bg-slate-800 dark:border-slate-700">
                <option>Revenue %</option>
                <option>Headcount</option>
                <option>AI Recommended</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-5 dark:bg-slate-900 dark:border-slate-800 col-span-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Margin Comparison: Current vs Simulated</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="project" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => [`${value}%`]} />
              <Legend />
              <Bar dataKey="current" fill="#94a3b8" name="Current Margin" radius={[4, 4, 0, 0]} />
              <Bar dataKey="simulated" fill="#4f46e5" name="Simulated Margin" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950">
              <p className="text-xs text-emerald-600">Avg Margin Gain</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">+1.5pp</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
              <p className="text-xs text-blue-600">Additional Profit</p>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-400">₹2.1 Cr</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950">
              <p className="text-xs text-indigo-600">Projects Improved</p>
              <p className="text-lg font-bold text-indigo-700 dark:text-indigo-400">38/42</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
