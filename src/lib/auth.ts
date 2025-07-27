'use server';

import { createServerSupabaseClient } from './supabase';
import { redirect } from 'next/navigation';

export async function isAdmin() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return profile?.role === 'admin';
}


export async function login(email: string, password: string) {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  redirect('/dashboard');
}

export async function logout() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function getUser() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}
