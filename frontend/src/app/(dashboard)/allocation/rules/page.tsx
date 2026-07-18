"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Play, Pause, Settings } from "lucide-react";

const rules = [
  { id: "1", name: "HR Cost by Headcount", costCenter: "HR", driver: "Headcount", weight: "Equal", projects: 42, status: "active", lastRun: "2025-05-18" },
  { id: "2", name: "IT Cost by Revenue", costCenter: "IT", driver: "Revenue %", weight: "Proportional", projects: 42, status: "active", lastRun: "2025-05-18" },
  { id: "3", name: "Facilities by Space", costCenter: "Facilities", driver: "Space (sqft)", weight: "Proportional", projects: 28, status: "active", lastRun: "2025-05-18" },
  { id: "4", name: "Leadership by Revenue", costCenter: "Leadership", driver: "Revenue %", weight: "Proportional", projects: 42, status: "active", lastRun: "2025-05-18" },
  { id: "5", name: "Admin by Headcount", costCenter: "Administration", driver: "Headcount", weight: "Equal", projects: 42, status: "paused", lastRun: "2025-05-10" },
  { id: "6", name: "Finance by Transactions", costCenter: "Finance", driver: "Tickets", weight: "Custom", projects: 35, status: "active", lastRun: "2025-05-18" },
];

export default function AllocationRulesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Allocation Rules</h1>
          <p className="text-sm text-muted-foreground">Configure how shared costs are distributed across projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-1" /> Run All
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-1" /> New Rule
          </Button>
        </div>
      </div>

      <Card className="dark:bg-slate-900 dark:border-slate-800">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-800">
              <TableHead>Rule Name</TableHead>
              <TableHead>Cost Center</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id} className="dark:border-slate-800">
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>{rule.costCenter}</TableCell>
                <TableCell>{rule.driver}</TableCell>
                <TableCell>{rule.weight}</TableCell>
                <TableCell>{rule.projects}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={rule.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}>
                    {rule.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">{rule.lastRun}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
