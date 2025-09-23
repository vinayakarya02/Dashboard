import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12000, target: 10000 },
  { month: "Feb", revenue: 14500, target: 12000 },
  { month: "Mar", revenue: 13800, target: 13000 },
  { month: "Apr", revenue: 16200, target: 14000 },
  { month: "May", revenue: 17100, target: 15000 },
  { month: "Jun", revenue: 18500, target: 16000 },
];

const channelData = [
  { name: "Direct", value: 4200 },
  { name: "Search", value: 6800 },
  { name: "Email", value: 2100 },
  { name: "Social", value: 3100 },
  { name: "Affiliate", value: 1800 },
];

export function Charts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="xl:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Revenue</CardTitle>
            <ChartLegendContent payload={[{ value: 'Actual', color: 'hsl(var(--primary))' }, { value: 'Target', color: 'hsl(var(--muted-foreground))' }]} />
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: { label: "Actual", color: "hsl(var(--primary))" },
              target: { label: "Target", color: "hsl(var(--muted-foreground))" },
            }}
            className="h-[280px]"
          >
            <AreaChart data={revenueData} margin={{ left: 6, right: 6 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <Area dataKey="target" type="monotone" stroke="var(--color-target)" fill="var(--color-target)" fillOpacity={0.12} />
              <Area dataKey="revenue" type="monotone" stroke="var(--color-revenue)" fill="var(--color-revenue)" fillOpacity={0.24} />
              <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acquisition Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Sessions", color: "hsl(var(--primary))" } }} className="h-[280px]">
            <BarChart data={channelData} margin={{ left: 6, right: 6 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <Bar dataKey="value" radius={6} fill="var(--color-value)" />
              <ChartTooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
