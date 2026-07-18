import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor,
  iconBg,
}: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="flex items-center gap-4 p-4">
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", iconBg)}>
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground truncate">{title}</p>
        <p className="text-xl font-bold text-slate-900 truncate">{value}</p>
        <p className={cn("text-xs font-medium", isPositive ? "text-emerald-600" : "text-red-500")}>
          {isPositive ? "↑" : "↓"} {Math.abs(change)}% {changeLabel}
        </p>
      </div>
    </Card>
  );
}
