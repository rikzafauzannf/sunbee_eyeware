'use server';

import { createServerSupabaseClient } from './supabase';

export async function seedProducts() {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from('products').insert([
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
  ]);

  if (error) throw new Error(error.message);
  return 'Seeded successfully!';
}
