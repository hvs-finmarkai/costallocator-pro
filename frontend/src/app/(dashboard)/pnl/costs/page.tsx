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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Download, TrendingDown, Building2, Layers, Share2 } from "lucide-react";
import { KPICard } from "@/components/shared";

const mockExpenses = [
  { id: "1", category: "employee", type: "direct", vendor: "—", bu: "Enterprise", description: "Salaries - Enterprise BU", amount: 12500000, period: "2025-05" },
  { id: "2", category: "software", type: "indirect", vendor: "Microsoft", bu: "IT", description: "Azure Subscription", amount: 850000, period: "2025-05" },
  { id: "3", category: "infrastructure", type: "shared", vendor: "WeWork", bu: "Facilities", description: "Office Rent - Gurgaon", amount: 3200000, period: "2025-05" },
  { id: "4", category: "vendor", type: "direct", vendor: "TCS", bu: "Digital", description: "Subcontracting - GCP Project", amount: 2100000, period: "2025-05" },
  { id: "5", category: "travel", type: "direct", vendor: "—", bu: "Consulting", description: "Client Travel - SAP", amount: 450000, period: "2025-05" },
  { id: "6", category: "marketing", type: "indirect", vendor: "Agency X", bu: "Marketing", description: "Digital Marketing", amount: 680000, period: "2025-05" },
  { id: "7", category: "operational", type: "shared", vendor: "—", bu: "HR", description: "Training & Development", amount: 320000, period: "2025-05" },
];

const categoryColors: Record<string, string> = {
  employee: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  vendor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  infrastructure: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  travel: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400",
  software: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400",
  marketing: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
  operational: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export default function CostsPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = mockExpenses.filter((e) => {
    const matchesSearch =
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.vendor.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchesSearch;
    return matchesSearch && e.type === tab;
  });

  const totalCost = mockExpenses.reduce((sum, e) => sum + e.amount, 0);
  const directCost = mockExpenses.filter((e) => e.type === "direct").reduce((s, e) => s + e.amount, 0);
  const indirectCost = mockExpenses.filter((e) => e.type === "indirect").reduce((s, e) => s + e.amount, 0);
  const sharedCost = mockExpenses.filter((e) => e.type === "shared").reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Costs & Expenses</h1>
          <p className="text-sm text-muted-foreground">Manage direct, indirect, and shared costs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-1" /> Add Expense
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard title="Total Costs" value={`₹${(totalCost / 10000000).toFixed(2)} Cr`} change={8.2} changeLabel="vs last month" icon={TrendingDown} iconColor="text-red-600" iconBg="bg-red-50" />
        <KPICard title="Direct Costs" value={`₹${(directCost / 10000000).toFixed(2)} Cr`} change={6.1} changeLabel="vs last month" icon={Building2} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <KPICard title="Indirect Costs" value={`₹${(indirectCost / 10000000).toFixed(2)} Cr`} change={3.5} changeLabel="vs last month" icon={Layers} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <KPICard title="Shared Costs" value={`₹${(sharedCost / 10000000).toFixed(2)} Cr`} change={2.1} changeLabel="vs last month" icon={Share2} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      <Card className="dark:bg-slate-900 dark:border-slate-800">
        <div className="p-4 border-b dark:border-slate-800">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="direct">Direct</TabsTrigger>
                <TabsTrigger value="indirect">Indirect</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </Tabs>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-800">
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Business Unit</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Period</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((expense) => (
              <TableRow key={expense.id} className="dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <TableCell className="font-medium">{expense.description}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={categoryColors[expense.category] || ""}>
                    {expense.category}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">{expense.type}</TableCell>
                <TableCell>{expense.bu}</TableCell>
                <TableCell>{expense.vendor}</TableCell>
                <TableCell>{expense.period}</TableCell>
                <TableCell className="text-right font-medium">
                  ₹{(expense.amount / 100000).toFixed(1)}L
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
