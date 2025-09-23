import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const rows = [
  { id: "INV-1001", name: "Alice Johnson", email: "alice@example.com", total: "$240.00", status: "Paid" },
  { id: "INV-1002", name: "James Lee", email: "james@example.com", total: "$180.50", status: "Pending" },
  { id: "INV-1003", name: "Priya Patel", email: "priya@example.com", total: "$980.40", status: "Overdue" },
  { id: "INV-1004", name: "Mohit Gupta", email: "mohit@example.com", total: "$120.00", status: "Paid" },
  { id: "INV-1005", name: "Sara Kim", email: "sara@example.com", total: "$420.10", status: "Paid" },
];

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    Overdue: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  };
  return <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${map[status]}`}>{status}</span>;
}

export function RecentTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{r.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <span>{r.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{r.email}</TableCell>
                <TableCell className="text-right tabular-nums">{r.total}</TableCell>
                <TableCell className="text-right">{statusBadge(r.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
