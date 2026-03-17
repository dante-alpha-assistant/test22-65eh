import { NextRequest, NextResponse } from 'next/server';
import { customersStore } from '@/lib/customers-store';
import { customerSchema } from '@/lib/validations/customer';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const customer = customersStore.getById(id);

  if (!customer) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }

  return NextResponse.json(customer);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const customer = customersStore.getById(id);

  if (!customer) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const parsed = customerSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updated = customersStore.update(id, parsed.data);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const exists = customersStore.getById(id);

  if (!exists) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }

  customersStore.delete(id);
  return new NextResponse(null, { status: 204 });
}
