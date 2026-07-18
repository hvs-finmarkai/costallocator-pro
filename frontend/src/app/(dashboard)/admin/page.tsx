"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Users, Shield, FileText, Settings, ArrowRight } from "lucide-react";

const adminModules = [
  { title: "Users", description: "Manage team members and invitations", href: "/admin/users", icon: Users, count: "6 active" },
  { title: "Roles & Permissions", description: "Configure access control", href: "/admin/roles", icon: Shield, count: "7 roles" },
  { title: "Audit Logs", description: "View system activity and changes", href: "/admin/audit", icon: FileText, count: "1.2K entries" },
  { title: "Settings", description: "Organization and system settings", href: "/admin/settings", icon: Settings, count: "" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin</h1>
        <p className="text-sm text-muted-foreground">System administration and configuration</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adminModules.map((module) => (
          <Link key={module.href} href={module.href}>
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer dark:bg-slate-900 dark:border-slate-800 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 shrink-0">
                <module.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{module.title}</h3>
                <p className="text-xs text-muted-foreground">{module.description}</p>
              </div>
              {module.count && <span className="text-xs text-muted-foreground">{module.count}</span>}
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
