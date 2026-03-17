import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CustomerForm } from '@/components/customers/customer-form';
import { DeleteDialog } from '@/components/customers/delete-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { customersStore } from '@/lib/customers-store';

interface EditCustomerPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCustomerPage({ params }: EditCustomerPageProps) {
  const { id } = await params;
  const customer = customersStore.getById(id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/customers"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to customers
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Customer</CardTitle>
          <CardDescription>Update details for {customer.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerForm customer={customer} customerId={id} />
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">Danger Zone</CardTitle>
          <CardDescription>Permanently delete this customer and all their data.</CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteDialog customerId={id} customerName={customer.name} />
        </CardContent>
      </Card>
    </div>
  );
}
