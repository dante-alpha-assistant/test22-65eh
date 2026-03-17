'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCustomers } from '@/hooks/use-customers';
import { getColumns } from '@/components/customers/columns';
import { DataTable } from '@/components/customers/data-table';
import { SearchInput } from '@/components/customers/search-input';
import { Button } from '@/components/ui/button';

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const { customers, isLoading, error, mutate } = useCustomers(search);

  const columns = getColumns({ mutate });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <Button asChild>
          <Link href="/dashboard/customers/new">+ Add Customer</Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          Failed to load customers. Please try again.
        </div>
      ) : (
        <DataTable columns={columns} data={customers} isLoading={isLoading} />
      )}
    </div>
  );
}
