import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomerDetail } from '@/components/customers/customer-detail';
import { DeleteDialog } from '@/components/customers/delete-dialog';
import { Customer } from '@/lib/types/customer';
import { ChevronRight, ArrowLeft, Pencil } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getCustomer(id: string): Promise<Customer | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/customers/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function CustomerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const customer = await getCustomer(id);

  if (!customer) {
    return (
      <div className="space-y-4">
        <Link
          href="/dashboard/customers"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Customers
        </Link>
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">Customer not found</h2>
          <p className="text-muted-foreground mb-4">
            The customer you&apos;re looking for doesn&apos;t exist or has been deleted.
          </p>
          <Button asChild>
            <Link href="/dashboard/customers">View all customers</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/dashboard" className="hover:text-foreground transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <Link href="/dashboard/customers" className="hover:text-foreground transition-colors">
          Customers
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {customer.name}
        </span>
      </nav>

      {/* Back link */}
      <Link
        href="/dashboard/customers"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Customers
      </Link>

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{customer.name}</h1>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/customers/${id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteDialog customerId={customer.id} customerName={customer.name} />
        </div>
      </div>

      {/* Customer detail */}
      <CustomerDetail customer={customer} />
    </div>
  );
}
