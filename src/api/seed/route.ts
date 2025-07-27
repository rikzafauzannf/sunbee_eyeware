import { NextResponse } from 'next/server';
import { seedProducts } from '@/lib/seed';

export async function GET() {
  try {
    const message = await seedProducts();
    return NextResponse.json({ message });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
