'use client';

import useSWR from 'swr';
import { Customer } from '@/types/customer';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCustomers(search?: string) {
  const url = search
    ? `/api/customers?search=${encodeURIComponent(search)}`
    : '/api/customers';

  const { data, error, isLoading, mutate } = useSWR<Customer[]>(url, fetcher);

  return {
    customers: data ?? [],
    isLoading,
    error,
    mutate,
  };
}
