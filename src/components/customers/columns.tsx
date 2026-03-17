'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Customer } from '@/types/customer';
import { StatusBadge } from './status-badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { KeyedMutator } from 'swr';

interface ColumnsOptions {
  mutate: KeyedMutator<Customer[]>;
}

export function getColumns({ mutate }: ColumnsOptions): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'company',
      header: 'Company',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const customer = row.original;

        async function handleDelete() {
          if (!window.confirm(`Delete ${customer.name}?`)) return;
          await fetch(`/api/customers/${customer.id}`, { method: 'DELETE' });
          mutate();
        }

        return (
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href={`/dashboard/customers/${customer.id}/edit`}>Edit</Link>
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
}
