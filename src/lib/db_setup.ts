import { createClient } from '@supabase/supabase-js';
import { formatError } from './error';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// SQL untuk membuat tabel + policies
const setupSQL = `
-- Tabel profiles
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  email text unique not null,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default now()
);

-- Tabel products
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price numeric not null,
  image_url text,
  created_at timestamp with time zone default now()
);

-- Aktifkan RLS
alter table products enable row level security;

-- Policy products
create policy if not exists "Admins can do anything"
on products
for all
using (exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin'))
with check (exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin'));

create policy if not exists "Everyone can read products"
on products
for select
using (true);
`;

const seedProducts = [
  {
    name: 'Aviator Sunglasses',
    price: 120,
    image_url: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb',
  },
  {
    name: 'Classic Round Glasses',
    price: 90,
    image_url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
  },
  {
    name: 'Retro Cat-Eye',
    price: 130,
    image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
  },
];

export async function setupDatabase() {
  try {
    // Jalankan SQL setup
    const { error: sqlError } = await supabaseAdmin.rpc('exec_sql', { sql: setupSQL });
    if (sqlError) throw sqlError;

    // Seed produk dummy jika belum ada data
    const { data: products } = await supabaseAdmin.from('products').select('id').limit(1);
    if (!products || products.length === 0) {
      const { error: seedError } = await supabaseAdmin.from('products').insert(seedProducts);
      if (seedError) throw seedError;
    }

    return { success: true, message: 'Database setup & seed completed' };
  } catch (err: unknown) {
    return { success: false, error: formatError(err) };
  }
}
