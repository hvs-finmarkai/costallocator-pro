import { TrendingUp } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">Finmark.ai</h1>
              <p className="text-sm text-slate-400">CostAllocator Pro</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            CostAllocator Pro
          </h2>
          <p className="text-slate-300 text-lg mb-6">
            Enterprise Financial Intelligence Platform
          </p>
          <div className="space-y-3 text-left">
            {[
              "AI-Powered Cost Allocation",
              "Real-time P&L Analytics",
              "Predictive Forecasting",
              "Multi-dimensional Dashboards",
              "Automated Report Generation",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-slate-300">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-slate-500">Finmark.ai × Denave</p>
            <p className="text-xs text-slate-600">© 2025 All rights reserved</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
