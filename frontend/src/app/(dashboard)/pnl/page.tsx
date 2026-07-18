"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  ArrowRight,
} from "lucide-react";

const sections = [
  {
    title: "Revenue",
    description: "Track all revenue streams, clients, and recognition",
    href: "/pnl/revenue",
    icon: TrendingUp,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 dark:bg-emerald-950",
    stats: "₹124.08 Cr",
    change: "+12.4%",
  },
  {
    title: "Costs & Expenses",
    description: "Manage direct, indirect, and shared costs",
    href: "/pnl/costs",
    icon: TrendingDown,
    iconColor: "text-red-600",
    iconBg: "bg-red-50 dark:bg-red-950",
    stats: "₹85.76 Cr",
    change: "+8.2%",
  },
  {
    title: "Margins",
    description: "Gross, contribution, and net margin analysis",
    href: "/pnl/margins",
    icon: PieChart,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50 dark:bg-indigo-950",
    stats: "17.8%",
    change: "+1.6pp",
  },
];

export default function PnLOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">P&L Management</h1>
        <p className="text-sm text-muted-foreground">
          Track revenue, costs, and margins across your organization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer dark:bg-slate-900 dark:border-slate-800">
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${section.iconBg}`}>
                  <section.icon className={`h-5 w-5 ${section.iconColor}`} />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{section.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{section.stats}</span>
                <span className="text-xs font-medium text-emerald-600">{section.change}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
