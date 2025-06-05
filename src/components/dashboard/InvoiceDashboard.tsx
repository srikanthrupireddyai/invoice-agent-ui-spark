
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, DollarSign, Calendar, AlertCircle } from "lucide-react";

const mockInvoices = [
  {
    id: 1,
    clientName: "Acme Corp",
    invoiceNumber: "INV-2024-001",
    amount: 2500.00,
    dueDate: "2024-01-15",
    daysOverdue: 5,
    status: "pending_followup",
    lastFollowup: "2024-01-18",
    followupCount: 1,
    clientEmail: "billing@acmecorp.com"
  },
  {
    id: 2,
    clientName: "TechStart Inc",
    invoiceNumber: "INV-2024-002",
    amount: 1250.00,
    dueDate: "2024-01-10",
    daysOverdue: 10,
    status: "followup_sent",
    lastFollowup: "2024-01-19",
    followupCount: 2,
    clientEmail: "finance@techstart.com"
  },
  {
    id: 3,
    clientName: "Global Services",
    invoiceNumber: "INV-2024-003",
    amount: 4200.00,
    dueDate: "2024-01-08",
    daysOverdue: 12,
    status: "no_response",
    lastFollowup: "2024-01-16",
    followupCount: 2,
    clientEmail: "accounts@globalservices.com"
  },
  {
    id: 4,
    clientName: "Local Business",
    invoiceNumber: "INV-2024-004",
    amount: 800.00,
    dueDate: "2024-01-20",
    daysOverdue: 0,
    status: "paid",
    lastFollowup: "Never",
    followupCount: 0,
    clientEmail: "owner@localbiz.com"
  }
];

export const InvoiceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_followup: { label: "Pending Follow-up", variant: "destructive" as const },
      followup_sent: { label: "Follow-up Sent", variant: "secondary" as const },
      no_response: { label: "No Response", variant: "destructive" as const },
      paid: { label: "Paid", variant: "default" as const },
      escalated: { label: "Escalated", variant: "destructive" as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "secondary" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOverdue = mockInvoices
    .filter(inv => inv.daysOverdue > 0)
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOverdue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From overdue invoices</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockInvoices.filter(inv => inv.daysOverdue > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Sent</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockInvoices.reduce((sum, inv) => sum + inv.followupCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Dashboard</CardTitle>
          <CardDescription>
            Monitor and manage your invoice follow-ups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by client name or invoice number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending_followup">Pending Follow-up</SelectItem>
                <SelectItem value="followup_sent">Follow-up Sent</SelectItem>
                <SelectItem value="no_response">No Response</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invoice Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Follow-ups</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.clientName}</TableCell>
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                    <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <span className={invoice.daysOverdue > 0 ? "text-red-600 font-medium" : "text-gray-500"}>
                        {invoice.daysOverdue > 0 ? `${invoice.daysOverdue} days` : "Current"}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>{invoice.followupCount}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Invoice Details</DialogTitle>
                            <DialogDescription>
                              {selectedInvoice?.invoiceNumber} - {selectedInvoice?.clientName}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedInvoice && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Amount Due</Label>
                                  <p className="text-lg font-bold">${selectedInvoice.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Days Overdue</Label>
                                  <p className="text-lg font-bold text-red-600">
                                    {selectedInvoice.daysOverdue} days
                                  </p>
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">Client Contact</Label>
                                <p>{selectedInvoice.clientEmail}</p>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">Follow-up History</Label>
                                <div className="mt-2 space-y-2">
                                  <div className="p-3 bg-gray-50 rounded">
                                    <p className="text-sm">First reminder sent on {selectedInvoice.lastFollowup}</p>
                                    <p className="text-xs text-gray-600">Template: Friendly reminder</p>
                                  </div>
                                  {selectedInvoice.followupCount > 1 && (
                                    <div className="p-3 bg-gray-50 rounded">
                                      <p className="text-sm">Second reminder sent on 2024-01-17</p>
                                      <p className="text-xs text-gray-600">Template: Professional follow-up</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No invoices found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-sm font-medium ${className}`}>{children}</div>
);
