import { NextResponse } from 'next/server';
import { seedProducts } from '@/lib/seed';

export async function GET() {
  try {
    const message = await seedProducts();
    return NextResponse.json({ message });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
