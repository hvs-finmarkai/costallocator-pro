"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-muted-foreground">Organization and system configuration</p>
      </div>
      <Card className="p-6 dark:bg-slate-900 dark:border-slate-800 max-w-2xl space-y-4">
        <div className="space-y-2">
          <Label>Organization Name</Label>
          <Input defaultValue="" />
        </div>
        <div className="space-y-2">
          <Label>Currency</Label>
          <Input defaultValue="INR" />
        </div>
        <div className="space-y-2">
          <Label>Fiscal Year Start Month</Label>
          <Input defaultValue="April" />
        </div>
        <div className="space-y-2">
          <Label>Target Net Margin (%)</Label>
          <Input defaultValue="15" />
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
      </Card>
    </div>
  );
}
