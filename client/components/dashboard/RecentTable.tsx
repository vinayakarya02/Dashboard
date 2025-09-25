
import React, { useState } from "react";
import { useGlobalSearch } from "@/hooks/use-global-search";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

const initialRows = [
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

type Row = {
  id: string;
  name: string;
  email: string;
  total: string;
  status: string;
};

export function RecentTable() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const { query: search } = useGlobalSearch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({ id: "", name: "", email: "", total: "", status: "Paid" });

  // Filtered rows for search
  const filteredRows = rows.filter(
    (r) => {
      if (!search) return true;
      return (
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.total.toLowerCase().includes(search.toLowerCase()) ||
        r.status.toLowerCase().includes(search.toLowerCase())
      );
    }
  );

  // Handlers
  const handleOpenAdd = () => {
    setEditRow(null);
    setForm({ id: "", name: "", email: "", total: "", status: "Paid" });
    setDialogOpen(true);
  };
  const handleOpenEdit = (row: Row) => {
    setEditRow(row);
    setForm(row);
    setDialogOpen(true);
  };
  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditRow(null);
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editRow) {
      // Edit
      setRows((prev) => prev.map((r) => (r.id === editRow.id ? form : r)));
    } else {
      // Add
      setRows((prev) => [{ ...form }, ...prev]);
    }
    setDialogOpen(false);
    setEditRow(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Recent Invoices</CardTitle>
        <div className="flex gap-2 items-center">
          <Button onClick={handleOpenAdd} size="sm">Add</Button>
        </div>
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">No results found.</TableCell>
              </TableRow>
            ) : (
              filteredRows.map((r) => (
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
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button size="sm" variant="outline" onClick={() => handleOpenEdit(r)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(r.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{editRow ? "Edit Invoice" : "Add Invoice"}</DialogTitle>
              <DialogDescription>
                {editRow ? "Update invoice details." : "Add a new invoice."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Invoice ID</label>
                <Input name="id" value={form.id} onChange={handleFormChange} required disabled={!!editRow} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name</label>
                <Input name="name" value={form.name} onChange={handleFormChange} required />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input name="email" value={form.email} onChange={handleFormChange} required type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total</label>
                <Input name="total" value={form.total} onChange={handleFormChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                  required
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editRow ? "Save Changes" : "Add Invoice"}</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
