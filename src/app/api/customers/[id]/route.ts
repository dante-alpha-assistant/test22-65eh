import { NextResponse } from 'next/server';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // In a real app, delete from DB
  return NextResponse.json({ success: true, id });
}
