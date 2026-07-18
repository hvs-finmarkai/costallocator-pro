"use client";

import { Bell, Menu, Search, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useSidebarStore, useAuthStore } from "@/store";
import { useRouter } from "next/navigation";

export function Header() {
  const { toggle } = useSidebarStore();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const initials = user?.first_name && user?.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`
    : "AK";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white dark:bg-slate-900 dark:border-slate-800 px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="shrink-0"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search accounts, projects, reports..."
          className="pl-9 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground dark:border-slate-700">
          <span className="font-medium">May 2025 (MTD)</span>
        </div>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px] bg-red-500 text-white border-2 border-white dark:border-slate-900">
            12
          </Badge>
        </Button>

        <div className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-indigo-600 text-white text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {user ? `${user.first_name} ${user.last_name}` : "Arun Kumar"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user?.role?.replace("_", " ").toUpperCase() || "CFO"}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
