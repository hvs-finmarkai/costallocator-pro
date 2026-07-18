"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Building2, Cog, FlaskConical, DollarSign, ArrowRight } from "lucide-react";

const modules = [
  {
    title: "Cost Centers",
    description: "Manage shared cost centers (HR, IT, Finance, Facilities)",
    href: "/allocation/cost-centers",
    icon: Building2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "Allocation Rules",
    description: "Configure drivers and allocation logic for shared costs",
    href: "/allocation/rules",
    icon: Cog,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50 dark:bg-purple-950",
  },
  {
    title: "Simulation",
    description: "Run what-if scenarios and compare allocation strategies",
    href: "/allocation/simulation",
    icon: FlaskConical,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 dark:bg-amber-950",
  },
  {
    title: "Pricing Advisor",
    description: "AI-powered pricing recommendations for target margins",
    href: "/allocation/pricing",
    icon: DollarSign,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 dark:bg-emerald-950",
  },
];

export default function AllocationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">CostAllocator Pro</h1>
        <p className="text-sm text-muted-foreground">
          AI-powered cost allocation, simulation, and pricing advisory
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Link key={module.href} href={module.href}>
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer dark:bg-slate-900 dark:border-slate-800 h-full">
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${module.iconBg}`}>
                  <module.icon className={`h-5 w-5 ${module.iconColor}`} />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{module.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
