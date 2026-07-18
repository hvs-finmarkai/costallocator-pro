"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useSidebarStore, useAuthStore } from "@/store";

export function Header() {
  const { toggle } = useSidebarStore();
  const { user, logout } = useAuthStore();

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`
    : "AK";

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
        <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground dark:border-slate-700">
          <span className="font-medium">May 2025 (MTD)</span>
        </div>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px] bg-red-500 text-white border-2 border-white dark:border-slate-900">
            12
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 outline-none cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-indigo-600 text-white text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">
                {user ? `${user.firstName} ${user.lastName}` : "Arun Kumar"}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.role?.replace("_", " ").toUpperCase() || "CFO"}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
