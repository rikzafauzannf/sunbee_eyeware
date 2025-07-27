'use server';

import { createServerSupabaseClient } from './supabase';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(productId: string) {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from('products').delete().eq('id', productId);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}

export async function updateProduct(
  productId: string,
  data: { name: string; price: number; image_url: string }
) {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from('products')
    .update(data)
    .eq('id', productId);

  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}

export async function uploadProductImage(file: File) {
  const supabase = createServerSupabaseClient();

  const fileName = `${Date.now()}-${file.name}`;
  const {  error } = await supabase.storage
    .from('products')
    .upload(fileName, file);

  if (error) throw new Error(error.message);

  const { data: publicUrlData } = supabase.storage
    .from('products')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl; // Return public URL
}