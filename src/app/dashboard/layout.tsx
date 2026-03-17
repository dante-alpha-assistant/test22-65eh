import Link from 'next/link';
import { Users } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-gray-900">
              CRM
            </Link>
            <Link
              href="/dashboard/customers"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
