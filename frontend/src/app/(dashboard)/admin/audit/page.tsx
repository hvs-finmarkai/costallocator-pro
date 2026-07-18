"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

const logs = [
  { id: "1", user: "Arun Kumar", action: "login", resource: "auth", details: "Logged in successfully", timestamp: "2025-05-18 10:30:12", ip: "103.21.x.x" },
  { id: "2", user: "Priya Sharma", action: "create", resource: "revenue", details: "Created revenue for Microsoft - ₹42.5L", timestamp: "2025-05-18 10:25:03", ip: "103.21.x.x" },
  { id: "3", user: "Arun Kumar", action: "update", resource: "user", details: "Updated role for Vikram Patel", timestamp: "2025-05-18 09:45:22", ip: "103.21.x.x" },
  { id: "4", user: "Neha Gupta", action: "create", resource: "expense", details: "Created expense - Travel ₹4.5L", timestamp: "2025-05-18 09:30:11", ip: "192.168.x.x" },
  { id: "5", user: "Rahul Singh", action: "delete", resource: "revenue", details: "Deleted draft revenue entry", timestamp: "2025-05-18 09:15:44", ip: "103.21.x.x" },
  { id: "6", user: "System", action: "run", resource: "allocation", details: "Nightly allocation completed", timestamp: "2025-05-18 02:00:00", ip: "internal" },
  { id: "7", user: "Priya Sharma", action: "export", resource: "report", details: "Exported P&L report (May 2025)", timestamp: "2025-05-17 17:30:00", ip: "103.21.x.x" },
];

const actionColors: Record<string, string> = {
  login: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  create: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  update: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  delete: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  run: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  export: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400",
};

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">Track all system activities and changes</p>
      </div>

      <Card className="dark:bg-slate-900 dark:border-slate-800">
        <div className="p-4 border-b dark:border-slate-800">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search logs..." className="pl-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-800">
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="dark:border-slate-800">
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                <TableCell className="text-sm font-medium">{log.user}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={actionColors[log.action] || ""}>{log.action}</Badge>
                </TableCell>
                <TableCell className="text-sm">{log.resource}</TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{log.details}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{log.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
