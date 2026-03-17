import { NextResponse } from 'next/server';
import { customersStore } from '@/lib/customers-store';

export async function GET() {
  const customers = customersStore.getAll();
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const total = customers.length;
  const active = customers.filter((c) => c.status === 'active').length;
  const leads = customers.filter((c) => c.status === 'lead').length;
  const recentAdditions = customers.filter(
    (c) => new Date(c.createdAt) >= sevenDaysAgo
  ).length;

  return NextResponse.json({ total, active, leads, recentAdditions });
}
