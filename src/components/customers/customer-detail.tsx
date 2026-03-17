'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Customer } from '@/lib/types/customer';

interface CustomerDetailProps {
  customer: Customer;
}

const statusVariantMap: Record<string, 'default' | 'secondary' | 'outline'> = {
  active: 'default',
  inactive: 'secondary',
  lead: 'outline',
};

export function CustomerDetail({ customer }: CustomerDetailProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{customer.name}</CardTitle>
            <Badge variant={statusVariantMap[customer.status] ?? 'outline'} className="capitalize">
              {customer.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="mt-1">{customer.email}</p>
            </div>
            {customer.phone && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="mt-1">{customer.phone}</p>
              </div>
            )}
            {customer.company && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Company</p>
                <p className="mt-1">{customer.company}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {customer.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{customer.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 text-sm">
            <div>
              <p className="font-medium text-muted-foreground">Created</p>
              <p>{new Date(customer.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Last Updated</p>
              <p>{new Date(customer.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
