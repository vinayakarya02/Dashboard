import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign, Users, ShoppingCart, Activity } from "lucide-react";

export type Kpi = {
  label: string;
  value: string | number;
  delta: number; // positive up, negative down
  icon: React.ReactNode;
};

const formatDelta = (delta: number) => {
  const isUp = delta >= 0;
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;
  const color = isUp ? "text-emerald-600" : "text-red-600";
  return (
    <div className={`flex items-center gap-1 ${color}`}>
      <Icon className="h-4 w-4" />
      <span className="text-xs font-medium">{Math.abs(delta)}%</span>
    </div>
  );
};

export function KpiCards() {
  const items: Kpi[] = [
    { label: "Revenue", value: "$128,420", delta: 12.4, icon: <DollarSign className="h-5 w-5 text-primary" /> },
    { label: "Active Users", value: 5720, delta: 5.2, icon: <Users className="h-5 w-5 text-primary" /> },
    { label: "Orders", value: 892, delta: -3.1, icon: <ShoppingCart className="h-5 w-5 text-primary" /> },
    { label: "Bounce Rate", value: "32.1%", delta: 1.4, icon: <Activity className="h-5 w-5 text-primary" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((k) => (
        <Card key={k.label} className="overflow-hidden">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{k.label}</CardTitle>
            {k.icon}
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold tabular-nums">{k.value}</div>
            <div className="mt-2">{formatDelta(typeof k.delta === 'number' ? k.delta : 0)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
