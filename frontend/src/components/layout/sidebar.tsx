"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, TrendingUp as LogoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/config/navigation";
import { useSidebarStore } from "@/store";
import { Badge } from "@/components/ui/badge";
import type { NavItem } from "@/types";

function NavItemComponent({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(
    item.children?.some((child) => pathname.startsWith(child.href)) || false
  );
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const hasChildren = item.children && item.children.length > 0;

  if (collapsed) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg mx-auto transition-colors",
          isActive
            ? "bg-indigo-600 text-white"
            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
        )}
        title={item.title}
      >
        <item.icon className="h-5 w-5" />
      </Link>
    );
  }

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive
              ? "bg-indigo-600 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5 shrink-0" />
            <span>{item.title}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen && (
          <div className="mt-1 ml-4 space-y-1 border-l border-slate-200 dark:border-white/10 pl-3">
            {item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === child.href
                    ? "bg-indigo-600/10 text-indigo-600 dark:bg-indigo-600/50 dark:text-white font-medium"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <span>{child.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-indigo-600 text-white"
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
      )}
    >
      <div className="flex items-center gap-3">
        <item.icon className="h-5 w-5 shrink-0" />
        <span>{item.title}</span>
      </div>
      {item.badge && (
        <span className="h-5 min-w-5 flex items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] text-white font-medium">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const { isCollapsed } = useSidebarStore();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-all duration-300 overflow-hidden",
        "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className={cn(
        "flex h-16 items-center gap-2 border-b border-slate-200 dark:border-slate-800 shrink-0",
        isCollapsed ? "justify-center px-2" : "px-4"
      )}>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shrink-0">
          <LogoIcon className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white">Finmark.ai</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">CostAllocator Pro</p>
          </div>
        )}
      </div>

      <nav className={cn(
        "flex-1 overflow-y-auto py-4 space-y-1",
        isCollapsed ? "px-2" : "px-3"
      )}>
        {navigationItems.map((item) => (
          <NavItemComponent key={item.href} item={item} collapsed={isCollapsed} />
        ))}
      </nav>

      <div className="border-t border-slate-200 dark:border-slate-800 p-4 shrink-0">
        {!isCollapsed && (
          <div className="text-xs text-slate-400 dark:text-slate-500">
            <p className="font-medium text-slate-500 dark:text-slate-400">Finmark.ai × Denave</p>
            <p>© 2025 All rights reserved</p>
          </div>
        )}
      </div>
    </aside>
  );
}
