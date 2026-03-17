import { NextRequest, NextResponse } from 'next/server';
import { customersStore } from '@/lib/customers-store';
import { customerSchema } from '@/lib/validations/customer';

export async function GET() {
  const customers = customersStore.getAll();
  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = customerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const customer = customersStore.create(parsed.data);
    return NextResponse.json(customer, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
