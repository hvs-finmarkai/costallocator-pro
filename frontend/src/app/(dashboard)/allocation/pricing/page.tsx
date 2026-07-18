"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Target, ArrowUpRight } from "lucide-react";

const pricingRecommendations = [
  { client: "Accenture", currentMargin: 5.2, targetMargin: 15, currentBilling: 85, recommendedBilling: 98, increase: 15.3, confidence: 92 },
  { client: "Client X", currentMargin: 3.8, targetMargin: 15, currentBilling: 72, recommendedBilling: 86, increase: 19.4, confidence: 88 },
  { client: "Client Y", currentMargin: 2.1, targetMargin: 15, currentBilling: 65, recommendedBilling: 79, increase: 21.5, confidence: 85 },
  { client: "Client Z", currentMargin: -1.2, targetMargin: 15, currentBilling: 58, recommendedBilling: 74, increase: 27.6, confidence: 78 },
  { client: "Client Q", currentMargin: -4.6, targetMargin: 15, currentBilling: 52, recommendedBilling: 71, increase: 36.5, confidence: 72 },
];

export default function PricingAdvisorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pricing Advisor</h1>
          <p className="text-sm text-muted-foreground">AI-powered pricing recommendations to achieve target margins</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
          <Brain className="h-4 w-4 mr-1" /> Recalculate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-indigo-600" />
            <span className="text-xs text-muted-foreground">Target Margin</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">15%</p>
          <p className="text-xs text-muted-foreground mt-1">Minimum acceptable net margin</p>
        </Card>
        <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-xs text-muted-foreground">Potential Revenue Gain</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">₹4.8 Cr</p>
          <p className="text-xs text-muted-foreground mt-1">If all recommendations applied</p>
        </Card>
        <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="h-4 w-4 text-amber-600" />
            <span className="text-xs text-muted-foreground">Accounts Below Target</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">5</p>
          <p className="text-xs text-muted-foreground mt-1">Need pricing adjustment</p>
        </Card>
      </div>

      <Card className="dark:bg-slate-900 dark:border-slate-800">
        <div className="p-4 border-b dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Pricing Recommendations</h3>
        </div>
        <div className="divide-y dark:divide-slate-800">
          {pricingRecommendations.map((rec) => (
            <div key={rec.client} className="p-4 flex items-center gap-6">
              <div className="w-28">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{rec.client}</p>
                <p className="text-xs text-muted-foreground">Current: {rec.currentMargin}%</p>
              </div>
              <div className="flex-1 grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Current Rate</p>
                  <p className="text-sm font-medium">₹{rec.currentBilling}/hr</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Recommended</p>
                  <p className="text-sm font-bold text-indigo-600">₹{rec.recommendedBilling}/hr</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Increase</p>
                  <p className="text-sm font-medium text-amber-600">+{rec.increase}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">AI Confidence</p>
                  <Badge variant="secondary" className={rec.confidence >= 85 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"}>
                    {rec.confidence}%
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">Apply</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
