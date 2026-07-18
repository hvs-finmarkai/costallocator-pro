"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const topAccounts = [
  { rank: 1, name: "Microsoft", margin: 24.6 },
  { rank: 2, name: "Amazon", margin: 21.3 },
  { rank: 3, name: "Google", margin: 19.8 },
  { rank: 4, name: "SAP", margin: 18.2 },
  { rank: 5, name: "IBM", margin: 17.1 },
];

const bottomAccounts = [
  { rank: 1, name: "Accenture", margin: 5.2 },
  { rank: 2, name: "Client X", margin: 3.8 },
  { rank: 3, name: "Client Y", margin: 2.1 },
  { rank: 4, name: "Client Z", margin: -1.2 },
  { rank: 5, name: "Client Q", margin: -4.6 },
];

interface AccountListProps {
  title: string;
  subtitle: string;
  accounts: typeof topAccounts;
  variant: "top" | "bottom";
}

function AccountList({ title, subtitle, accounts, variant }: AccountListProps) {
  return (
    <Card className="p-5 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <button className="text-xs text-indigo-600 font-medium hover:underline">
          View all
        </button>
      </div>
      <div className="space-y-3">
        {accounts.map((account) => (
          <div key={account.rank} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-4">{account.rank}</span>
            <span className="text-sm text-slate-700 flex-1">{account.name}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full",
                    variant === "top" ? "bg-emerald-500" : "bg-red-500"
                  )}
                  style={{ width: `${Math.min(Math.abs(account.margin) * 4, 100)}%` }}
                />
              </div>
              <span
                className={cn(
                  "text-xs font-medium w-12 text-right",
                  account.margin >= 0 ? "text-slate-700" : "text-red-500"
                )}
              >
                {account.margin >= 0 ? "" : "("}
                {Math.abs(account.margin)}%
                {account.margin >= 0 ? "" : ")"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function TopAccountsCard() {
  return (
    <AccountList
      title="Top 5 Accounts"
      subtitle="by Net Margin"
      accounts={topAccounts}
      variant="top"
    />
  );
}

export function BottomAccountsCard() {
  return (
    <AccountList
      title="Bottom 5 Accounts"
      subtitle="by Net Margin"
      accounts={bottomAccounts}
      variant="bottom"
    />
  );
}
