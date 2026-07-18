"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Mail } from "lucide-react";

const reports = [
  { title: "Monthly P&L Report", type: "PowerPoint", lastGenerated: "May 18, 2025", schedule: "Monthly" },
  { title: "Executive Summary", type: "PDF", lastGenerated: "May 18, 2025", schedule: "Weekly" },
  { title: "Client Margin Report", type: "Excel", lastGenerated: "May 15, 2025", schedule: "Monthly" },
  { title: "Cost Allocation Report", type: "Excel", lastGenerated: "May 10, 2025", schedule: "Monthly" },
  { title: "Revenue Forecast", type: "PowerPoint", lastGenerated: "May 1, 2025", schedule: "Quarterly" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports</h1>
          <p className="text-sm text-muted-foreground">Generate and schedule financial reports</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
          <FileText className="h-4 w-4 mr-1" /> Generate Report
        </Button>
      </div>
      <div className="space-y-3">
        {reports.map((report, i) => (
          <Card key={i} className="p-4 flex items-center gap-4 dark:bg-slate-900 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950 shrink-0">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{report.title}</h3>
              <p className="text-xs text-muted-foreground">{report.type} • Last: {report.lastGenerated}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> {report.schedule}
            </div>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Download</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
