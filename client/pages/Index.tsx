import { KpiCards } from "@/components/dashboard/KpiCards";
import { RecentTable } from "@/components/dashboard/RecentTable";

export default function Index() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Key metrics and recent activity across your workspace.
        </p>
      </div>
      <KpiCards />
      <RecentTable />
    </div>
  );
}
