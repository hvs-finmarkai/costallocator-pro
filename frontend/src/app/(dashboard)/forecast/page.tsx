"use client";

import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Target } from "lucide-react";

export default function ForecastPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Forecast & AI</h1>
        <p className="text-sm text-muted-foreground">Predictive analytics and AI-powered insights</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 dark:bg-slate-900 dark:border-slate-800 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 mb-3">
            <TrendingUp className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Revenue Forecast</h3>
          <p className="text-xs text-muted-foreground mt-1">Next 3 months prediction</p>
          <p className="text-2xl font-bold text-indigo-600 mt-3">₹142.5 Cr</p>
        </Card>
        <Card className="p-6 dark:bg-slate-900 dark:border-slate-800 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950 mb-3">
            <Target className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Margin Forecast</h3>
          <p className="text-xs text-muted-foreground mt-1">Expected net margin</p>
          <p className="text-2xl font-bold text-emerald-600 mt-3">18.6%</p>
        </Card>
        <Card className="p-6 dark:bg-slate-900 dark:border-slate-800 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950 mb-3">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">AI Confidence</h3>
          <p className="text-xs text-muted-foreground mt-1">Model accuracy</p>
          <p className="text-2xl font-bold text-purple-600 mt-3">97%</p>
        </Card>
      </div>
    </div>
  );
}
