"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Download, Filter, TrendingUp, IndianRupee, Users, Globe } from "lucide-react";
import { KPICard } from "@/components/shared";

const mockRevenues = [
  { id: "1", client: "Microsoft", project: "Azure Migration", bu: "Enterprise", geography: "India", type: "project_based", status: "recognized", amount: 4250000, period: "2025-05-01" },
  { id: "2", client: "Amazon", project: "AWS Consulting", bu: "Cloud", geography: "USA", type: "time_material", status: "invoiced", amount: 3180000, period: "2025-05-01" },
  { id: "3", client: "Google", project: "GCP Setup", bu: "Digital", geography: "APAC", type: "milestone", status: "recognized", amount: 2890000, period: "2025-05-01" },
  { id: "4", client: "SAP", project: "S4 HANA", bu: "Enterprise", geography: "Europe", type: "recurring", status: "collected", amount: 5120000, period: "2025-05-01" },
  { id: "5", client: "IBM", project: "Watson AI", bu: "Digital", geography: "MEA", type: "project_based", status: "draft", amount: 1950000, period: "2025-05-01" },
  { id: "6", client: "Accenture", project: "Consulting", bu: "Consulting", geography: "India", type: "time_material", status: "invoiced", amount: 870000, period: "2025-04-01" },
  { id: "7", client: "Infosys", project: "Platform Dev", bu: "Retail", geography: "India", type: "project_based", status: "recognized", amount: 3450000, period: "2025-04-01" },
];

const statusColors: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  recognized: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  invoiced: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  collected: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  deferred: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
};

export default function RevenuePage() {
  const [search, setSearch] = useState("");

  const filtered = mockRevenues.filter(
    (r) =>
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.project.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = mockRevenues.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Revenue</h1>
          <p className="text-sm text-muted-foreground">Manage all revenue streams and recognition</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-1" /> Add Revenue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard title="Total Revenue" value={`₹${(totalRevenue / 10000000).toFixed(2)} Cr`} change={12.4} changeLabel="vs last month" icon={IndianRupee} iconColor="text-indigo-600" iconBg="bg-indigo-50" />
        <KPICard title="Active Clients" value="42" change={5} changeLabel="new this month" icon={Users} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <KPICard title="Avg Deal Size" value="₹32.4L" change={8.2} changeLabel="vs last quarter" icon={TrendingUp} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Geographies" value="5" change={0} changeLabel="active regions" icon={Globe} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      <Card className="dark:bg-slate-900 dark:border-slate-800">
        <div className="p-4 border-b dark:border-slate-800 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search clients, projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" /> Filters
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-800">
              <TableHead>Client</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Business Unit</TableHead>
              <TableHead>Geography</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((revenue) => (
              <TableRow key={revenue.id} className="dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <TableCell className="font-medium">{revenue.client}</TableCell>
                <TableCell>{revenue.project}</TableCell>
                <TableCell>{revenue.bu}</TableCell>
                <TableCell>{revenue.geography}</TableCell>
                <TableCell className="capitalize">{revenue.type.replace("_", " ")}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusColors[revenue.status]}>
                    {revenue.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ₹{(revenue.amount / 100000).toFixed(1)}L
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
