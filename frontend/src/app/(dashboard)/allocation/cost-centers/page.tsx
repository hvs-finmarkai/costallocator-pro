"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Building2 } from "lucide-react";

const costCenters = [
  { id: "1", name: "Human Resources", code: "CC-HR", description: "All HR related costs", totalCost: 1250000, allocation: "Headcount", status: "active" },
  { id: "2", name: "Information Technology", code: "CC-IT", description: "IT infrastructure and support", totalCost: 3450000, allocation: "Revenue %", status: "active" },
  { id: "3", name: "Finance & Accounts", code: "CC-FIN", description: "Finance team costs", totalCost: 890000, allocation: "Headcount", status: "active" },
  { id: "4", name: "Facilities", code: "CC-FAC", description: "Office space, utilities", totalCost: 2100000, allocation: "Space (sqft)", status: "active" },
  { id: "5", name: "Leadership", code: "CC-LED", description: "C-suite and senior management", totalCost: 4500000, allocation: "Revenue %", status: "active" },
  { id: "6", name: "Administration", code: "CC-ADM", description: "General admin costs", totalCost: 650000, allocation: "Headcount", status: "active" },
];

export default function CostCentersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Cost Centers</h1>
          <p className="text-sm text-muted-foreground">Manage shared cost centers and allocation drivers</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-1" /> Add Cost Center
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {costCenters.map((cc) => (
          <Card key={cc.id} className="p-5 dark:bg-slate-900 dark:border-slate-800">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{cc.name}</h3>
                  <p className="text-xs text-muted-foreground">{cc.code}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{cc.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Monthly Cost</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">₹{(cc.totalCost / 100000).toFixed(1)}L</p>
              </div>
              <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                {cc.allocation}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
