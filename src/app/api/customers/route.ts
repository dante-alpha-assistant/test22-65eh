import { NextRequest, NextResponse } from 'next/server';
import { Customer } from '@/types/customer';

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@acme.com', phone: '+1-555-0101', company: 'Acme Corp', status: 'active', createdAt: '2025-01-15T10:00:00Z' },
  { id: '2', name: 'Bob Smith', email: 'bob@globex.com', phone: '+1-555-0102', company: 'Globex', status: 'inactive', createdAt: '2025-02-20T09:30:00Z' },
  { id: '3', name: 'Carol White', email: 'carol@initech.com', phone: '+1-555-0103', company: 'Initech', status: 'prospect', createdAt: '2025-03-05T14:00:00Z' },
  { id: '4', name: 'David Brown', email: 'david@umbrella.com', phone: '+1-555-0104', company: 'Umbrella Corp', status: 'active', createdAt: '2025-03-10T11:00:00Z' },
  { id: '5', name: 'Eva Martinez', email: 'eva@wayne.com', phone: '+1-555-0105', company: 'Wayne Enterprises', status: 'active', createdAt: '2025-04-01T08:00:00Z' },
  { id: '6', name: 'Frank Wilson', email: 'frank@oscorp.com', phone: '+1-555-0106', company: 'Oscorp', status: 'prospect', createdAt: '2025-04-15T15:30:00Z' },
  { id: '7', name: 'Grace Lee', email: 'grace@stark.com', phone: '+1-555-0107', company: 'Stark Industries', status: 'active', createdAt: '2025-05-01T10:00:00Z' },
  { id: '8', name: 'Henry Davis', email: 'henry@tyrell.com', phone: '+1-555-0108', company: 'Tyrell Corp', status: 'inactive', createdAt: '2025-05-20T09:00:00Z' },
  { id: '9', name: 'Iris Taylor', email: 'iris@weyland.com', phone: '+1-555-0109', company: 'Weyland-Yutani', status: 'active', createdAt: '2025-06-01T13:00:00Z' },
  { id: '10', name: 'Jack Anderson', email: 'jack@cyberdyne.com', phone: '+1-555-0110', company: 'Cyberdyne Systems', status: 'prospect', createdAt: '2025-06-15T16:00:00Z' },
  { id: '11', name: 'Karen Thomas', email: 'karen@soylent.com', phone: '+1-555-0111', company: 'Soylent Corp', status: 'active', createdAt: '2025-07-01T10:00:00Z' },
  { id: '12', name: 'Liam Jackson', email: 'liam@lexcorp.com', phone: '+1-555-0112', company: 'LexCorp', status: 'inactive', createdAt: '2025-07-20T11:00:00Z' },
  { id: '13', name: 'Mia Harris', email: 'mia@shinra.com', phone: '+1-555-0113', company: 'Shinra Inc', status: 'active', createdAt: '2025-08-05T09:30:00Z' },
  { id: '14', name: 'Noah Martin', email: 'noah@veridian.com', phone: '+1-555-0114', company: 'Veridian Dynamics', status: 'prospect', createdAt: '2025-08-20T14:00:00Z' },
  { id: '15', name: 'Olivia Garcia', email: 'olivia@massive.com', phone: '+1-555-0115', company: 'Massive Dynamic', status: 'active', createdAt: '2025-09-01T10:00:00Z' },
];

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search')?.toLowerCase() ?? '';
  const customers = search
    ? MOCK_CUSTOMERS.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search) ||
          c.company.toLowerCase().includes(search)
      )
    : MOCK_CUSTOMERS;

  return NextResponse.json(customers);
}
