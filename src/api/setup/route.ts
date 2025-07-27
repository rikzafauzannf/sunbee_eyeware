import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const sql = `
      create table if not exists products (
        id uuid primary key default uuid_generate_v4(),
        name text not null,
        price numeric not null,
        image_url text,
        created_at timestamp with time zone default now()
      );
    `;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apiKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        },
        body: JSON.stringify({ sql }),
      }
    );

    const result = await response.json();
    return NextResponse.json({ message: 'Table created', result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
