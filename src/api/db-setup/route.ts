import { NextResponse } from 'next/server';
import { setupDatabase } from '@/lib/db_setup';

export async function POST() {
  const result = await setupDatabase();
  return NextResponse.json(result);
}
