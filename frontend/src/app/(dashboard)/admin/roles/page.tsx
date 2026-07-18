"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

const roles = [
  { name: "Super Admin", users: 1, permissions: "Full access" },
  { name: "CFO", users: 1, permissions: "All financial data, reports, settings" },
  { name: "COO", users: 1, permissions: "Operations, workforce, dashboards" },
  { name: "Finance Controller", users: 2, permissions: "Revenue, costs, budgets, reports" },
  { name: "Account Manager", users: 8, permissions: "Client data, projects, margins" },
  { name: "HR", users: 2, permissions: "Workforce, utilization, bench" },
  { name: "Viewer", users: 12, permissions: "Read-only dashboards" },
];

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Roles & Permissions</h1>
        <p className="text-sm text-muted-foreground">Configure access control for your organization</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role, i) => (
          <Card key={i} className="p-4 flex items-center gap-4 dark:bg-slate-900 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950 shrink-0">
              <Shield className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{role.name}</h3>
              <p className="text-xs text-muted-foreground">{role.permissions}</p>
            </div>
            <Badge variant="secondary">{role.users} users</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
