import { StatsCard } from '@/components/dashboard/stats-card';
import { RecentCustomers } from '@/components/dashboard/recent-customers';

interface Stats {
  total: number;
  active: number;
  leads: number;
  recentAdditions: number;
}

async function getStats(): Promise<Stats> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/stats`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  } catch {
    return { total: 0, active: 0, leads: 0, recentAdditions: 0 };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your CRM</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Customers"
          value={stats.total}
          description="All customers in the system"
        />
        <StatsCard
          title="Active Customers"
          value={stats.active}
          description="Currently active accounts"
        />
        <StatsCard
          title="Leads"
          value={stats.leads}
          description="Potential customers"
        />
        <StatsCard
          title="Recent Additions"
          value={stats.recentAdditions}
          description="Added in the last 7 days"
        />
      </div>

      <div>
        <RecentCustomers />
      </div>
    </div>
  );
}
