"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, MoreVertical } from "lucide-react";

const users = [
  { id: "1", name: "Arun Kumar", email: "arun.kumar@denave.com", role: "CFO", status: "active", lastLogin: "2025-05-18 10:30 AM" },
  { id: "2", name: "Priya Sharma", email: "priya.sharma@denave.com", role: "Finance Controller", status: "active", lastLogin: "2025-05-18 09:15 AM" },
  { id: "3", name: "Rahul Singh", email: "rahul.singh@denave.com", role: "COO", status: "active", lastLogin: "2025-05-17 04:30 PM" },
  { id: "4", name: "Neha Gupta", email: "neha.gupta@denave.com", role: "Account Manager", status: "active", lastLogin: "2025-05-18 08:00 AM" },
  { id: "5", name: "Vikram Patel", email: "vikram.patel@denave.com", role: "Operations", status: "active", lastLogin: "2025-05-16 02:00 PM" },
  { id: "6", name: "Anita Roy", email: "anita.roy@denave.com", role: "HR", status: "inactive", lastLogin: "2025-05-01 11:00 AM" },
];

const roleColors: Record<string, string> = {
  CFO: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400",
  COO: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  "Finance Controller": "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  "Account Manager": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Operations: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  HR: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Users</h1>
          <p className="text-sm text-muted-foreground">Manage team members and their access</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-1" /> Invite User
        </Button>
      </div>

      <Card className="dark:bg-slate-900 dark:border-slate-800">
        <div className="p-4 border-b dark:border-slate-800">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-800">
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="dark:border-slate-800">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs dark:bg-indigo-950 dark:text-indigo-400">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={roleColors[user.role] || ""}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={user.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{user.lastLogin}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
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
